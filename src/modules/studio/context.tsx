import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosClient } from "@/components/Api";
import { toast } from "react-hot-toast";
import { IHistory } from "../home/model";

interface IArtTransformState {
  loading: boolean;
  image: IHistory | null;
  generateImage: (
    image: { uri: string; name: string; type: string },
    prompt?: string
  ) => Promise<any>;
}

const ArtTransformContext = createContext<IArtTransformState | undefined>(
  undefined
);

export const ArtTransformProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<IHistory | null>(null);

  const generateImage = async (
    inputImage: { uri: string; name: string; type: string },
    prompt?: string
  ) => {
    setLoading(true);
    try {
      const res = await AxiosClient.post("/transform/image", {
        prompt,
        image: inputImage,
      });
      if (res.data?.success) {
        setImage(res.data.data);
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
    <ArtTransformContext.Provider value={{ loading, image, generateImage }}>
      {children}
    </ArtTransformContext.Provider>
  );
};

export const useImageToImage = () => {
  const context = useContext(ArtTransformContext);
  if (context === undefined) {
    throw new Error(
      "useImageToImage must be used within an ArtTransformProvider"
    );
  }
  return context;
};
