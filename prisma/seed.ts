import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.resource.createMany({
    data: [
      { title: '중학 수학 공식 요약', category: '수학', content: '피타고라스의 정리, 근의 공식 등 필수 공식 모음' },
      { title: '영어 불규칙 동사 100선', category: '영어', content: '시험에 자주 나오는 불규칙 동사 리스트' },
      { title: '한국사 시대별 주요 사건', category: '사회', content: '삼국시대부터 현대까지 흐름 잡기' },
      { title: '과학 원소 주기율표 암기 팁', category: '과학', content: '수헤리베... 쉽게 외우는 방법' },
    ],
  });
  
  // Also create a default user
  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: '학습왕',
      points: 150,
      level: 5,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
