import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMenuDescription = async (itemName: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning placeholder.");
    return "Delicious and freshly prepared.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a short, appetizing description (max 20 words) for a menu item named "${itemName}" in the category "${category}". Make it sound premium.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Freshly made with quality ingredients.";
  }
};

export const suggestPrice = async (itemName: string): Promise<string> => {
     if (!apiKey) return "";
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Suggest a realistic price in USD for a restaurant menu item: "${itemName}". Return only the number, e.g., 12.50.`,
        });
        return response.text.trim().replace('$', '');
     } catch (e) {
         return "";
     }
}
