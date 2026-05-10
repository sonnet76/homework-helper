import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await prisma.user.findFirst({
    where: { email: 'student@example.com' },
  });

  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  const progressPercent = (user.points % 100);

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>👤 나의 프로필</h1>
      
      <div className="card" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: 'var(--accent)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '3rem',
          border: '4px solid var(--text)',
          boxShadow: '4px 4px 0px 0px var(--text)'
        }}>
          🎓
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '5px' }}>{user.name} <span style={{ fontSize: '1rem', color: '#666' }}>({user.email})</span></h2>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <span className="points-badge">Lv. {user.level}</span>
            <span className="points-badge" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>⭐ {user.points} XP</span>
          </div>
          
          <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>다음 레벨까지: {100 - progressPercent} XP</div>
          <div style={{ 
            width: '100%', 
            height: '20px', 
            backgroundColor: '#eee', 
            borderRadius: '10px', 
            border: '2px solid var(--text)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              backgroundColor: 'var(--secondary)',
              transition: 'width 0.5s ease-in-out'
            }}></div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>🏅 획득한 뱃지</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div className="card" style={{ textAlign: 'center', width: '150px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌱</div>
          <div style={{ fontWeight: 'bold' }}>첫걸음</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>첫 숙제 완료</div>
        </div>
        <div className="card" style={{ textAlign: 'center', width: '150px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔥</div>
          <div style={{ fontWeight: 'bold' }}>성실파</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>3일 연속 접속</div>
        </div>
        <div className="card" style={{ textAlign: 'center', width: '150px', opacity: 0.3 }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧙‍♂️</div>
          <div style={{ fontWeight: 'bold' }}>문제 해결사</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>답변 10개 달기</div>
        </div>
      </div>
    </div>
  );
}
