import { Head } from "@inertiajs/react";

import {
    HomeCategoryNav,
    HomeFeaturedCategories,
    HomeFooter,
    HomeHeader,
    HomeHero,
    HomeTrustStrip,
} from "@/components/home";

export default function Welcome() {
    return (
        <>
            <Head title="Ghorer Bazar — Organic Food Marketplace" />
            <div
                className="min-h-screen font-sans"
                style={{ background: "#FDF6EC", color: "#1F2A22" }}
            >
                <HomeHeader />
                <HomeCategoryNav />
                <main>
                    <HomeHero />
                    <HomeTrustStrip />
                    <HomeFeaturedCategories />
                </main>
                <HomeFooter />
            </div>
        </>
    );
}
