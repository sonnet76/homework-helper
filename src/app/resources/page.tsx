import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { category: 'asc' },
  });

  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>📚 학습 자료 라이브러리</h1>
      
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            display: 'inline-block',
            padding: '5px 15px',
            backgroundColor: 'var(--secondary)',
            color: 'white',
            borderRadius: '12px',
            marginBottom: '15px'
          }}>{category}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {resources
              .filter((r) => r.category === category)
              .map((resource) => (
                <div key={resource.id} className="card">
                  <h3 style={{ marginBottom: '10px' }}>{resource.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>{resource.description}</p>
                  <div style={{ 
                    padding: '10px', 
                    background: '#f9f9f9', 
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    borderLeft: '4px solid var(--primary)'
                  }}>
                    {resource.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
