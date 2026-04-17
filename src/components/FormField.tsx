import React, { ReactNode, useId } from "react";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: (props: { describedBy?: string; invalid: boolean }) => ReactNode;
  className?: string;
  align?: "start" | "center";
}

const FormField = ({
  label,
  required = false,
  error,
  children,
  className = "",
  align = "start",
}: FormFieldProps) => {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={[
        "flex flex-col gap-1",
        align === "center" ? "items-center" : "items-start",
        className,
      ].join(" ")}
    >
      {label && (
        <label className="text-xs font-medium text-slate-300">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      {children({
        describedBy: errorId,
        invalid: Boolean(error),
      })}

      {error && (
        <p id={errorId} className="text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
