import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { siteConfig, isTodo } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

/**
 * Le titre reste volontairement sans nom de ville tant que la localisation
 * n'est pas confirmée. Une fois `siteConfig.city` renseignée, il suffira
 * d'ajouter `— ${siteConfig.city}` ici et de décliner les pages
 * « [Service] à [Ville] ».
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} | Services Automobiles`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: [
    "services automobiles",
    "véhicule hybride",
    "véhicule électrique",
    "diagnostic automobile",
    "expertise haute tension",
    "réparation et entretien",
    "performance et tuning",
  ],
  alternates: { canonical: "/" },
  // Favicon : le logo officiel, référencé depuis son emplacement d'origine.
  icons: { icon: "/images/logo.jpg", apple: "/images/logo.jpg" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: `${siteConfig.siteName} | Services Automobiles`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1067,
        alt: `${siteConfig.siteName} — services automobiles`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} | Services Automobiles`,
    description: siteConfig.description,
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

/**
 * Données structurées. Adresse et horaires sont omis tant qu'ils ne sont pas
 * confirmés : mieux vaut un balisage incomplet qu'un balisage inventé.
 */
function StructuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/images/hero.jpg`,
  };

  if (!isTodo(siteConfig.address)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "TN",
    };
  }
  if (!isTodo(siteConfig.openingHours)) {
    data.openingHours = siteConfig.openingHours;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      `suppressHydrationWarning` est ici indispensable et volontaire : le script
      ci-dessous ajoute la classe `js` sur <html> AVANT l'hydratation, si bien
      que le HTML serveur et le DOM client diffèrent nécessairement sur cet
      attribut. C'est le mécanisme prévu par React pour les mutations du DOM
      antérieures à l'hydratation ; la portée est limitée aux attributs de
      <html> et n'affecte ni le SSR, ni le reste de l'arbre.
    */
    <html
      lang="fr"
      className={`${inter.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Pose `.js` avant le premier rendu. Les effets d'apparition ne
          masquent le contenu que si cette classe est présente : sans
          JavaScript, la page reste intégralement lisible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a
          href="#services"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
        >
          Aller au contenu principal
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
