import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EXECUTE",
  description: "Digital Leverage - We create unfair growth advantages using technology.",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/Gemini_Generated_Image_haomafhaomafhaom-removebg-preview-1768105474542.png?width=8000&height=8000&resize=contain",
    apple: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/17c27023-7d7f-44fd-8195-37b5ec48727a/Gemini_Generated_Image_haomafhaomafhaom-removebg-preview-1768105474542.png?width=8000&height=8000&resize=contain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
<head>
<link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-poppins: 'Poppins', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="17c27023-7d7f-44fd-8195-37b5ec48727a"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
