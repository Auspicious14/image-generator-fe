import { GetServerSideProps } from "next";
import { HomePage } from "@/modules/home/page";
import { AxiosClient } from "@/components/Api";
import Link from "next/link";

export default function Home({ history }: { history: any }) {
  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Welcome to Image Generator!</h1>
        <p className="text-lg text-center mb-8">
          Unleash your creativity with our powerful image generation tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Text to Image</h2>
            <p className="mb-4">
              Transform your textual prompts into stunning visual masterpieces.
              Describe what you envision, and our AI will bring it to life.
            </p>
            <Link href="/chat" className="text-blue-600 hover:underline">
              Try Text to Image
            </Link>
          </div>
          <div className="p-6 border rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Image to Image</h2>
            <p className="mb-4">
              Modify existing images or generate new ones based on an input
              image and a prompt. Perfect for creative transformations and style
              transfers.
            </p>
            <Link
              href="/image-to-image"
              className="text-blue-600 hover:underline"
            >
              Try Image to Image
            </Link>
          </div>
        </div>
        <div className="mt-12 w-full max-w-4xl">
          <HomePage />
          </div>
          </div> */}
      <HomePage />
    </>
  );
}

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
