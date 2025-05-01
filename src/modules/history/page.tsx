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

        <div className="relative pb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 h-[calc(100vh-180px)] overflow-y-auto">
            {history.map((item) => (
              <div
                key={item._id}
                className="flex gap-6 mb-6 flex-row items-center justify-between"
              >
                <div className="flex-1 bg-blue-100 p-4 rounded-lg relative">
                  <span className="absolute top-3 left-0 w-4 h-4 bg-blue-100 transform rotate-45" />
                  <p className="text-gray-700 mb-2">{item.prompt}</p>
                </div>
                <div className="w-48 h-32 relative">
                  <Image
                    src={item.imageUrl}
                    alt="Generated"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <span className="absolute top-3 right-0 w-4 h-4 bg-white transform rotate-45" />
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="max-w-4xl mx-auto flex gap-4">
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Type a new prompt..."
                className="flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              />
              <Button
                variant="primary"
                onClick={handleGenerate}
                className="w-full rounded-full"
                icon={PaperAirplaneIcon}
                disabled={loading}
                isLoading={loading}
              >
                <></>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
