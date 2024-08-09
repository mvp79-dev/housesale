import { useContext, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageContext } from './LanguageContext';

// Register the plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const useSplitTextAnimation = (className, options = {}) => {
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const elements = document.querySelectorAll(`.${className}`);

    elements.forEach((element) => {
      const split = new SplitText(element, { type: "words,chars" });

      gsap.from(split.chars, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: "back.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // Adjust start point as needed
          ...options.scrollTrigger
        },
        ...options.gsap
      });

      return () => split.revert();
    });
  }, [className, options]);
};

export default useSplitTextAnimation;