import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/layout/Loader';
import { FiPackage, FiDownload, FiArrowRight, FiEye, FiSearch, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.orders);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-50 text-green-600 border-green-100';
            case 'shipped':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'processing':
                return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            default:
                return 'bg-gray-50 text-gray-500 border-gray-100';
        }
    };

    const downloadInvoice = (orderId) => {
        window.open(`/api/v1/order/invoice/${orderId}`, '_blank');
    };

    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.orderStatus === filter);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-up">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 mb-4">Your Purchase Journey</h2>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight">Order History.</h1>
                    </div>
                    <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                        {['All', 'Processing', 'Shipped', 'Delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === status ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="py-32 text-center bg-gray-50 rounded-[3rem] animate-fade-up">
                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <FiPackage className="text-4xl text-gray-200" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">No orders found.</h2>
                        <p className="text-gray-500 font-light italic mb-10 max-w-sm mx-auto">Looks like you haven't explored our collection yet. Your future essentials will appear here.</p>
                        <Link to="/products" className="btn-modern btn-modern-primary px-12 py-4">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {filteredOrders.map((order, index) => (
                            <div
                                key={order._id}
                                className="group relative bg-white border border-gray-100 rounded-[3.5rem] p-10 hover:shadow-premium-xl transition-all duration-700 animate-fade-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-12">
                                    <div className="flex flex-wrap gap-x-16 gap-y-8">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Order Identifier</p>
                                            <p className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">#{order._id?.slice(-12).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Date Recorded</p>
                                            <p className="text-lg font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Total Investment</p>
                                            <p className="text-2xl font-bold text-brand-600">${order.totalPrice?.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Fulfillment</p>
                                            <span className={`inline-block px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border shadow-sm ${getStatusStyles(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col lg:items-end gap-4">
                                        <button
                                            onClick={() => downloadInvoice(order._id)}
                                            className="btn-modern btn-modern-secondary px-8 py-3 text-sm group-hover:bg-brand-50 transition-colors"
                                        >
                                            <FiDownload className="mr-2" /> Invoice
                                        </button>
                                        <Link
                                            to={`/order/${order._id}`}
                                            className="btn-modern btn-modern-primary px-8 py-3 text-sm"
                                        >
                                            <FiEye className="mr-2" /> Details
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-12 pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="flex -space-x-6 items-center">
                                        {order.orderItems?.slice(0, 4).map((item, i) => (
                                            <div
                                                key={i}
                                                className="w-20 h-24 rounded-2xl border-4 border-white overflow-hidden bg-gray-50 shadow-premium transition-transform duration-500 group-hover:scale-110 active:scale-95 cursor-pointer relative"
                                                style={{ zIndex: 10 - i }}
                                            >
                                                <img
                                                    src={item.image || 'https://via.placeholder.com/150'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                        {order.orderItems?.length > 4 && (
                                            <div className="w-16 h-16 rounded-full border-4 border-white bg-black z-0 flex items-center justify-center text-xs font-bold text-white shadow-premium">
                                                +{order.orderItems.length - 4}
                                            </div>
                                        )}
                                        <div className="ml-10">
                                            <p className="text-sm font-bold text-gray-900">{order.orderItems?.length} Designer Items</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Curated for you</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:block h-12 w-px bg-gray-100"></div>

                                    <div className="flex items-center gap-12">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Shipping to</p>
                                            <p className="text-sm font-bold text-gray-900">{order.shippingInfo?.city}, {order.shippingInfo?.country}</p>
                                        </div>
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                                            <FiPackage />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-10 right-10 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
