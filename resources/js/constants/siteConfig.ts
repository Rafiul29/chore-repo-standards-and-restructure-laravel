const FALLBACK_SITE_URL = "http://localhost:8000";

export interface SiteConfig {
    name: string;
    shortName: string;
    baseUrl: string;
    defaultDescription: string;
    defaultImage: string;
    twitterHandle: string;
    locale: string;
    author: string;
    publisher: string;
    currency: string; // default currency for the e-commerce store
}

export const SITE_CONFIG: SiteConfig = {
    name: "My Laravel App",
    shortName: "MyApp",
    baseUrl: (import.meta.env.VITE_APP_URL as string) || FALLBACK_SITE_URL,
    defaultDescription:
        "Discover amazing products, services, and articles on our Laravel and React application.",
    defaultImage: "/images/og-default.jpg",
    twitterHandle: "@myhandle",
    locale: "en_US",
    author: "My Laravel App Team",
    publisher: "My Laravel App",
    currency: "USD",
};
