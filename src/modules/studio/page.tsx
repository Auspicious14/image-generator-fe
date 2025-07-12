'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useImageToImage } from "../image-to-image/context";

export const ArtTransformPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
const { generateImage, loading, image } = useImageToImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setOutputUrl(null)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim() || !image) return;

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
  
  const handleDownload = () => {
    if (!outputUrl) return
    const link = document.createElement('a')
    link.href = outputUrl
    link.download = 'ghibli-transformed-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Studio Ghibli Transformation
        </h1>
        <p className="text-gray-600 mb-8">
          Upload a photo and transform it into a Ghibli-style masterpiece.
        </p>

        {/* Upload */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <label className="block mb-4 text-sm font-medium text-gray-700">Upload your image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-6"
          />
          {previewUrl && (
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-2">Preview:</p>
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
            onClick={handleTransform}
            disabled={!image || loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Transforming...' : 'Transform to Ghibli Style'}
          </button>
        </div>

        {/* Output */}
        {loading && (
          <div className="animate-pulse bg-white p-6 rounded-xl shadow text-center">
            <div className="w-full h-64 bg-gray-200 rounded-xl mb-4" />
            <p className="text-gray-400">Transforming image...</p>
          </div>
        )}

        {!loading && outputUrl && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-sm text-gray-600 mb-4">Your Ghibli-style result:</p>
            <Image
              src={outputUrl}
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
  )
}
