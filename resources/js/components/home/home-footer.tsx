export function HomeFooter() {
    return (
        <footer style={{ background: "#16241C" }} className="text-[#FDF6EC]">
            <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <span className="gb-font-display text-lg font-bold">
                            Ghorer
                            <span style={{ color: "#F4801F" }}>Bazar</span>
                        </span>
                        <p className="mt-3 text-sm text-[#FDF6EC]/70">
                            A trusted online marketplace for pure and certified
                            organic products.
                        </p>
                    </div>
                    <div>
                        <p className="mb-3 text-sm font-semibold">
                            Quick Links
                        </p>
                        <ul className="space-y-2 text-sm text-[#FDF6EC]/70">
                            <li>Offer Zone</li>
                            <li>Honey & Oil</li>
                            <li>Spices & Nuts</li>
                            <li>Certified Products</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-3 text-sm font-semibold">
                            Customer Service
                        </p>
                        <ul className="space-y-2 text-sm text-[#FDF6EC]/70">
                            <li>Track Order</li>
                            <li>Return Policy</li>
                            <li>Contact Us</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-3 text-sm font-semibold">Contact</p>
                        <ul className="space-y-2 text-sm text-[#FDF6EC]/70">
                            <li>Dhaka, Bangladesh</li>
                            <li>hello@ghorerbazar.example</li>
                            <li>+880 1234 567890</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-[#FDF6EC]/60">
                    ©{" "}
                    <span suppressHydrationWarning>
                        {new Date().getFullYear()}
                    </span>{" "}
                    Ghorer Bazar. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
