import React from "react";

function GiftRecommendations({ recommendations }) {
  return (
    <div className="mt-5">
      <h2 className="mb-4">Recommended Gifts</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        <div className="row">
          {recommendations.map((rec, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">{rec.idea}</h3>
                  <p className="text-muted">
                    <em>{rec.explanation}</em>
                  </p>
                  {rec.product ? (
                    <div className="mt-3">
                      <h5>Suggested Product</h5>
                      <p className="fw-bold">
                        <a
                          href={rec.product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-primary"
                        >
                          {rec.product.name}
                        </a>
                      </p>
                      <p>{rec.product.description}</p>
                      <p className="text-success fw-bold">
                        Price: ${rec.product.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-danger mt-3">
                      No exact product match found in the catalog.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftRecommendations;
