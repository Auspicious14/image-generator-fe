import { AxiosClient } from "@/components";
import TextToImagePage from "@/modules/history/page";
import { useHomeState } from "@/modules/home/context";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

const ChatHistory = ({ history }: { history: any }) => {
  const { setHistory } = useHomeState();
  useEffect(() => {
    if (history) setHistory(history);
  }, [history]);

  return <TextToImagePage />;
};

export default ChatHistory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = req.cookies?.token;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const response = await AxiosClient.get("/images", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = response.data?.data;
  return { props: { history: data } };
};
