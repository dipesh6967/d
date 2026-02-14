
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const detectSmartVideo = async (pageTitle: string, pageUrl: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user is browsing ${pageTitle} at ${pageUrl}. 
      Act as a TV Browser smart engine. Predict if this site likely contains video streams 
      and what ExoPlayer optimization we should apply. Return JSON.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasVideo: { type: Type.BOOLEAN },
            videoType: { type: Type.STRING, description: 'HLS, MP4, or DASH' },
            confidence: { type: Type.NUMBER },
            optimizationTip: { type: Type.STRING }
          },
          required: ['hasVideo', 'videoType', 'optimizationTip']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini detection failed:", error);
    return { hasVideo: false };
  }
};

export const getSmartNews = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "List 5 trending global topics for a TV dashboard focus. Be concise.",
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING }
            },
            required: ['title', 'summary']
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [];
  }
};
