import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function checkModels() {
  try {
    const response = await ai.models.list();
    const items = response.models || response;
    // stringify first 200 items, extract names
    const names = [];
    if (items && Array.isArray(items)) {
       for (const m of items) {
         names.push(m.name);
       }
    } else if (items.items) {
       for (const m of items.items) {
         names.push(m.name);
       }
    } else {
       console.log("Unknown format");
    }
    console.log(names.filter(n => n.includes('imagen') || n.includes('image')));
  } catch (e) {
    console.error(e);
  }
}

checkModels();
