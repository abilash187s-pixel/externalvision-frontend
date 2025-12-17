import React, { useState } from "react";

const programs = [
  {
    short: "LKG - Class 3",
    title: "Early Learn Program",
    img: "https://cdn1.byjus.com/wp-content/uploads/2024/02/BEL_Hero_50k-scaled.webp",
  },
  {
    short: "Class 4 - 10",
    title: "The Learning App",
    img: "https://cdn1.byjus.com/wp-content/uploads/2024/02/BTLA_Hero_50kb.webp",
  },
  {
    short: "Class 4 - 10",
    title: "Live Classes",
    img: "https://cdn1.byjus.com/wp-content/uploads/2024/02/LiveClasses_Hero_50kb.webp",
  },
  {
    short: "Class 8 - 10",
    title: "Foundation Program",
    img: "https://cdn1.byjus.com/wp-content/uploads/2024/02/Aakash_FoundationCourse.webp",
  },
  {
    short: "Class 11 - 12",
    title: "JEE / NEET Program",
    img: "https://cdn1.byjus.com/wp-content/uploads/2024/02/Aakash_JEE_NEET.webp",
  },
];

export default function LearningPrograms() {
  const [index, setIndex] = useState(0);
  const visibleCards = 3; // number of cards visible at once

  const next = () => {
    if (index < programs.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="container section">
      <div className="section-header">
        <h2>Explore our Learning Programs</h2>
      </div>

      <div className="carousel-wrapper">
        {/* Left Arrow */}
        <button
          className="carousel-arrow left"
          onClick={prev}
          disabled={index === 0}
        >
          ‹
        </button>

        {/* Slider */}
        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 280}px)` }}
          >
            {programs.map((p, i) => (
              <div className="program-card" key={i}>
                <img src={p.img} alt={p.title} />
                <div className="program-content">
                  <h4>{p.short}</h4>
                  <h3>{p.title}</h3>
                  <span className="read-more">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="carousel-arrow right"
          onClick={next}
          disabled={index >= programs.length - visibleCards}
        >
          ›
        </button>
      </div>
    </section>
  );
}
