import React, { useEffect, useRef, useState } from "react";
import { RotatingHeader } from "./ScrollAnimations";

function Accordion({ title, content, isActive, onToggle }) {
  const contentRef = useRef(null);
  const accordionTopRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isActive]);

  return (
    <div className="accordion-section">
      <div
        className={`accordion ${isActive ? "active" : ""}`}
        onClick={onToggle}
      >
        <div className="accordion-top" ref={accordionTopRef}>
          <RotatingHeader text={title} hoverTargetRef={accordionTopRef} />
          <div className="accordion-icon">
            <i
              className={`fa-solid fa-arrow-down ${isActive ? "rotate" : ""}`}
              style={{ transition: "transform 0.5s ease" }}
            ></i>
          </div>
        </div>
        <div
          ref={contentRef}
          style={{ maxHeight: `${height}` }}
          className="accordion-content"
        >
          <div
            className="small-text-accordion white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default Accordion;