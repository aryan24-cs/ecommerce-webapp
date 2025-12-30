import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    const updateQty = (productId, currentQty, stock, change) => {
        const newQty = currentQty + change;
        if (newQty >= 1 && newQty <= stock) {
            dispatch(addToCart({ productId, quantity: change }));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6 pt-20 pb-20">
                <div className="text-center animate-fade-up">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FiShoppingBag className="text-4xl text-gray-300" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Your bag is empty.</h1>
                    <p className="text-gray-500 mb-10 font-light italic">Start exploring our collection to find your next essential.</p>
                    <Link to="/products" className="btn-modern btn-modern-primary px-10">
                        View Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-display font-bold text-gray-900 mb-12 tracking-tight">Shopping Bag</h1>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-8">
                        {cartItems.map((item) => (
                            <div key={item.product?._id} className="flex gap-6 pb-8 border-b border-gray-100 animate-fade-up">
                                <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gray-50">
                                    <img
                                        src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/150'}
                                        alt={item.product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-2">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">{item.product?.category}</span>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.product?._id))}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product?.name}</h3>
                                        <p className="text-gray-400 text-sm font-light">Unit Price: ${item.price?.toFixed(2)}</p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center p-1 bg-gray-50 rounded-xl">
                                            <button
                                                onClick={() => updateQty(item.product?._id, item.quantity, item.product?.stock, -1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="px-4 font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQty(item.product?._id, item.quantity, item.product?.stock, 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 sticky top-32 h-fit">
                        <div className="bg-gray-50 rounded-[2.5rem] p-10">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-8">Order Summary</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between text-gray-500 font-light">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-light">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="h-px bg-gray-200 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="btn-modern btn-modern-primary w-full py-4 text-lg mt-6"
                                >
                                    Checkout <FiArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                        <p className="mt-6 text-center text-[10px] text-gray-400 uppercase tracking-widest">Secure checkout enabled</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
