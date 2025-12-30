import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderSuccess } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { FiMapPin, FiPhone, FiCreditCard, FiArrowRight } from 'react-icons/fi';

const Checkout = () => {
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        country: 'USA',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { loading, success, order } = useSelector((state) => state.orders);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    useEffect(() => {
        if (success && order) {
            dispatch(clearCart());
            dispatch(resetOrderSuccess());
            navigate('/order-success', { state: { orderId: order._id, order } });
        }
    }, [success, order, navigate, dispatch]);

    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error('Your bag is empty');
            return;
        }

        const orderData = {
            shippingInfo,
            orderItems: cartItems.map((item) => ({
                name: item.product?.name,
                quantity: item.quantity,
                image: item.product?.images?.[0]?.url || '',
                price: item.price,
                product: item.product?._id,
            })),
            itemsPrice: subtotal,
            taxPrice: subtotal * 0.05,
            shippingPrice: shipping,
            totalPrice: total + (subtotal * 0.05),
        };

        dispatch(createOrder(orderData));
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-display font-bold text-gray-900 mb-12 tracking-tight">Checkout</h1>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Shipping Form */}
                    <div className="lg:col-span-7 space-y-10 animate-fade-up">
                        <div className="bg-gray-50 rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <FiMapPin className="text-brand-600" /> Shipping Information
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                        placeholder="123 Modern St"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                            placeholder="New York"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingInfo.postalCode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                            placeholder="10001"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phoneNo"
                                                value={shippingInfo.phoneNo}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                                placeholder="123-456-7890"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Country</label>
                                        <select
                                            name="country"
                                            value={shippingInfo.country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                        >
                                            <option value="USA">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || cartItems.length === 0}
                                    className="btn-modern btn-modern-primary w-full py-5 text-lg mt-4 flex items-center justify-center gap-2"
                                >
                                    <FiCreditCard />
                                    {loading ? 'Processing...' : 'Complete Purchase'} <FiArrowRight />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Cart Preview */}
                    <div className="lg:col-span-5 h-fit sticky top-32">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-8">Your Items</h2>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <img
                                            src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/60'}
                                            alt=""
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.product?.name}</p>
                                            <p className="text-xs text-gray-400 font-light">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-50 space-y-4">
                                <div className="flex justify-between text-gray-500 font-light text-sm">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-light text-sm">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-900">${(subtotal * 0.05).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-light text-sm">
                                    <span>Shipping</span>
                                    <span className="text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="h-px bg-gray-50 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">${(total + (subtotal * 0.05)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
