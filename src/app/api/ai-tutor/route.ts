import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const prompt = `당신은 중학생들의 숙제를 도와주는 친절하고 재미있는 AI 튜터 '공부왕'입니다. 
    학생이 묻는 질문에 대해 직접적인 답만 알려주기보다는, 원리를 차근차근 설명하고 스스로 생각할 수 있도록 유도해주세요. 
    중학생 수준에 맞는 어휘를 사용하고, 이모지를 적절히 섞어 친근하게 답변해주세요.
    
    학생의 질문: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI 튜터가 잠시 쉬고 있어요. 나중에 다시 시도해주세요!" }, { status: 500 });
  }
}
