import React, { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import OrderFormSteps from "./OrderFormSteps";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { useToast } from "./ui/use-toast";
=======
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f

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
<<<<<<< HEAD
  const [currentStep, setCurrentStep] = useState(1);
=======
  const [currentStep, setCurrentStep] = useState(0);
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
  const [formData, setFormData] = useState<OrderFormData>({
    productLink: "",
    name: "",
    email: "",
    mobile: "",
    notes: "",
    termsAccepted: false,
  });
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const steps = ["Order Details", "Terms & Policies", "Order Summary"];
  const progressPercentage = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
=======

  const steps = ["Order Details", "Terms & Policies", "Order Summary"];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
    }
  };

  const handleBack = () => {
<<<<<<< HEAD
    if (currentStep > 1) {
=======
    if (currentStep > 0) {
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
      setCurrentStep(currentStep - 1);
    }
  };

<<<<<<< HEAD
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
=======
  const updateFormData = (data: Partial<OrderFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Order submitted:", formData);
    onComplete(formData);
    // You could redirect to a confirmation page or show a success message
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
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
<<<<<<< HEAD
                className={`text-sm ${index + 1 <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
=======
                className={`text-sm ${index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
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
<<<<<<< HEAD
              onNextStep={handleNext}
              onPrevStep={handleBack}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
          </motion.div>
=======
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
>>>>>>> b2d17e38a7e6043e1e45f601fff3a4b42abd3c4f
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
