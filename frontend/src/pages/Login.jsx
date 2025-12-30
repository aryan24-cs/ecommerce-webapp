import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20 pb-20">
            <div className="w-full max-w-md animate-fade-up">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Welcome Back.</h1>
                        <p className="text-gray-500 font-light italic">Enter your details to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-900 ml-1">Password</label>
                                <a href="#" className="text-xs font-bold text-brand-600 hover:text-brand-700">Forgot?</a>
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-4 focus:ring-brand-100 transition-all font-light"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-modern btn-modern-primary w-full py-4 text-lg mt-4"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'} <FiArrowRight className="ml-2" />
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-gray-50">
                        <p className="text-gray-500 font-light">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-black font-bold hover:text-brand-600 transition-colors">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
