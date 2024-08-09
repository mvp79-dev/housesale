import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

const useAnimateText = (textSelector) => {
  useEffect(() => {
    function animateText(selector) {
      document.querySelectorAll(selector).forEach((element) => {
        gsap.set(element, {
          transformPerspective: 500,
          transformOrigin: 'center bottom',
          rotationX: 70,
        });

        let mySplitText = new SplitText(element, { type: 'chars' });
        let chars = mySplitText.chars;

        gsap.fromTo(
          element,
          {
            rotationX: 70,
            opacity: 0,
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'back.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 100%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.from(chars, {
          yPercent: 50,
          stagger: 0.03,
          // stagger: {
          //   each: 0.03, // Adjusted stagger for smoother animation
          //   ease: 'power1.out', // Added ease for each stagger
          // },
          opacity: 0,
          ease: 'power1.out',
          duration: 0.5,
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        });

        // gsap.fromTo(
        //   element,
        //   {
        //     opacity: 0,
        //   },
        //   {
        //     opacity: 1,
        //     ease: 'none',
        //     scrollTrigger: {
        //       trigger: element,
        //       start: 'top 100%',
        //       end: 'top 60%',
        //       scrub: true,
        //       toggleActions: 'play reverse play reverse',
        //     },
        //   }
        // );

        // gsap.fromTo(
        //   element,
        //   {
        //     opacity: 1,
        //   },
        //   {
        //     opacity: 0,
        //     ease: 'none',
        //     scrollTrigger: {
        //       trigger: element,
        //       start: 'top 20%',
        //       end: 'top 5%',
        //       scrub: true,
        //       toggleActions: 'play reverse play reverse',
        //     },
        //   }
        // );


      });
    }

    // Apply animation to all elements with the given selector
    animateText(textSelector);

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [textSelector]);
};

const useAnimateTextDelay = (textSelector) => {
  useEffect(() => {
    function animateTextDelay(selector) {
      document.querySelectorAll(selector).forEach((element) => {
        gsap.set(element, {
          transformPerspective: 500,
          transformOrigin: 'center bottom',
          rotationX: 70,
        });

        let mySplitText = new SplitText(element, { type: 'chars' });
        let chars = mySplitText.chars;

        gsap.fromTo(
          element,
          {
            rotationX: 70,
            opacity: 0,
          },
          {
            rotationX: 0,
            opacity: 1,
            delay: 0.6,
            duration: 1.25,
            ease: 'back.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 50%',
              toggleActions: 'play none none reset',
            },
          }
        );

        gsap.from(chars, {
          yPercent: 50,
          stagger: 0.03,
          delay: 0.6,
          opacity: 0,
          ease: 'power1.out',
          duration: 0.5,
          scrollTrigger: {
            trigger: element,
            start: 'top 50%',
            toggleActions: 'play none none reset',
          },
        });

      });
    }

    // Apply animation to all elements with the given selector
    animateTextDelay(textSelector);

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [textSelector]);
};

const useSmallTextAnimation = (textSelector) => {
  useEffect(() => {
    function smallTextAnimation(selector) {
      document.querySelectorAll(selector).forEach((element) => {

        let mySplitText = new SplitText(element, { type: 'chars' });
        let chars = mySplitText.chars;

        gsap.from(chars, {
          ease: "power3.out",
          duration: 1,
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });


      });
    }

    // Apply animation to all elements with the given selector
    smallTextAnimation(textSelector);

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [textSelector]);
};

const RotatingHeader = ({ text, hoverTargetRef }) => {
  const headerRef = useRef(null);
  const headerTextRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const headerText = headerTextRef.current;
    const hoverTarget = hoverTargetRef.current;
    const original = header.querySelector("h1");
    const tl = gsap.timeline({ paused: true });

    // Clone the original h1 tag
    const clone = original.cloneNode(true);
    header.appendChild(clone);
    gsap.set(clone, { yPercent: -100 });

    // Split text of original and clone into characters
    const originalSplit = SplitText.create(original, { type: "chars" });
    const cloneSplit = SplitText.create(clone, { type: "chars" });

    // Initial position of clones
    gsap.set(cloneSplit.chars, { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -20" });

    // Build animations
    const duration = 0.4;
    const stagger = { each: 0.02, ease: "fade", from: "start" };

    tl.to(originalSplit.chars, { duration: duration, rotationX: 90, transformOrigin: "50% 50% -20", stagger: { each: 0.0125, ease: "none", from: "start" } });
    tl.to(originalSplit.chars, { duration: duration, opacity: 0, stagger: stagger, ease: "power3" }, 0);

    tl.to(cloneSplit.chars, { duration: 0.05, stagger: stagger }, 0.001);
    tl.to(cloneSplit.chars, { duration: 0.25, opacity: 1, ease: "none", stagger: 0.025 }, 0.001);
    tl.to(cloneSplit.chars, { duration: duration, rotationX: 0, stagger: stagger }, 0);

    // Hover effect: play timeline on mouseenter and reverse on mouseleave
    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    hoverTarget.addEventListener("mouseenter", handleMouseEnter);
    hoverTarget.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup listeners
    return () => {
      hoverTarget.removeEventListener("mouseenter", handleMouseEnter);
      hoverTarget.removeEventListener("mouseleave", handleMouseLeave);
    };

  }, [text, hoverTargetRef]);

  return (
    <div className="rotatingHeader" ref={headerRef}>
      <h1 ref={headerTextRef}>{text}</h1>
    </div>
  );
};

const useTextEffect = (textSelector) => {
  useEffect(() => {
    function textEffect(selector) {
      document.querySelectorAll(selector).forEach((element) => {
        gsap.set(element, {
          transformPerspective: 500,
          transformOrigin: 'center bottom',
          rotationX: 70,
        });

        let mySplitText = new SplitText(element, { type: 'chars' });
        let chars = mySplitText.chars;

        gsap.fromTo(
          element,
          {
            rotationX: 70,
            opacity: 0,
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'back.out',
            delay: 0.75,
            scrollTrigger: {
              trigger: element,
              start: 'top 100%',
              toggleActions: 'play none none reset',
            },
          }
        );

        gsap.from(chars, {
          yPercent: 50,
          stagger: 0.03,
          // stagger: {
          //   each: 0.03, // Adjusted stagger for smoother animation
          //   ease: 'power1.out', // Added ease for each stagger
          // },
          opacity: 0,
          ease: 'power1.out',
          duration: 0.5,
          delay: 0.75,
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            toggleActions: 'play none none reset',
          },
        });

        // gsap.fromTo(
        //   element,
        //   {
        //     opacity: 0,
        //   },
        //   {
        //     opacity: 1,
        //     ease: 'none',
        //     delay: 1,
        //     scrollTrigger: {
        //       trigger: element,
        //       start: 'top 100%',
        //       end: 'top 60%',
        //       scrub: true,
        //       toggleActions: 'play reverse play reverse',
        //     },
        //   }
        // );

        // gsap.fromTo(
        //   element,
        //   {
        //     opacity: 1,
        //   },
        //   {
        //     opacity: 0,
        //     ease: 'none',
        //     scrollTrigger: {
        //       trigger: element,
        //       start: 'top 20%',
        //       end: 'top 5%',
        //       scrub: true,
        //       toggleActions: 'play reverse play reverse',
        //     },
        //   }
        // );


      });
    }

    // Apply animation to all elements with the given selector
    textEffect(textSelector);

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [textSelector]);
};

const useImageAnimation = (selector) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        const container = entry.target;

        if (entry.isIntersecting) {
          container.classList.add("animating");
        } else {
          if (entry.boundingClientRect.top > 0) {
            container.classList.remove("animating");
          }
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, options);
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        revealObserver.unobserve(element);
      });
    };
  }, [selector]);
};

