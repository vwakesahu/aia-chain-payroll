"use client";
import HeadingWithAvatars from "@/components/hero/hero-avatars";
import Features from "@/components/hero/hero-features";
import HeroSection from "@/components/hero/hero-section";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen p-8">
      <HeroSection />
      <HeadingWithAvatars />
      <Features />
    </div>
  );
};

export default Page;
