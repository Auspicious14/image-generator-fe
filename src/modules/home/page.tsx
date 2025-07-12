// "use client";

// import React, { useState } from "react";
// import { useHomeState } from "./context";
// import { Button } from "@/components";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../auth/context";

// export const HomePage = () => {
//   const router = useRouter();
//   const [prompt, setPrompt] = useState("");
//   const { loading, image, generateImage } = useHomeState();
//   const { authStatus } = useAuth();

//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateImage(prompt).then((res) => {
//       if (res) {
//         setPrompt("");
//       }
//     });
//   };
//   const handleDownload = () => {
//     if (!image) return;
//     fetch(image)
//       .then((res) => res.blob())
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `generated-image-${Date.now()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       });
//   };

//   return (
//     <div className=" min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">
//             Generate Amazing Images Instantly
//           </h1>
//           <p className="text-xl text-gray-600">
//             Create stunning AI-generated images for free - no signup required!
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <textarea
//               // type="textarea"
//               value={prompt}
//               rows={4}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder={
//                 loading
//                   ? "Generating your image..."
//                   : "Describe the image you want to create..."
//               }
//               className={`outline-none flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-blue-500 focus:border-none ${
//                 loading ? "animate-pulse" : ""
//               }`}
//             />
//             {authStatus === "authenticated" ? (
//               <Button
//                 // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
//                 variant="primary"
//                 onClick={() => handleGenerate()}
//                 disabled={loading}
//                 isLoading={loading}
//               >
//                 Generate
//               </Button>
//             ) : (
//               <Button
//                 variant="primary"
//                 // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
//                 onClick={() => router.push("/signin")}
//               >
//                 Signin to Continue
//               </Button>
//             )}
//           </div>

//           {loading ? (
//             <div className="border rounded-lg overflow-hidden animate-pulse">
//               <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-gradient-shine" />
//               <div className="h-12 bg-gray-200 mx-4 mb-4 rounded" />
//             </div>
//           ) : (
//             image && (
//               <div className="border rounded-lg overflow-hidden">
//                 <img
//                   src={image}
//                   alt="Generated"
//                   width={1024}
//                   height={1024}
//                   className="w-full h-96 object-cover"
//                 />
//                 <button
//                   onClick={handleDownload}
//                   className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors"
//                 >
//                   Download Image
//                 </button>
//               </div>
//             )
//           )}
//         </div>

//         <div className="bg-blue-50 rounded-xl p-6 text-center">
//           <h3 className="text-xl font-semibold mb-2">
//             🔒 Save Your Creations Forever
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Create an account to access your full generation history and manage
//             your favorite prompts.
//           </p>

//           <Button
//             variant="primary"
//             // className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
//             onClick={() => router.push("/signin")}
//           >
//             Signin to Continue
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HomePage = () => {
  return (
    <main className="bg-white text-gray-800">
      <section className="pt-24 md:pt-32 h-[100vh] md:h-[90vh] lg:h-[110vh] bg-gradient-to-r from-blue-500 to-gray-100 relative text-center flex flex-col items-center justify-center px-4">
        <Image
          src="/hero-bg.webp"
          alt="Ghibli Forest"
          layout="fill"
          objectFit="cover"
          quality={"90"}
          priority
          className="z-0 w-full brightness-75"
        />
        <motion.div
          className="absolute inset-0 bg-black/40 z-10 flex flex-col justify-center items-center text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Create Stunning Art with AI
          </h2>
          <p className="text-lg md:text-xl mt-4">
            Transform your photos into Studio Ghibli masterpieces or generate
            unique images from text.
          </p>
          <Link href="/features">
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-6 bg-orange-500 text-white px-8 py-4 text-lg rounded-full font-bold"
            >
              Try Now for Free
            </motion.button>
          </Link>
        </motion.div>
      </section>
      {/* Benefits */}
      <motion.section
        className="py-16 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Why Choose Inkly AI?
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: "🖌",
              title: "AI Art Generation",
              desc: "Create images from text prompts in seconds.",
            },
            {
              icon: "🖼",
              title: "Studio Ghibli Transformations",
              desc: "Turn photos into whimsical art.",
            },
            {
              icon: "🗂",
              title: "Personal Gallery",
              desc: "Save and view your creations.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-blue-100 to-gray-100 rounded-lg shadow-md p-6 text-center"
            >
              <div className="text-4xl text-orange-500 rounded-full p-2 inline-block">
                {icon}
              </div>
              <h4 className="mt-4 font-bold text-xl">{title}</h4>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Testimonials */}
      <motion.section
        className="bg-gray-50 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Loved by Creators
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Jane D.",
              quote:
                "Inkly AI made my photos look like they came from a Ghibli film!",
              avatar: "/avatars/jane.webp",
            },
            {
              name: "Sarah M.",
              quote: "The AI art generation is fast and easy to use.",
              avatar: "/avatars/sarah.webp",
            },
            {
              name: "Alex A.",
              quote: "A fantastic tool for any creative looking to experiment.",
              avatar: "/avatars/alex.webp",
            },
          ].map(({ name, quote, avatar }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <Image
                  src={avatar}
                  alt={name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm italic text-gray-700">"{quote}"</p>
                  <p className="text-xs text-gray-500 mt-1">— {name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>{" "}
    </main>
  );
};
