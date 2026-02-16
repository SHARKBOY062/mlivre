import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  label: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function RadioGroupField({ label, options, value, onChange, error, required }: RadioGroupFieldProps) {
  return (
    <div className="space-y-3 mb-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Label className="text-lg font-semibold text-gray-800 flex items-center gap-1 mb-4">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-col space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <RadioGroupItem 
              value={option.value} 
              id={`${label}-${option.value}`}
              className="mt-1 text-primary border-gray-400"
            />
            <Label 
              htmlFor={`${label}-${option.value}`}
              className="text-base font-normal text-gray-600 leading-tight cursor-pointer hover:text-gray-900 transition-colors"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {error && <span className="text-sm text-red-500 font-medium block mt-2">{error}</span>}
    </div>
  );
}
