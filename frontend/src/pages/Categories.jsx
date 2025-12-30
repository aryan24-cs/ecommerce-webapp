import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Categories = () => {
    const { products } = useSelector((state) => state.products);

    // Derive categories and count items
    const categoryStats = products.reduce((acc, product) => {
        const cat = product.category || 'Other';
        if (!acc[cat]) {
            acc[cat] = {
                name: cat,
                count: 0,
                image: product.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
            };
        }
        acc[cat].count += 1;
        return acc;
    }, {});

    const categoryList = Object.values(categoryStats);

    // Fallback categories if no products yet
    const displayCategories = categoryList.length > 0 ? categoryList : [
        { name: 'Electronics', count: 0, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Footwear', count: 0, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Clothing', count: 0, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Accessories', count: 0, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 animate-fade-up">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 mb-4">Explore our collections</h2>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight">Curated Categories.</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayCategories.map((cat, index) => (
                        <Link
                            key={cat.name}
                            to={`/products?category=${cat.name}`}
                            className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-premium animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <img
                                src={cat.image}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                alt={cat.name}
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 block">{cat.count} Items</span>
                                <h3 className="text-3xl font-bold text-white mb-4">{cat.name}</h3>
                                <div className="flex items-center gap-2 text-white font-bold text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Shop Collection <FiArrowRight />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
