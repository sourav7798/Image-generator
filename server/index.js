import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, style } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance prompt with style if provided
    let finalPrompt = prompt;
    if (style && style !== 'none') {
      finalPrompt = `${prompt}, ${style} style`;
    }

    try {
      // Call the Gemini API to generate an image
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: finalPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1'
        },
      });

      const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;

      if (!imageBytes) {
        throw new Error('No image generated from API.');
      }

      // The imageBytes is returned as base64 string
      const imageUrl = `data:image/jpeg;base64,${imageBytes}`;
      return res.json({ imageUrl });

    } catch (geminiError) {
      console.log('Gemini API restricted or failed. Using free fallback generator...');
      
      // Seamless fallback to free generator if Gemini key is on free tier
      const encodedPrompt = encodeURIComponent(finalPrompt);
      const randomSeed = Math.floor(Math.random() * 100000);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${randomSeed}&width=1024&height=1024&nologo=true`;
      
      try {
        const fallbackRes = await fetch(fallbackUrl);
        if (!fallbackRes.ok) throw new Error('Fallback failed');
        const arrayBuffer = await fallbackRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        return res.json({ imageUrl: `data:image/jpeg;base64,${base64Image}` });
      } catch (fallbackError) {
        return res.json({ imageUrl: fallbackUrl });
      }
    }

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      error: 'Failed to generate image. Please try again.' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
