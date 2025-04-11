import React, { useState } from "react";
import axios from "axios";

function QuestionnaireForm({ onRecommendations }) {
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [preferences, setPreferences] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recommendations",
        {
          personalityTraits,
          preferences,
          occasion,
        }
      );
      onRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      onRecommendations(null);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Tell Us About the Recipient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Personality Traits</label>
            <input
              type="text"
              className="form-control"
              value={personalityTraits}
              onChange={(e) => setPersonalityTraits(e.target.value)}
              placeholder="e.g., artistic, outdoorsy, introverted"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferences or Interests</label>
            <input
              type="text"
              className="form-control"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., coffee, gardening, meditation"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Occasion</label>
            <input
              type="text"
              className="form-control"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g., birthday, anniversary, graduation"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Get Recommendations
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionnaireForm;
