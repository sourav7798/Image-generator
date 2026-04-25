import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  if (data.models) {
    const images = data.models.filter(m => m.name.includes('imagen') || m.name.includes('image'));
    console.log("Image models:");
    images.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } else {
    console.log(data);
  }
}

listModels();
