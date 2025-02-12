import { useState, useMemo, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { X, Play, Pause } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const images = Array.from({ length: 81 }, (_, i) => ({
  type: "image",
  src: `/img_${String(81 - i).padStart(2, "0")}.JPG`, // Start from 81 down to 1
}));

const messages = [
  "Kapag magulo na ang mundo ikaw ang payapang hinahanap-hanap ko ❤️",
  "Tumakbo ka rin patungo sa'kin kapag bumibigat na ang iyong dibdib 💖",
  "Laman ka ng bawat panalangin 😊",
  "Ikaw ang pahinga sa bawat sandali 💕",
  "Patungo sa'yo ang aking tinig 💗",
  "Iisa lang ang sinasabi ng pintig 🌙",
  "Sa isang sulyap mo lang tila ako'y hagkan mo na at ang mundo'y gumagaan 💞",
];

const mixItems = (images, messages) => {
  let combined = [...images];
  messages.forEach((msg) => {
    const randomIndex = Math.floor(Math.random() * combined.length);
    combined.splice(randomIndex, 0, { type: "text", message: msg });
  });
  combined.splice(5, 0, { type: "music" }); // Insert the music player at index 5
  return combined;
};

export default function Hero() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const items = useMemo(() => mixItems(images, messages), []);

  useEffect(() => {
    AOS.init({ duration: 1200, offset: 100, easing: "ease-in-out", once: true });
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mea-culpa font-bold text-center text-red-600 mb-6">JesMin</h1>
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
          ) : item.type === "text" ? (
            <div key={index} className="flex items-center justify-center text-center bg-white p-4 rounded-lg shadow-lg text-red-600 font-semibold text-lg">
              {item.message}
            </div>
          ) : (
            <div key={index} className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-lg shadow-lg text-white font-semibold text-lg">
              <p className="mb-2 text-center">"Sa Bawat Sandali"</p>
              <button
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 flex items-center justify-center"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <audio ref={audioRef} src="/bg.mp3" />
            </div>
          )
        )}
      </div>

      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-md">
          <button className="absolute top-2 right-2 text-red-500 hover:text-gray-700" onClick={() => setSelectedImage(null)}>
            <X size={24} />
          </button>
          {selectedImage && <img src={selectedImage} alt="Selected" className="w-full rounded-lg" />}
        </div>
      </Dialog>
    </div>
  );
}