const circleAnimation = (wrapperSelector, itemSelector, svgSelector, circlePathSelector) => {
  useEffect(() => {
    function setupCircleAnimation() {
      const circlePath = MotionPathPlugin.convertToPath(circlePathSelector, false)[0];
      circlePath.id = "circlePath";
      document.querySelector(svgSelector).prepend(circlePath);

      const items = document.querySelectorAll(itemSelector);
      gsap.set(items, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: i => i / items.length
        }
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: 'none' }
      });

      tl.to(wrapperSelector, {
        rotation: 180,
        transformOrigin: 'center'
      });

      tl.to(items, {
        rotation: "-=180",
        transformOrigin: 'center'
      }, 0);

      tl.to(wrapperSelector, {
        scale: 0.75,
        transformOrigin: 'center'
      }, 0);

      tl.to(items, {
        scale: 0.8,
        transformOrigin: 'center'
      }, 0);

      ScrollTrigger.create({
        trigger: ".five",
        start: 'top bottom',
        end: '45% center',
        scrub: true,
        animation: tl
      });
    }

    // Apply animation setup to elements with the given selectors
    setupCircleAnimation();

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [wrapperSelector, itemSelector, svgSelector, circlePathSelector]);
};

const useAnimateSmallHeadline = (textSelector) => {
  useEffect(() => {
    function animateSmallHeadline(selector) {
      document.querySelectorAll(selector).forEach((element) => {

        gsap.fromTo(
          element,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: 'none',
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );


      });
    }

    // Apply animation to all elements with the given selector
    animateSmallHeadline(textSelector);

    // Cleanup function to remove ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [textSelector]);
};




export { useSmallTextAnimation, useAnimateText, useAnimateTextDelay, RotatingHeader, useTextEffect, useImageAnimation, circleAnimation, useAnimateSmallHeadline };