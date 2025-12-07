export default function Comparison() {
    const features = ["Data encryption", "Private cloud", "Admin console", "SSO integration", "API access", "Priority support"];

    return (
        <section className="py-24 bg-gradient-to-b from-transparent to-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Compare</span>
                    <h2 className="text-4xl md:text-5xl font-serif mt-4">Why Choose Area?</h2>
                </div>

                <div className="max-w-4xl mx-auto bg-background rounded-3xl p-8 border border-border shadow-sm">
                    <div className="grid grid-cols-3 gap-4 mb-6 border-b border-border pb-4">
                        <div className="font-serif font-bold text-lg">Features</div>
                        <div className="font-serif font-bold text-lg text-center text-muted-foreground">Legacy</div>
                        <div className="font-serif font-bold text-lg text-center text-primary">Area</div>
                    </div>

                    {features.map((feature, i) => (
                        <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-border/50 hover:bg-secondary/10 transition-colors rounded-lg px-2">
                            <div className="font-medium text-sm md:text-base flex items-center">{feature}</div>
                            <div className="text-center text-muted-foreground flex items-center justify-center">
                                {i % 2 === 0 ? "—" : "Limited"}
                            </div>
                            <div className="text-center text-primary flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
