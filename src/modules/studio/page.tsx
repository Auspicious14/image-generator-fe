"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useImageToImage } from "./context";

export const ArtTransformPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const { generateImage, loading, image } = useImageToImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      await generateImage(
        {
          uri: base64data,
          name: selectedImage.name,
          type: selectedImage.type,
        },
        prompt
      );
      setPrompt("");
    };

    reader.readAsDataURL(selectedImage);
  };

  const handleDownload = () => {
    if (!image?.imageUrl) return;
    const link = document.createElement("a");
    link.href = image.imageUrl;
    link.download = "ghibli-transformed-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Studio Ghibli Transformation
        </h1>
        <p className="text-gray-600 mb-8">
          Upload a photo and (optionally) describe the mood or style you'd like.
        </p>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <div className="mb-6 text-left">
            <label
              htmlFor="file-upload"
              className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-6 text-left">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Prompt (optional)
            </label>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a misty forest with glowing spirits"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {previewUrl && (
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-2 text-left">Preview:</p>
              <Image
                src={previewUrl}
                alt="Preview"
                width={300}
                height={300}
                className="rounded-xl object-cover w-full max-h-[300px]"
              />
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!selectedImage || loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Transforming..." : "Transform to Ghibli Style"}
          </button>
        </div>

        {loading && (
          <div className="animate-pulse bg-white p-6 rounded-xl shadow text-center">
            <div className="w-full h-64 bg-gray-200 rounded-xl mb-4" />
            <p className="text-gray-400">Transforming image...</p>
          </div>
        )}

        {!loading && image?.imageUrl && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-sm text-gray-600 mb-4">
              Your Ghibli-style result:
            </p>
            <Image
              src={image.transformedImageUrl}
              alt="Ghibli Result"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full max-h-[300px] mx-auto"
            />
            <button
              onClick={handleDownload}
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
