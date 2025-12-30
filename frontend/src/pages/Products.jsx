import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/layout/Loader';
import { FiSearch, FiSliders, FiGrid, FiList } from 'react-icons/fi';

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const categories = [...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-white w-full overflow-hidden">
            {/* Immersive Header */}
            {/* Immersive Header */}
            {/* Immersive Header */}
            <div className="bg-white text-gray-900 pt-48 pb-24 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block py-2 px-6 rounded-full border border-brand-100 bg-brand-50 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-up text-brand-600">
                        The Collection
                    </span>
                    <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-6 animate-fade-up leading-tight" style={{ animationDelay: '0.1s' }}>
                        Curated <br className="hidden md:block" />
                        Essentials.
                    </h1>
                    <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto animate-fade-up mt-8" style={{ animationDelay: '0.2s' }}>
                        Discover our hand-picked selection of premium goods designed to elevate your everyday life. Quality, aesthetics, and function in perfect harmony.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Filters Sidebar - Sticky & Refined */}
                    <aside className="lg:col-span-3 sticky top-32 z-30 transition-all duration-300">
                        <div className="space-y-10 p-2 md:p-0">

                            {/* Search */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 flex items-center gap-2">
                                    <FiSearch className="text-gray-400" /> Search
                                </h3>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Type to search..."
                                    className="w-full bg-transparent border-b border-gray-200 py-2 text-lg font-display focus:border-black outline-none transition-colors placeholder:text-gray-300"
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 flex items-center gap-2">
                                    <FiGrid className="text-gray-400" /> Filter by
                                </h3>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 flex justify-between items-center group
                                            ${!selectedCategory ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
                                        `}
                                    >
                                        <span className="font-bold">View All</span>
                                        {!selectedCategory && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 flex justify-between items-center group
                                                ${selectedCategory === cat ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
                                            `}
                                        >
                                            <span className="font-medium group-hover:translate-x-1 transition-transform">{cat}</span>
                                            {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                                    <FiSliders className="text-gray-400" /> Price Range
                                </h3>
                                <div className="space-y-6">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-bold text-gray-900 min-w-[80px] text-center">
                                            ${priceRange[0]}
                                        </div>
                                        <span className="text-gray-300 font-light text-sm">to</span>
                                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-bold text-gray-900 min-w-[80px] text-center">
                                            ${priceRange[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="lg:col-span-9 min-h-[600px]">
                        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                {filteredProducts.length} Premium Items
                            </span>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"><FiGrid /></button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"><FiList /></button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-[3/4] bg-gray-100 rounded-[2rem] animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-[3rem]">
                                <FiSearch className="text-4xl text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
                                <p className="text-gray-500 mb-6 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory(''); setPriceRange([0, 1000]); }}
                                    className="btn-modern btn-modern-primary"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
