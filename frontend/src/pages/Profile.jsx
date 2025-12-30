import { useSelector } from 'react-redux';
import { FiUser, FiMail, FiShield, FiCalendar, FiArrowRight, FiEdit3, FiSettings, FiActivity, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../components/layout/Loader';

const Profile = () => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading || !user) return <Loader />;

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="relative mb-20">
                    <div className="h-64 w-full bg-gradient-to-r from-brand-100 via-brand-50 to-white rounded-[3rem] opacity-50"></div>
                    <div className="absolute -bottom-16 left-12 flex items-end gap-8">
                        <div className="w-48 h-48 bg-white rounded-[3.5rem] p-2 shadow-premium relative group">
                            <div className="w-full h-full bg-gray-50 rounded-[3rem] flex items-center justify-center border border-gray-100 overflow-hidden">
                                <span className="text-7xl font-display font-light text-brand-600">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <button className="absolute bottom-4 right-4 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0">
                                <FiEdit3 />
                            </button>
                        </div>
                        <div className="pb-4">
                            <h1 className="text-5xl font-display font-bold text-gray-900 tracking-tight mb-2">{user?.name}</h1>
                            <p className="text-lg text-gray-400 font-light italic">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '2025'}</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Stats / Quick Info */}
                    <div className="space-y-8 animate-fade-right">
                        <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Account Overview</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm"><FiShield /></div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Status</p>
                                        <p className="text-sm font-bold text-gray-900">Protected</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm"><FiActivity /></div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity</p>
                                        <p className="text-sm font-bold text-gray-900">Highly Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black rounded-[2.5rem] p-10 text-white relative overflow-hidden group cursor-pointer">
                            <div className="relative z-10">
                                <h4 className="text-2xl font-bold mb-2">ShopNest Plus</h4>
                                <p className="text-white/60 font-light text-sm mb-6">Enjoy free shipping and exclusive early access to drops.</p>
                                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Join Pro Plan <FiArrowRight /></span>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-10 animate-fade-up">
                        <div className="bg-white border border-gray-100 rounded-[3rem] p-12 shadow-sm">
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Personal Details</h3>
                                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 hover:text-black transition-colors">
                                    <FiSettings /> Preferences
                                </button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
                                <div className="space-y-1 border-b border-gray-50 pb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</p>
                                    <p className="text-xl font-bold text-gray-900">{user?.name}</p>
                                </div>
                                <div className="space-y-1 border-b border-gray-50 pb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</p>
                                    <p className="text-xl font-bold text-gray-900">{user?.email}</p>
                                </div>
                                <div className="space-y-1 border-b border-gray-50 pb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account Access</p>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user?.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-brand-50 text-brand-600'
                                        }`}>
                                        {user?.role} Access
                                    </span>
                                </div>
                                <div className="space-y-1 border-b border-gray-50 pb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                                    <p className="text-xl font-bold text-gray-900">United States</p>
                                </div>
                            </div>

                            <div className="mt-16 flex flex-wrap gap-4">
                                <button
                                    onClick={() => toast.info('Profile editing feature arriving soon', { theme: 'light' })}
                                    className="btn-modern btn-modern-primary px-10"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => toast.info('Security settings arriving soon', { theme: 'light' })}
                                    className="btn-modern btn-modern-secondary px-10"
                                >
                                    Security Settings
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <Link to="/orders" className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 flex items-center justify-between group hover:bg-black hover:text-white transition-all duration-500">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2">My Orders</h3>
                                    <p className="text-sm font-light italic opacity-60">Track your purchases.</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center group-hover:rotate-12 transition-all">
                                    <FiArrowRight />
                                </div>
                            </Link>
                            <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 flex items-center justify-between group hover:bg-brand-500 hover:text-white transition-all duration-500 cursor-pointer">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2">My Wishlist</h3>
                                    <p className="text-sm font-light italic opacity-60">Saved for later.</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center group-hover:scale-110 transition-all">
                                    <FiHeart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
