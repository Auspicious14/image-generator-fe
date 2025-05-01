"use client";

import { AxiosClient } from "@/components";
import React, { createContext, useContext, useState } from "react";

interface IHomeState {
  loading: boolean;
  image: string | null;
  generateImage: (prompt: string) => Promise<any>;
}

export const HomeContext = createContext<IHomeState | undefined>(undefined);

export const useHomeState = () => {
  const context = useContext(HomeContext);

  if (context === undefined) {
    throw new Error("useHomeState must be used within a App global Provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const HomeContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const generateImage = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await AxiosClient.post(`/generate/image`, { prompt });
      const image = response?.data?.data;
      console.log({ image });
      if (image) {
        setImage(image);
        return image;
      }
      return null;
    } catch (error: any) {
      const err = error?.response?.data?.message || "Failed to generate image";
      console.log({ err });
      return null;
    } finally {
      setLoading(false);
    }
  };
  return (
    <HomeContext.Provider value={{ loading, image, generateImage }}>
      {children}
    </HomeContext.Provider>
  );
};
