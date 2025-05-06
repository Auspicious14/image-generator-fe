"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useHomeState } from "../home/context";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const HistoryPage = () => {
  const router = useRouter();
  const [newPrompt, setNewPrompt] = useState("");
  const { getImages, history, loading, generateImage, image } = useHomeState();

  useEffect(() => {
    getImages();
  }, []);

  const handleGenerate = async () => {
    if (!newPrompt.trim()) return;
    const res = await generateImage(newPrompt);
    if (res) {
      setNewPrompt("");
    }
  };

  return (
    <div className="max-h-svh bg-gray-50 p-8 px-4">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Generation History
        </h1>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {history.map((item) => (
            <div key={item._id} className="flex flex-col gap-2">
              <div className="flex justify-end">
                <div className="bg-blue-100 text-gray-800 px-4 py-3 rounded-2xl max-w-sm">
                  {item.prompt}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white p-1 rounded-2xl shadow-sm max-w-[200px]">
                  <Image
                    src={item.imageUrl}
                    alt="Generated"
                    width={200}
                    height={200}
                    className="rounded-xl object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Type your prompt..."
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
