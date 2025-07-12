import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosClient } from "@/components/Api";
import { toast } from "react-hot-toast";

interface IImageToImageState {
  loading: boolean;
  image: string | null;
  generateImage: (prompt?: string, image: { uri: string; name: string; type: string }) => Promise<any>;
}

const ImageToImageContext = createContext<IImageToImageState | undefined>(undefined);

export const ImageToImageProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const generateImage = async (prompt?: string, inputImage: { uri: string; name: string; type: string }) => {
    setLoading(true);
    try {
      const res = await AxiosClient.post("/transform/image", { prompt, image: inputImage });
      if (res.data?.success) {
        setImage(res.data.data.imageUrl);
        toast.success("Image generated successfully!");
        return res.data.data;
      } else {
        toast.error(res.data?.message || "Failed to generate image.");
        return null;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageToImageContext.Provider value={{ loading, image, generateImage }}>
      {children}
    </ImageToImageContext.Provider>
  );
};

export const useImageToImage = () => {
  const context = useContext(ImageToImageContext);
  if (context === undefined) {
    throw new Error("useImageToImage must be used within an ImageToImageProvider");
  }
  return context;
};
