import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Nav } from "./Nav";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from './LanguageContext';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0px at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2
    }
  }
};


export const Navigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const location = useLocation();
  const [isLanguageToggled, setLanguageToggled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [location.pathname]);

  const closeSidebar = () => {
    if (isOpen) {
      toggleOpen();
    }
  };

  const handleLanguageToggle = () => {
    setLanguageToggled(!isLanguageToggled);
  };

  const { language, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    gsap.fromTo(
      ".navigation-language",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1", delay: 2.5 }
    );

  }, [language]);

  return (
    <>

    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar} />
      <Nav isOpen={isOpen} closeSidebar={closeSidebar} />
      <MenuToggle toggle={() => toggleOpen()} />
      {/* <button className="navigation-language" onClick={toggleLanguage} >
        <div className="navigation-left-content">
          {language === 'HE' ? (
            <span className="navigation-text hebrew-font" dir="rtl"> עִברִית </span>
          ) : (
            <span className="navigation-text" dir="ltr"> ENG </span>
          )}
          {language === 'HE' ? (
            <span className="navigation-text hebrew-font" dir="rtl"> עִברִית </span>
          ) : (
            <span className="navigation-text" dir="ltr"> ENG </span>
          )}
      </div>
      </button> */}
    </motion.nav>
    </>
  );
};
