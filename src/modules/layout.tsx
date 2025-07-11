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
      <nav className="flex justify-center space-x-4 mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          Text to Image
        </Link>
        <Link href="/image-to-image" className="text-blue-600 hover:underline">
          Image to Image
        </Link>
      </nav>
      {children}
    </div>
  );
}
