require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getGiftRecommendations(personalityTraits, preferences, occasion) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Suggest 3 personalized gift ideas for someone with the following:
- Personality Traits: ${personalityTraits}
- Preferences: ${preferences}
- Occasion: ${occasion}

Format the response exactly as:
1. Idea: <gift idea>
   Explanation: <why this gift is suitable>
2. Idea: ...
   Explanation: ...
3. Idea: ...
   Explanation: ...
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const suggestions = [];
    const matches = text.matchAll(/Idea:\s*(.+?)\s*Explanation:\s*(.+?)(?:\n|$)/gs);

    for (const match of matches) {
      suggestions.push({
        idea: match[1].trim(),
        explanation: match[2].trim(),
      });
    }

    // Fallback if parsing fails
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      console.warn("Gemini output couldn't be parsed, falling back.");
      return [
        {
          idea: "Custom Mug",
          explanation: "Personalized mugs are a safe and thoughtful gift.",
        },
      ];
    }

    return suggestions;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return [
      {
        idea: "Backup Gift Idea",
        explanation: "Returned because of an error with Gemini API.",
      },
    ];
  }
}

module.exports = {
  getGiftRecommendations,
};


