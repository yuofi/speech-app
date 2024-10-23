//import { animateRectangles } from './animation';
import React, { useEffect, useRef } from "react";

const AnimatedLogo = () => {

    const rect1Ref = useRef(null);
    const rect2Ref = useRef(null);
    const rect3Ref = useRef(null);
    const rect4Ref = useRef(null);
    //пока не будем использовать анимацию для стабильности работы приложения
    useEffect(() => {
        //animateRectangles([rect1Ref, rect2Ref, rect3Ref, rect4Ref]);
    }, []);

    return (
        <svg
        width="104"
        height="163"
        viewBox="0 0 104 163"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rectangles with refs */}
        <rect
          ref={rect1Ref}
          x="27.368408"
          rx="10.605264"
          width="21.210527"
          height="126.016808"
          fill="#BFC6F4"
          fillOpacity="1"
        />
        <rect
          ref={rect2Ref}
          y="66.432770"
          rx="10.605264"
          width="21.210527"
          height="74.651260"
          fill="#D4D8F4"
          fillOpacity="1"
        />
        <rect
          ref={rect3Ref}
          x="55.421051"
          y="63.008423"
          rx="10.605264"
          width="21.210527"
          height="99.991592"
          fill="#A3AEF5"
          fillOpacity="1"
        />
        <rect
          ref={rect4Ref}
          x="82.789490"
          y="51.365540"
          rx="10.605264"
          width="21.210527"
          height="61.638653"
          fill="#7E8EF2"
          fillOpacity="1"
        />
      </svg>
    )
}

export default AnimatedLogo;