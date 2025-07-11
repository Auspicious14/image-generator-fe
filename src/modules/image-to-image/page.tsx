"use client";
import React, { useState } from "react";
import { Button, TextInput } from "@/components";
import { useImageToImage } from "./context";
import Image from "next/image";

export default function ImageToImagePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { generateImage, loading, image } = useImageToImage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedImage) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      await generateImage(prompt, {
        uri: base64data,
        name: selectedImage.name,
        type: selectedImage.type,
      });
      setPrompt("");
      setSelectedImage(null);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Image to Image Generation</h1>
      <div className="w-full max-w-md">
        <TextInput
          ignoreFormik
          label="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          name={"prompt"}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-4 p-2 border rounded-md w-full"
        />
        {selectedImage && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedImage.name}
          </p>
        )}
        <Button
          onClick={handleGenerate}
          isLoading={loading}
          disabled={loading}
          className="mt-4 w-full"
        >
          Generate Image
        </Button>
      </div>

      {image && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Image:</h2>
          <Image
            src={image}
            alt="Generated Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
