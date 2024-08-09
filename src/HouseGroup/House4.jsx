import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import TransitionPage from "../TransitionPage"
import { motion } from "framer-motion";
import useNumberAnimation from "../useNumberAnimation";
import { LanguageContext } from '../LanguageContext';

const House4 = () => {

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
      }, []);

    const navigate = useNavigate();

    const handleNavigateClick = (linkUrl) => {
      navigate(linkUrl);
    };

    const sqmNumber = useNumberAnimation(0, 550, 1000); // Start from 0, animate to 400 over 1 second
    const roomsNumber = useNumberAnimation(0, 8, 800);

    const { language } = useContext(LanguageContext);

  return (
    <>
    <section className="home-overlay">
        <div className="home-overlay-content-top">
        <div className="home-overlay-close" onClick={() => handleNavigateClick('/')}>
            <div className="home-overlay-close-content">
                <span className="navigation-text"><i className="fa-solid fa-x"></i></span>
                <span className="navigation-text"><i className="fa-solid fa-x"></i></span>
            </div>
        </div>
        <div className="home-overlay-left" >
        <img  src="/country1.jpg" />
        </div>
        <div className="home-overlay-right">
            <div className="home-overlay-right-top">
                    <h1 className="home-overlay-right-title" >Country House, Kfar Shmariahu</h1>
            </div>
            <div className="home-overlay-right-bottom">
                <div className="home-overlay-bottom-left">
                        <h1 className="home-overlay-bottom-text" >{sqmNumber}+ sqm</h1>
                </div>
                <div className="home-overlay-bottom-right">
                        <h1 className="home-overlay-bottom-text" >{roomsNumber} Rooms</h1>
                </div>
            </div>
        </div>
        </div>
        <div className="home-overlay-content-bottom">
            <div className="home-overlay-content-bottom-row">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country8.jpg" alt="" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country3.jpg" alt="" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country4.jpg" alt="" />
                </motion.div>
            </div>
            <div className="home-overlay-content-bottom-row">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country5.jpg" alt="" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country6.jpg" alt="" />
                </motion.div>
            </div>
            <div className="home-overlay-content-bottom-row">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 2 } }} viewport={{ once: true }} className="home-overlay-bottom-image">
                    <img src="/country7.jpg" alt="" />
                </motion.div>
            </div>
        </div>
    </section>
    </>
  );
};

export default TransitionPage(House4);