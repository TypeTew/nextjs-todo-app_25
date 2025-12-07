import Link from "next/link";
import Button from "../Button";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl md:text-6xl font-serif mb-8">Connect with us</h2>
                <p className="max-w-xl mx-auto text-muted-foreground mb-12">
                    Stay updated with the latest news and features from Area. Join our newsletter today.
                </p>

                <div className="max-w-md mx-auto mb-16">
                    <Button variant="primary" size="lg" className="w-full rounded-full h-14 text-lg">
                        Get Started
                    </Button>
                </div>

                <div className="flex justify-between items-center border-t border-border pt-8 flex-col md:flex-row gap-8">
                    <div className="flex gap-8 text-sm font-medium">
                        <Link href="#" className="hover:text-primary">Books</Link>
                        <Link href="#" className="hover:text-primary">Televisions</Link>
                        <Link href="#" className="hover:text-primary">News</Link>
                        <Link href="#" className="hover:text-primary">Travels</Link>
                    </div>

                    <div className="flex gap-6 text-muted-foreground">
                        <Twitter className="h-5 w-5 hover:text-primary cursor-pointer" />
                        <Instagram className="h-5 w-5 hover:text-primary cursor-pointer" />
                        <Linkedin className="h-5 w-5 hover:text-primary cursor-pointer" />
                        <Facebook className="h-5 w-5 hover:text-primary cursor-pointer" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                        &copy; 2024 Area Inc.
                    </div>
                </div>
            </div>
        </footer>
    );
}
