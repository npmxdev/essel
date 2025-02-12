import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LoadingScreen from './components/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loading screen after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {/* Background Grid Effect */}
      <div className="absolute -z-10 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
          [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
      </div>

      {/* Show Loading Screen for 5 Seconds */}
      {isLoading ? <LoadingScreen /> : <Hero />}
    </div>
  );
};

export default App;
