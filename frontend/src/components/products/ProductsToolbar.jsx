import "../../styles/layouts/products_toolbar.css";

export default function ProductsToolbar({ productsCount, sortBy, setSortBy }) {
  return (
    <div className="products-toolbar">
      <div className="products-toolbar-left">
        <div className="products-toolbar-layout-toggle">
          <i className="fa-solid fa-border-all active"></i>
          <i className="fa-solid fa-list"></i>
        </div>
        <span className="products-toolbar-count">
          {productsCount} sản phẩm
        </span>
      </div>

      <div className="products-toolbar-right">
        <label className="products-toolbar-label">Lọc theo:</label>
        <select
          className="products-toolbar-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá: Thấp đến Cao</option>
          <option value="price_desc">Giá: Cao đến Thấp</option>
          <option value="rating">Đánh giá cao nhất</option>
        </select>
      </div>
    </div>
  );
}