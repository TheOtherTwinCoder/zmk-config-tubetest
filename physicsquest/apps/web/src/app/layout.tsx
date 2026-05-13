import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysicsQuest — Learn Physics from Age 5 to Grade 12",
  description:
    "A gamified, Socratic physics journey from wonder to mastery. Build real understanding through simulations, big questions, and adaptive tutoring.",
  keywords: ["physics", "education", "kids", "learning", "science", "STEM"],
  openGraph: {
    title: "PhysicsQuest",
    description: "Physics from wonder to mastery — age 5 to Grade 12",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4361EE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
