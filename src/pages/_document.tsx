import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Image Generator</title>
      <meta
        name="description"
        content="Generate Realistic images with prompt"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      /> */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={""}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
