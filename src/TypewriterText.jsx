import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const TypewriterText = ({ words, durations = [], delays = [] }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let masterTl = gsap.timeline().pause();

    words.forEach((word, index) => {
      let tl = gsap.timeline({});
      tl.to(textRef.current, {
        duration: durations[index] || 1,
        text: word,
        delay: delays[index] || 0,
      });
      masterTl.add(tl);
    });

    masterTl.play();
  }, [words, durations, delays]);

  return <span ref={textRef}></span>;
};

export default TypewriterText;