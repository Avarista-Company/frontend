import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { products as allProducts } from '../data/products';
import { stores } from '../data/stores';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const RetailerDashboard = () => {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // For adding new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    gender: '',
    description: '',
    colors: [],
    sizes: [],
  });
  
  // For image upload
  const [setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  useEffect(() => {
    // Check if user is a retailer
    if (currentUser && currentUser.role !== 'retailer') {
      navigate('/');
      addToast('Access denied. Retailer account required.', 'error');
    }
    
    // Find the retailer's store
    if (currentUser && currentUser.storeId) {
      const storeData = stores.find(s => s.id.toString() === currentUser.storeId);
      setStore(storeData);
      
      // Get products for this store
      const storeProducts = allProducts.filter(p => p.storeId.toString() === currentUser.storeId);
      setProducts(storeProducts);
    }
  }, [currentUser, navigate, addToast]);
  
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.gender) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    
    // In a real app, this would be an API call
    const productId = Date.now();
    const newProductData = {
      id: productId,
      ...newProduct,
      price: parseFloat(newProduct.price),
      image: imagePreview || 'https://via.placeholder.com/400x600?text=Product+Image',
      storeId: parseInt(currentUser.storeId),
      featured: false,
    };
    
    setProducts(prev => [...prev, newProductData]);
    addToast('Product added successfully!', 'success');
    setIsAddProductModalOpen(false);
    resetNewProduct();
  };
  
  const handleDeleteProduct = (productId) => {
    // In a real app, this would be an API call
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product deleted successfully!', 'success');
    setIsDeleteModalOpen(false);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      price: '',
      category: '',
      gender: '',
      description: '',
      colors: [],
      sizes: [],
    });
    setSelectedImage(null);
    setImagePreview(null);
  };
  
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };
  
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleColorChange = (e) => {
    const color = e.target.value;
    if (color && !newProduct.colors.includes(color)) {
      setNewProduct(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }));
      e.target.value = '';
    }
  };
  
  const removeColor = (colorToRemove) => {
    setNewProduct(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };
  
  const handleSizeChange = (e) => {
    const size = e.target.value;
    if (size && !newProduct.sizes.includes(size)) {
      setNewProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }));
      e.target.value = '';
    }
  };
  
  const removeSize = (sizeToRemove) => {
    setNewProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
  };
  
  if (!currentUser || !store) {
    return (
      <div className="container-padded py-12 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container-padded py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Retailer Dashboard</h1>
        <p className="text-lg text-gray-600">
          Manage your store, products, and orders.
        </p>
      </div>
      
      {/* Store Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <img 
              src={store.image} 
              alt={store.name}
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          
          <div className="md:w-3/4">
            <h2 className="text-2xl font-medium mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-4">{store.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-2xl font-semibold">{products.length}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold">$12,450</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-2xl font-semibold">{store.rating.toFixed(1)}</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline">Edit Store Info</Button>
              <Button variant="outline">Update Hours</Button>
              <Button variant="outline">View Analytics</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'products' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Products
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'orders' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Orders
          </button>
          
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'customers' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customers
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'analytics' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
      
      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Products</h2>
            
            <Button 
              variant="primary"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              Add New Product
            </Button>
          </div>
          
          {products.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={product.image} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.featured 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.featured ? 'Featured' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-800 mr-4">
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => openDeleteModal(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products yet</h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first product.
              </p>
              <Button 
                variant="primary"
                onClick={() => setIsAddProductModalOpen(true)}
              >
                Add Product
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Order Management</h3>
          <p className="text-gray-500">
            Track and manage your orders in real-time.
          </p>
        </div>
      )}
      
      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Customer Management</h3>
          <p className="text-gray-500">
            View and manage your customer relationships.
          </p>
        </div>
      )}
      
      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Analytics Dashboard</h3>
          <p className="text-gray-500">
            Track your store's performance and sales metrics.
          </p>
        </div>
      )}
      
      {/* Add Product Modal */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Product Info */}
          <div>
            <Input
              label="Product Name"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={handleNewProductChange}
                required
              />
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewProductChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select Category</option>
                  {PRODUCT_CATEGORIES.map((category, index) => (
                    <option key={index} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={newProduct.gender}
                onChange={handleNewProductChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={newProduct.description}
                onChange={handleNewProductChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          {/* Right Column - Image & Variants */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imagePreview ? (
                  <div className="text-center">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="mx-auto h-48 object-cover"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                      >
                        <span>Upload an image</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Colors */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProduct.colors.map((color, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm text-gray-700">{color}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a color (e.g., Red, Blue)"
                  className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleColorChange(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => handleColorChange({ target: { value: e.target.previousSibling.value } })}
                  className="bg-gray-100 px-3 py-2 rounded-r-md hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProduct.sizes.map((size, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm text-gray-700">{size}</span>
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a size (e.g., S, M, L, XL)"
                  className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSizeChange(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => handleSizeChange({ target: { value: e.target.previousSibling.value } })}
                  className="bg-gray-100 px-3 py-2 rounded-r-md hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsAddProductModalOpen(false)}
            className="btn-outline px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddProduct}
            className="btn-primary px-4 py-2"
          >
            Add Product
          </button>
        </div>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="sm"
      >
        <div className="text-center">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Product</h3>
          
          <p className="text-gray-500 mb-6">
            Are you sure you want to delete <span className="font-medium text-gray-900">{productToDelete?.name}</span>? This action cannot be undone.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="btn-outline px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteProduct(productToDelete?.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RetailerDashboard;