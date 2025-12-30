import { FiGlobe, FiShield, FiHeart, FiCpu } from 'react-icons/fi';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="animate-fade-up">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 font-bold tracking-widest text-[10px] uppercase mb-6 shadow-sm border border-brand-100">Our Story</span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.1] mb-10 text-gray-900 tracking-tight">
                            Design <br />
                            <span className="italic font-normal">Beyond</span> <br />
                            Utility.
                        </h1>
                    </div>
                    <div className="max-w-3xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <p className="text-xl text-gray-500 font-light leading-relaxed italic">
                            ShopNest was founded on a simple belief: everyday objects should be both functional and beautiful. We curate essentials that blend seamlessly into the modern lifestyle, prioritizing quality, sustainability, and timeless design.
                        </p>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium-xl animate-scale-in">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Modern Studio"
                        />
                    </div>
                    <div className="space-y-12 animate-fade-up">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">Built for the <br /> Modern Human.</h2>
                            <p className="text-gray-600 font-light leading-relaxed">
                                We don't just sell products; we curate experiences. Every item in our catalog undergoes rigorous testing for durability, ethical sourcing, and aesthetic contribution to your space.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                                    <FiGlobe />
                                </div>
                                <h4 className="font-bold text-gray-900">Ethical Sourcing</h4>
                                <p className="text-sm text-gray-500 font-light">Direct partnerships with artisans and certified sustainable factories worldwide.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                                    <FiCpu />
                                </div>
                                <h4 className="font-bold text-gray-900">Tech Forward</h4>
                                <p className="text-sm text-gray-500 font-light">Seamless integration of smart features with elegant hardware design.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h3 className="text-5xl md:text-6xl font-display font-bold text-gray-900 animate-fade-up">Quality that lasts, <br /> Designs that speak.</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-2">
                            <span className="text-4xl font-bold text-brand-600">10k+</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Products Delivered</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-4xl font-bold text-brand-600">95%</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer Satisfaction</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-4xl font-bold text-brand-600">12</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Global Partners</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
