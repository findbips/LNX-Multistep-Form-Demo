import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface OrderFormStepsProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  formData: OrderFormData;
  setFormData: React.Dispatch<React.SetStateAction<OrderFormData>>;
  onSubmit: (data: OrderFormData) => void;
}

export interface OrderFormData {
  productLink: string;
  name: string;
  email: string;
  mobile: string;
  notes: string;
  termsAccepted: boolean;
}

const formSchema = z.object({
  productLink: z.string().url({ message: "Please enter a valid URL" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  mobile: z.string().min(10, { message: "Please enter a valid mobile number" }),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const OrderFormSteps: React.FC<OrderFormStepsProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  formData,
  setFormData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<OrderFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const watchTermsAccepted = watch("termsAccepted");

  const handleFormSubmit = (data: OrderFormData) => {
    setFormData(data);
    if (currentStep < 3) {
      onNextStep();
    } else {
      onSubmit(data);
    }
  };

  const handleCheckboxChange = (checked: boolean | string) => {
    setValue("termsAccepted", checked as boolean);
    setFormData({ ...formData, termsAccepted: checked as boolean });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg">
      {currentStep === 1 && (
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
            <CardDescription>
              Please provide the product and your contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="step1-form"
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="productLink">
                  Product Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productLink"
                  placeholder="https://example.com/product"
                  {...register("productLink")}
                />
                {errors.productLink && (
                  <p className="text-sm text-red-500">
                    {errors.productLink.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  placeholder="+1234567890"
                  {...register("mobile")}
                />
                {errors.mobile && (
                  <p className="text-sm text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific instructions or requirements"
                  {...register("notes")}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="step1-form">
              Next Step
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Terms & Policies
            </CardTitle>
            <CardDescription>
              Please review our terms and policies before proceeding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="step2-form"
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-64 overflow-y-auto">
                <h3 className="font-semibold mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600 mb-4">
                  By using our international order placement service, you agree
                  to the following terms and conditions:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>
                    We act as an intermediary service to help you purchase
                    products from international websites.
                  </li>
                  <li>
                    Delivery times may vary depending on the origin country,
                    customs processing, and local delivery conditions.
                  </li>
                  <li>
                    Additional fees such as customs duties, taxes, or import
                    fees may apply and are the responsibility of the customer.
                  </li>
                  <li>
                    We are not responsible for product quality issues, as we
                    only facilitate the purchase and delivery.
                  </li>
                  <li>
                    Refunds and returns are subject to the policies of the
                    original seller and may require additional shipping costs.
                  </li>
                  <li>
                    We will make reasonable efforts to resolve any issues that
                    arise during the ordering or delivery process.
                  </li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We are committed to protecting your privacy and handling your
                  data with care:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>
                    We collect personal information solely for the purpose of
                    processing your order and providing customer support.
                  </li>
                  <li>
                    Your payment information is processed securely and is not
                    stored on our servers.
                  </li>
                  <li>
                    We may share your delivery details with shipping partners to
                    facilitate delivery.
                  </li>
                  <li>
                    We will not sell or share your personal information with
                    third parties for marketing purposes.
                  </li>
                </ul>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={handleCheckboxChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to the Terms of Service and Privacy
                    Policy
                  </label>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-500">
                  {errors.termsAccepted.message}
                </p>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onPrevStep}>
              Back
            </Button>
            <Button
              type="submit"
              form="step2-form"
              disabled={!watchTermsAccepted}
            >
              Next Step
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
            <CardDescription>
              Please review your order details before confirming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="step3-form"
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-semibold mb-4">Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
                        alt="Product placeholder"
                        className="max-h-full object-contain rounded-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Product Link:
                      </p>
                      <p className="text-sm text-blue-600 break-all">
                        <a
                          href={formData.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formData.productLink}
                        </a>
                      </p>
                    </div>
                    <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>
                        Our team will review the product details and contact you
                        with pricing information.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <h3 className="font-semibold mb-2 mt-6">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name:</p>
                    <p>{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email:</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mobile:</p>
                    <p>{formData.mobile}</p>
                  </div>
                  {formData.notes && (
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        Additional Notes:
                      </p>
                      <p className="text-sm">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <AlertDescription>
                  By clicking "Confirm Order", you agree to proceed with this
                  international order request. A confirmation email will be sent
                  to your email address.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onPrevStep}>
              Back
            </Button>
            <Button type="submit" form="step3-form" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default OrderFormSteps;
