"use client";
import { DotBackground } from "react-bits";

export default function DotPattern() {
  return (
    <div className="absolute inset-0 -z-10">
      <DotBackground
        dotColor="#60a5fa"
        dotSize={1.5}
        className="opacity-30"
      />
    </div>
  );
}
