import React, { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import OrderFormSteps from "./OrderFormSteps";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    productLink: "",
    name: "",
    email: "",
    mobile: "",
    notes: "",
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const steps = ["Order Details", "Terms & Policies", "Order Summary"];
  const progressPercentage = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendConfirmationEmails = async (data: OrderFormData) => {
    // In a real application, this would call your backend API to send emails
    console.log("Sending confirmation email to customer:", data.email);
    console.log("Sending notification email to admin: admin@globalshop.com");

    // Simulate API call delay
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Order submitted:", formData);

      // Send confirmation emails
      await sendConfirmationEmails(formData);

      // Show success toast
      toast({
        title: "Order Submitted Successfully",
        description:
          "A confirmation email has been sent to your email address.",
      });

      onComplete(formData);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error Submitting Order",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                className={`text-sm ${index + 1 <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
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
              onNextStep={handleNext}
              onPrevStep={handleBack}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
