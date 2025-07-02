"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Leaf,
  ShoppingCart,
  Star,
  TreePine,
  Users,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Youtube,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";

export default function HanumanBlessed() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const heroRef = useRef<HTMLElement>(null);
  const purposeRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [heroRef, purposeRef, visionRef, productRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  // Form validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!billingDetails.name.trim()) {
      errors.name = "Full name is required";
    } else if (billingDetails.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!billingDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(billingDetails.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!billingDetails.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(billingDetails.phone)) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!billingDetails.address.trim()) {
      errors.address = "Address is required";
    } else if (billingDetails.address.trim().length < 10) {
      errors.address = "Please enter a complete address";
    }

    if (!billingDetails.city.trim()) {
      errors.city = "City is required";
    }

    if (!billingDetails.state.trim()) {
      errors.state = "State is required";
    }

    if (!billingDetails.pincode.trim()) {
      errors.pincode = "PIN code is required";
    } else if (!validatePincode(billingDetails.pincode)) {
      errors.pincode = "Please enter a valid 6-digit PIN code";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const orderData = {
        billingDetails,
        paymentMethod,
        totalAmount: paymentMethod === "cod" ? 439 : 399,
        productDetails: {
          name: "Sacred Lal Hanuman Murti",
          price: 399,
          codCharges: paymentMethod === "cod" ? 40 : 0,
          shipping: 0,
        }
      };

      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setBillingDetails({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
          });
          setIsProductModalOpen(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to send order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Animated Header */}
      <header
        className={`border-b border-red-100 backdrop-blur-sm sticky top-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/95 shadow-lg py-2" : "bg-white/90 py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div>
                <Image
                  src="/images/logo/hanuman-blessed-logo.png"
                  alt="Lal Hanuman Logo"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Purpose", href: "#purpose" },
                { name: "Vision", href: "#vision" },
                { name: "Product", href: "#product" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-red-600 transition-all duration-300 group py-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-300"
                onClick={() => setIsProductModalOpen(true)}
              >
                <TreePine className="w-4 h-4 mr-2" />
                Buy & Plant
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2  cursor-pointer rounded-lg hover:bg-red-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col space-y-4 py-4 border-t border-red-100">
              {[
                { name: "Purpose", href: "#purpose" },
                { name: "Vision", href: "#vision" },
                { name: "Product", href: "#product" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white w-fit"
                onClick={() => {
                  setIsProductModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <TreePine className="w-4 h-4 mr-2" />
                Buy & Plant
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative py-20 bg-gradient-to-br from-red-50 via-white to-red-50 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible("hero")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-4">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 animate-bounce">
                  Sacred • Blessed • Divine
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="inline-block animate-fade-in-up">
                    Awaken the Divine Power of
                  </span>
                  <span
                    className="text-red-600 block animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Lal Hanuman
                  </span>
                </h1>
                <p
                  className="text-xl text-gray-600 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  A spiritually infused murti with sacred mantras made from the
                  sacred soil and sindoor of Hanuman Garhi Mandir, Ayodhya — the
                  eternal abode of Hanuman Ji
                </p>
              </div>

              <div
                className="flex items-center space-x-6 animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="flex items-center space-x-2 group">
                  <TreePine className="w-5 h-5 text-green-600 group-hover:animate-bounce" />
                  <span className="text-sm font-medium text-gray-700">
                    1 Murti = 1 Tree Planted
                  </span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Users className="w-5 h-5 text-red-600 group-hover:animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    1.13B Hindus Movement
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: "1.2s" }}
                onClick={() => setIsProductModalOpen(true)}
              >
                View Sacred Murti
              </Button>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible("hero")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative w-full h-80 sm:h-96 lg:h-[78vh] overflow-hidden group ">
                <Image
                  src="/images/hero/hanuman.png"
                  alt="Lal Hanuman Murti - Sacred statue made from Ayodhya soil"
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Purpose Section with Scroll Animation */}
      <section
        ref={purposeRef}
        id="purpose"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/30 to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div
              className={`space-y-4 transition-all duration-1000 ${
                isVisible("purpose")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Badge className="bg-red-100 text-red-700 animate-pulse">
                Our Purpose
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                <span className="inline-block animate-fade-in-up">
                  Awakening
                </span>{" "}
                <span
                  className="text-red-600 inline-block animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  1.13 Billion Hindus
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "English",
                  content:
                    "Our purpose is to awaken 1.13 billion Hindus to the hidden power of this Lal Hanuman Murti, made from the sacred soil and sindoor of Hanuman Garhi Mandir, Ayodhya — the eternal abode of Hanuman Ji.",
                  delay: "0.3s",
                },
                {
                  title: "हिंदी",
                  content:
                    "हमारा उद्देश्य 1.13 अरब हिंदुओं को इस लाल हनुमान मूर्ति की छुपी हुई शक्ति के प्रति जागरूक करना है, जो अयोध्या स्थित हनुमान गढ़ी मंदिर की मिट्टी और सिंदूर से बनाई गई है— जो हनुमान जी का शाश्वत निवास स्थान है।",
                  delay: "0.6s",
                },
              ].map((item, index) => (
                <Card
                  key={item.title}
                  className={`border-red-100 hover:shadow-xl transition-all duration-700 hover:scale-105 group ${
                    isVisible("purpose")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ animationDelay: item.delay }}
                >
                  <CardHeader>
                    <CardTitle className="text-red-600 group-hover:text-red-700 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Vision Section with Advanced Animations */}
      <section
        ref={visionRef}
        id="vision"
        className="py-20 bg-gradient-to-br from-red-50 to-white relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-red-300 rounded-full animate-spin-slow"></div>
          <div
            className="absolute bottom-20 right-20 w-24 h-24 border-2 border-green-300 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto space-y-12">
            <div
              className={`text-center space-y-4 transition-all duration-1000 ${
                isVisible("vision")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Badge className="bg-red-100 text-red-700 animate-pulse">
                Our Vision
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Building a{" "}
                <span className="text-red-600 relative">
                  Sacred Movement
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-200 animate-pulse"></span>
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "English",
                  content:
                    "We are building this movement through the unique participation of Hindus, with the vision of making every Hindu home in India a Lal Hanuman Blessed Home. Our ultimate goal is to create happy, hurdle free homes across the nation.",
                  stats:
                    "1 Hanuman blessed home = 1 Plant in India\n26 Crore Hindu homes = 26 Crore plants in India",
                  delay: "0.3s",
                },
                {
                  title: "हिंदी",
                  content:
                    "यह आंदोलन हम हिंदुओं की अनूठी भागीदारी से बना रहे हैं, इस दृष्टि के साथ कि भारत का हर हिंदू घर एक लाल हनुमान ब्लेस्ड होम बने। हमारा अंतिम लक्ष्य है — पूरे देश में खुशहाल और बाधा-रहित घरों का निर्माण करना।",
                  stats:
                    "|| जहाँ सनातन संस्कृति मजबूत होगी, वहाँ प्रकृति भी खुशहाल होगी ||",
                  delay: "0.6s",
                },
              ].map((item, index) => (
                <Card
                  key={item.title}
                  className={`border-red-100 bg-white hover:shadow-2xl transition-all duration-700 hover:scale-105 group relative overflow-hidden ${
                    isVisible("vision")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <CardHeader>
                    <CardTitle className="text-red-600 group-hover:text-red-700 transition-colors flex items-center">
                      {item.title}
                      <Heart className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Animated Counter Section */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transition-all duration-1000 delay-500 ${
                isVisible("vision")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {[
                {
                  number: "1.13B",
                  label: "Hindus to Awaken",
                  icon: Users,
                  color: "text-red-600",
                },
                {
                  number: "26Cr",
                  label: "Target Homes",
                  icon: Heart,
                  color: "text-red-500",
                },
                {
                  number: "26Cr",
                  label: "Trees to Plant",
                  icon: TreePine,
                  color: "text-green-600",
                },
                {
                  number: "1",
                  label: "Sacred Mission",
                  icon: Star,
                  color: "text-yellow-500",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-2 ${stat.color} group-hover:animate-bounce`}
                  />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Section */}
      <section ref={productRef} id="product" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center space-y-4 mb-12 transition-all duration-1000 ${
                isVisible("product")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Badge className="bg-red-100 text-red-700 animate-pulse">
                Sacred Product
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Lal Hanuman Murti
              </h2>
              <p className="text-xl text-gray-600">
                Made with sacred soil from Hanuman Garhi Mandir, Ayodhya
              </p>
            </div>

            <Card
              className={`border-red-100 hover:shadow-2xl transition-all duration-700 cursor-pointer group ${
                isVisible("product")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              onClick={() => setIsProductModalOpen(true)}
            >
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-yellow-400 hover:animate-spin"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        (108 blessed reviews)
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                      Sacred Lal Hanuman Murti
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          icon: Heart,
                          text: "Made from sacred soil of Ayodhya",
                          color: "text-red-600",
                        },
                        {
                          icon: TreePine,
                          text: "One tree planted with each purchase",
                          color: "text-green-600",
                        },
                        {
                          icon: Star,
                          text: "Blessed at Hanuman Garhi Mandir",
                          color: "text-yellow-500",
                        },
                      ].map((feature, index) => (
                        <div
                          key={feature.text}
                          className="flex items-center space-x-2 group/item hover:translate-x-2 transition-transform duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <feature.icon
                            className={`w-5 h-5 ${feature.color} group-hover/item:animate-pulse`}
                          />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-red-600 transition-transform duration-300">
                        ₹399
                      </div>
                      <p className="text-sm text-gray-600">
                        Free shipping across India
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white w-full group-hover:scale-105 transition-all duration-300 group/btn"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
                      Buy Now & Plant a Tree
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative h-64 md:h-90 rounded-lg overflow-hidden group/img">
                        <Image
                          src="/images/products/laal-hanuman.png"
                          alt="Lal Hanuman Murti"
                          fill
                          className="object-contain   transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <div  className={`bg-black/20 flex justify-center items-center fixed inset-0 z-50 ${isProductModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white p-10  max-md:p-5 rounded-lg w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto relative">
          {/* Loading Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">Processing Your Order</p>
                  <p className="text-sm text-gray-600">Please wait while we confirm your details...</p>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setIsProductModalOpen(false)}
            disabled={isSubmitting}
            className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 z-10 ${
              isSubmitting 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="space-y-1 flex flex-col items-start p-2">
            <h2 className="text-2xl text-red-600">
              Sacred Lal Hanuman Murti
            </h2>
            <p className="text-gray-600">
              Made with sacred soil and sindoor from Hanuman Garhi Mandir,
              Ayodhya
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 py-2">
              <div className="relative h-[65vh] rounded-lg overflow-hidden">
                <Image
                  src="/images/products/laal-hanuman.png"
                  alt="Lal Hanuman Murti - Detailed Modal View"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (108 blessed reviews)
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Product Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">
                      Sacred soil & sindoor from Ayodhya
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">6 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">500 grams</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blessing:</span>
                    <span className="font-medium">Hanuman Garhi Mandir</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("online")}
                    disabled={isSubmitting}
                    className={`p-4 border-2 cursor-pointer rounded-lg transition-all duration-300 ${
                      isSubmitting 
                        ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                        : paymentMethod === "online"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900">
                        Pay Online
                      </div>
                      <div className="text-sm text-gray-600">
                        UPI, Card, Wallet
                      </div>
                      <div className="text-2xl font-bold text-green-600 mt-2">
                        ₹399
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    disabled={isSubmitting}
                    className={`p-4 border-2 cursor-pointer rounded-lg transition-all duration-300 ${
                      isSubmitting 
                        ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                        : paymentMethod === "cod"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900">
                        Cash on Delivery
                      </div>
                      <div className="text-sm text-gray-600">
                        Pay when delivered
                      </div>
                      <div className="text-2xl font-bold text-orange-600 mt-2">
                        ₹439
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Price Breakdown
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lal Hanuman Murti</span>
                    <span className="font-medium">₹399</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">COD Charges</span>
                      <span className="font-medium text-orange-600">₹40</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Environmental Impact</span>
                    <span className="font-medium text-green-600">1 Tree 🌱</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-red-600">
                      ₹{paymentMethod === "cod" ? "439" : "399"}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing Details Form */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Billing Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={billingDetails.name}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, name: e.target.value });
                        if (formErrors.name) {
                          setFormErrors({ ...formErrors, name: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.name 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={billingDetails.phone}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, phone: e.target.value });
                        if (formErrors.phone) {
                          setFormErrors({ ...formErrors, phone: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.phone 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={billingDetails.email}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.email 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter email address"
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      value={billingDetails.address}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, address: e.target.value });
                        if (formErrors.address) {
                          setFormErrors({ ...formErrors, address: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.address 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter complete address"
                      rows={3}
                      required
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={billingDetails.city}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, city: e.target.value });
                        if (formErrors.city) {
                          setFormErrors({ ...formErrors, city: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.city 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter city"
                      required
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={billingDetails.state}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, state: e.target.value });
                        if (formErrors.state) {
                          setFormErrors({ ...formErrors, state: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.state 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter state"
                      required
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={billingDetails.pincode}
                      onChange={(e) => {
                        setBillingDetails({ ...billingDetails, pincode: e.target.value });
                        if (formErrors.pincode) {
                          setFormErrors({ ...formErrors, pincode: "" });
                        }
                      }}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
                          : formErrors.pincode 
                            ? 'border-red-500 focus:border-red-500 bg-white' 
                            : 'border-gray-300 focus:border-red-500 bg-white'
                      }`}
                      placeholder="Enter 6-digit PIN code"
                      maxLength={6}
                      required
                    />
                    {formErrors.pincode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                {/* <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      Environmental Impact
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your purchase will plant 1 tree in India, contributing to
                    our mission of 26 crore trees for 26 crore Hindu homes.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Sacred Giving
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    All earnings from Hanuman Blessed are donated to{" "}
                    <a
                      href="https://instagram.com/projectkusum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline hover:text-blue-900 transition-colors"
                    >
                      Project Kusum
                    </a>{" "}
                    — supporting sacred causes and community welfare.
                  </p>
                </div> */}

                {/* Order Summary */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-gray-600">Order Summary</div>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{paymentMethod === "cod" ? "439" : "399"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {paymentMethod === "cod" ? "Pay on Delivery" : "Pay Online Now"}
                    </div>
                  </div>
                </div>

                {/* Submit Button with Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Order Placed Successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Confirmation emails have been sent. Your order will be processed shortly.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 text-red-800">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Failed to Place Order</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Please check your details and try again. If the problem persists, contact support.
                    </p>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full transition-all duration-300 group ${
                    isSubmitting || submitStatus === 'success'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 cursor-pointer hover:scale-105'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Order...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Order Placed Successfully!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      {paymentMethod === "cod" 
                        ? "Place Order (COD ₹439)" 
                        : "Pay Now (₹399)"
                      }
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>Free shipping across India • Secure payment</p>
                  {paymentMethod === "cod" && (
                    <p className="text-orange-600 font-medium">
                      COD charges: ₹40 • Pay ₹439 to delivery partner
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Enhanced Interactive Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-red-400 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-16 h-16 border border-green-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 border border-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6 group">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo/hanuman-blessed-logo.png"
                  alt="Lal Hanuman Logo"
                  width={200}
                  height={200}
                />
              </div>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Awakening 1.13 billion Hindus through sacred devotion and
                environmental responsibility.
              </p>
              <div className="flex space-x-4">
                {[
                  // { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                  // { icon: Twitter, href: "#", color: "hover:text-blue-300" },
                  { icon: Instagram, href: "https://www.instagram.com/hanumanblessedhomes_?igsh=MW9sNjV6bGl3YWdyaA%3D%3D&utm_source=qr", color: "hover:text-pink-400" },
                  { icon: Youtube, href: "https://youtube.com/@hanumanblessedhomes?si=VNqXN7iR_D6aBMc6", color: "hover:text-red-400" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ${social.color} hover:scale-110 transition-all duration-300 group/social`}
                  >
                    <social.icon className="w-5 h-5 group-hover/social:animate-bounce" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-6 group">
              <h4 className="text-xl font-semibold group-hover:text-red-400 transition-colors duration-300 flex items-center">
                <TreePine className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Our Mission
              </h4>
              <div className="space-y-3 text-gray-400">
                {/* <div className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 group/item">
                  <p className="group-hover/item:text-green-400 transition-colors duration-300">
                    1 Hanuman blessed home = 1 Plant in India
                  </p>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 group/item">
                  <p className="group-hover/item:text-green-400 transition-colors duration-300">
                    26 Crore Hindu homes = 26 Crore plants
                  </p>
                </div> */}
                <div className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 group/item">
                  <p className="group-hover/item:text-blue-400 transition-colors duration-300">
                    All earnings donated to{" "}
                    <a
                      href="https://instagram.com/projectkusum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-300 transition-colors"
                    >
                      Project Kusum
                    </a>
                  </p>
                </div>
                {/* <div className="text-center text-yellow-400 font-medium animate-pulse">
                  🌱 Growing Together 🌱
                </div> */}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 group">
              <h4 className="text-xl font-semibold group-hover:text-red-400 transition-colors duration-300">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Our Purpose", href: "#purpose" },
                  { name: "Our Vision", href: "#vision" },
                  { name: "Sacred Product", href: "#product" },
                ].map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-2 group/link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="group-hover/link:text-red-400">→</span>{" "}
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6 group">
              <h4 className="text-xl font-semibold group-hover:text-red-400 transition-colors duration-300">
                Sacred Contact
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    text: "+91 92044 28426",
                    color: "hover:text-green-400",
                  },
                  {
                    icon: Mail,
                    text: "hanumanblessedhomes@gmail.com",
                    color: "hover:text-blue-400",
                  },
                  // {
                  //   icon: MapPin,
                  //   text: "Ayodhya, Uttar Pradesh, India",
                  //   color: "hover:text-yellow-400",
                  // },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 text-gray-400 ${contact.color} transition-all duration-300 hover:translate-x-2 group/contact cursor-pointer`}
                  >
                    <contact.icon className="w-5 h-5 group-hover/contact:animate-bounce" />
                    <span className="group-hover/contact:font-medium">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Newsletter Signup */}
              {/* <div className="space-y-3">
                <h5 className="font-medium text-gray-300">Stay Blessed</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-300"
                  />
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-center md:text-left">
                <p>&copy; 2024 Hanuman Blessed. All rights reserved.</p>
                <p className="text-sm mt-1 animate-pulse">
                  Made with devotion in India 🇮🇳
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a
                  href="/privacy-policy"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-conditions"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
                {/* <a
                  href="#"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Refund Policy
                </a> */}
              </div>
            </div>

            {/* Sacred Message */}
            {/* <div className="text-center mt-8 p-4 bg-gradient-to-r from-red-900/20 to-green-900/20 rounded-lg border border-red-800/30">
              <p className="text-yellow-400 font-medium animate-pulse">
                🙏 जय हनुमान ज्ञान गुण सागर, जय कपीस तिहुं लोक उजागर 🙏
              </p>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
