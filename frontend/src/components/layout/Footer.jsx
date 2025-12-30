import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">ShopNest</span>
                        </Link>
                        <p className="text-gray-500 mb-8 max-w-sm font-light leading-relaxed">
                            Curating essential styles for modern living. Experience seamless shopping with quality at the heart of everything we do.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                                <FiGithub />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                                <FiTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                                <FiInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Shop</h4>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-sm text-gray-500 hover:text-black transition-colors">All Products</Link></li>
                            <li><Link to="/categories" className="text-sm text-gray-500 hover:text-black transition-colors">Categories</Link></li>
                            <li><Link to="/cart" className="text-sm text-gray-500 hover:text-black transition-colors">Shopping Bag</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-400 tracking-wider uppercase">© {new Date().getFullYear()} ShopNest. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
