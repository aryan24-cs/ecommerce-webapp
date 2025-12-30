import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/productSlice';
import { getAllOrders } from '../../redux/slices/orderSlice';
import { FiPackage, FiShoppingBag, FiDollarSign, FiUsers, FiTrendingUp, FiArrowUpRight, FiCalendar, FiArrowRight, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { allOrders } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getAllOrders());
    }, [dispatch]);

    const totalRevenue = allOrders?.reduce((acc, order) => acc + (order.totalPrice || 0), 0) || 0;
    const outOfStock = products?.filter((p) => p.stock === 0).length || 0;

    const stats = [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, trend: '+12.5%', icon: <FiDollarSign />, color: 'bg-brand-50 text-brand-600 border-brand-100' },
        { label: 'Completed Sales', value: allOrders?.length || 0, trend: '+8.2%', icon: <FiTrendingUp />, color: 'bg-green-50 text-green-600 border-green-100' },
        { label: 'Inventory Items', value: products?.length || 0, trend: 'Optimal', icon: <FiShoppingBag />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { label: 'Fulfillment Risk', value: outOfStock, trend: 'Low', icon: <FiPackage />, color: 'bg-red-50 text-red-600 border-red-100' },
    ];

    return (
        <div className="animate-fade-up">
            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-16 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 font-bold uppercase tracking-widest text-[10px] border border-brand-100">Live Insights</div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            <FiCalendar className="text-brand-500" /> {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 tracking-tight">Executive Hub.</h1>
                </div>

                <div className="flex gap-4">
                    <Link to="/admin/products/new" className="btn-modern btn-modern-primary px-8">
                        <FiPlusCircle className="mr-2" /> New Entry
                    </Link>
                    <button className="btn-modern btn-modern-secondary px-8">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-premium-xl transition-all duration-700 overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-14 h-14 rounded-2xl ${stat.color} border flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]`}>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full ${stat.color} border`}>
                                    <FiArrowUpRight /> {stat.trend}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                            </div>
                        </div>
                        {/* Visual background element */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-1000 opacity-50"></div>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-12">
                {/* Recent Transactions */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">Recent Transactions</h2>
                            <Link to="/admin/orders" className="text-xs font-bold uppercase tracking-widest text-brand-600 hover:text-black transition-colors flex items-center gap-3 group">
                                View Portal <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-bold uppercase tracking-[0.25em] text-gray-300 border-b border-gray-50 pb-6 mb-6">
                                        <th className="pb-6">Reference</th>
                                        <th className="pb-6">Date</th>
                                        <th className="pb-6">Customer</th>
                                        <th className="pb-6">Status</th>
                                        <th className="pb-6 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders?.slice(0, 6).map((order) => (
                                        <tr key={order._id} className="group hover:bg-gray-50/50 transition-all border-b border-gray-50/50">
                                            <td className="py-6 pr-4">
                                                <span className="text-sm font-mono font-bold text-gray-900 uppercase">#{order._id?.slice(-8)}</span>
                                            </td>
                                            <td className="py-6 px-4">
                                                <p className="text-sm text-gray-500 font-light">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-6 px-4">
                                                <p className="text-sm font-bold text-gray-900">{order.shippingInfo?.city || 'Global User'}</p>
                                            </td>
                                            <td className="py-6 px-4">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                                    order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                    }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="py-6 pl-4 text-right">
                                                <span className="text-lg font-bold text-gray-900">${order.totalPrice?.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info - Quick Inventory */}
                <div className="space-y-8">
                    <div className="bg-black rounded-[3rem] p-12 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10">Inventory Health</p>
                            <div className="space-y-8">
                                {products?.slice(0, 3).map((p, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0">
                                            <img src={p.images?.[0]?.url} className="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold truncate mb-1">{p.name}</p>
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}></div>
                                            </div>
                                            <p className="text-[10px] text-white/40 mt-1 font-bold">{p.stock} units left</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/admin/products" className="mt-12 w-full btn-modern btn-modern-secondary border-white/20 hover:bg-white/10 text-white bg-transparent">
                                Optimize Inventory
                            </Link>
                        </div>
                        {/* Background gradient */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm text-center">
                        <div className="w-20 h-20 bg-brand-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 border border-brand-100">
                            <FiUsers className="text-3xl text-brand-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Customer Base</h3>
                        <p className="text-gray-400 font-light italic mb-8">Growing at 15% WoW</p>
                        <div className="flex -space-x-4 justify-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
                                +42
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
