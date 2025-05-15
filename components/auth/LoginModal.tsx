"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginType, loginSchema, RegisterType, registerSchema } from "@/validations/authSchema";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SocialAuth from "./SocialAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ initialTab = "login" }: { initialTab?: "login" | "register" }) {
  const supabase = createClientComponentClient();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const router = useRouter();
  
  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<loginType>({
    resolver: yupResolver(loginSchema),
  });

  // Signup form
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
    watch,
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onLoginSubmit = async (payload: loginType) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        toast.error(error.message, { theme: "colored" });
      } else if (data.user) {
        setOpen(false);
        resetLogin();
        router.refresh();
        toast.success("Logged in successfully!", { theme: "colored" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (payload: RegisterType) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            name: payload.name,
          },
        },
      });

      if (error) {
        toast.error(error.message, { theme: "colored" });
      } else if (data.user) {
        // Auto-login after successful signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: payload.email,
          password: payload.password,
        });

        if (loginError) {
          toast.error(loginError.message, { theme: "colored" });
        } else {
          setOpen(false);
          resetSignup();
          router.refresh();
          toast.success("Account created and logged in successfully!", { theme: "colored" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    resetLogin();
    resetSignup();
  };

  return (
    <>
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        toastClassName="rounded-lg shadow-lg"
        progressClassName="bg-gradient-to-r from-blue-500 to-purple-500"
      />
      
      <AlertDialog open={open} onOpenChange={(open) => {
        setOpen(open);
        if (!open) resetForms();
      }}>
        <AlertDialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              initialTab === "login"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 hover:shadow-xl"
            }`}
            onClick={() => setOpen(true)}
          >
            {initialTab === "login" ? "New Customer?" : "Join Flatpur"}
          </motion.button>
        </AlertDialogTrigger>
        
        <AlertDialogContent className="w-full max-w-lg rounded-2xl overflow-hidden p-0 border-0 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-80"></div>
                
                {/* Modal content */}
                <div className="relative bg-white/90 backdrop-blur-lg">
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                      <AlertDialogTitle className="text-3xl font-bold text-gray-800">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Flatpur</span>
                      </AlertDialogTitle>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-gray-500 mt-1"
                      >
                        {activeTab === "login" ? "Sign in to access your account" : "Create a new account"}
                      </motion.p>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </motion.button>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab("login")}
                      className={`flex-1 py-4 font-medium text-sm transition-all duration-200 relative ${
                        activeTab === "login" 
                          ? "text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Sign In
                      {activeTab === "login" && (
                        <motion.div 
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab("register")}
                      className={`flex-1 py-4 font-medium text-sm transition-all duration-200 relative ${
                        activeTab === "register" 
                          ? "text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Sign Up
                      {activeTab === "register" && (
                        <motion.div 
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Form content */}
                  <div className="p-8">
                    {activeTab === "login" ? (
                      <>
                        <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                              Email address
                            </Label>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              id="email"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...loginRegister("email")}
                            />
                            {loginErrors.email && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {loginErrors.email.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                              </Label>
                              <button
                                type="button"
                                className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                              >
                                Forgot password?
                              </button>
                            </div>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              id="password"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...loginRegister("password")}
                            />
                            {loginErrors.password && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {loginErrors.password.message}
                              </motion.p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Button
                              type="submit"
                              className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Signing in...
                                </span>
                              ) : (
                                <span className="relative flex items-center justify-center">
                                  <span className="absolute inset-0 bg-white opacity-10 rounded-xl"></span>
                                  <span>Continue</span>
                                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </span>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                        
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 }}
                          className="relative my-8"
                        >
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white/90 text-gray-500">or continue with</span>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <SocialAuth />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                              Full Name
                            </Label>
                            <Input
                              placeholder="John Doe"
                              id="name"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...signupRegister("name")}
                            />
                            {signupErrors.name && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {signupErrors.name.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                              Email address
                            </Label>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              id="email"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...signupRegister("email")}
                            />
                            {signupErrors.email && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {signupErrors.email.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                              Password
                            </Label>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              id="password"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...signupRegister("password")}
                            />
                            {signupErrors.password && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {signupErrors.password.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <Label htmlFor="cpassword" className="text-sm font-medium text-gray-700 mb-1 block">
                              Confirm Password
                            </Label>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              id="cpassword"
                              className="mt-1 py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                              {...signupRegister("password_confirmation")}
                            />
                            {signupErrors.password_confirmation && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-sm text-red-500"
                              >
                                {signupErrors.password_confirmation.message}
                              </motion.p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Button
                              type="submit"
                              className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Creating account...
                                </span>
                              ) : (
                                <span className="relative flex items-center justify-center">
                                  <span className="absolute inset-0 bg-white opacity-10 rounded-xl"></span>
                                  <span>Create Account</span>
                                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                        
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 }}
                          className="relative my-8"
                        >
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white/90 text-gray-500">or sign up with</span>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <SocialAuth />
                        </motion.div>
                      </>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-6 py-5 bg-gray-50/80 border-t border-gray-100 rounded-b-2xl text-center"
                  >
                    <p className="text-sm text-gray-600">
                      {activeTab === "login" ? (
                        <>
                          Don't have an account?{" "}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                            onClick={() => setActiveTab("register")}
                          >
                            Sign up
                          </motion.button>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                            onClick={() => setActiveTab("login")}
                          >
                            Sign in
                          </motion.button>
                        </>
                      )}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
