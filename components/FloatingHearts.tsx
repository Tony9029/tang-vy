"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Heart = ({
  delay,
  duration,
  size,
  left,
}: {
  delay: number;
  duration: number;
  size: number;
  left: string;
}) => (
  <motion.div
    initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
    animate={{
      y: "-10vh",
      opacity: [0, 0.8, 0.8, 0],
      x: ["0px", "20px", "-20px", "0px"],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="fixed bottom-0 text-pink-300 z-0 pointer-events-none"
    style={{ left: left, fontSize: size }}
  >
    ❤
  </motion.div>
);

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  );
}
