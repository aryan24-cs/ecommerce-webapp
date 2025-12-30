import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../redux/slices/productSlice';
import Loader from '../../components/layout/Loader';
import { FiEdit3, FiTrash2, FiPlus, FiArrowRight, FiPackage, FiShoppingBag, FiLayers } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Permanently remove this entry from the catalog?')) {
            dispatch(deleteProduct(id));
            toast.success('Collection updated', { theme: 'light' });
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fade-up">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 font-bold uppercase tracking-widest text-[10px] border border-brand-100 italic">Inventory Master</div>
                        <div className="h-0.5 w-12 bg-brand-100 hidden md:block"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{products.length} Total SKUs</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight">Catalog.</h1>
                </div>

                <Link to="/admin/products/new" className="btn-modern btn-modern-primary px-12 py-4 shadow-xl shadow-gray-200">
                    <FiPlus className="mr-2" /> Create Entry
                </Link>
            </div>

            {/* Product Grid Table */}
            <div className="bg-white border border-gray-100 rounded-[3.5rem] overflow-hidden shadow-premium">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] font-bold uppercase tracking-[0.25em] text-gray-300 border-b border-gray-100 bg-gray-50/30">
                                <th className="p-10">Visual Archive</th>
                                <th className="p-10">Descriptor</th>
                                <th className="p-10">Stock Allocation</th>
                                <th className="p-10">Market Value</th>
                                <th className="p-10 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all duration-500 group">
                                    <td className="p-10">
                                        <div className="relative w-24 h-32 rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
                                            <img
                                                src={product.images?.[0]?.url || 'https://via.placeholder.com/100'}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    </td>
                                    <td className="p-10">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600 block mb-2">{product.category}</span>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors uppercase tracking-tighter">{product.name}</h4>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic opacity-60">
                                            <FiLayers /> Internal ID: #{product._id?.slice(-6).toUpperCase()}
                                        </div>
                                    </td>
                                    <td className="p-10 text-gray-400">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-12">
                                                <span className={`text-xs font-bold uppercase tracking-widest ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {product.stock > 0 ? 'Available' : 'Depleted'}
                                                </span>
                                                <span className="text-sm font-bold text-gray-900">{product.stock} Units</span>
                                            </div>
                                            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-1000 ${product.stock > 10 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-10">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-gray-900 tracking-tight">${product.price?.toLocaleString()}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">USD Market Per Unit</span>
                                        </div>
                                    </td>
                                    <td className="p-10 text-right">
                                        <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            <Link
                                                to={`/admin/products/edit/${product._id}`}
                                                className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-brand-600 hover:border-brand-100 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg active:scale-90"
                                                title="Modify Specification"
                                            >
                                                <FiEdit3 />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg active:scale-90"
                                                title="Retire Entry"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-32 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-gray-100">
                            <FiShoppingBag className="text-4xl text-gray-200" />
                        </div>
                        <p className="text-xl text-gray-900 font-bold tracking-tight mb-2 uppercase">No Data Archive Found</p>
                        <p className="text-gray-400 font-light italic mb-10">Begin populating the ecosystem with high-end essentials.</p>
                        <Link to="/admin/products/new" className="btn-modern btn-modern-primary px-10">Add First Product</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
