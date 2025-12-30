import { Link, useLocation } from 'react-router-dom';
import { FiCheck, FiPackage, FiHome, FiArrowRight, FiTruck } from 'react-icons/fi';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, order } = location.state || {};

    return (
        <div className="min-h-screen bg-white pt-40 pb-24 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full text-center mb-16 animate-fade-up">
                <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-100">
                    <FiCheck className="text-5xl text-green-600" />
                </div>

                <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">Order Confirmed.</h1>
                <p className="text-xl text-gray-500 font-light italic mb-2">Thank you for your purchase.</p>
                <p className="text-gray-400 font-light">We've sent a confirmation email to your inbox.</p>
            </div>

            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {/* Summary Card */}
                <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-8">Purchase Summary</h3>

                    <div className="space-y-6 mb-10 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {order?.orderItems?.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-gray-100">
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 line-clamp-1 uppercase tracking-tighter">{item.name}</p>
                                    <p className="text-xs text-gray-400 font-light">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-gray-200 space-y-3">
                        <div className="flex justify-between text-gray-500 font-light text-sm">
                            <span>Subtotal</span>
                            <span className="text-gray-900">${order?.itemsPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-light text-sm">
                            <span>Shipping</span>
                            <span className="text-gray-900">${order?.shippingPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end pt-3">
                            <span className="text-lg font-bold text-gray-900">Total Paid</span>
                            <span className="text-3xl font-bold text-brand-600">${order?.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping & Next Steps */}
                <div className="space-y-8">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                            <FiTruck className="text-brand-600" /> Delivery Details
                        </h3>
                        <div className="space-y-4 font-light text-gray-500 text-sm italic">
                            <p>{order?.shippingInfo?.address}</p>
                            <p>{order?.shippingInfo?.city}, {order?.shippingInfo?.postalCode}</p>
                            <p>{order?.shippingInfo?.country}</p>
                        </div>

                        <div className="mt-10 p-6 bg-brand-50 rounded-2xl border border-brand-100">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-2">Order ID</p>
                            <p className="text-sm font-mono font-bold text-gray-900">#{orderId?.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/orders" className="btn-modern btn-modern-primary py-4 text-xs tracking-widest uppercase">
                            Track Order
                        </Link>
                        <Link to="/" className="btn-modern btn-modern-secondary py-4 text-xs tracking-widest uppercase">
                            Shop More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
