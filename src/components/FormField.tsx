import React, { ReactNode, useId } from "react";

interface FormFieldProps {
  error?: string;
  children: (props: { describedBy?: string; invalid: boolean }) => ReactNode;
  className?: string;
  align?: "start" | "center";
}

const FormField = ({
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
