import * as React from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

type InputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "placeholder"> & {
    as?: "input";
  };

type TextareaProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "placeholder"> & {
    as: "textarea";
    rows?: number;
  };

type SelectProps = BaseProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "placeholder"> & {
    as: "select";
    children: React.ReactNode;
  };

export function FloatingField(props: InputProps | TextareaProps | SelectProps) {
  const { id, label, error, className, as, children, ...rest } = props as BaseProps & {
    as?: "input" | "textarea" | "select";
    children?: React.ReactNode;
  } & Record<string, unknown>;
  
  const variant: "input" | "textarea" | "select" = as ?? "input";

  const sharedClasses = cn(
    "peer block w-full rounded-xl border bg-background px-4 pb-2 pt-5 text-sm text-foreground shadow-sm outline-none transition-all",
    variant !== "select" && "placeholder-transparent",
    error
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-input focus:border-brand focus:ring-2 focus:ring-brand/20",
    className,
  );

  return (
    <div className="relative">
      {variant === "textarea" ? (
        <textarea
          id={id}
          placeholder={label}
          className={cn(sharedClasses, "min-h-[140px] resize-y pt-6")}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : variant === "select" ? (
        <select
          id={id}
          className={cn(sharedClasses, "appearance-none")}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          placeholder={label}
          className={sharedClasses}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-3.5 origin-[0] -translate-y-2 scale-75 transform text-xs font-medium text-muted-foreground transition-all duration-200",
          variant === "select" ? "top-3.5 -translate-y-2 scale-75 text-brand" : "peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground",
          "peer-focus:top-3.5 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-brand",
          error && "peer-focus:text-destructive",
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 pl-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}