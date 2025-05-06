import HistoryPage from "@/modules/history/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ChatHistory = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    redirect("/signin");
  }

  return <HistoryPage />;
};

export default ChatHistory;
