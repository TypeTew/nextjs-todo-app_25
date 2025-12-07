import Image from "next/image";
import Button from "../Button";

interface SplitSectionProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle?: string;
    description: string;
    imageFirst?: boolean;
}

export default function SplitSection({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    description,
    imageFirst = false
}: SplitSectionProps) {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col gap-16 items-center ${imageFirst ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-secondary/30">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                        {subtitle && <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{subtitle}</span>}
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">{title}</h2>
                        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                            {description}
                        </p>
                        <Button variant="primary" size="lg" className="rounded-full px-8">
                            Learn More
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
