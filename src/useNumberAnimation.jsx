import { useEffect, useState } from "react";

const useNumberAnimation = (start, end, duration) => {
  const [number, setNumber] = useState(start);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.floor((end - start) * (progress / duration));
      const currentNumber = start + increment;

      if (currentNumber <= end) {
        setNumber(currentNumber);
        requestAnimationFrame(animate);
      } else {
        setNumber(end);
      }
    };

    requestAnimationFrame(animate);

    return () => {}; // Clean up function (optional)
  }, []); // Empty dependency array to run effect only once on mount

  return number;
};

export default useNumberAnimation;