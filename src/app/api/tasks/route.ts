import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { deadline: 'asc' },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, deadline, userId } = body;
    
    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
        userId: userId || 1, // Defaulting to user 1 for now
      },
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
