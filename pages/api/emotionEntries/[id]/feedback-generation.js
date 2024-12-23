import OpenAI from "openai";
import EmotionEntry from "@/db/models/emotionEntry";
import dbConnect from "@/db/connect";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export default async function handler(request, response) {
  const { emotionType, intensity, notes } = request.body;

  await dbConnect();

  const { id } = request.query;

  const prompt = `
  Provide actionable and empathetic feedback in maximum three sentences for an emotion entry. The emotion type is ${emotionType} with an intensity level ${intensity} of 3. The user has notes: ${
    notes ? notes : "Not provided"
  }.
  `;

  const data = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const completion = data.choices[0].message.content;
  await EmotionEntry.findByIdAndUpdate(id, {
    openaiFeedback: completion,
  });

  return response.status(200).json({ output: completion });
}
