import { Code2, Database, Lock } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: Code2,
            subtitle: "Clean Code",
            text: "Our architecture is built for speed and scalability, ensuring your application grows with your business without technical debt."
        },
        {
            icon: Database,
            subtitle: "Data First",
            text: "We prioritize data integrity and accessibility. Your information is structured, secure, and always available when you need it."
        },
        {
            icon: Lock,
            subtitle: "Secure by Design",
            text: "Security isn't an afterthought. It's woven into the fabric of our platform using state-of-the-art encryption standards."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-serif mb-16 text-left">
                    We&apos;ve cracked the code.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <feature.icon className="h-8 w-8 text-primary mb-2" />
                            <h3 className="text-lg font-bold font-serif uppercase tracking-wider text-muted-foreground">{feature.subtitle}</h3>
                            <p className="text-lg leading-relaxed text-foreground/80">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
