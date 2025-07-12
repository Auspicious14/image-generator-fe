"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "./components/card";

export const FeaturesPage = () => {
  const features = [
    {
      title: "Generate from Prompts",
      desc: "Type a description and let AI create unique art.",
      icon: "📝",
    },
    {
      title: "Studio Ghibli Style",
      desc: "Transform photos into Ghibli-inspired scenes.",
      icon: "🎥",
    },
    {
      title: "Your Gallery",
      desc: "Save and view all your creations in one place.",
      icon: "🖼",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl py-4 font-bold text-gray-800">
          Powerful Tools for Creative Minds
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore how Inkly AI brings your ideas to life.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>
          
    </div>
  );
};
