'use client';

import { useState, useEffect, useCallback } from 'react';

interface Task {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  isCompleted: boolean;
}

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setTasks(data);
        }
      } catch (err) {
        console.error('Initial fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    init();
    return () => { mounted = false; };
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });

    if (res.ok) {
      setNewTitle('');
      fetchTasks();
    }
  };

  const toggleTask = async (id: number, isCompleted: boolean) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    });

    if (res.ok) {
      fetchTasks();
    }
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchTasks();
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>📅 나의 학습 플래너</h1>
      
      <div className="card">
        <form onSubmit={addTask} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="새로운 숙제를 입력하세요..." 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '10px', 
              borderRadius: '8px', 
              border: '2px solid var(--text)' 
            }}
          />
          <button type="submit" className="btn btn-primary">추가하기</button>
        </form>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tasks.length === 0 && <p>등록된 숙제가 없습니다. 새로운 계획을 세워보세요!</p>}
          {tasks.map((task) => (
            <div key={task.id} className="card" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              opacity: task.isCompleted ? 0.6 : 1,
              backgroundColor: task.isCompleted ? '#f0f0f0' : 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                  type="checkbox" 
                  checked={task.isCompleted} 
                  onChange={() => toggleTask(task.id, task.isCompleted)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <h3 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.title}</h3>
                  {task.deadline && <small>📅 {new Date(task.deadline).toLocaleDateString()}</small>}
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
