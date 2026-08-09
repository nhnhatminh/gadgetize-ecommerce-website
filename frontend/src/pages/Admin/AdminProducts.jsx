import { useState, useEffect } from "react";
import { adminApi } from "../../api/adminApi";
import { productApi } from "../../api/productApi";
import "../../styles/layouts/admin_products.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    basePrice: "",
    discountPercent: "0",
    categoryId: "",
    brandId: "",
    sku: "",
    colorName: "",
    colorHex: "#111111",
    stockQuantity: "0",
    priceModifier: "0",
  });

  const loadAdminProducts = async () => {
    try {
      const data = await productApi.getProducts({ limit: 100 });
      setProducts(data.products || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [catData, brandData, productsData] = await Promise.all([
          productApi.getCategories(),
          productApi.getBrands(),
          productApi.getProducts({ limit: 100 }),
        ]);

        if (isMounted) {
          setCategories(catData || []);
          setBrands(brandData || []);
          setProducts(productsData?.products || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khởi tạo Admin:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMessage("");
    setForm({
      name: "",
      slug: "",
      description: "",
      basePrice: "",
      discountPercent: "0",
      categoryId: categories[0]?.id || "",
      brandId: brands[0]?.id || "",
      sku: "",
      colorName: "",
      colorHex: "#111111",
      stockQuantity: "0",
      priceModifier: "0",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingId(prod.id);
    setSelectedFile(null);
    setPreviewUrl(prod.image_url || "");
    setErrorMessage("");
    setForm({
      name: prod.name || "",
      slug: prod.slug || "",
      description: prod.description || "",
      basePrice: prod.base_price || "",
      discountPercent: prod.discount_percent || "0",
      categoryId: prod.category_id || categories[0]?.id || "",
      brandId: prod.brand_id || brands[0]?.id || "",
      sku: prod.sku || "",
      colorName: prod.color_name || "",
      colorHex: prod.color_hex || "#111111",
      stockQuantity: prod.stock_quantity || "0",
      priceModifier: prod.price_modifier || "0",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await adminApi.deleteProduct(id);
        loadAdminProducts();
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Không thể xóa sản phẩm này do đã có trong đơn hàng."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (editingId) {
        await adminApi.updateProduct(editingId, formData);
      } else {
        await adminApi.createProduct(formData);
      }
      setIsModalOpen(false);
      loadAdminProducts();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi lưu thông tin sản phẩm. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="admin-products-view">
      <div className="admin-products-header">
        <h4 className="admin-products-title">Quản Lý Danh Sách Sản Phẩm</h4>
        <button
          className="admin-add-product-btn"
          onClick={handleOpenAddModal}
        >
          <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm Mới
        </button>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <div className="admin-table-loading">
            <div className="dashboard-spinner"></div>
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-table">
            <thead>
              <tr className="admin-table-header-row">
                <th className="admin-table-th admin-table-th--first">Hình ảnh</th>
                <th className="admin-table-th">Tên sản phẩm</th>
                <th className="admin-table-th">Giá cơ bản</th>
                <th className="admin-table-th">Chiết khấu</th>
                <th className="admin-table-th">Màu sắc</th>
                <th className="admin-table-th">Kho hàng</th>
                <th className="admin-table-th admin-table-th--last admin-table-th--right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="admin-table-row">
                  <td className="admin-table-td admin-table-td--first">
                    <img
                      src={prod.image_url || "/images/no-image.png"}
                      alt={prod.name}
                      className="admin-product-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/no-image.png";
                      }}
                    />
                  </td>
                  <td className="admin-table-td admin-product-name">
                    {prod.name}
                  </td>
                  <td className="admin-table-td">
                    {parseFloat(prod.base_price || 0).toLocaleString("vi-VN")}₫
                  </td>
                  <td className="admin-table-td">
                    <span className="admin-discount-badge">
                      {prod.discount_percent || 0}%
                    </span>
                  </td>
                  <td className="admin-table-td">
                    <div className="admin-color-indicator">
                      <span
                        className="admin-color-dot"
                        style={{
                          backgroundColor: prod.color_hex || "#ccc",
                        }}
                      ></span>
                      <span>{prod.color_name || "N/A"}</span>
                    </div>
                  </td>
                  <td className="admin-table-td">
                    <span
                      className={`admin-stock-status ${
                        parseInt(prod.stock_quantity || 0, 10) > 0
                          ? "admin-stock-status--instock"
                          : "admin-stock-status--outstock"
                      }`}
                    >
                      {prod.stock_quantity || 0} pcs
                    </span>
                  </td>
                  <td className="admin-table-td admin-table-td--last admin-table-td--right">
                    <button
                      className="admin-action-btn-edit"
                      onClick={() => handleOpenEditModal(prod)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      className="admin-action-btn-delete"
                      onClick={() => handleDelete(prod.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-dialog">
            <div className="admin-modal-content">
              <form onSubmit={handleSubmit}>
                <div className="admin-modal-header">
                  <h5 className="admin-modal-title">
                    {editingId
                      ? "Cập Nhật Thông Tin Sản Phẩm"
                      : "Thêm Thiết Bị Công Nghệ Mới"}
                  </h5>
                  <button
                    type="button"
                    className="admin-modal-close-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="admin-modal-body">
                  {errorMessage && (
                    <div className="admin-modal-error-alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="admin-form-label">Tên sản phẩm *</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="admin-form-label">Chuỗi liên kết URL (Slug) *</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        name="slug"
                        value={form.slug}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Danh mục sản phẩm *</label>
                      <select
                        className="admin-form-select"
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleInputChange}
                        required
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Thương hiệu nhà sản xuất *</label>
                      <select
                        className="admin-form-select"
                        name="brandId"
                        value={form.brandId}
                        onChange={handleInputChange}
                        required
                      >
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Mã định danh sản phẩm (SKU) *</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        name="sku"
                        value={form.sku}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Giá niêm yết cơ bản (VND) *</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        name="basePrice"
                        value={form.basePrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Chiết khấu (%)</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        name="discountPercent"
                        value={form.discountPercent}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Giá trị điều chỉnh biến thể</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        name="priceModifier"
                        value={form.priceModifier}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Tên màu sắc</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        name="colorName"
                        value={form.colorName}
                        onChange={handleInputChange}
                        placeholder="E.g., Cosmic Black"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Mã màu đồ họa (Hex)</label>
                      <input
                        type="color"
                        className="admin-form-color-picker"
                        name="colorHex"
                        value={form.colorHex}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="admin-form-label">Số lượng nhập kho *</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        name="stockQuantity"
                        value={form.stockQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="admin-form-label">Hình ảnh đại diện sản phẩm</label>
                      <input
                        type="file"
                        className="admin-form-file-input"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                      {previewUrl && (
                        <div className="admin-img-preview-box">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="admin-img-preview"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/no-image.png";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="admin-form-label">Mô tả cấu hình chi tiết</label>
                      <textarea
                        className="admin-form-textarea"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="admin-modal-cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="admin-modal-submit-btn"
                  >
                    Lưu dữ liệu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}