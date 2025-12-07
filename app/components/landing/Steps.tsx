export default function Steps() {
    const steps = [
        { number: "01", title: "Connect", desc: "Integrate your data sources with a single click." },
        { number: "02", title: "Analyze", desc: "Let our AI engine process and structure your information." },
        { number: "03", title: "Grow", desc: "Make data-driven decisions that propel your business forward." }
    ];

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-serif mb-16">Map Your Success</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col gap-4 border-l border-border pl-8 py-4 hover:border-primary transition-colors duration-300">
                            <span className="text-6xl font-serif text-muted/30 font-bold">{step.number}</span>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
