import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchCatImages } from "./api";
import CatCard from "./CatCard";
import "./App.css";

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(null);

  const [showTutorial, setShowTutorial] = useState(null);

  const [modalCat, setModalCat] = useState(null);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorialSeen");
    setShowTutorial(!tutorialSeen);
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  useEffect(() => {
    const loadCats = async () => {
      setIsLoading(true);
      const images = await fetchCatImages();

      await Promise.all(
        images.map(
          (url) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = url;
              img.onload = resolve;
              img.onerror = reject;
            })
        )
      );

      setCats(images);
      setIsLoading(false);
    };

    loadCats();
  }, []);

  const handleSwipe = (action) => {
    setActiveButton(action);

    if (action === "like") {
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
    }

    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => setActiveButton(null), 300);
  };

  const hasMoreCats = currentIndex < cats.length;

  return (
    <div className="app-root">
      {/* Header */}
      <header className="header">
        <h1 className="title">
          Meow
          <img
            src={`${import.meta.env.BASE_URL}paw.png`}
            alt="paw icon"
            className="paw-icon"
          />
          Match
        </h1>
      </header>

      <div className="app-wrapper">
        {/* Tutorial Overlay */}
        {showTutorial && (
          <div className="tutorial-overlay">
            <div className="tutorial-box">
              <div className="tutorial-icon">🐾</div>
              <h2 className="tutorial-title">Welcome to MeowMatch!</h2>
              <p className="tutorial-text">
                Swipe <span className="like-text">RIGHT</span> to Like ❤️ <br />
                Swipe <span className="dislike-text">LEFT</span> to Dislike ❌
              </p>
              <button className="tutorial-btn" onClick={handleCloseTutorial}>
                Got it
              </button>
            </div>
          </div>
        )}

        <div className="app-container">
          {isLoading ? (
            <div className="loading">
              <img
                src={`${import.meta.env.BASE_URL}meow.gif`}
                alt="Loading cats..."
                className="loading-gif"
              />
              <p
                style={{ fontSize: "17px", fontWeight: "bold", color: "#000" }}
              >
                Loading cutest meowws for you...
              </p>
            </div>
          ) : (
            <>
              <div className="card-stack">
                {cats.map((cat, index) => (
                  <CatCard
                    key={cat}
                    cat={cat}
                    onSwipe={handleSwipe}
                    onDragMove={setActiveButton}
                    isVisible={index >= currentIndex}
                    zIndex={cats.length - index}
                  />
                ))}

                {!hasMoreCats && (
                  <div className="finished">
                    <div style={{ textAlign: "center", lineHeight: "1.3" }}>
                      <h2 style={{ margin: "10px 0" }}>Here is your Meows! 😺</h2>
                      <p style={{ margin: "4px 0" }}>
                        You liked {likedCats.length} meows.
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          margin: "2px 0",
                        }}
                      >
                        (You can click your meows.)
                      </p>
                    </div>

                    {/* Liked cats thumbnails */}
                    <div className="liked-cats-grid">
                      {likedCats.map((cat, index) => (
                        <img
                          key={index}
                          src={cat}
                          alt={`Liked cat ${index + 1}`}
                          className="liked-cat"
                          onClick={() => setModalCat(cat)}
                        />
                      ))}
                    </div>

                    <button
                      onClick={async () => {
                        setIsLoading(true);
                        const images = await fetchCatImages();

                        await Promise.all(
                          images.map(
                            (url) =>
                              new Promise((resolve, reject) => {
                                const img = new Image();
                                img.src = url;
                                img.onload = resolve;
                                img.onerror = reject;
                              })
                          )
                        );

                        setCats(images);
                        setCurrentIndex(0);
                        setLikedCats([]);
                        setIsLoading(false);
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
                  <button
                    className={`circle-btn dislike-btn ${
                      activeButton === "dislike" ? "active" : ""
                    }`}
                    onClick={() => handleSwipe("dislike")}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>

                  <button
                    className={`circle-btn like-btn ${
                      activeButton === "like" ? "active" : ""
                    }`}
                    onClick={() => handleSwipe("like")}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Tutorial Button */}
        {!showTutorial && (
          <button
            className="tutorial-btn-floating"
            onClick={() => setShowTutorial(true)}
          >
            Tutorial ?
          </button>
        )}

        {/* Modal for liked cat */}
        {modalCat && (
          <div className="modal-overlay" onClick={() => setModalCat(null)}>
            <img src={modalCat} alt="Large cat" className="modal-cat" />
          </div>
        )}
      </div>
    </div>
  );
}