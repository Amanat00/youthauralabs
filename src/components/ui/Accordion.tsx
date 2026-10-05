"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <div className="divide-y divide-border border-b border-border">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div key={idx} className="py-2">
            <h3>
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-4 text-left text-base font-semibold transition-colors duration-300 hover:text-primary"
              >
                <span>{item.question}</span>

                <ChevronDown
                  className={`size-4 shrink-0 transition-all duration-700 ease-in-out ${
                    isOpen
                      ? "rotate-180 text-primary"
                      : "rotate-0 text-muted-foreground"
                  }`}
                />
              </button>
            </h3>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`pr-6 text-sm leading-relaxed text-muted-foreground transition-[padding] duration-500 ease-in-out ${
                    isOpen ? "pb-5" : "pb-0"
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}