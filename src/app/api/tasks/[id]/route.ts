import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let taskId = 'unknown';
  try {
    const { id } = await params;
    taskId = id;
    const body = await request.json();
    const { isCompleted } = body;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { isCompleted },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error(`PATCH /api/tasks/${taskId} error:`, err);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let taskId = 'unknown';
  try {
    const { id } = await params;
    taskId = id;
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(`DELETE /api/tasks/${taskId} error:`, err);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
