import React, { useEffect, useRef } from "react";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import TransitionPage from "../TransitionPage"

const Home = () => {

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section1 />
    </>
  );
};

export default TransitionPage(Home);
