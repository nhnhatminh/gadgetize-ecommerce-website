import "../../styles/layouts/product_detail_page.css";

export default function ProductDescriptionTabs({
  activeTab,
  setActiveTab,
  productImage,
  description,
}) {
  return (
    <div className="product-tabs-card">
      <ul className="product-tabs-header" role="tablist">
        <li className="product-tab-item">
          <button
            className={`product-tab-button ${activeTab === "desc" ? "product-tab-button--active" : ""}`}
            onClick={() => setActiveTab("desc")}
            type="button"
          >
            Mô Tả
          </button>
        </li>
        <li className="product-tab-item">
          <button
            className={`product-tab-button ${activeTab === "info" ? "product-tab-button--active" : ""}`}
            onClick={() => setActiveTab("info")}
            type="button"
          >
            Thông Tin Bổ Sung
          </button>
        </li>
        <li className="product-tab-item">
          <button
            className={`product-tab-button ${activeTab === "review" ? "product-tab-button--active" : ""}`}
            onClick={() => setActiveTab("review")}
            type="button"
          >
            Đánh Giá
          </button>
        </li>
      </ul>

      <div className="product-tab-content">
        {activeTab === "desc" && (
          <div className="product-tab-pane">
            <h4 className="product-tab-heading">Mô Tả Sản Phẩm</h4>
            <p className="product-tab-description">
              {description}
            </p>
            <div className="product-tab-image-wrapper">
              <div className="row g-4 justify-content-center">
                <div className="col-lg-6 text-center">
                  <img
                    src={productImage}
                    alt="Product Details"
                    className="product-tab-detail-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/no-image.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="product-tab-pane">
            <h4 className="product-tab-heading">Thông Tin Bổ Sung</h4>
            <p className="product-tab-description">
              Nội dung thông tin bổ sung đang được cập nhật...
            </p>
          </div>
        )}

        {activeTab === "review" && (
          <div className="product-tab-pane">
            <h4 className="product-tab-heading">Đánh Giá Sản Phẩm</h4>
            <p className="product-tab-description">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}