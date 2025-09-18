import React, { useEffect, useState } from "react";
import { fetchCatImages } from "./api";
import CatCard from "./CatCard";
import "./App.css";

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCats = async () => {
      const images = await fetchCatImages();
      setCats(images);
      setIsLoading(false);
    };
    loadCats();
  }, []);

  const handleSwipe = (action) => {
    if (action === "like") {
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (isLoading) {
    return <div className="loading">Loading cats...</div>;
  }

  const hasMoreCats = currentIndex < cats.length;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="card-stack">
          {cats.map((cat, index) => (
            <CatCard
              key={cat}
              cat={cat}
              onSwipe={handleSwipe}
              isVisible={index === currentIndex}
              zIndex={cats.length - index} // bagi card bawah tak cover atas
            />
          ))}

          {!hasMoreCats && (
            <div className="finished">
              <h2>All cats viewed! 😺</h2>
              <p>You liked {likedCats.length} cats.</p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setLikedCats([]);
                }}
                className="restart-btn"
              >
                Restart
              </button>
            </div>
          )}
        </div>

        {hasMoreCats && (
          <div className="buttons">
            <button className="dislike-btn" onClick={() => handleSwipe("dislike")}>
              ❌ Dislike
            </button>
            <button className="like-btn" onClick={() => handleSwipe("like")}>
              ❤️ Like
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
