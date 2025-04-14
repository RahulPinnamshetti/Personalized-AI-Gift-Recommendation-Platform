import React, { useState } from "react";
import axios from "axios";

function QuestionnaireForm({ onRecommendations }) {
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [preferences, setPreferences] = useState("");
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);  // State for loading
  const [error, setError] = useState(null);       // State for error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   // Start loading when form is submitted
    setError(null);     // Reset error state

    try {
      const response = await axios.post(
        "https://personalized-ai-gift-recommendation.onrender.com", // Update this URL when you deploy
        {
          personalityTraits,
          preferences,
          occasion,
        }
      );
      onRecommendations(response.data.recommendations);  // Pass recommendations to parent
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("There was an issue fetching recommendations. Please try again.");  // Set error message
    } finally {
      setLoading(false);  // Stop loading when request is finished
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionnaireForm;






// import React, { useState } from "react";
// import axios from "axios";

// function QuestionnaireForm({ onRecommendations }) {
//   const [personalityTraits, setPersonalityTraits] = useState("");
//   const [preferences, setPreferences] = useState("");
//   const [occasion, setOccasion] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/recommendations",
//         {
//           personalityTraits,
//           preferences,
//           occasion,
//         }
//       );
//       onRecommendations(response.data.recommendations);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//       onRecommendations(null);
//     }
//   };

//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h2 className="card-title mb-4">Tell Us About the Recipient</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Personality Traits</label>
//             <input
//               type="text"
//               className="form-control"
//               value={personalityTraits}
//               onChange={(e) => setPersonalityTraits(e.target.value)}
//               placeholder="e.g., artistic, outdoorsy, introverted"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Preferences or Interests</label>
//             <input
//               type="text"
//               className="form-control"
//               value={preferences}
//               onChange={(e) => setPreferences(e.target.value)}
//               placeholder="e.g., coffee, gardening, meditation"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Occasion</label>
//             <input
//               type="text"
//               className="form-control"
//               value={occasion}
//               onChange={(e) => setOccasion(e.target.value)}
//               placeholder="e.g., birthday, anniversary, graduation"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Get Recommendations
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default QuestionnaireForm;
