import React, { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import OrderFormSteps from "./OrderFormSteps";
import { motion } from "framer-motion";

interface OrderFormProps {
  onComplete?: (formData: OrderFormData) => void;
}

export interface OrderFormData {
  productLink: string;
  name: string;
  email: string;
  mobile: string;
  notes: string;
  termsAccepted: boolean;
}

const OrderForm = ({ onComplete = () => {} }: OrderFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OrderFormData>({
    productLink: "",
    name: "",
    email: "",
    mobile: "",
    notes: "",
    termsAccepted: false,
  });

  const steps = ["Order Details", "Terms & Policies", "Order Summary"];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<OrderFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Order submitted:", formData);
    onComplete(formData);
    // You could redirect to a confirmation page or show a success message
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Place Your International Order
        </h2>

        {/* Progress indicator */}
        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm ${index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Card>
        <CardContent className="pt-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <OrderFormSteps
              currentStep={currentStep}
              formData={formData}
              updateFormData={updateFormData}
            />
          </motion.div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit}>Confirm Order</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
