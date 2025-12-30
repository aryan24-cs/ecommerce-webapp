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
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

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
            if (product.images) {
                setImagesPreview(product.images.map(img => img.url));
            }
        }
    }, [product, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const filePreviews = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    filePreviews.push(reader.result);
                    setImagesPreview([...filePreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = new FormData();
        productData.set('name', formData.name);
        productData.set('price', formData.price);
        productData.set('description', formData.description);
        productData.set('category', formData.category);
        productData.set('stock', formData.stock);

        images.forEach(image => {
            productData.append('images', image);
        });

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
                        <label className="block text-sm text-gray-300 mb-2">Product Images</label>
                        <div className="flex gap-4 mb-4 overflow-x-auto">
                            {imagesPreview.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                                />
                            ))}
                        </div>

                        <div className="w-full border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 transition-colors relative">
                            <FiUpload className="text-3xl text-gray-400 mb-2" />
                            <span className="text-sm text-gray-400">Click to upload from gallery</span>
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={handleFileChange}
                                multiple
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
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
