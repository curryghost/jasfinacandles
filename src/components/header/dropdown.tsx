import { signal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface DropDownProps {
  name: string;
  children: ComponentChildren;
}

const isOpen = signal(false);

export default function DropDown({ name, children }: DropDownProps) {
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div class="relative" ref={divRef}>
      <p
        class="relative z-10 cursor-pointer hover:text-secondary"
        onMouseOver={() => (isOpen.value = true)}
        onMouseOut={() => (isOpen.value = false)}
      >
        {name}
      </p>
      <div
        onMouseEnter={() => (isOpen.value = true)}
        onMouseLeave={() => (isOpen.value = false)}
        class={`absolute flex origin-top flex-col bg-dark pt-5 shadow-lg transition-all duration-100 ease-in ${
          isOpen.value
            ? "opacity-1"
            : "pointer-events-none z-0 -translate-y-3 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
