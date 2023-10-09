import "./globals.css";
import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { FeedbackContext, FeedbackProvider } from "@/context/FeedbackContext";

// const inter = Inter({ subsets: ['latin'] })
const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App",
  description: "Created by CHR Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <FeedbackProvider>{children}</FeedbackProvider>
      </body>
    </html>
  );
}
