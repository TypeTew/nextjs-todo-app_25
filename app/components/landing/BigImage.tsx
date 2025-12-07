import Image from "next/image";

interface BigImageProps {
    src?: string;
    alt?: string;
    className?: string;
}

export default function BigImage({ src = "/images/landscape.png", alt = "Scenic Landscape", className = "" }: BigImageProps) {
    return (
        <section className={`py-12 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-1000"
                    />
                </div>
            </div>
        </section>
    );
}
