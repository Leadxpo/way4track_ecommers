import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionSix = ({ promo, handlers, navigate }) => {
  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No feature items found for Session Six
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 50px",borderRadius: "20px",  }}>
      {/* Background image and gradient */}
    <div className="container-fluid px-0 py-4" style={{  backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)", borderRadius:"20px"}}>
      <div className="row m-0" style={{padding:"0px 30px"}}>
        {/* Title and Header */}
        <div className="col-12 text-center mb-4 animation-fade-in">
          <p className="mining-name">{promo.name}</p>
          <p className="fw-bold">{promo.header}</p>
        </div>

        {/* Left column: Main image and buttons (opposite of Session 5) */}
        <div className="col-md-6 d-flex flex-column align-items-center mb-4 mb-md-0">
          {promo?.image && (
            <div className="img-container mb-4 animation-fade-in">
              <img
                src={promo?.image}
                alt={promo.name}
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          )}

      
        </div>

        {/* Right column: List of features */}
        <div className="col-md-6 d-flex flex-column align-items-end">
          {promo.list.map((item, index) => (
            <div
              key={index}
              className="card feature-card-1 mb-4 shadow-lg border-0 rounded-4 w-100 animation-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-body p-4">
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-arrow-right-circle text-primary feature-icon"></i>
                    <h5 className="card-title fw-bold text-dark mb-0">
                      {item.name}
                    </h5>
                  </div>
                  <p className="card-text text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}

              <ActionButtons 
            promo={promo} 
            handlers={handlers} 
            navigate={navigate} 
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SessionSix;