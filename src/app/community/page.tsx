import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CommunityPage() {
  const questions = await prisma.question.findMany({
    include: { author: true, _count: { select: { answers: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>👥 커뮤니티</h1>
        <button className="btn btn-primary">질문하기</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {questions.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>아직 올라온 질문이 없어요. 첫 번째 질문의 주인공이 되어보세요!</p>
          </div>
        )}
        {questions.map((q) => (
          <div key={q.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ 
                backgroundColor: 'var(--accent)', 
                padding: '2px 10px', 
                borderRadius: '5px', 
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>질문</span>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(q.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 style={{ marginBottom: '10px' }}>{q.title}</h3>
            <p style={{ marginBottom: '20px', color: '#444' }}>{q.content}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>👤 {q.author.name}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>💬 답변 {q._count.answers}개</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
