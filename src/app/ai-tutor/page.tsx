'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '안녕! 나는 너의 공부 친구 공부왕이야. 무엇이든 물어봐! 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'ai', text: data.text || data.error }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '오류가 발생했어요. 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>🤖 AI 튜터 공부왕</h1>
      
      <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', padding: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              marginBottom: '15px', 
              textAlign: msg.role === 'user' ? 'right' : 'left' 
            }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '10px 15px', 
                borderRadius: '15px',
                border: '2px solid var(--text)',
                backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--background)',
                maxWidth: '80%',
                boxShadow: '2px 2px 0px 0px var(--text)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <p>공부왕이 생각 중... 🤔</p>}
        </div>

        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="궁금한 것을 물어보세요..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid var(--text)' 
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>보내기</button>
        </form>
      </div>
    </div>
  );
}
