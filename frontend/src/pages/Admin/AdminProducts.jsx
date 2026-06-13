import React, { useState, useEffect } from "react";
import { adminApi } from "../../api/adminApi";
import { productApi } from "../../api/productApi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catData, brandData] = await Promise.all([
          productApi.getCategories(),
          productApi.getBrands(),
        ]);
        setCategories(catData);
        setBrands(brandData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMetadata();
    loadAdminProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setSelectedFile(null);
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
    setForm({
      name: prod.name,
      slug: prod.slug,
      description: prod.description || "",
      basePrice: prod.base_price,
      discountPercent: prod.discount_percent || "0",
      categoryId: prod.category_id || "",
      brandId: prod.brand_id || "",
      sku: prod.sku || "",
      colorName: prod.color_name || "",
      colorHex: prod.color_hex || "#111111",
      stockQuantity: prod.stock_quantity || "0",
      priceModifier: prod.price_modifier || "0",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminApi.deleteProduct(id);
        loadAdminProducts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.error(error);
    }
  };

  return (
    <div className="admin-products-view">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Quản Lý Danh Sách Sản Phẩm</h4>
        <button
          className="btn btn-success px-4 fw-bold"
          onClick={handleOpenAddModal}
          style={{ backgroundColor: "#006837" }}
        >
          <i className="fa-solid fa-plus me-2"></i> Thêm Sản Phẩm Mới
        </button>
      </div>

      <div className="card border rounded-4 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-secondary fs-7">
                <th className="ps-4">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá cơ bản</th>
                <th>Chiết khấu</th>
                <th>Màu sắc</th>
                <th>Kho hàng</th>
                <th className="pe-4 text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="fs-7 text-dark">
                  <td className="ps-4">
                    <img
                      src={prod.image_url || "/images/no-image.png"}
                      alt={prod.name}
                      className="rounded border bg-light"
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td className="fw-bold" style={{ maxWidth: "250px" }}>
                    {prod.name}
                  </td>
                  <td>
                    {parseFloat(prod.base_price).toLocaleString("vi-VN")}₫
                  </td>
                  <td>
                    <span className="badge bg-danger-subtle text-danger rounded-1">
                      {prod.discount_percent}%
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className="d-inline-block rounded-circle border"
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: prod.color_hex || "#ccc",
                        }}
                      ></span>
                      <span>{prod.color_name || "N/A"}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`fw-bold ${parseInt(prod.stock_quantity) > 0 ? "text-success" : "text-danger"}`}
                    >
                      {prod.stock_quantity || 0} pcs
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2 rounded-2"
                      onClick={() => handleOpenEditModal(prod)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-2"
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
      </div>

      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header border-bottom px-4">
                  <h5 className="modal-title fw-bold text-dark">
                    {editingId
                      ? "Cập Nhật Thông Tin Sản Phẩm"
                      : "Thêm Thiết Bị Công Nghệ Mới"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
                <div
                  className="modal-body p-4 overflow-auto"
                  style={{ maxHeight: "calc(100vh - 200px)" }}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted fw-medium fs-7">
                        Tên sản phẩm *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted fw-medium fs-7">
                        Chuỗi liên kết URL (Slug) *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={form.slug}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Danh mục sản phẩm *
                      </label>
                      <select
                        className="form-select"
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
                      <label className="form-label text-muted fw-medium fs-7">
                        Thương hiệu nhà sản xuất *
                      </label>
                      <select
                        className="form-select"
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
                      <label className="form-label text-muted fw-medium fs-7">
                        Mã định danh sản phẩm (SKU) *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={form.sku}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Giá niêm yết cơ bản (VND) *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="basePrice"
                        value={form.basePrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Chiết khấu (%)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="discountPercent"
                        value={form.discountPercent}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Giá trị điều chỉnh biến thể
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="priceModifier"
                        value={form.priceModifier}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Tên màu sắc
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="colorName"
                        value={form.colorName}
                        onChange={handleInputChange}
                        placeholder="E.g., Cosmic Black"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Mã màu đồ họa (Hex)
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-color w-100"
                        name="colorHex"
                        value={form.colorHex}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-medium fs-7">
                        Số lượng nhập kho *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="stockQuantity"
                        value={form.stockQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted fw-medium fs-7">
                        Hình ảnh đại diện sản phẩm
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted fw-medium fs-7">
                        Mô tả cấu hình chi tiết
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success fw-bold px-4"
                    style={{ backgroundColor: "#006837" }}
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
