import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-background">
            <div className="container mx-auto px-4 text-center z-10 relative">
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif text-foreground mb-16 tracking-tight leading-[1.1]">
                    Browse everything.
                </h1>

                <div className="relative mx-auto max-w-6xl mt-12">
                    {/* Extended Green Background Bar */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px] bg-[#899d7a] rounded-[100px] -z-10 origin-center rotate-[-2deg] opacity-90"></div>

                    {/* Main Image Container */}
                    <div className="relative z-10">
                        <Image
                            src="/images/hero.png"
                            alt="Dashboard Interface"
                            width={1200}
                            height={800}
                            className="rounded-2xl shadow-2xl mx-auto border-4 border-white/20"
                            priority
                        />

                        {/* Floating UI Elements (Fake parallax or decorations) */}
                        <div className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hidden lg:block">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                                <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                                <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
