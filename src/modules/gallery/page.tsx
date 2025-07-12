"use client";

import { useState } from "react";
import { ImageCard } from "./components/card";
import { Modal } from "@/modules/gallery/components/modal";
import { useHomeState } from "../home/context";
import { IHistory } from "../home/model";

export default function GalleryPage() {
  const { history } = useHomeState();
  const [selected, setSelected] = useState<null | (typeof history)[0]>(null);

  return (
    <main className="pt-24 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Art Gallery
      </h1>
      <p className="text-center text-gray-600 mb-8">
        View all your AI creations in one place.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {history.map((item: IHistory) => (
          <ImageCard
            key={item?._id}
            image={{
              id: item?._id,
              url: item?.imageUrl,
              prompt: item?.prompt,
            }}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        history={selected}
      />
    </main>
  );
}
