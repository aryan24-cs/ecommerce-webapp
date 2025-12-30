import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const featuredProducts = products?.slice(0, 4) || [];

    return (
        <div className="bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-up">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 font-bold tracking-widest text-[10px] uppercase mb-6 shadow-sm border border-brand-100">
                            New Collection 2025
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.1] mb-8 text-gray-900 tracking-tight">
                            Essential <br />
                            <span className="italic font-normal">Styles for</span> <br />
                            Modern Living.
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                            Carefully curated essentials that blend timeless design with contemporary function. Elevate your everyday.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                            <Link to="/products" className="btn-modern btn-modern-primary text-lg px-10 py-4">
                                Shop Collection <FiArrowRight />
                            </Link>
                            <Link to="/about" className="btn-modern btn-modern-secondary text-lg px-10 py-4">
                                Our Story
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="relative z-10 aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-[2rem] shadow-premium-xl animate-scale-in">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                                alt="Featured Item"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 right-6 p-6 glass-header rounded-2xl">
                                <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-1">Featured</p>
                                <h3 className="text-xl font-bold text-gray-900">Elite Performance Sneakers</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold">$189.00</span>
                                    <Link to="/products" className="text-sm font-bold text-brand-600 flex items-center gap-1 hover:gap-2 transition-all">
                                        Shop Now <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Shapes */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce lg:hidden">
                    <FiArrowDown className="text-gray-300 text-2xl" />
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">Best Sellers</h2>
                        <p className="text-lg text-gray-500 font-light">The items everyone is talking about. Hand-picked for quality and comfort.</p>
                    </div>
                    <Link to="/products" className="text-black font-bold border-b-2 border-black pb-1 hover:text-brand-600 hover:border-brand-600 transition-colors">
                        View All Products
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-gray-50 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-gray-50 rounded-3xl text-center">
                                <p className="text-gray-400">No products available yet. Add some from the Admin Panel!</p>
                                <Link to="/admin/products/new" className="text-brand-600 font-bold mt-2 inline-block underline">Add Item</Link>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Categories / Banner */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
                    <div className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-premium">
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                            alt="Electronics"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                        <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                            <h3 className="text-3xl font-bold mb-2">Tech Essentials</h3>
                            <p className="text-white/80 max-w-xs mb-6 font-light">Premium gadgets for your digital lifestyle.</p>
                            <span className="w-fit px-6 py-2 bg-white text-black rounded-full font-bold text-sm">Shop Now</span>
                        </div>
                    </div>
                    <div className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-premium">
                        <img
                            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
                            alt="Footwear"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                        <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                            <h3 className="text-3xl font-bold mb-2">Premium Footwear</h3>
                            <p className="text-white/80 max-w-xs mb-6 font-light">Crafted for comfort and style.</p>
                            <span className="w-fit px-6 py-2 bg-white text-black rounded-full font-bold text-sm">Shop Now</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-display font-bold mb-4">Stay in focus.</h2>
                    <p className="text-xl text-gray-500 mb-10 font-light italic">Receive design-centric updates and early access to drops.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full border border-gray-100 bg-gray-50 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                        />
                        <button className="btn-modern btn-modern-primary py-4 px-8">Subscribe</button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest">No spam, just premium content.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
