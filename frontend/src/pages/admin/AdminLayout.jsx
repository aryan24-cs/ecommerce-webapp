import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiPlusCircle, FiMenu, FiX, FiArrowLeft, FiArrowRight, FiBell, FiSearch, FiSettings, FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const menuItems = [
        { path: '/admin/dashboard', icon: <FiGrid />, label: 'Analytics Hub' },
        { path: '/admin/products', icon: <FiShoppingBag />, label: 'Storefront Inventory' },
        { path: '/admin/products/new', icon: <FiPlusCircle />, label: 'Create New Essential' },
        { path: '/admin/orders', icon: <FiPackage />, label: 'Order Fulfillment' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex bg-gray-50/50 overflow-hidden">

            {/* Sidebar */}
            <aside className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-white z-50
        transform transition-transform duration-700 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-gray-100 flex flex-col
      `}>
                {/* Sidebar Header */}
                <div className="p-10 border-b border-gray-50">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">ShopNest <span className="text-xs font-light text-gray-400">Admin</span></span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="p-8 flex-1">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-8 px-4">Master Controls</h2>
                    <nav className="space-y-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group
                  ${isActive(item.path)
                                        ? 'bg-black text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                    }
                `}
                            >
                                <span className={`text-xl transition-transform duration-500 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                {isActive(item.path) && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse"></div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-8">
                    <div className="p-8 bg-black rounded-[2rem] text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 italic">System Health</p>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-sm font-bold">Servers Optimal</span>
                            </div>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-brand-400 flex items-center gap-2 group-hover:gap-4 transition-all">View Logs <FiArrowRight /></button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header */}
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-100"
                        >
                            <FiMenu size={20} />
                        </button>
                        <div className="relative hidden md:block">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="pl-12 pr-6 py-3 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 focus:ring-brand-50 w-80 text-sm font-light transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8">
                        <div className="flex items-center gap-2">
                            <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-black hover:bg-white transition-all">
                                <FiBell />
                                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white"></span>
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-black hover:bg-white transition-all">
                                <FiSettings />
                            </button>
                        </div>

                        <div className="h-8 w-px bg-gray-100"></div>

                        <div className="flex items-center gap-4 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-gray-900 leading-none mb-1">{user?.name}</p>
                                <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest leading-none">Super User</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-black transition-colors">
                                {user?.avatar ? (
                                    <img src={user.avatar} className="w-full h-full object-cover" />
                                ) : (
                                    <FiUser className="text-gray-400 group-hover:text-black transition-colors" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Content Container */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-all duration-500"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
