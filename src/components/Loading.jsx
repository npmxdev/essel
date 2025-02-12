import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) =>
        oldProgress >= 100 ? 100 : oldProgress + 10
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100 relative overflow-hidden">
      {/* Floating Hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -300 }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 2 + 1}rem`,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Loading Content */}
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-red-500 animate-pulse">
          Loading...
        </h1>
        <p className="text-lg text-pink-700 mt-2">Happy Valentine's Day My Essel 💕</p>

        {/* Progress Bar */}
        <div className="mt-6 w-64 h-3 bg-pink-300 rounded-full relative overflow-hidden">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Flowers Decoration */}
        <div className="flex mb-0 bottom-10 justify-center items-center gap-3">
          <span className="text-pink-500 text-3xl">🌸</span>
          <span className="text-red-400 text-3xl">🌹</span>
          <span className="text-pink-500 text-3xl">🌼</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
