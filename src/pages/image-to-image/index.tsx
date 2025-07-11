import { GetServerSideProps } from "next";
import { ImageToImageProvider } from "@/modules/image-to-image/context";
import ImageToImagePage from "@/modules/image-to-image/page";
import { AxiosClient } from "@/components/Api";

export default function ImageToImage() {
  return (
    <ImageToImageProvider>
      <ImageToImagePage />
    </ImageToImageProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies?.token;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // You might want to fetch some initial data here if needed for the page
  // For now, it just checks authentication
  try {
    await AxiosClient.get("/auth/check", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
};