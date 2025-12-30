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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled || mobileMenuOpen ? 'glass-header py-4' : 'bg-transparent py-8'}`}>
            <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">

                {/* Brand */}
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 bg-black rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-gray-200">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="text-2xl font-display font-bold tracking-tighter text-gray-900 group-hover:text-brand-600 transition-colors">ShopNest.</span>
                </Link>

                {/* Centered Navigation */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative py-2 group
                                ${location.pathname === link.path ? 'text-black' : 'text-gray-400 hover:text-black'}
                            `}
                        >
                            {link.label}
                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-black rounded-full transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full opacity-20'}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Action Suite */}
                <div className="flex items-center gap-4 lg:gap-8">
                    <div className="hidden sm:flex items-center gap-2">
                        <button className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-2xl transition-all">
                            <FiSearch size={20} />
                        </button>
                        <Link to="/cart" className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-2xl transition-all relative">
                            <FiShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>

                    {isAuthenticated ? (
                        <div className="relative group">
                            <button className="flex items-center gap-3 p-1.5 pl-4 pr-1.5 rounded-full bg-gray-50 border border-gray-100 hover:border-black transition-all group/btn">
                                <span className="text-xs font-bold text-gray-900 hidden md:block uppercase tracking-widest">{user?.name?.split(' ')[0]}</span>
                                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md group-hover/btn:scale-105 transition-transform">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </button>

                            {/* Luxury Dropdown */}
                            <div className="absolute right-0 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-50">
                                <div className="bg-white rounded-[2.5rem] shadow-premium-xl border border-gray-100 overflow-hidden p-3">
                                    <div className="p-6 bg-gray-50 rounded-[2rem] mb-2">
                                        <p className="text-xs font-bold text-gray-900 uppercase tracking-widest leading-none mb-1">{user.name}</p>
                                        <p className="text-[10px] text-gray-400 italic truncate">{user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Link to="/profile" className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl transition-all">
                                            <FiUser /> Profile Overview
                                        </Link>
                                        <Link to="/orders" className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl transition-all">
                                            <FiActivity /> Collection History
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link to="/admin/dashboard" className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:bg-brand-50 rounded-2xl transition-all">
                                                <FiGlobe /> Management Portal
                                            </Link>
                                        )}
                                    </div>
                                    <div className="h-px bg-gray-50 my-2 mx-6"></div>
                                    <button onClick={handleLogout} className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all mb-1">
                                        Sign Out Portal
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-modern btn-modern-primary text-[10px] px-8 tracking-[0.2em] font-bold uppercase">
                            Sign In
                        </Link>
                    )}

                    <button
                        className="lg:hidden w-11 h-11 flex items-center justify-center bg-gray-50 rounded-2xl"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            {/* Immersive Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 top-0 bg-white z-40 transition-transform duration-700 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-32 px-10`}>
                <div className="flex flex-col gap-10">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-5xl font-display font-bold text-gray-900 tracking-tighter"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {link.label}.
                        </Link>
                    ))}
                    <div className="h-px bg-gray-100 my-4"></div>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="text-2xl font-bold text-gray-900 uppercase tracking-widest">My Profile</Link>
                            <Link to="/orders" className="text-2xl font-bold text-gray-900 uppercase tracking-widest">My Orders</Link>
                            <button onClick={handleLogout} className="text-left text-2xl font-bold text-red-500 uppercase tracking-widest">Logout</button>
                        </>
                    ) : (
                        <Link to="/register" className="text-2xl font-bold text-brand-600 uppercase tracking-widest">Create Profile</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
