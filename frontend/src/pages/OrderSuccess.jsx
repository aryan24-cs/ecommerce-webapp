import { Link, useLocation } from 'react-router-dom';
import { FiCheck, FiPackage, FiHome, FiArrowRight, FiTruck, FiDownload } from 'react-icons/fi';
import api from '../services/api';
import { toast } from 'react-toastify';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, order, invoiceNumber } = location.state || {};

    const handleDownloadReceipt = async () => {
        try {
            const response = await api.get(`/order/invoice/${order._id}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice-${order._id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            toast.error('Failed to download receipt');
        }
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6 flex flex-col items-center justify-center">
            <div className="max-w-lg w-full text-center animate-fade-up">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100/50">
                    <FiCheck className="text-4xl text-green-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">Order Confirmed.</h1>
                <p className="text-lg text-gray-500 font-light mb-8">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Transaction ID</p>
                    <p className="text-lg font-mono font-bold text-gray-900 mb-6">{order?.invoiceNumber || invoiceNumber || orderId}</p>

                    <button
                        onClick={handleDownloadReceipt}
                        className="w-full flex items-center justify-center gap-2 btn-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors border border-gray-200 rounded-xl"
                    >
                        <FiDownload className="text-lg" /> Download Receipt
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/orders" className="btn-modern btn-modern-secondary py-3 px-8 text-xs tracking-widest uppercase">
                        Track Order
                    </Link>
                    <Link to="/" className="btn-modern btn-modern-primary py-3 px-8 text-xs tracking-widest uppercase">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
