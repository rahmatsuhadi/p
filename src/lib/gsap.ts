"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollToPlugin,
    SplitText,
    ScrambleTextPlugin,
    Flip,
  );
}

export {
  Flip,
  gsap,
  ScrambleTextPlugin,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
};
