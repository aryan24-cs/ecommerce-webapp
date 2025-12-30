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
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="animate-fade-up">
                        <h1 className="text-5xl font-display font-bold text-gray-900 tracking-tight mb-4">Shop All</h1>
                        <p className="text-lg text-gray-500 font-light italic">Refined essentials for the modern everyday.</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                        <span>Showing {filteredProducts.length} Results</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-3 space-y-10">

                        {/* Search */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Search</h3>
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="What are you looking for?"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-brand-100 transition-all font-light"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Categories</h3>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setSelectedCategory('')}
                                    className={`text-left px-4 py-2 rounded-xl transition-all text-sm font-medium ${!selectedCategory ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    All Items
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left px-4 py-2 rounded-xl transition-all text-sm font-medium ${selectedCategory === cat ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Min</span>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="bg-transparent outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Max</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="bg-transparent outline-none font-bold text-sm"
                                        />
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full accent-black"
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="lg:col-span-9">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-[4/5] bg-gray-50 rounded-3xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="py-20 text-center bg-gray-50 rounded-[2.5rem]">
                                <p className="text-xl text-gray-400 font-light">No products match your criteria.</p>
                                <button onClick={() => { setSearchTerm(''); setSelectedCategory(''); setPriceRange([0, 1000]); }} className="mt-4 text-brand-600 font-bold underline">Clear all filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
