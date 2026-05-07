import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "../hooks/useI18n";
import { DUE_DATE, SIZE } from "../constants";

interface Props {
  dueDate?: string;
  onChange: (date: string) => void;
  size?: typeof SIZE.SMALL | typeof SIZE.MEDIUM;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

const DueDatePicker = ({
  dueDate,
  onChange,
  size = SIZE.MEDIUM,
  hasError = false,
  ariaDescribedBy,
}: Props) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const formattedDate = dueDate
    ? new Intl.DateTimeFormat(t("dueDate.locale"), {
        ...DUE_DATE.DISPLAY_FORMAT,
      }).format(new Date(dueDate))
    : null;

  const isOverdue =
    dueDate && new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  useEffect(() => {
    if (!isOpen || !buttonRef.current || !popoverRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popover = popoverRef.current;
    const spaceOnRight = window.innerWidth - buttonRect.right;
    const popoverWidth = DUE_DATE.POPOVER_WIDTH_PX;

    if (spaceOnRight < popoverWidth) {
      popover.style.left = "auto";
      popover.style.right = "0";
    } else {
      popover.style.left = "0";
      popover.style.right = "auto";
    }
  }, [isOpen]);

  const getDueDateState = () => {
    if (hasError) return DUE_DATE.STATE.ERROR;
    if (!dueDate) return DUE_DATE.STATE.EMPTY;
    if (isOverdue) return DUE_DATE.STATE.OVERDUE;
    return DUE_DATE.STATE.ACTIVE;
  };

  const state = getDueDateState();

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 rounded-xl text-sm transition-all border whitespace-nowrap
          ${DUE_DATE.STATE_CLASSES[state]}
          ${DUE_DATE.SIZE_CLASSES[size]}`}
      >
        📅
        {formattedDate ? (
          <span className={isOverdue ? "line-through" : ""}>
            {formattedDate}
          </span>
        ) : (
          <span className={hasError ? "text-red-400" : "text-gray-500"}>
            {t("dueDate.select")}
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
                const next = e.target.value;
                if (!next) return;
                onChange(next);
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
