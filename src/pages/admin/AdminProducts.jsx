import { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaUpload, FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    description: "",
    countInStock: "",
    category: "64f1a2b3c4d5e6f7a8b9c0d1", 
    image: "",
    isNewProduct: false,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      setUploadingImage(true);
      const { data } = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        image: data.image || data.url || data,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a product image first.");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : Number(formData.price),
        countInStock: Number(formData.countInStock),
      });

      alert("Product created successfully!");
      setShowModal(false);
      setFormData({
        title: "",
        price: "",
        originalPrice: "",
        description: "",
        countInStock: "",
        category: "64f1a2b3c4d5e6f7a8b9c0d1",
        image: "",
        isNewProduct: false,
      });
      fetchProducts(); 
    } catch (error) {
      console.error("Failed to create product:", error);
      alert(error.response?.data?.message || "Error creating product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Could not delete product.");
      }
    }
  };

  return (
    <div className="p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Product Management</h1>
          <p className="text-sm text-gray-500">
            Add, view, and delete store products
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primaryRed text-white px-4 py-2.5 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors font-medium text-sm"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <FaSpinner className="animate-spin text-3xl text-primaryRed mx-auto mb-2" />
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 object-contain bg-cardBg rounded p-1"
                    />
                    <span className="font-semibold text-black truncate max-w-[200px]">
                      {product.title}
                    </span>
                  </td>
                  <td className="p-4 font-medium">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="p-4">{product.countInStock} units</td>
                  <td className="p-4">
                    {product.countInStock > 0 ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-gray-400 hover:text-primaryRed transition-colors p-2"
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-black">
                Create New Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryRed"
                  placeholder="e.g. Wireless Gaming Headset"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryRed"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.countInStock}
                    onChange={(e) =>
                      setFormData({ ...formData, countInStock: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryRed"
                    placeholder="15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryRed"
                  placeholder="Provide product details..."
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Image (Cloudinary)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 text-xs font-semibold flex items-center gap-2">
                    <FaUpload /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadingImage && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaSpinner className="animate-spin" /> Uploading to
                      Cloudinary...
                    </span>
                  )}
                </div>

                {/* Preview Uploaded Image */}
                {formData.image && (
                  <div className="mt-3 relative w-20 h-20 bg-cardBg rounded border p-1">
                    <img
                      src={formData.image}
                      alt="Uploaded preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-4 py-2 bg-primaryRed text-white rounded text-sm font-medium hover:bg-red-600 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
