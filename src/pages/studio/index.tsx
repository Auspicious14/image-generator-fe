
import { GetServerSideProps } from "next";
import { ArtTransformPage} from "@/modules/studio/page";
import { AxiosClient } from "@/components/Api";

export default function ArtTransform() {
  return <ArtTransformPage />;
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
