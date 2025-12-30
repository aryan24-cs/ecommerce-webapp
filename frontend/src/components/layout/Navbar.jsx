import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiActivity, FiGlobe } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Shop' },
        { path: '/categories', label: 'Categories' },
        { path: '/about', label: 'About' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between relative z-50">

                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-gray-200">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-display font-bold tracking-tighter text-gray-900 group-hover:text-brand-600 transition-colors">ShopNest.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative py-2 group
                                ${location.pathname === link.path ? 'text-black' : 'text-gray-400 hover:text-black'}
                            `}
                        >
                            {link.label}
                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-black rounded-full transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full opacity-20'}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Action Suite */}
                <div className="flex items-center gap-3 lg:gap-6">
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all">
                            <FiSearch size={20} />
                        </button>
                        <Link to="/cart" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all relative">
                            <FiShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                    {isAuthenticated ? (
                        <div className="relative group hidden sm:block">
                            <button className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full bg-gray-50 border border-gray-100 hover:border-black transition-all group/btn">
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-widest hidden md:block">{user?.name?.split(' ')[0]}</span>
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md group-hover/btn:scale-105 transition-transform">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                                    <div className="p-4 bg-gray-50 rounded-xl mb-2">
                                        <p className="text-xs font-bold text-gray-900">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all">
                                            <FiUser /> Profile
                                        </Link>
                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all">
                                            <FiActivity /> Orders
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                                                <FiGlobe /> Admin
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-all text-left">
                                            <FiX /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden sm:flex btn-modern btn-modern-primary text-[10px] px-6 py-2.5 tracking-[0.2em] font-bold uppercase">
                            Sign In
                        </Link>
                    )}

                    <button
                        className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-900 rounded-xl hover:bg-black hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden lg:hidden ${mobileMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0'}`}>
                <div className="flex flex-col p-6 space-y-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-3xl font-display font-bold text-gray-900 tracking-tight"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="h-px bg-gray-100 my-2"></div>

                    {isAuthenticated ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                            <Link to="/profile" className="block text-lg font-bold text-gray-600 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                            <Link to="/orders" className="block text-lg font-bold text-gray-600 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin/dashboard" className="block text-lg font-bold text-brand-600 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="block text-lg font-bold text-red-500 uppercase tracking-widest text-left">Sign Out</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/login" className="btn-modern btn-modern-secondary text-center justify-center" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="btn-modern btn-modern-primary text-center justify-center" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
