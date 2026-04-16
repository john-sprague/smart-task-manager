import React, { useState, useRef, useEffect } from "react";

interface Props {
  dueDate?: string;
  onChange: (date: string | undefined) => void;
  size?: "small" | "normal";
  hasError?: boolean;
}

const DueDatePicker = ({
  dueDate,
  onChange,
  size = "normal",
  hasError = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const formattedDate = dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(dueDate))
    : null;

  const isOverdue =
    dueDate && new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  // Smart positioning to prevent going off-screen
  useEffect(() => {
    if (!isOpen || !buttonRef.current || !popoverRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popover = popoverRef.current;

    const spaceOnRight = window.innerWidth - buttonRect.right;
    const popoverWidth = 288; // approx width of popover (w-72)

    // If not enough space on the right, align to the right edge of the button
    if (spaceOnRight < popoverWidth) {
      popover.style.left = "auto";
      popover.style.right = "0";
    } else {
      popover.style.left = "0";
      popover.style.right = "auto";
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-sm transition-all border whitespace-nowrap
          ${
            hasError
              ? "border-red-500 text-red-400 animate-[shake_0.2s]"
              : dueDate
                ? isOverdue
                  ? "border-red-500 text-red-400"
                  : "border-[#22d3ee] text-[#22d3ee]"
                : "border-gray-600 text-gray-400 hover:border-gray-500"
          }
          ${size === "small" ? "text-xs py-1 px-2.5" : "py-[14px] text-[15px]"}
        `}
      >
        📅
        {formattedDate ? (
          <span className={isOverdue ? "line-through" : ""}>
            {formattedDate}
          </span>
        ) : (
          <span className={hasError ? "text-red-400" : "text-gray-500"}>
            Select due date
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 bg-[#1e2937] border border-[#475569] rounded-2xl p-5 shadow-2xl w-72"
        >
          <div className="relative">
            <input
              type="date"
              value={dueDate || ""}
              onChange={(e) => {
                onChange(e.target.value || undefined);
                setIsOpen(false);
              }}
              className="w-full bg-[#0f172a] border border-[#475569] rounded-xl px-4 py-3.5 text-white 
                         focus:outline-none focus:border-[#22d3ee] cursor-pointer
                         file:text-[#22d3ee] file:bg-transparent file:border-0"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#22d3ee] pointer-events-none">
              📅
            </div>
          </div>

          {dueDate && (
            <button
              onClick={() => {
                onChange(undefined);
                setIsOpen(false);
              }}
              type="button"
              className="mt-4 text-red-400 hover:text-red-500 text-sm w-full py-2.5 rounded-xl hover:bg-red-950/30"
            >
              Clear due date
            </button>
          )}

          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DueDatePicker;
