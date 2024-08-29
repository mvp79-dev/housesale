import React, { Suspense, useEffect, useRef, useState, useContext, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import MyLink from "../MyLink";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import TypewriterText from "../TypewriterText";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { motion, useScroll, useTransform } from "framer-motion";
import useSplitTextAnimation from "../useSplitTextAnimation";
import { LanguageContext } from '../LanguageContext';
import Marquee from "react-fast-marquee";
import { useGSAP } from "@gsap/react";

import { Fade } from 'react-slideshow-image';
import '../slideshow.css'

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

export const Section1 = () => {

  const { language } = useContext(LanguageContext);
  const titleRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const navigate = useNavigate();

  const handleNavigateClick = (url) => {
    navigate(url);
  };

  const indicators = (index) => (<div className="indicator">{index + 1}</div>);


  useEffect(() => {
    gsap.fromTo(".introduction-section-title", 
      { opacity: 0, y: isMobile ? 150 : 325, },
      {
      duration: 2,
      y: 0,
      delay: 1.25,
      stagger: 0.1,
      opacity: 1,
      ease: "power4.inOut",
    });
    gsap.fromTo(
      ".introduction-section-description, .introduction-section-description-top, .introduction-mobile-button",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1", delay: 2.5 }
    );
  }, [language]);

  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const imageRef5 = useRef(null);
  const imageRef6 = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate the overlay
    gsap.fromTo(overlayRef.current, 
      { xPercent: 0 },
      { xPercent: -100, duration: 1.5, ease: 'power1.out' }
    );

    // Animate the image
    gsap.fromTo(imageRef.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
    gsap.fromTo(imageRef2.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
    gsap.fromTo(imageRef3.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
    gsap.fromTo(imageRef4.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
    gsap.fromTo(imageRef5.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
    gsap.fromTo(imageRef6.current, 
      { y: '0vw' }, 
      { y: '-10vw', delay: 1.5, duration: 1.5, ease: "power4.inOut", }
    );
  }, { scope: containerRef, dependencies: [language], revertOnUpdate: true });

  const paragraphRefs = useRef([]);

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.about-animate-text');

    paragraphs.forEach(paragraph => {
      const childSplit = new SplitText(paragraph, {
        type: "lines",
        linesClass: "split-child"
      });
    
      // Set initial opacity to 0 for all lines
      gsap.set(childSplit.lines, { opacity: 0 });
    
      ScrollTrigger.create({
        trigger: paragraph,
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(childSplit.lines, 
            { opacity: 0, yPercent: 100 },
            {
              duration: 1,
              opacity: 1,
              yPercent: 0,
              ease: "power4.out",
              stagger: 0.15
            }
          );
        },
        once: true
      });
    }, 1000);
    
    return () => {
      paragraphs.forEach(paragraph => {
        const childSplit = new SplitText(paragraph, { type: "lines" });
        const parentSplit = new SplitText(paragraph, { linesClass: "split-parent" });
        childSplit.revert();
        parentSplit.revert();
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    }, []);

  useSplitTextAnimation("about-me-title");

  useEffect(() => {
    // Reset the opacity when the language changes
    gsap.set(".navigation-top-text-box", { opacity: 0 });

    // Define GSAP animation using ScrollTrigger
    gsap.to(".navigation-top-text-box", {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".about",
        start: "top center",
        toggleActions: "play play none reverse",
      },
    });

    // Cleanup function to kill the ScrollTrigger instance when language changes
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [language]);

  useEffect(() => {
    gsap.to(".introduction-mobile-button-left", {
      left: "-52.5%",
      scrollTrigger: {
        trigger: ".about-content-right",
        start: "center 100%",
        end: "center center",
        scrub: 1,
      }
    });
    gsap.to(".introduction-mobile-button-right", {
      right: "-52.5%",
      scrollTrigger: {
        trigger: ".about-content-right",
        start: "center 100%",
        end: "center center",
        scrub: 1,
      }
    });
  }, [language]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      let offset = -10 * window.innerHeight / 100; // -10vh for all sections
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleClick = (linkUrl) => {
    // Open the specified webpage link in a new tab when carousel-content is clicked
    window.open(linkUrl, '_blank');
  };

  useLayoutEffect(() => {
    gsap.fromTo(
      ".about-content-box", 
      { yPercent: 100, opacity: 0 },  // Initial state
      { 
        yPercent: 0,
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: ".about-content-box",
          start: "top bottom", // start animation when ".about-content-box" enters the viewport
        }
      }
    );
  }, []);


  return (
    <>
        <Link to="/"   onClick={(e) => {e.preventDefault(); window.location.href = '/'; }} className="navigation-top-text" >
          <div className="navigation-top-text-box" >
            <h1 className="navigation-top-text" >STALIK</h1>
            <div className="navigation-top-text-image" >
              <img src="/liranlogonew.png" alt="" />
            </div>
          </div>
        </Link>

    <section className="introduction" id="home">
      <div className="introduction-content">
          <p className="introduction-section-description-top" >Maintenance of luxury homes <br /> and project management.</p>
        <div className="introduction-text-box">
            <h1 className="introduction-section-title" dir="ltr" >LIRAN STALIK</h1>
          
            <h1 className="introduction-section-description" dir="ltr" >Rishpon, Israel</h1>

        </div>
        <div className="introduction-image">
          <div className="overlay" ref={overlayRef} ></div>
          <div className="slide-container" >
            <Fade arrows={ false } autoplay={ true } infinite={ true } duration={ 5000 } transitionDuration={ 1000 } pauseOnHover={ false } >
                <div ref={imageRef} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/savion.JPG" />
                </div>
                <div ref={imageRef2} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/liranstalikhome2.jpg" />
                </div>
                <div ref={imageRef3} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/liranstalikhome3.jpg" />
                </div>
                <div ref={imageRef4} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/liranstalikhome4.jpg" />
                </div>
                <div ref={imageRef5} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/liranstalikhome5.jpg" />
                </div>
                <div ref={imageRef6} >
                  <img style={{ height: isMobile ? "50vh" : "120vh" }} src="/liranstalikhome6.jpg" />
                </div>
            </Fade>
          </div>
        </div>
        {isMobile && (
          <>
          <div className="introduction-mobile-buttons">
            <button className="introduction-mobile-button introduction-mobile-button-left" onClick={() => scrollToSection('projects')} >
                <h1 className="introduction-mobile-buttons-text" >Projects</h1>
            </button>
            <button className="introduction-mobile-button introduction-mobile-button-right" onClick={() => scrollToSection('maintenances')} >
                <h1 className="introduction-mobile-buttons-text" >Maintenance</h1>
            </button>
          </div>
          </>
        )}
        
      </div>
      {/* <div className="marquee-section">
      {language === 'HE' ? (
        <Marquee speed={200}>
          <div className="marquee-row">
            <h1 className="marquee-row-text" >Maintenance of luxury homes and project management</h1>
          </div>
        </Marquee>
      ) : (
        <Marquee speed={200} direction="right">
          <div className="marquee-row-hebrew">
            <h1 className="marquee-row-text marquee-row-text-hebrew hebrew-font hebrew-fontweight" >אחזקת בתי יוקרה וניהול פרויקטים</h1>
          </div>
        </Marquee>
      )}
      </div> */}
    </section>
    <section className="about" id="about">
    <div className="about-content">
        <div className="about-content-left">
        {!isMobile && (
          <>
              <h1 className="about-me-title" dir="ltr" >About Me</h1>
          </>
        )}

            <div className="about-testimonial-box" id="about-mobile" >
              {!isMobile && (
                <>
                  <div className="about-testimonial">
                    <p className="about-testimonial-description about-animate-text" dir="ltr" >Maintaining luxury homes demands attentiveness and a deep understanding of the client's needs. It involves using extensive knowledge to address house-related issues, making smart decisions for regular and preventive maintenance, providing quick solutions to problems, and maintaining strong relationships with service professionals like electricians, plumbers, gardeners, and more staff.</p>
                    {/* <p className="about-testimonial-person-text" >Liran Stalik</p> */}
                  </div>
                </>
              )}
                <h1 className="about-me-title" dir="ltr"  > Testimonials </h1>
                <div className="about-testimonial" id="about" >
                  <p className="about-testimonial-description about-animate-text" dir="ltr" >"Liran Stalik has been managing the maintenance of the Eckerstein house for the Eckerstein Zvi company since July 2015. As part of his role, Liran performs the following works: building maintenance services; ongoing management of the building's systems including: firefighting, electrical systems, plumbing, security, etc; accompanying and supervising adjustment works performed by tenants and for tenants; providing ongoing support to tenants from diverse fields, including high-tech companies that rent space in the building. Liran provided our company with professional services, devotedly handled the inquiries of the various tenants. He has a high sense of service, reliability, and excellent human relations."</p>
                  <p className="about-testimonial-person-text about-animate-text" dir="ltr" >Maya Lipin, Eckerstein Zvi Ltd</p>
                </div>
                <div className="about-testimonials-divider" />
                <div className="about-testimonial" >
                  <p className="about-testimonial-description about-animate-text" dir="ltr" >"In the boutique project on Smuts Boulevard Tel Aviv Liran is responsible for planning the work, defining the amount of construction required, working on the pace of construction and the quality of the construction required. Ordering the materials with the execution team of the finishes in the building and working in cooperation with the work manager and supervision on behalf of the developer. Liran is responsible for approving the bills of materials and manpower on the site. Liran performs his work in a professional manner while investing attention and time with patience and management levels worthy of note, his contribution For the rate of progress, the level of site maintenance and the quality of the works are extremely significant to our company.I greatly appreciated his professionalism, his contribution and his unique human relations."</p>
                  <p className="about-testimonial-person-text about-animate-text" dir="ltr" >Avi Meitav, CEO of Dimension Shivlovim Ltd</p>
                </div>
            </div>
        </div>
        <div className="about-content-right">
        {isMobile && (
          <>
              <div className="about-testimonial-box-mobile">
                <h1 className="about-me-title" dir="ltr" >About Me</h1>
                <p className="about-testimonial-description about-animate-text" dir="ltr" >Maintaining luxury homes demands attentiveness and a deep understanding of the client's needs. It involves using extensive knowledge to address house-related issues, making smart decisions for regular and preventive maintenance, providing quick solutions to problems, and maintaining strong relationships with service professionals like electricians, plumbers, gardeners, and more staff.</p>
                {/* <p className="about-testimonial-person-text about-animate-text" dir="ltr" >Liran Stalik</p> */}
              </div>
          </>
        )}
          <ParallaxProvider>
            <div className="about-content-image-grid">
              <Parallax speed={ -1.5 } >
                <motion.div className="about-image-grid-item-1" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/liranselfie6.jpg" alt="" />
                </motion.div>
              </Parallax>
              <Parallax speed={ -2.5 } >
                <motion.div className="about-image-grid-item-2" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/liranselfie1.png" alt="" />
                </motion.div>
              </Parallax>
              <Parallax speed={ -3.5 } >
                <motion.div className="about-image-grid-item-3" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/liranselfie7.jpg" alt="" />
                </motion.div>
              </Parallax>
              <Parallax speed={ -4.5 } >
                <motion.div className="about-image-grid-item-4" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/liranselfie5.jpg" alt="" />
                </motion.div>
              </Parallax>
              <Parallax speed={ -1.5 } >
                <motion.div className="about-image-grid-item-5" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/new.jpg" alt="" />
                </motion.div>
              </Parallax>
              <Parallax speed={ -2.5 } >
                <motion.div className="about-image-grid-item-6" animate={{ rotate: 0 }} whileHover={{ scale: 1.5, rotate: 5 }} transition={{ type: "spring", stiffness: 250, damping: 13 }} >
                  <img className="image-inside" src="/liranselfie9.jpg" alt="" />
                </motion.div>
              </Parallax>
            </div>
          </ParallaxProvider>
        </div>
      </div>
      <div className="about-content-bottom">

        <div className="about-content-box" >
          <h1 className="about-content-box-number" >20+</h1>
          <div className="about-box-row">
            <div className="about-box-bullet-point " />
            <p className="about-row-box-description" >Years of experience</p>
          </div>
        </div>

        <div className="about-content-box" >
          <h1 className="about-content-box-number" >100+</h1>
          <div className="about-box-row">
            <div className="about-box-bullet-point" />
            <p className="about-row-box-description" >Home Projects</p>
          </div>
        </div>

        <div className="about-content-box" >
          <h1 className="about-content-box-number" >30+</h1>
          <div className="about-box-row">
            <div className="about-box-bullet-point" />
            <p className="about-row-box-description" >Maintained homes</p>
          </div>
        </div>

      </div>
    </section>
    <section className="projects-section">
      
      <div className="projects-section-content" id="maintenances" >

          <h1 className="about-me-title" dir="ltr" >Maintenance</h1>

        <div className="projects-section-container">
          
          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/modern-house-savyon')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/houseinsavion.jpeg" alt="Project 1" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" dir="ltr" >Modern House, Savyon</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          {/* <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/country-house-kfar-shmariahu')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/country.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Country House, Kfar Shmariahu</p>
                </div>
              </div>
            </div>
          </ParallaxProvider> */}

          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/modern-home-kfar-shamariah')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/modern1.jpg" alt="Project 2" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Modern Home, Kfar Shamariah</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/penthouse-petah-tikva')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/pnew4.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Penthouse, Petah Tikva</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/modern-home-herzliya-pituach')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/pituach1.jpeg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Modern Home, Herzliya Pituach</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          {/* <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/penthouse-tel-aviv')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/t2.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Penthouse, Tel Aviv</p>
                </div>
              </div>
            </div>
          </ParallaxProvider> */}

        </div>
      </div>

      <div className="projects-section-content" id="projects" >

          <h1 className="about-me-title" dir="ltr" >Project Management</h1>

        <div className="projects-section-container">

        <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/modern-home-raanana')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/raanana5.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Modern Home, Raanana</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/villa-nes-ziona')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/villabefore5.jpeg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Villa, Nes Ziona</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          <ParallaxProvider>
            <div className="project" onClick={() => handleNavigateClick('/modern-apartment-jerusalem')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/abefore2.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Modern Apartment, Jerusalem</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

          <ParallaxProvider>
            <div className={`project ${language === 'EN' ? '' : ''}`} onClick={() => handleNavigateClick('/magical-house')} >
              <div className="project-image">
                <Parallax speed={ isMobile ? -3 : -7 }>
                  <img src="/magical3.jpg" alt="Project 3" />
                </Parallax>
              </div>
              <div className="project-text-container">
                <div className="project-text-container-title">
                  <p className="project-text-title" >Magical House</p>
                </div>
              </div>
            </div>
          </ParallaxProvider>

        </div>
      </div>

    </section>
    <section className="footer" id="contact">
      <div className="footer-content">
        <div className="brands-icon-box" onClick={() => handleClick('https://www.instagram.com/lira.nstalik')} >
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div className="brands-icon-box" onClick={() => handleClick('https://api.whatsapp.com/send?phone=972528828210')} >
          <i class="fa-brands fa-whatsapp"></i>
        </div>
        <div className="brands-icon-box" onClick={() => handleClick('https://www.facebook.com/LiranStalik/')} >
          <i class="fa-brands fa-facebook"></i>
        </div>
      </div>
        <div className="footer-text-image-box" >
          <p className="footer-text" >STALIK</p>
          <img className="footer-text-image-img" src="/l2.png" alt="" />
        </div>
    </section>
    </>
  );
};



