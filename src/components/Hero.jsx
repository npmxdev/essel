import { useState, useMemo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const images = Array.from({ length: 81 }, (_, i) => ({
  type: "image",
  src: `/img_${String(i + 1).padStart(2, "0")}.JPG`,
}));

const messages = [
  "Love will keep us alive ❤️", // The Eagles - Love Will Keep Us Alive
  "Nothing's gonna change my love for you 💖", // George Benson - Nothing's Gonna Change My Love for You
  "You're still the one I run to 😊", // Shania Twain - You're Still the One
  "Endless love, forever you and me 💕", // Lionel Richie & Diana Ross - Endless Love
  "You're the sunshine of my life ☀️", // Stevie Wonder - You Are the Sunshine of My Life
  "All of me loves all of you 💗", // John Legend - All of Me
  "I could stay awake just to hear you breathing 🌙", // Aerosmith - I Don't Want to Miss a Thing
  "Take my hand, take my whole life too 💞", // Elvis Presley - Can't Help Falling in Love
  "You are the best thing that's ever been mine 🎶", // Taylor Swift - Mine
];

const mixImagesAndTexts = (images, messages) => {
  let combined = [...images];
  messages.forEach((msg) => {
    const randomIndex = Math.floor(Math.random() * combined.length);
    combined.splice(randomIndex, 0, { type: "text", message: msg });
  });
  return combined;
};

export default function Hero() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Memoizing items to prevent re-renders
  const items = useMemo(() => mixImagesAndTexts(images, messages), []);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      offset: 100, // Offset (px) before animation starts
      easing: "ease-in-out", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mea-culpa font-bold text-center text-red-600 mb-6">
        JesMin
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[150px]">
        {items.map((item, index) =>
          item.type === "image" ? (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-lg shadow-lg ${
                index % 3 === 0 ? "row-span-2" : "row-span-1"
              }`}
            >
              <img
                src={item.src}
                alt={`Valentine ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImage(item.src)}
              />
            </div>
          ) : (
            <div
              key={index}
              className="flex items-center justify-center text-center bg-white p-4 rounded-lg shadow-lg text-red-600 font-semibold text-lg"
            >
              {item.message}
            </div>
          )
        )}
      </div>

      {/* Render modal only when needed */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      >
        <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" className="w-full rounded-lg" />
          )}
        </div>
      </Dialog>
    </div>
  );
}
