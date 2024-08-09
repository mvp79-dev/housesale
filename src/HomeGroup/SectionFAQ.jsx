import React, { useRef, useState } from "react";
import Accordion from "../Accordion";

export const SectionFAQ = () => {
    const handleClick = (linkUrl) => {
        // Open the specified webpage link in a new tab when carousel-content is clicked
        window.open(linkUrl, '_blank');
      };
      
      return (
        <section className="seven">
        <div className="background-element-one" />
        <div className="background-element-two" />
          <div className="seven-content" >
            <h1 className="medium-headline white" >Frequently Asked Questions</h1>
            <div className="seven-row" >
    
              <div className="seven-row-left" >
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
                <Accordion
                  title="Lorem ipsum dolor sit amet consectetur adipiscing?"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
                />
              </div>
    
              <div className="seven-row-right" >
                <div className="seven-socials" >
                  <h1 className="description white" >Lorem Ipsum</h1>
                  <div className="seven-socials-icons" >
                    <i className="fa-brands fa-twitter" onClick={() => handleClick('https://twitter.com/home')} ></i>
                    <i className="fa-brands fa-linkedin" onClick={() => handleClick('https://www.linkedin.com/feed/')} ></i>
                    <i className="fa-brands fa-instagram" onClick={() => handleClick('https://www.instagram.com/')} ></i>
                    <i className="fa-brands fa-discord" onClick={() => handleClick('https://discord.com/')} ></i>
                  </div>
                </div>
                <div className="seven-get-started" >
                  <h1 className="small-headline ready-to-get-started white" >Lorem Ipsum Dolor Sit</h1>
                  <h1 className="small-text ready-to-get-started-description white" >Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.</h1>
                  <div className="broneeri-kõne-seven " >
                    <h1 className="small-description white bold broneeri-kõne-text" >Lorem Ipsum</h1>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </section>
      );
    };