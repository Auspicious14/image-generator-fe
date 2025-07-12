'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowDownTrayIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useHomeState } from '../home/context'
import clsx from 'clsx'

export default function TextToImagePage() {
  const [newPrompt, setNewPrompt] = useState('')
  const { history, loading, generateImage } = useHomeState()

  const handleGenerate = async () => {
    if (!newPrompt.trim()) return
    const res = await generateImage(newPrompt)
    if (res) setNewPrompt('')
  }

  const handleDownload = (image: string) => {
    if (!image) return
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `generated-image-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          AI Art Generator
        </h1>
        <p className="text-gray-600 mb-8">Type a prompt and generate stunning AI images.</p>

        {/* Input */}
        <div className="flex items-center gap-3 mb-10">
          <input
            type="text"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            placeholder="Describe your dream image..."
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
          </button>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow animate-pulse space-y-3"
                >
                  <div className="w-full h-60 bg-gray-200 rounded-xl" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </>
          )}

          {!loading &&
            history.map((item) => (
              <div
                key={item._id}
                className={
                  'bg-white p-4 rounded-xl shadow hover:shadow-md transition opacity-0 animate-fade-in'
                }
              >
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.prompt}
                    width={400}
                    height={300}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-700 line-clamp-2">{item.prompt}</p>
                <button
                  onClick={() => handleDownload(item.imageUrl)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
