import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { FiPlus, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ productId: product._id, quantity: 1 }));
        toast.success('Added to cart', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
        });
    };

    return (
        <div className="group animate-fade-up">
            <Link to={`/product/${product._id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 mb-4 transition-all duration-500 group-hover:shadow-premium-xl">
                    <img
                        src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.stock === 0 && (
                            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-red-600 shadow-sm">
                                Sold Out
                            </span>
                        )}
                        {product.price < 50 && (
                            <span className="bg-brand-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                                Best Value
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-900 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white">
                        <FiHeart />
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center opacity-0 transform translate-y-4 transition-all duration-300 delay-75 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gray-800"
                    >
                        <FiPlus size={24} />
                    </button>
                </div>

                <div className="px-1">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">{product.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                        {product.price > 100 && (
                            <span className="text-sm text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
