"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AoS() {
  useEffect(() => {
    AOS.init({ duration: 1000 });

    return () => {
      AOS.refresh();
    };
  }, []);
  // return no jsx
  return null;
}
