import { useState } from "react";
import { API_BASE_URL as API_CONFIG } from '@/lib/api';
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CreditCard, CheckCircle, Loader2, Lock, Clock, Zap, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans: Record<string, { 
  name: string; 
  price: number; 
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}> = {
  starter: { 
    name: "Starter", 
    price: 1499900, 
    period: "/month",
    description: "Perfect for small businesses getting started with AI automation",
    features: ["1 AI Chatbot", "WhatsApp Integration", "500 Conversations/month", "Email Support", "Basic Analytics"]
  },
  growth: { 
    name: "Growth", 
    price: 2999900, 
    period: "/month",
    description: "Ideal for growing businesses ready to scale their AI capabilities",
    features: ["3 AI Chatbots", "WhatsApp + Website Integration", "2000 Conversations/month", "AI Calling (100 mins)", "Priority Support", "Advanced Analytics"],
    popular: true
  },
  scale: { 
    name: "Scale", 
    price: 5999900, 
    period: "/month",
    description: "For enterprises needing comprehensive AI automation solutions",
    features: ["Unlimited AI Chatbots", "All Integrations", "10000 Conversations/month", "AI Calling (500 mins)", "Account Manager", "Custom AI Development"]
  },
  enterprise: {
    name: "Enterprise",
    price: 0,
    period: "Custom",
    description: "Tailored solutions for large organizations with specific needs",
    features: ["Everything in Scale +", "Custom AI Development", "Unlimited Usage", "SLA Guarantee", "Dedicated Team", "White-label Options"]
  }
};

const PaymentGateway = () => {
  const [searchParams] = useSearchParams();
  const planKey = searchParams.get("plan") || "starter";
  const selectedPlan = plans[planKey] || plans.starter;
  const isEnterprise = planKey === "enterprise";

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [otpValue, setOtpValue] = useState("");

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateStep1 = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePayment = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load payment gateway. Check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const API_BASE_URL = `${API_CONFIG}/api`;
      


      const orderRes = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: "INR",
          service: "subscription",
          plan: selectedPlan.name,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });



      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error("Order creation failed:", errorText);
        throw new Error(`Server error (${orderRes.status}): ${errorText || 'Failed to create order'}`);
      }

      const orderData = await orderRes.json();


      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Axenora AI",
        description: `${selectedPlan.name} Plan - ${selectedPlan.period}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPaymentSuccess(true);
              toast.success("Payment successful! Welcome to Axenora AI.");
            } else {
              toast.error("Payment verification failed. Contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Could not verify payment. Contact support.");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#00d4b4",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled. You can try again when ready.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response);
        toast.error(response.error.description || "Payment failed. Please try again.");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      
      // Provide more specific error messages
      let errorMessage = "Payment failed. Please try again.";
      
      if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
        errorMessage = "Cannot connect to payment server. Please ensure the backend is running.";
      } else if (error.message?.includes("Server error")) {
        errorMessage = error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center bg-gradient-to-b from-background via-background to-muted/20">
          <div className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-green/20">
                <CheckCircle className="h-12 w-12 text-cyber-green" />
              </div>
              <h1 className="mb-4 text-4xl font-bold">
                Payment <span className="gradient-text">Successful!</span>
              </h1>
              <p className="mb-2 text-lg text-muted-foreground">
                Thank you for subscribing to the <strong className="text-foreground">{selectedPlan.name}</strong> plan.
              </p>
              <p className="mb-8 text-muted-foreground">
                Our team will reach out within 24 hours to onboard you and set up your AI systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Card className="glass border-border/50">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-cyber-cyan mx-auto mb-2" />
                    <p className="font-semibold">24h Response</p>
                    <p className="text-sm text-muted-foreground">Team will contact you</p>
                  </CardContent>
                </Card>
                <Card className="glass border-border/50">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 text-cyber-green mx-auto mb-2" />
                    <p className="font-semibold">AI Ready</p>
                    <p className="text-sm text-muted-foreground">Systems prepared</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button className="btn-primary w-full sm:w-auto">Go to Home</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="btn-secondary w-full sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  if (isEnterprise) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center bg-gradient-to-b from-background via-background to-muted/20">
          <div className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Pricing
              </Link>

              <div className="glass rounded-2xl border border-border p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-green/20">
                  <Star className="h-8 w-8 text-cyber-cyan" />
                </div>
                <h1 className="text-3xl font-bold mb-4">
                  Enterprise <span className="gradient-text">Solutions</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Get a custom-tailored AI solution designed specifically for your organization's unique needs.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-cyber-green" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="btn-primary">
                      <Zap className="h-5 w-5 mr-2" />
                      Request Custom Quote
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" className="btn-secondary">
                      View Other Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Pricing
              </Link>
              <div className="flex-1 h-px bg-border" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  1
                </div>
                <div className="w-8 h-px bg-border" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  2
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Plan Summary */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="glass border-border/50 overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                      {selectedPlan.popular && (
                        <span className="px-2 py-1 rounded-full bg-cyber-green text-cyber-green-foreground text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {selectedPlan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold gradient-text">
                        ₹{(selectedPlan.price / 100).toLocaleString("en-IN")}
                      </span>
                      <span className="text-muted-foreground">{selectedPlan.period}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-medium mb-3">What's included:</p>
                    <ul className="space-y-2">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-cyber-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <div className="glass rounded-xl border border-border/50 p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-cyber-green" />
                      <span className="text-xs">SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-cyber-cyan" />
                      <span className="text-xs">Razorpay</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>

              {/* Payment Form */}
              <div className="lg:col-span-3">
                <Card className="glass shadow-xl border-border/50">
                  <CardContent className="p-8">
                    {currentStep === 1 ? (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                            <CreditCard className="h-7 w-7 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold">Enter Your Details</h2>
                          <p className="text-sm text-muted-foreground">
                            We'll use this to create your account
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="Kaarthik Dass Arora"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 90000 00000"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name (Optional)</Label>
                            <Input
                              id="company"
                              placeholder="Acme Inc."
                              value={customerCompany}
                              onChange={(e) => setCustomerCompany(e.target.value)}
                            />
                          </div>
                        </div>

                        <Button
                          className="btn-primary w-full"
                          onClick={handleNextStep}
                        >
                          Continue to Payment
                          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-green/20 to-cyber-cyan/20">
                            <Lock className="h-7 w-7 text-cyber-green" />
                          </div>
                          <h2 className="text-2xl font-bold">Secure Payment</h2>
                          <p className="text-sm text-muted-foreground">
                            Complete your subscription securely
                          </p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Plan</span>
                            <span className="font-medium">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Billing</span>
                            <span className="font-medium">Monthly</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="font-semibold">Total</span>
                            <span className="text-xl font-bold gradient-text">
                              ₹{(selectedPlan.price / 100).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Button
                            className="btn-primary w-full py-4 text-base"
                            onClick={handlePayment}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Shield className="h-5 w-5 mr-2" />
                                Pay ₹{(selectedPlan.price / 100).toLocaleString("en-IN")}
                              </>
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setCurrentStep(1)}
                            disabled={isProcessing}
                          >
                            Edit Details
                          </Button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
                          <Shield className="h-4 w-4" />
                          <span>Secured by Razorpay</span>
                          <span>•</span>
                          <span>256-bit SSL Encryption</span>
                          <span>•</span>
                          <span>PCI DSS Compliant</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentGateway;
