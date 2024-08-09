import React, { useEffect, useRef } from "react";
import TransitionPage from "./TransitionPage";
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

const About = () => {

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
      }, []);
      
  const imagesRef = useRef([]);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const images = imagesRef.current;

    const setInitialPositions = (isDesktop) => {
      if (isDesktop) {
        gsap.set(images[0], { x: "-30%", y: "-10%" });
        gsap.set(images[1], { x: "30%", y: "-10%" });
        gsap.set(images[2], { x: "-30%", y: "10%" });
        gsap.set(images[3], { x: "30%", y: "10%" });
      } else {
        gsap.set(images[0], { x: "-30%", y: "-20%" });
        gsap.set(images[1], { x: "30%", y: "-20%" });
        gsap.set(images[2], { x: "-30%", y: "20%" });
        gsap.set(images[3], { x: "30%", y: "20%" });
      }
    };

    const animateImages = (isDesktop) => {
      const tl = gsap.timeline();
      if (isDesktop) {
        tl.to(images[0], { x: "-135%", y: "-50%", delay: 0.5, duration: 1.25, ease: "power2.inOut" })
          .to(images[1], { x: "135%", y: "-60%", delay: 0.5, duration: 1.5, ease: "power2.inOut" }, 0)
          .to(images[2], { x: "-135%", y: "60%", delay: 0.5, duration: 1.75, ease: "power2.inOut" }, 0)
          .to(images[3], { x: "135%", y: "60%", delay: 0.5, duration: 2, ease: "power2.inOut" }, 0);
      } else {
        tl.to(images[0], { x: "-40%", y: "-115%", delay: 0.5, duration: 1.5, ease: "power2.inOut" })
          .to(images[1], { x: "40%", y: "-115%", delay: 0.5, duration: 1.5, ease: "power2.inOut" }, 0)
          .to(images[2], { x: "-40%", y: "115%", delay: 0.5, duration: 1.5, ease: "power2.inOut" }, 0)
          .to(images[3], { x: "40%", y: "115%", delay: 0.5, duration: 1.5, ease: "power2.inOut" }, 0);
      }
    };

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 800;
      setInitialPositions(isDesktop);
      animateImages(isDesktop);
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(titleRef.current, { type: "words,chars" });

    gsap.set(titleRef.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top bottom",
      onEnter: () => {
        gsap.to(titleRef.current, { opacity: 1, duration: 0.5 });
        gsap.from(split.chars, {
          duration: 0.5,
          opacity: 0,
          y: 50,
          stagger: 0.1,
          ease: "back.out",
        });
    },
    once: true
  });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    paragraphRefs.current.forEach(paragraph => {
      const childSplit = new SplitText(paragraph, {
        type: "lines",
        linesClass: "split-child"
      });
      const parentSplit = new SplitText(paragraph, {
        linesClass: "split-parent"
      });

      gsap.set(paragraph, { opacity: 0 });

      ScrollTrigger.create({
        trigger: paragraph,
        start: "top 90%",
        onEnter: () => {
          gsap.to(paragraph, { opacity: 1, duration: 0.1 });
          gsap.from(childSplit.lines, {
            duration: 1,
            yPercent: 100,
            ease: "power4",
            stagger: 0.15
          });
        },
        once: true
      });
    });

    return () => {
      paragraphRefs.current.forEach(paragraph => {
        const childSplit = new SplitText(paragraph, { type: "lines" });
        const parentSplit = new SplitText(paragraph, { linesClass: "split-parent" });
        childSplit.revert();
        parentSplit.revert();
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <>
    <section className="about-top-section">
      <div className="about-top-section-content">
        <img ref={(el) => imagesRef.current[0] = el} src="/liran2.png" className="about-top-section-image-small about-top-section-image-zindex-2" alt="soda1" />
        <img ref={(el) => imagesRef.current[1] = el} src="/liran3.png" className="about-top-section-image-small" alt="soda2" />
        <img ref={(el) => imagesRef.current[2] = el} src="/liran3.png" className="about-top-section-image-small" alt="soda3" />
        <img ref={(el) => imagesRef.current[3] = el} src="/liran2.png" className="about-top-section-image-small about-top-section-image-zindex-2" alt="soda4" />
        <img ref={(el) => imagesRef.current[4] = el} src="/liran.png" className="about-top-section-image-big" alt="soda5" />
      </div>
    </section>
    <section className="about-bottom-section" >
        <div className="about-bottom-section-content">
            <div className="about-bottom-section-left">
                <h1 className="projects-section-title" ref={titleRef} >About Me</h1>
                <p className="home-overlay-right-description" ref={(el) => paragraphRefs.current[0] = el}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum facilisis leo vel fringilla est. Fames ac turpis egestas maecenas pharetra convallis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Scelerisque viverra mauris in aliquam sem fringilla. Mauris in aliquam sem fringilla. Accumsan in nisl nisi scelerisque.</p>
                <p className="home-overlay-right-description" ref={(el) => paragraphRefs.current[1] = el}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum facilisis leo vel fringilla est. Fames ac turpis egestas maecenas pharetra convallis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Scelerisque viverra mauris in aliquam sem fringilla. Mauris in aliquam sem fringilla. Accumsan in nisl nisi scelerisque.</p>
                <p className="home-overlay-right-description" ref={(el) => paragraphRefs.current[2] = el}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum facilisis leo vel fringilla est. Fames ac turpis egestas maecenas pharetra convallis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Scelerisque viverra mauris in aliquam sem fringilla. Mauris in aliquam sem fringilla. Accumsan in nisl nisi scelerisque.</p>
            </div>
            <div className="about-bottom-section-right">
                <div className="follow-box">
                    <h1 className="follow-box-title" >Follow Me</h1>
                    <div className="follow-box-icons">
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-youtube"></i>
                        <i class="fa-brands fa-twitter"></i>
                    </div>
                </div>
                <div className="contact-me-box">
                    <h1 className="contact-me-title" >Contact Me</h1>
                    <p className="home-overlay-right-description contact-me-description" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                    <div className="contact-me-box-button">
                        <h1 className="send-email-text" >Send Email</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};

export default TransitionPage(About);
