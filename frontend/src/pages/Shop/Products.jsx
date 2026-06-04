import React, { useState, useEffect } from "react";
import ProductCard from "../../components/common/ProductCard";
import FilterSidebar from "../../components/products/FilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import { productApi } from "../../api/productApi";
import "../../styles/layouts/products_page.css";

export default function Products({ navigate }) {
  const [priceRange, setPriceRange] = useState(30000000);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: "all", name: "Tất Cả Danh Mục" },
  ]);
  const [brands, setBrands] = useState([]);

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
        console.error(error);
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          maxPrice: priceRange,
          limit: 40,
        };

        if (selectedCategory !== "all") {
          params.category = selectedCategory;
        }

        if (sortBy === "price-low") {
          params.sort = "price_asc";
        } else if (sortBy === "price-high") {
          params.sort = "price_desc";
        } else if (sortBy === "bestseller") {
          params.sort = "rating";
        } else {
          params.sort = "newest";
        }

        const data = await productApi.getProducts(params);

        const formatted = data.products.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image_url || "/images/no-image.png",
          discount: parseInt(p.discount_percent || 0, 10),
          oldPrice: parseFloat(p.base_price),
          newPrice:
            (parseFloat(p.base_price) + parseFloat(p.price_modifier || 0)) *
            (1 - parseFloat(p.discount_percent || 0) / 100),
          rating: parseFloat(p.rating || 5),
          reviews: parseInt(p.review_count || 0, 10),
          bestseller: parseFloat(p.rating) >= 4.5,
        }));

        setProducts(formatted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [selectedCategory, priceRange, sortBy]);

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
            <img
              src="/images/breadcome-pr.png"
              alt="Tablet"
              className="position-absolute start-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
            <img
              src="/images/pr-5.png"
              alt="Phones"
              className="position-absolute end-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            brands={brands}
          />

          <main className="col-lg-9">
            <ProductsToolbar
              productsCount={products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="row g-3">
              {products.length > 0 ? (
                products.map((prod) => (
                  <div
                    className="col-xxl-2 col-xl-3 col-md-4 col-sm-6"
                    key={prod.id}
                    onClick={() => navigate("product-detail")}
                  >
                    <ProductCard product={prod} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted fs-6 mb-0">
                    Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
