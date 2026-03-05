import React from "react";
import data from "./data.json";
import { Clock, Users, Star } from "lucide-react";

export default function Widget() {
  // For the partial star, we use a mask over the star svg.
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; ++i) {
      if (i < 5) {
        stars.push(
          <span
            data-eid={`star-${i}`}
            key={i}
            style={{
              color: "#FFD600",
              marginRight: 2,
              display: "inline-block",
              width: 18,
              height: 18,
              verticalAlign: "middle"
            }}
          >
            <Star fill="#FFD600" stroke="#FFD600" size={18} />
          </span>
        );
      } else {
        // Partial star (~70% filled)
        stars.push(
          <span
            data-eid="star-5"
            key={i}
            style={{
              color: "#FFD600",
              marginRight: 6,
              display: "inline-block",
              width: 18,
              height: 18,
              verticalAlign: "middle",
              position: "relative",
              overflow: "visible"
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              style={{ display: "block" }}
            >
              <defs>
                <linearGradient id="partial-gold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="70%" stopColor="#FFD600" />
                  <stop offset="70%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <Star
                fill="url(#partial-gold)"
                stroke="#FFD600"
                size={18}
              />
            </svg>
          </span>
        );
      }
    }
    return stars;
  };

  // Tag colors
  const tagStyles = [
    {
      background: "rgba(255,165,0,0.08)",
      color: "#FF9000",
      border: "1px solid #FF9000"
    },
    {
      background: "rgba(52, 199, 89, 0.09)",
      color: "#34C759",
      border: "1px solid #34C759"
    },
    {
      background: "rgba(40,132,255,0.08)",
      color: "#2884FF",
      border: "1px solid #2884FF"
    }
  ];

  // Nutrition stat colors
  const statColors = [
    { color: "#FF9000", border: "1px solid #FF9000" }, // Calories
    { color: "#33AAFF", border: "1px solid #33AAFF" }, // Protein
    { color: "#34C759", border: "1px solid #34C759" }, // Carbs
    { color: "#D93991", border: "1px solid #D93991" }  // Fat
  ];

  // Nutrition Stat cards
  const statKeys = ["calories", "protein", "carbs", "fat"];
  const statLabels = [
    <span data-eid="calories-label" style={{ fontSize: 12, letterSpacing: 1.2 }}>CALORIES</span>,
    <span data-eid="protein-label" style={{ fontSize: 12, letterSpacing: 1.2 }}>PROTEIN</span>,
    <span data-eid="carbs-label" style={{ fontSize: 12, letterSpacing: 1.2 }}>CARBS</span>,
    <span style={{ fontSize: 12, letterSpacing: 1.2 }}>FAT</span>
  ];

  return (
    <section
      data-eid="root"
      style={{
        width: 510,
        background: "linear-gradient(180deg,#F63B06 0%,#151D31 145%)",
        borderRadius: 24,
        boxShadow: "0 8px 32px rgba(20,32,80,0.08)",
        margin: "0 auto",
        marginTop: 0,
        overflow: "hidden",
        fontFamily: "Inter,system-ui,sans-serif",
        border: "none"
      }}
    >
      <div
        data-eid="hero-image"
        style={{
          height: 200,
          background: "linear-gradient(180deg,#F63B06 0%,#D61547 95%)",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Icon placeholder, semi-transparent fork */}
        <svg width="36" height="60" style={{ opacity: 0.18 }}>
          <rect x="15" y="8" width="6" height="40" rx="3" fill="#fff" />
          <rect x="17" y="0" width="2" height="22" fill="#fff" />
          <rect x="15" y="0" width="2" height="17" fill="#fff" />
          <rect x="19" y="0" width="2" height="17" fill="#fff" />
        </svg>
      </div>
      <div style={{
        background: "linear-gradient(180deg,#192345 60%,#18223c 100%)",
        padding: "0 32px 36px 32px"
      }}>
        <h2
          data-eid="recipe-title"
          style={{
            color: "#fff",
            fontWeight: 600,
            marginTop: 28,
            fontSize: 25,
            marginBottom: 10,
            letterSpacing: 0.1
          }}
        >
          {data.title}
        </h2>
        <div
          data-eid="rating-row"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
            gap: 10
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {renderStars()}
            <span
              data-eid="rating-value"
              style={{
                color: "#FFD600",
                fontWeight: 500,
                fontSize: 17,
                marginRight: 7,
                marginLeft: -6
              }}
            >{data.rating.value}</span>
          </div>
          <span
            data-eid="review-count"
            style={{
              color: "#abb7cb",
              fontSize: 15,
              fontWeight: 400,
              marginLeft: 0
            }}
          >
            {data.rating.reviews} reviews
          </span>
        </div>
        <div
          data-eid="meta-row"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#abb7cb",
            gap: 22,
            fontSize: 15,
            marginBottom: 22
          }}
        >
          <span
            data-eid="cook-time"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7
            }}
          >
            <Clock size={17} strokeWidth={2} style={{ marginTop: -2 }} />
            {data.cookTime}
          </span>
          <span
            data-eid="servings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7
            }}
          >
            <Users size={16} strokeWidth={2} style={{ marginTop: -1 }} />
            {data.servings}
          </span>
        </div>
        <div
          data-eid="nutrition-grid"
          style={{
            display: "flex",
            gap: 18,
            marginBottom: 24
          }}
        >
          {statKeys.map((key, i) => (
            <div
              key={key}
              data-eid={`stat-${key}`}
              style={{
                flex: "1 1 0",
                border: statColors[i].border,
                borderRadius: 12,
                padding: "10px 0",
                background: "rgba(28,31,52,0.38)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 87
              }}
            >
              <span style={{
                color: statColors[i].color,
                fontWeight: 700,
                fontSize: 22,
                lineHeight: "22px"
              }}>
                {data.nutrition[key].value}
                {key !== "calories" && <span style={{ fontSize: 15, fontWeight: 500 }}>g</span>}
              </span>
              {statLabels[i]}
            </div>
          ))}
        </div>
        <div data-eid="ingredients-section">
          <h3
            data-eid="ingredients-title"
            style={{
              fontWeight: 600,
              color: "#fff",
              fontSize: 17,
              marginBottom: 12
            }}
          >Ingredients</h3>
          <div style={{ borderRadius: 10, overflow: "hidden" }}>
            {data.ingredients.map((ing, i) => (
              <div
                data-eid={`ingredient-${i}`}
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontSize: 15,
                  color: "#d6e1fe",
                  padding: "3px 0",
                  borderTop: i === 0 ? "none" : "1px solid #20294b"
                }}
              >
                <span style={{ color: "#b5bed6", minWidth: 75 }}>{ing.left}</span>
                <span style={{
                  color: "#FAFAFF",
                  fontWeight: i === 0 ? 400 : 500,
                  fontSize: 15
                }}>{ing.right}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}