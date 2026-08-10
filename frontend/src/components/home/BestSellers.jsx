import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { productApi } from "../../api/productApi";
import "../../styles/components/showcase.css";

export default function BestSellers({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const params = {
          limit: 5,
          page: currentPage,
          sort: "rating",
        };
        if (activeCategory !== "all") {
          params.category = activeCategory;
        }
        const data = await productApi.getProducts(params);

        const formatted = (data.products || []).map((p) => ({
          id: p.id,
          variantId: p.variant_id,
          slug: p.slug,
          name: p.name,
          image: p.image_url || "/images/no-image.png",
          description: p.description,
          discount: parseInt(p.discount_percent || 0, 10),
          oldPrice: parseFloat(p.base_price),
          newPrice:
            (parseFloat(p.base_price) + parseFloat(p.price_modifier || 0)) *
            (1 - parseFloat(p.discount_percent || 0) / 100),
          rating: parseFloat(p.rating || 5),
          reviews: parseInt(p.review_count || 0, 10),
        }));

        setProducts(formatted);
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm bán chạy:", error);
      }
    };

    fetchBestSellers();
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="best-sellers-section">
      <div className="container">
        <div className="showcase-filter-header">
          <h3 className="showcase-filter-title">Sản Phẩm Bán Chạy</h3>

          <div className="showcase-header-right">
            <ul className="showcase-filter-list" role="tablist">
              {[
                { key: "all", label: "Tất Cả Sản Phẩm" },
                { key: "laptop", label: "Laptop" },
                { key: "keyboard", label: "Bàn Phím" },
                { key: "mouse", label: "Chuột" },
                { key: "headphone", label: "Tai Nghe" },
              ].map((tab) => (
                <li className="showcase-filter-item" key={tab.key}>
                  <button
                    className={`showcase-filter-button ${
                      activeCategory === tab.key
                        ? "showcase-filter-button--active"
                        : ""
                    }`}
                    onClick={() => handleCategoryChange(tab.key)}
                  >
                    • {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="showcase-pagination-controls">
                <button
                  type="button"
                  className="pagination-arrow-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <span className="pagination-page-indicator">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  className="pagination-arrow-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {products.map((prod) => (
            <div
              className="col showcase-product-col"
              key={prod.id}
              onClick={() => navigate("product-detail", prod.slug)}
            >
              <ProductCard product={prod} layoutMode="vertical" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}