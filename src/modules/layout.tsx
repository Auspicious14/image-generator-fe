import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/">
        <Image
          src="/inkly-logo-black.png"
          alt="Image Generator Logo"
          width={160}
          height={40}
          className="mx-auto mb-6 w-40 my-4 dark:invert"
        />
      </Link>
      {children}
    </div>
  );
}
