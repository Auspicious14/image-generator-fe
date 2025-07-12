"use client";

import { motion } from "framer-motion";

type ImageCardProps = {
  image: {
    id: string;
    url: string;
    prompt: string;
  };
  onClick: () => void;
};

export const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative cursor-pointer overflow-hidden rounded-lg shadow group"
      onClick={onClick}
    >
      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-64 object-cover transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <p className="text-white text-sm font-medium">View Details</p>
      </div>
    </motion.div>
  );
};
