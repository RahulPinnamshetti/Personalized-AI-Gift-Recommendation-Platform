require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getGiftRecommendations } = require("./ai");
const catalog = require("./catalog.json");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Utility function to extract keywords
const getKeywords = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 3);

// Endpoint to generate gift recommendations
app.post("/api/recommendations", async (req, res) => {
  try {
    const { personalityTraits, preferences, occasion } = req.body;

    // Get recommendations from AI
    const aiSuggestions = await getGiftRecommendations(
      personalityTraits,
      preferences,
      occasion
    );

    console.log("AI Suggestions:", aiSuggestions);

    // Combine AI suggestions with matched products
    const results = aiSuggestions.map((suggestion) => {
      const keywords = getKeywords(suggestion.idea);
      const productMatch = catalog.find((product) =>
        keywords.some(
          (word) =>
            product.name.toLowerCase().includes(word) ||
            product.description.toLowerCase().includes(word)
        )
      );

      return {
        idea: suggestion.idea,
        explanation: suggestion.explanation,
        product: productMatch || null,
      };
    });

    res.json({ recommendations: results });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


