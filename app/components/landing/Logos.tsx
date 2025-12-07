import { Share2, Command, Cpu, Globe, Zap, Layers } from "lucide-react";

export default function Logos() {
    const logos = [
        { name: "Layers", icon: Layers },
        { name: "Command", icon: Command },
        { name: "Cpu", icon: Cpu },
        { name: "Global", icon: Globe },
        { name: "Zap", icon: Zap },
        { name: "Share", icon: Share2 },
    ];

    return (
        <section className="py-12 border-b border-border/40">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, i) => (
                        <div key={i} className="flex items-center gap-2 group cursor-pointer">
                            <logo.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-serif font-bold text-xl hidden sm:block">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
