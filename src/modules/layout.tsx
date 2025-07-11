import Image from "next/image";
import Link from "next/link";

import { Poppins, Open_Sans, Montserrat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cta",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}
    >
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/inkly-logo-black.png"
              alt="Image Generator Logo"
              width={70}
              height={70}
            />
          </Link>
          <nav className="space-x-6 hidden md:flex">
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link href="/features" className="hover:text-orange-500">
              Features
            </Link>
            <Link href="/gallery" className="hover:text-orange-500">
              Gallery
            </Link>
            <Link href="/login" className="hover:text-orange-500">
              Login
            </Link>
          </nav>
        </div>
      </header>
      {children}

      <footer className="bg-white py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p>
              <Link href="/about" className="text-sm hover:text-orange-500">
                About
              </Link>
            </p>
            <p>
              <Link href="/contact" className="text-sm hover:text-orange-500">
                Contact
              </Link>
            </p>
            <p>
              <Link href="/privacy" className="text-sm hover:text-orange-500">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="md:col-span-1 text-center">
            <p className="font-semibold text-sm">Subscribe to our newsletter</p>
            <form className="flex mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md border text-sm"
              />
              <button className="bg-orange-500 text-white px-4 py-2 text-sm rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://twitter.com"
              className="text-orange-500 hover:text-orange-600"
              target="_blank"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-orange-500 hover:text-orange-600"
              target="_blank"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
