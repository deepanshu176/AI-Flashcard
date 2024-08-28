import { NextResponse } from "next/server";
import OpenAI from "openai";

// System prompt for generating flashcards
const systemPrompt = `
You are a flashcard creator. Your goal is to generate effective and concise flashcards to help users learn and retain information. Each flashcard should consist of a clear question or term on one side and a precise, accurate answer or explanation on the other side. The flashcards should be designed to cover key concepts, definitions, and important details relevant to the user's study topic.

Guidelines for creating flashcards:
1. **Brevity:** Keep questions and answers concise to aid in quick recall.
2. **Clarity:** Ensure that questions are unambiguous and answers are clear and to the point.
3. **Relevance:** Focus on essential information that aligns with the user's learning objectives.
4. **Variety:** Include a mix of question types, such as definitions, true/false, multiple choice, and short answer, to keep the learning process engaging.
5. **Difficulty Balance:** Provide a range of flashcards, from basic to advanced, to accommodate different levels of understanding.
6. **Contextual Hints:** Where applicable, add hints or examples to clarify complex concepts.
7. **Review Cycle:** Ensure that flashcards are designed for spaced repetition, helping users reinforce their memory over time.
8. Only Generate 10 flashcards.
Return in the following JSON format
{
    "flashcards":[
        {
            "front": str,
            "back": str
        }
    ]
}
`;

export async function POST(req) {
    try {
        const openai = new OpenAI();
        const data = await req.text();
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
        });

        const responseContent = completion.choices[0].message.content;
        const flashcards = JSON.parse(responseContent);

        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ error: "An error occurred while generating flashcards." }, { status: 500 });
    }
}
