import ProductCard from "../common/ProductCard";
import "../../styles/components/showcase.css";

export default function FeaturedShowcase({
  products,
  activeTab,
  setActiveTab,
  navigate,
}) {
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="showcase-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-3 col-lg-4 d-none d-lg-block">
            <div className="showcase-banner-card">
              <div className="showcase-banner-badge-wrapper">
                <h4 className="showcase-banner-badge">
                  Ưu Đãi Đặc Biệt
                </h4>
              </div>
              <div className="showcase-banner-content">
                <h5 className="showcase-banner-heading">
                  Tay Cầm Điều Khiển
                  <br />
                  Aero Control Pro
                </h5>
                <p className="showcase-banner-price">3.000.000₫</p>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="showcase-filter-header">
              <h3 className="showcase-filter-title">
                Sản Phẩm Nổi Bật
              </h3>
              <ul className="showcase-filter-list" role="tablist">
                {["all", "laptop", "keyboard", "mouse", "headphone"].map(
                  (tab) => (
                    <li className="showcase-filter-item" key={tab}>
                      <button
                        className={`showcase-filter-button ${activeTab === tab ? "showcase-filter-button--active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === "all"
                          ? "Tất Cả Sản Phẩm"
                          : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="row g-4">
              {filteredProducts.map((prod) => (
                <div
                  className="col-xl-3 col-md-4 col-sm-6 showcase-product-col"
                  key={prod.id}
                  onClick={() => navigate("product-detail")}
                >
                  <ProductCard product={prod} layoutMode="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}