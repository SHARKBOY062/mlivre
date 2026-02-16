import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className="space-y-2 mb-6">
        <Label className="text-base font-semibold text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          ref={ref}
          className={cn(
            "h-12 text-lg bg-white border-gray-300 ml-input",
            error && "border-red-500 focus:ring-red-200 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
