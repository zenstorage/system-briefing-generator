"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full last:w-auto">
          <div className="flex flex-col items-center relative z-10">
            <motion.div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors duration-300",
                currentStep > step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step.id
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              )}
              initial={false}
              animate={{
                scale: currentStep === step.id ? 1.1 : 1,
                backgroundColor: currentStep > step.id ? "var(--primary)" : currentStep === step.id ? "rgba(var(--primary), 0.2)" : "var(--muted)"
              }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step.id ? <Check size={16} /> : step.id}
            </motion.div>
            <p
              className={cn(
                "mt-2 text-xs text-center absolute top-10 w-32",
                currentStep >= step.id
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 mx-4 bg-muted relative rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
