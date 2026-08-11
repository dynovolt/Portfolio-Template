"use client";

import React, { useState, useRef } from "react";
import { motion as motionElement } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import Magnetic from "../ui/Magnetic";
import confetti from "canvas-confetti";

export default function Contact() {
  const { socials } = portfolioConfig.personalInfo;
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    // Simulate server ingestion latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success response triggers
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });

    // Fire award-winning premium confetti triggers
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#4F7EFF", "#8B5CF6", "#ffffff"],
    });

    // Reset feedback after duration
    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
        
        {/* Left column: Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4">
            <motionElement.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">07 / Contact</span>
            </motionElement.div>
            <motionElement.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight"
            >
              Let&rsquo;s connect.
            </motionElement.h2>
          </div>

          <motionElement.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-base md:text-lg font-light leading-relaxed tracking-wide max-w-sm"
          >
            Have a project idea, consulting requirement, or just want to chat? Fill out the form or drop me a line directly.
          </motionElement.p>

          <motionElement.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 text-sm"
          >
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>{socials.email}</span>
              </a>
            )}
            <div className="flex items-center gap-3 text-white/60 w-fit">
              <MapPin className="w-4 h-4 text-brand-purple" />
              <span>San Francisco, California</span>
            </div>
          </motionElement.div>
        </div>

        {/* Right column: Form Container */}
        <div className="lg:col-span-7 w-full">
          <motionElement.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
              {/* Name Field */}
              <div className="relative flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 outline-none w-full transition-colors"
                  placeholder="John Doe"
                  disabled={status === "submitting" || status === "success"}
                />
                {/* Focus Line highlight */}
                <motionElement.div
                  className="absolute bottom-0 left-0 h-[1.5px] bg-brand-blue"
                  initial={{ width: "0%", left: "50%" }}
                  animate={{
                    width: focusedField === "name" ? "100%" : "0%",
                    left: focusedField === "name" ? "0%" : "50%",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>

              {/* Email Field */}
              <div className="relative flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 outline-none w-full transition-colors"
                  placeholder="john@example.com"
                  disabled={status === "submitting" || status === "success"}
                />
                <motionElement.div
                  className="absolute bottom-0 left-0 h-[1.5px] bg-brand-blue"
                  initial={{ width: "0%", left: "50%" }}
                  animate={{
                    width: focusedField === "email" ? "100%" : "0%",
                    left: focusedField === "email" ? "0%" : "50%",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>

              {/* Message Field */}
              <div className="relative flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 outline-none w-full resize-none transition-colors"
                  placeholder="Tell me about your project..."
                  disabled={status === "submitting" || status === "success"}
                />
                <motionElement.div
                  className="absolute bottom-0 left-0 h-[1.5px] bg-brand-blue"
                  initial={{ width: "0%", left: "50%" }}
                  animate={{
                    width: focusedField === "message" ? "100%" : "0%",
                    left: focusedField === "message" ? "0%" : "50%",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>

              {/* Submit CTA button */}
              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <Magnetic range={30}>
                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className={`inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                      status === "success"
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    {status === "idle" && (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                    {status === "submitting" && (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </span>
                    )}
                    {status === "success" && (
                      <span className="flex items-center gap-2 animate-pulse">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Success!</span>
                      </span>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </motionElement.div>
        </div>
      </div>
    </section>
  );
}
