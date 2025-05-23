import HistoryPage from "@/modules/history/page";
import { GetServerSideProps } from "next";
import React from "react";

const ChatHistory = async () => {
  return <HistoryPage />;
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
  return { props: {} };
};
