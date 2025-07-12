"use client";

import { IHistory } from "@/modules/home/model";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  history: IHistory | null;
};

export const Modal = ({ isOpen, onClose, history }: ModalProps) => {
  const handleDownload = (image: string) => {
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
    <AnimatePresence>
      {isOpen && history && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg max-w-3xl w-full mx-4 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <XMarkIcon
              onClick={onClose}
              className="w-6 h-6 absolute top-3 right-3 text-gray-600 hover:text-orange-500"
            />
            <Image
              src={history.imageUrl}
              width={1000}
              height={1000}
              alt="AI Generated"
              className="w-full object-cover max-h-[500px]"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Prompt
              </h3>
              <p className="text-gray-600">{history.prompt}</p>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <button
                onClick={() => handleDownload(history.imageUrl)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
