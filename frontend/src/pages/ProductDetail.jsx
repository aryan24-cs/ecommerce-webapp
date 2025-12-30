import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/layout/Loader';
import { toast } from 'react-toastify';
import { FiPlus, FiMinus, FiArrowLeft, FiShoppingCart, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProductDetails(id));
        return () => {
            dispatch(clearProductDetails());
        };
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.info('Please sign in to shop', { theme: 'light' });
            navigate('/login');
            return;
        }
        dispatch(addToCart({ productId: product._id, quantity }));
        toast.success('Added to collection', { theme: 'light', position: 'bottom-center' });
    };

    const increaseQty = () => quantity < product.stock && setQuantity(quantity + 1);
    const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

    if (loading || !product) return <Loader />;

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-black">Products</Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Gallery */}
                    <div className="lg:col-span-7 grid grid-cols-1 gap-6">
                        <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 shadow-premium">
                            <img
                                src={product.images?.[selectedImage]?.url || 'https://via.placeholder.com/800'}
                                alt={product.name}
                                className="w-full h-full object-cover animate-scale-in"
                            />
                        </div>
                        {product.images?.length > 1 && (
                            <div className="flex gap-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square w-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-black' : 'border-transparent opacity-60'}`}
                                    >
                                        <img src={img.url} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-5 sticky top-32 space-y-10">
                        <div className="animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-4 inline-block">{product.category}</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-3xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                                <span className="text-sm font-light text-gray-500 mb-1">Inclusive of all taxes</span>
                            </div>
                            <p className="text-lg text-gray-600 font-light leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-gray-100 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            {product.stock > 0 ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-2xl w-fit">
                                        <button onClick={decreaseQty} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><FiMinus /></button>
                                        <span className="px-6 font-bold text-lg">{quantity}</span>
                                        <button onClick={increaseQty} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><FiPlus /></button>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            className="btn-modern btn-modern-primary flex-1 py-5 text-lg"
                                        >
                                            <FiShoppingCart /> Add to Bag
                                        </button>
                                        <button className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                                            <FiRefreshCw />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
                                    <p className="text-red-600 font-bold uppercase tracking-widest text-xs">Currently Out of Stock</p>
                                    <p className="text-red-400 text-sm mt-1">Check back later or join the waitlist.</p>
                                </div>
                            )}
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900"><FiTruck /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900"><FiShield /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">2 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900"><FiRefreshCw /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
