import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CatCard({ cat, onSwipe, isVisible, zIndex }) {
  const [isDragging, setIsDragging] = useState(false);

  // Track drag position
  const x = useMotionValue(0);

  // Rotate ikut kiri/kanan (macam pokok bergoyang)
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);

  // Untuk control opacity circle + icon
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      onSwipe("like"); // Swipe kanan = Like
    } else if (info.offset.x < -threshold) {
      onSwipe("dislike"); // Swipe kiri = Dislike
    } else {
      setIsDragging(false); // Balik tengah
    }
  };

  return (
    <motion.div
      className="cat-card-container"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        x,
        rotate,
        transformOrigin: "bottom center", // bawah still stay
        position: "absolute",
        width: "300px",
        height: "400px",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        background: "#fff",
        cursor: "grab",
        display: isVisible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: zIndex,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      animate={{
        opacity: isDragging ? 0.9 : 1,
        scale: isDragging ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* LIKE (Green Circle + Heart) */}
      <motion.div
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "rgba(76, 175, 80, 0.85)", // Green circle
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: likeOpacity,
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          transform: "rotate(-10deg)",
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            color: "white", // Tukar ke #000 kalau nak hitam
            fontSize: 28,
          }}
        />
      </motion.div>

      {/* DISLIKE (Red Circle + X) */}
      <motion.div
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "rgba(255, 77, 77, 0.85)", // Red circle
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: dislikeOpacity,
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          transform: "rotate(10deg)",
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          style={{
            color: "white", // Tukar ke #000 kalau nak hitam
            fontSize: 28,
          }}
        />
      </motion.div>

      {/* Cat Image */}
      <motion.img
        src={cat}
        alt="cat"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
        drag={false}
      />
    </motion.div>
  );
}
