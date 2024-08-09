import * as React from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { LanguageContext } from "./LanguageContext";

export const MenuToggle = ({ toggle }) => {

  const { language, toggleLanguage } = React.useContext(LanguageContext);

  React.useEffect(() => {
    gsap.fromTo(
      ".navigation-left",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1", delay: 2.5 }
    );

  }, [language])

  return (
  <button className="navigation-left" onClick={toggle}>
    <div className="navigation-left-content">
        <span className="navigation-text"><i className="fa-solid fa-bars"></i></span>
        <span className="navigation-text"><i className="fa-solid fa-bars"></i></span>
    </div>
  </button>
  )
};