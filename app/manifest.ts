import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maria Agrafiotis",
    short_name: "M. Agrafiotis",
    description:
      "Psychology, trauma, crime, and human behavior — exploring the deeper reasons behind why people do the things they do.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0E8",
    theme_color: "#1C1C1C",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
