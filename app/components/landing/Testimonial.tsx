import Image from "next/image";

export default function Testimonial() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
                        <Image
                            src="/images/abstract.png"
                            alt="Abstract Art"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <blockquote className="font-serif text-3xl md:text-4xl leading-tight mb-8">
                            &quot;I was skeptical, but Area has completely transformed the way I manage my business. The data visualizations are useless and intuitive, and the platform is easy to use. I can&apos;t imagine running my company without it.&quot;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center font-serif font-bold text-primary">A</div>
                            <div>
                                <div className="font-bold">Alex Chen</div>
                                <div className="text-sm text-muted-foreground">CEO, TechFlow</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
