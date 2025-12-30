import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../redux/slices/orderSlice';
import Loader from '../../components/layout/Loader';
import { toast } from 'react-toastify';
import { FiArrowRight, FiCheckCircle, FiTruck, FiBox, FiClock, FiActivity, FiMapPin } from 'react-icons/fi';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { allOrders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const handleStatusChange = async (orderId, status) => {
        try {
            await dispatch(updateOrderStatus({ id: orderId, status })).unwrap();
            toast.success('Fulfillment Pipeline Updated', { theme: 'light' });
        } catch (error) {
            toast.error('Processing Interrupted');
        }
    };

    const statusIcons = {
        Processing: <FiBox />,
        Shipped: <FiTruck />,
        Delivered: <FiCheckCircle />
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-50 text-green-600 border-green-100';
            case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-yellow-50 text-yellow-600 border-yellow-100';
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fade-up">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 font-bold uppercase tracking-widest text-[10px] border border-brand-100">Fulfillment Center</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{allOrders.length} Dispatch Cycles</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight">Orders.</h1>
                </div>

                <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <FiActivity className="text-brand-500" /> System: Active
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {allOrders.map((order, index) => (
                    <div
                        key={order._id}
                        className="bg-white border border-gray-100 rounded-[3.5rem] p-10 hover:shadow-premium-xl transition-all duration-700 group relative overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex flex-col xl:flex-row items-center gap-12 relative z-10">
                            {/* Order Info */}
                            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12 w-full">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Reference</p>
                                    <p className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 inline-block uppercase tracking-tighter">
                                        #{order._id?.slice(-12)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Customer Locale</p>
                                    <div className="flex items-center gap-2">
                                        <FiMapPin className="text-brand-600" />
                                        <p className="text-sm font-bold text-gray-900">{order.shippingInfo?.city || 'Global'}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Revenue Value</p>
                                    <p className="text-xl font-bold text-brand-600">${order.totalPrice?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Current Status</p>
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${getStatusColor(order.orderStatus)}`}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{order.orderStatus}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="w-full xl:w-auto flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative w-full sm:w-64">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="w-full px-8 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-4 focus:ring-brand-50 transition-all font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 appearance-none cursor-pointer"
                                        disabled={order.orderStatus === 'Delivered'}
                                    >
                                        <option value="Processing">Moving to Processing</option>
                                        <option value="Shipped">Dispatch Shipment</option>
                                        <option value="Delivered">Confirm Delivery</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <FiArrowRight className="rotate-90" />
                                    </div>
                                </div>

                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border shadow-sm transition-all duration-700 ${getStatusColor(order.orderStatus)} group-hover:scale-110 group-hover:rotate-6`}>
                                    <span className="text-2xl">{statusIcons[order.orderStatus] || <FiClock />}</span>
                                </div>
                            </div>
                        </div>

                        {/* Item Preview (Subtle background) */}
                        <div className="mt-10 flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity duration-700 overflow-x-auto pb-4 no-scrollbar">
                            {order.orderItems?.map((item, i) => (
                                <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-gray-50/50 px-4 py-2 rounded-2xl border border-gray-100">
                                    <img src={item.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-xs">{item.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    </div>
                ))}

                {allOrders.length === 0 && (
                    <div className="p-32 text-center bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <FiBox className="text-4xl text-gray-200" />
                        </div>
                        <p className="text-xl text-gray-900 font-bold uppercase tracking-tight mb-2">Queue Discharged</p>
                        <p className="text-gray-400 font-light italic">No pending fulfillment cycles detected in the system.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
