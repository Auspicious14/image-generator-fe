"use client";

import { AxiosClient } from "@/components";
import React, { createContext, useContext, useState } from "react";
import { IHistory } from "./model";

interface IHomeState {
  loading: boolean;
  image: string | null;
  history: IHistory[];
  getImages: () => Promise<any>;
  generateImage: (prompt: string) => Promise<any>;
  setHistory: (history: IHistory[]) => void;
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
  const [history, setHistory] = useState<IHistory[]>([]);

  const generateImage = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await AxiosClient.post(`/generate/image`, { prompt });
      const data = response?.data?.data;
      if (data) {
        setImage(data?.imageUrl);
        setHistory([...history, data]);
        return data;
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

  const getImages = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get(`/images`);
      const data = response?.data?.data;
      if (data) {
        setHistory(data);
        return data;
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
    <HomeContext.Provider
      value={{ loading, image, history, getImages, generateImage, setHistory }}
    >
      {children}
    </HomeContext.Provider>
  );
};
