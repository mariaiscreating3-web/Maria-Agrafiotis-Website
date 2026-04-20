import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { LanguageProvider } from "@/components/language-provider";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300"],
});

const siteUrl = "https://mariaagrafiotis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maria Agrafiotis",
    template: "%s — Maria Agrafiotis",
  },
  description:
    "Psychology, trauma, crime, and human behavior. Exploring the warning signs, childhood experiences, and deeper reasons behind why people do the things they do.",
  keywords: [
    "psychology",
    "trauma",
    "criminal psychology",
    "human behavior",
    "psychodynamics",
    "childhood trauma",
    "attachment theory",
    "crime",
    "victims",
    "healing",
    "Maria Agrafiotis",
  ],
  authors: [{ name: "Maria Agrafiotis", url: siteUrl }],
  creator: "Maria Agrafiotis",
  publisher: "Maria Agrafiotis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["el_GR", "de_DE", "es_ES", "fr_FR"],
    url: siteUrl,
    siteName: "Maria Agrafiotis",
    title: "Maria Agrafiotis",
    description:
      "Psychology, trauma, crime, and human behavior. Exploring the deeper reasons behind why people do the things they do.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maria Agrafiotis — Psychology, Trauma, Crime & Human Behavior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Agrafiotis",
    description:
      "Psychology, trauma, crime, and human behavior. Exploring the deeper reasons behind why people do the things they do.",
    images: ["/og-image.png"],
    creator: "@mariaagrafiotis",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": `${siteUrl}`,
      "el": `${siteUrl}`,
      "de": `${siteUrl}`,
      "es": `${siteUrl}`,
      "fr": `${siteUrl}`,
    },
  },
  verification: {
    // Add Google Search Console verification token here when you have it:
    // google: "your-google-verification-token",
  },
};

// JSON-LD structured data
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maria Agrafiotis",
  url: siteUrl,
  description:
    "Writer and researcher exploring psychology, trauma, crime, and human behavior.",
  knowsAbout: [
    "Psychology",
    "Trauma",
    "Criminal Psychology",
    "Psychodynamics",
    "Human Behavior",
    "Childhood Attachment",
    "Victimology",
  ],
  knowsLanguage: ["English", "Greek"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maria Agrafiotis",
  url: siteUrl,
  description:
    "Psychology, trauma, crime, and human behavior — exploring the deeper reasons behind why people do the things they do.",
  author: {
    "@type": "Person",
    name: "Maria Agrafiotis",
  },
  inLanguage: ["en", "el", "de", "es", "fr"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${raleway.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
