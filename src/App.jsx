import React, { useCallback, useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import { Navigation } from "./Navigation";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Contact from "./Contact"
import { AnimatePresence } from "framer-motion";
import Home from "./HomeGroup/Home"
import House1 from "./HouseGroup/House1";
import House2 from "./HouseGroup/House2";
import House3 from "./HouseGroup/House3";
import House4 from "./HouseGroup/House4";
import House5 from "./HouseGroup/House5";
import House6 from "./HouseGroup/House6";
import House7 from "./HouseGroup/House7";
import House8 from "./HouseGroup/House8";
import House9 from "./HouseGroup/House9";
import House10 from "./HouseGroup/House10";
import House11 from "./HouseGroup/House11";
import House12 from "./HouseGroup/House12";
import House13 from "./HouseGroup/House13";
import About from "./About";
import { LanguageProvider } from './LanguageContext';
import House14 from "./HouseGroup/House14";
import House15 from "./HouseGroup/House15";

function isMobile() {
  return window.innerWidth <= 768; // Adjust the width threshold as needed
}

function LenisWrapper({ children }) {
  const [lenis, setLenis] = useState(null);

  const raf = useCallback(
    (time) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    },
    [lenis]
  );

  useEffect(() => {
    if (!lenis) {
      const newLenis = new Lenis();
      newLenis.stop(); // Stop Lenis initially
      setLenis(newLenis);

      // Add class to body to keep scrollbar visible
      document.body.classList.add('scrollbar-visible');
      document.body.style.overflow = 'hidden';

      // Apply padding on non-mobile devices
      if (!isMobile()) {
        document.body.style.paddingRight = '10px'; // Adjust padding to account for scrollbar width
      }

      // Re-enable scrolling after 2 seconds
      setTimeout(() => {
        newLenis.start();
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px'; // Reset padding
      }, 1500);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
    };
  }, [lenis, raf]);

  return <>{children}</>;
}

function App() {

    const location = useLocation();

  

  return (
      <>
      <LanguageProvider>

        <Navigation />

        <AnimatePresence mode="wait" >
          <LenisWrapper key={location.pathname} >
          <Routes location={location} key={location.pathname} >
            <Route index element={ <Home /> } />
            <Route path="/modern-house-savyon" element={ <House1 /> } />
            <Route path="/modern-home-kfar-shamariah" element={ <House2 /> } />
            <Route path="/penthouse-petah-tikva" element={ <House3 /> } />
            <Route path="/country-house-kfar-shmariahu" element={ <House4 /> } />
            <Route path="/villa-in-the-vigna" element={ <House5 /> } />
            <Route path="/spring-level-apartment" element={ <House6 /> } />
            <Route path="/modern-home-raanana" element={ <House7 /> } />
            <Route path="/villa-nes-ziona" element={ <House8 /> } />
            <Route path="/modern-apartment-jerusalem" element={ <House9 /> } />
            <Route path="/modern-home-kfar-shmariahu-rishpon" element={ <House10 /> } />
            <Route path="/apartment-on-the-beach-herzliya" element={ <House11 /> } />
            <Route path="/magical-house" element={ <House12 /> } />
            <Route path="/modern-home-herzliya-pituach" element={ <House13 /> } />
            <Route path="/penthouse-tel-aviv" element={ <House14 /> } />
            <Route path="/beach-penthouse-tel-aviv" element={ <House15 /> } />
            <Route path="/about" element={ <About /> } />
          </Routes>
          </LenisWrapper>
        </AnimatePresence>

        </LanguageProvider>
      </>
  );
}

export default App;