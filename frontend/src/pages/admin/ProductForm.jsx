import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, getProductDetails, clearProductDetails } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { FiUpload, FiX } from 'react-icons/fi';

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (isEdit) {
            dispatch(getProductDetails(id));
        }
        return () => {
            dispatch(clearProductDetails());
        };
    }, [dispatch, id, isEdit]);

    useEffect(() => {
        if (isEdit && product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
                description: product.description || '',
                category: product.category || '',
                stock: product.stock || '',
            });
            if (product.images?.[0]?.url) {
                setImagePreview(product.images[0].url);
                setImageUrl(product.images[0].url);
            }
        }
    }, [product, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setImagePreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            images: imageUrl ? [{ public_id: 'manual', url: imageUrl }] : [],
        };

        try {
            if (isEdit) {
                await dispatch(updateProduct({ id, productData })).unwrap();
                toast.success('Product updated successfully');
            } else {
                await dispatch(createProduct(productData)).unwrap();
                toast.success('Product created successfully');
            }
            navigate('/admin/products');
        } catch (error) {
            toast.error(error);
        }
    };

    const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Books', 'Other'];

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold gradient-text mb-8">
                {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>

            <div className="glass-effect rounded-xl p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Preview */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Product Image</label>
                        {imagePreview ? (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => { setImagePreview(''); setImageUrl(''); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <FiX />
                                </button>
                            </div>
                        ) : (
                            <div className="w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                                <FiUpload className="text-2xl text-gray-500" />
                            </div>
                        )}
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                            className="input-field mt-3"
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field min-h-[120px] resize-none"
                            placeholder="Enter product description"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-1"
                        >
                            {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
