import * as React from "react";
import { motion } from "framer-motion";
import { LanguageContext } from './LanguageContext';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    display: "flex",
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    display: "none",
    transition: {
      y: { stiffness: 1000, velocity: 100 }
    }
  }
};

const labels = {
  EN: ["Home", "About", "Maintenance", "Projects", "Contact"],
  HE: ["Home", "About", "Maintenance", "Projects", "Contact"],
};

const sectionIds = {
  EN: ["home", "about", "maintenances", "projects", "contact"],
  HE: ["home", "about", "projects", "maintenances", "contact"]
};

export const MenuItem = ({ i, closeSidebar }) => {
  const { language } = React.useContext(LanguageContext);
  const currentLabels = language === "EN" ? labels.HE : labels.EN;
  let currentSectionIds = language === "EN" ? sectionIds.HE : sectionIds.EN;

  const isMobile = window.innerWidth <= 768;

  if (isMobile && currentSectionIds[i] === "about") {
    currentSectionIds = [...currentSectionIds]; // Create a copy to avoid mutating the original
    currentSectionIds[i] = "about-mobile"; // Change "about" to "about-mobile" for mobile
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      let offset = 0;
      if (isMobile && ["about", "maintenances", "projects", "about-mobile"].includes(sectionId)) {
        offset = -10 * window.innerHeight / 100; // -10vh on mobile for about, maintenances, projects
      } else if (!isMobile && ["maintenances", "projects"].includes(sectionId)) {
        offset = -10 * window.innerHeight / 100; // -10vh on desktop for maintenances, projects
      }
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      closeSidebar(); // Close sidebar after scrolling
    }
  };

  const h1ClassName = `navigation-menu-text${language === "EN" ? " hebrew-font hebrew-fontweight" : ""}`;

  const handleClick = () => {
    scrollToSection(currentSectionIds[i]);
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <h1 onClick={handleClick} className={h1ClassName}>
        {currentLabels[i]}
      </h1>
    </motion.li>
  );
};


