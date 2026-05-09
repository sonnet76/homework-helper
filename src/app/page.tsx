export default function Home() {
  return (
    <div>
      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>환영합니다, 모험가님! 👋</h1>
      <p style={{ marginBottom: '30px', fontSize: '1.2rem' }}>오늘도 함께 즐겁게 공부하고 레벨업 해볼까요?</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>🤖 AI 튜터와 대화하기</h2>
          <p style={{ marginBottom: '20px' }}>모르는 문제는 AI 튜터에게 물어보세요. 차근차근 설명해줄게요!</p>
          <button className="btn">시작하기</button>
        </div>

        <div className="card">
          <h2 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>📅 오늘의 할 일</h2>
          <p style={{ marginBottom: '20px' }}>오늘 완료해야 할 숙제가 3개 남아있어요. 하나씩 해결해볼까요?</p>
          <button className="btn btn-secondary">플래너 보기</button>
        </div>

        <div className="card">
          <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>👥 친구들의 질문</h2>
          <p style={{ marginBottom: '20px' }}>새로운 질문이 5개 올라왔어요! 답변을 달고 포인트를 획득하세요.</p>
          <button className="btn btn-accent">커뮤니티 가기</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px', background: 'var(--accent)', borderStyle: 'dashed' }}>
        <h2 style={{ marginBottom: '10px' }}>🏆 이번 주의 챌린지</h2>
        <p>수학 문제 5개 질문하고 답변 받기! 성공 시 <strong>+100 XP</strong></p>
      </div>
    </div>
  );
}
