"use client";

import React, { useState } from "react";
import { useHomeState } from "./context";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export const HomePage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { loading, image, generateImage } = useHomeState();

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Generate Amazing Images Instantly
          </h1>
          <p className="text-xl text-gray-600">
            Create stunning AI-generated images for free - no signup required!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="outline-none flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-blue-500 focus:border-none"
            />
            <Button
              // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              variant="primary"
              onClick={() => generateImage(prompt)}
              disabled={loading}
              isLoading={loading}
            >
              Generate
            </Button>
          </div>

          {image && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={image}
                alt="Generated"
                className="w-full h-96 object-cover"
              />
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors"
              >
                Download Image
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            🔒 Save Your Creations Forever
          </h3>
          <p className="text-gray-600 mb-4">
            Create an account to access your full generation history and manage
            your favorite prompts.
          </p>

          <Button
            variant="primary"
            // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => router.push("/login")}
          >
            Signup to Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
