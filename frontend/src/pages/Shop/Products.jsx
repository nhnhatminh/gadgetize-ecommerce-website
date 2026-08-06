import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";
import FilterSidebar from "../../components/products/FilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import { productApi } from "../../api/productApi";
import "../../styles/layouts/products_page.css";

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Đồng bộ bộ lọc với URL
  const searchKeyword = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  // State quản lý bộ lọc
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState(50000000);
  const [sortBy, setSortBy] = useState("newest");

  // State quản lý sản phẩm
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: "all", name: "Tất Cả Danh Mục" },
  ]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Tải danh mục và thương hiệu
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          productApi.getCategories(),
          productApi.getBrands(),
        ]);

        setCategories([
          { id: "all", name: "Tất Cả Danh Mục" },
          ...categoriesData.map((c) => ({ id: c.slug, name: c.name })),
        ]);

        setBrands(brandsData.map((b) => b.name));
      } catch (error) {
        console.error("Lỗi tải danh mục/thương hiệu:", error);
      }
    };
    fetchMetadata();
  }, []);

  // Tải danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const params = {
          page: currentPage,
          limit: 12,
          maxPrice: priceRange,
          sort: sortBy,
        };

        if (selectedCategory !== "all") {
          params.category = selectedCategory;
        }

        if (selectedBrand !== "all") {
          params.brand = selectedBrand;
        }

        if (searchKeyword.trim()) {
          params.search = searchKeyword.trim();
        }

        const data = await productApi.getProducts(params);

        const formatted = (data.products || []).map((p) => ({
          id: p.id,
          variantId: p.variant_id,
          slug: p.slug,
          name: p.name,
          description: p.description,
          image: p.image_url || "/images/no-image.png",
          discount: parseInt(p.discount_percent || 0, 10),
          oldPrice: parseFloat(p.base_price),
          newPrice:
            (parseFloat(p.base_price) + parseFloat(p.price_modifier || 0)) *
            (1 - parseFloat(p.discount_percent || 0) / 100),
          rating: parseFloat(p.rating || 5),
          reviews: parseInt(p.review_count || 0, 10),
        }));

        setProducts(formatted);
        if (data.meta) {
          setTotalPages(data.meta.totalPages || 1);
          setTotalProductsCount(data.meta.totalProducts || 0);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchKeyword, currentPage]);

  // Cập nhật URL theo bộ lọc
  const handleCategoryChange = (category) => {
    setSearchParams((prev) => {
      if (category === "all") prev.delete("category");
      else prev.set("category", category);
      return prev;
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (keyword) => {
    setSearchParams((prev) => {
      if (!keyword.trim()) prev.delete("search");
      else prev.set("search", keyword.trim());
      return prev;
    });
    setCurrentPage(1);
  };

  // Đặt lại bộ lọc
  const handleResetFilters = () => {
    setSelectedBrand("all");
    setPriceRange(50000000);
    setSortBy("newest");
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="products-page-wrapper">
      <section
        className="page-banner position-relative py-5 overflow-hidden"
        style={{ backgroundColor: "var(--light-grey)" }}
      >
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "180px" }}
          >
            <div className="col-12 text-center z-2">
              <h1 className="fw-bold text-dark mb-0">Danh Sách Sản Phẩm</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            priceRange={priceRange}
            setPriceRange={(price) => {
              setPriceRange(price);
              setCurrentPage(1);
            }}
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={(brand) => {
              setSelectedBrand(brand);
              setCurrentPage(1);
            }}
            searchKeyword={searchKeyword}
            setSearchKeyword={handleSearchChange}
            onResetFilters={handleResetFilters}
          />

          <main className="col-lg-9">
            <ProductsToolbar
              productsCount={totalProductsCount}
              sortBy={sortBy}
              setSortBy={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
            />

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="row g-3">
                  {products.map((prod) => (
                    <div
                      className="col-xxl-3 col-xl-4 col-md-4 col-sm-6"
                      key={prod.id}
                      onClick={() => navigate(`/product/${prod.slug}`)}
                    >
                      <ProductCard product={prod} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Trước
                    </button>
                    <span className="fs-7 fw-medium text-dark px-2">
                      Trang {currentPage} / {totalPages}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="col-12 text-center py-5 bg-white rounded-4 border">
                <p className="text-muted fs-6 mb-0">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}