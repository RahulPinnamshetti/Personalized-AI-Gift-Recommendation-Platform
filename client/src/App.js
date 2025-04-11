import React, { useState } from "react";
import QuestionnaireForm from "./components/QuestionnaireForm";
import GiftRecommendations from "./components/GiftRecommendations";

function App() {
  const [recommendations, setRecommendations] = useState(null);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Personalized Gift Recommendation Platform
      </h1>
      <QuestionnaireForm onRecommendations={setRecommendations} />
      {recommendations && (
        <GiftRecommendations recommendations={recommendations} />
      )}
      <p className="footer-note text-center mt-5">
        Powered by AI-driven suggestions.
      </p>
    </div>
  );
}

export default App;
