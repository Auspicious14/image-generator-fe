"use client";

import React, { useState } from "react";
import { useHomeState } from "./context";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { loading, image, generateImage } = useHomeState();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateImage(prompt).then((res) => {
      if (res) {
        setPrompt("");
      }
    });
  };
  const handleDownload = () => {
    if (!image) return;
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `generated-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
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
            <textarea
              // type="textarea"
              value={prompt}
              rows={4}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                loading
                  ? "Generating your image..."
                  : "Describe the image you want to create..."
              }
              className={`outline-none flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-blue-500 focus:border-none ${
                loading ? "animate-pulse" : ""
              }`}
            />
            <Button
              // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              variant="primary"
              onClick={() => handleGenerate()}
              disabled={loading}
              isLoading={loading}
            >
              Generate
            </Button>
          </div>

          {loading ? (
            <div className="border rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-gradient-shine" />
              <div className="h-12 bg-gray-200 mx-4 mb-4 rounded" />
            </div>
          ) : (
            image && (
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Generated"
                  width={1024}
                  height={1024}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors"
                >
                  Download Image
                </button>
              </div>
            )
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
