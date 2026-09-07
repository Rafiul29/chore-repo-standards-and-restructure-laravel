import React from "react";
import { Head } from "@inertiajs/react";
import { SITE_CONFIG } from "@/constants/siteConfig";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    imageAlt?: string; // Social media image alternative text (WhatsApp/Facebook/Twitter)
    url?: string;
    type?: "website" | "article" | "product" | "profile" | "book";
    noindex?: boolean;

    // Article Specific Props
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;

    // E-commerce Product Specific Props
    productPrice?: string | number;
    productCurrency?: string;
    productAvailability?: "instock" | "oos" | "pending";
    productCondition?: "new" | "used" | "refurbished";

    // Social Specific IDs (Optional)
    fbAppId?: string;
}

export default function SEO({
    title,
    description,
    keywords,
    image,
    imageAlt,
    url,
    type = "website",
    noindex = false,
    publishedTime,
    modifiedTime,
    author,
    section,
    productPrice,
    productCurrency,
    productAvailability = "instock",
    productCondition = "new",
    fbAppId,
}: SEOProps) {
    const fullTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : SITE_CONFIG.name;
    const currentDescription = description || SITE_CONFIG.defaultDescription;

    const currentImage = image
        ? image.startsWith("http")
            ? image
            : `${SITE_CONFIG.baseUrl}${image}`
        : `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultImage}`;

    const currentUrl = url
        ? `${SITE_CONFIG.baseUrl}${url}`
        : SITE_CONFIG.baseUrl;
    const currentImageAlt = imageAlt || fullTitle;

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={currentDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author || SITE_CONFIG.author} />
            <meta name="publisher" content={SITE_CONFIG.publisher} />

            {/* Robots / Indexing Control */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
            )}

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook, WhatsApp & LinkedIn Meta Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_CONFIG.name} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={currentDescription} />
            <meta property="og:image" content={currentImage} />
            <meta property="og:image:secure_url" content={currentImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={currentImageAlt} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:locale" content={SITE_CONFIG.locale} />

            {/* Facebook Specific App ID (Optional) */}
            {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

            {/* Article Specific Open Graph Tags (Blog / News) */}
            {type === "article" && (
                <>
                    {publishedTime && (
                        <meta
                            property="article:published_time"
                            content={publishedTime}
                        />
                    )}
                    {modifiedTime && (
                        <meta
                            property="article:modified_time"
                            content={modifiedTime}
                        />
                    )}
                    <meta
                        property="article:author"
                        content={author || SITE_CONFIG.author}
                    />
                    {section && (
                        <meta property="article:section" content={section} />
                    )}
                </>
            )}

            {/* E-commerce Product Specific Open Graph Tags */}
            {type === "product" && (
                <>
                    {productPrice && (
                        <meta
                            property="product:price:amount"
                            content={String(productPrice)}
                        />
                    )}
                    <meta
                        property="product:price:currency"
                        content={productCurrency || SITE_CONFIG.currency}
                    />
                    <meta
                        property="product:availability"
                        content={productAvailability}
                    />
                    <meta
                        property="product:condition"
                        content={productCondition}
                    />
                </>
            )}

            {/* Twitter / X Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
            <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={currentDescription} />
            <meta name="twitter:image" content={currentImage} />
            <meta name="twitter:image:alt" content={currentImageAlt} />

            {/* Instagram / Meta Platforms General Optimization */}
            <meta name="format-detection" content="telephone=no" />
        </Head>
    );
}
