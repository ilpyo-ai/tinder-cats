import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function CatCard({ cat, onSwipe, isVisible, zIndex }) {
  const [isDragging, setIsDragging] = useState(false);

  // Track X position
  const x = useMotionValue(0);

  // Rotate ikut drag kiri/kanan
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      onSwipe("like"); // Swipe kanan
    } else if (info.offset.x < -threshold) {
      onSwipe("dislike"); // Swipe kiri
    } else {
      setIsDragging(false); // Balik ke tengah
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
        transformOrigin: "bottom center", // bawah tetap tengah
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
