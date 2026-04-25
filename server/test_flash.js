import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGen() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: 'Generate an image of a red apple.',
      config: {
        responseModalities: ['IMAGE'],
      },
    });
    console.log("Success! Got response parts.");
    // Log whether it has an image
    console.log(response.candidates?.[0]?.content?.parts?.[0]);
  } catch (e) {
    console.error("Error:", e.message || e);
  }
}

testGen();
