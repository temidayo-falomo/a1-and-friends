// components/CodedText.tsx
import React, { useRef, useImperativeHandle } from "react";
import gsap from "gsap";

interface CodedTextProps {
  text: string;
  className: string;
}

// Define a type for the ref object
export interface CodedTextHandle {
  startAnimation: () => void;
}

const CodedText = React.forwardRef<CodedTextHandle, CodedTextProps>(
  ({ text, className }, ref) => {
    const codedTextRef = useRef<HTMLDivElement>(null);

    // Function to generate a random character
    const randChar = (): string => {
      const characters =
        "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`";
      const randomChar =
        characters[Math.floor(Math.random() * characters.length)];
      return Math.random() > 0.5 ? randomChar : randomChar.toUpperCase();
    };

    // Define the animation to be started externally
    const startAnimation = () => {
      const element = codedTextRef.current;
      if (!element) return;

      const arr1 = text.split("");
      const arr2: string[] = Array(arr1.length).fill("").map(randChar);

      let step = 0;
      const tl = gsap.timeline();

      tl.fromTo(
        element,
        {
          innerHTML: arr2.join(""),
        },
        {
          duration: arr1.length / 50,
          ease: "power4.in",
          delay: 0.1,
          onUpdate: () => {
            const progressIndex = Math.floor(tl.progress() * arr1.length);
            if (step !== progressIndex) {
              step = progressIndex;
              arr1.forEach((_, i) => (arr2[i] = randChar()));
              const leftText = arr1.slice(0, progressIndex).join("");
              const rightText = arr2.slice(progressIndex).join("");
              element.innerHTML = leftText + rightText;
            }
          },
        }
      );
    };

    // Expose the `startAnimation` function via the ref
    useImperativeHandle(ref, () => ({
      startAnimation,
    }));

    return (
      <div ref={codedTextRef} className={className}>
        {text}
      </div>
    );
  }
);

// Add a display name for debugging
CodedText.displayName = "CodedText";

export default CodedText;
