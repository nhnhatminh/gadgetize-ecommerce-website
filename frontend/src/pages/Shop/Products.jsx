import React, { useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import FilterSidebar from "../../components/products/FilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import "../../styles/layouts/products_page.css";

export default function Products({ navigate }) {
  const [priceRange, setPriceRange] = useState(30000000);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    { id: "all", name: "Tất Cả Danh Mục" },
    { id: "laptop", name: "Laptop & Máy Tính" },
    { id: "phone", name: "Smartphone & Tablet" },
    { id: "audio", name: "TV & Âm Thanh" },
    { id: "accessories", name: "Tai Nghe & Phụ Kiện" },
  ];

  const brands = ["Razer", "Logitech", "Apple", "Samsung", "ASUS"];

  const productList = [
    {
      id: 1,
      category: "accessories",
      discount: 20,
      image: "/images/pr-1.png",
      name: "Tai Nghe Razer Electra",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 1500000,
      newPrice: 1200000,
      bestseller: true,
    },
    {
      id: 2,
      category: "accessories",
      discount: 2,
      image: "/images/pr-2.png",
      name: "Chuột Hyper Glide",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 4,
      reviews: 12,
      oldPrice: 2500000,
      newPrice: 2450000,
      bestseller: false,
    },
    {
      id: 3,
      category: "audio",
      discount: 9,
      image: "/images/pr-3.png",
      name: "Màn Hình LCD Radiant View",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 8,
      oldPrice: 24500000,
      newPrice: 22500000,
      bestseller: true,
    },
    {
      id: 4,
      category: "laptop",
      discount: 15,
      image: "/images/pr-4.png",
      name: "Laptop Gaming Nitro 5",
      description:
        "Sản phẩm laptop cấu hình cao dành riêng cho giới game thủ chuyên nghiệp.",
      rating: 5,
      reviews: 3,
      oldPrice: 20000000,
      newPrice: 17000000,
      bestseller: true,
    },
    {
      id: 5,
      category: "phone",
      discount: 50,
      image: "/images/pr-5.png",
      name: "Điện thoại iPhone 14 Pro Max",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 14,
      oldPrice: 34000000,
      newPrice: 17500000,
      bestseller: true,
    },
    {
      id: 6,
      category: "accessories",
      discount: 14,
      image: "/images/pr-6.png",
      name: "Tai Nghe Pure Bass Pro",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 4,
      reviews: 9,
      oldPrice: 2100000,
      newPrice: 1800000,
      bestseller: false,
    },
    {
      id: 7,
      category: "audio",
      discount: 9,
      image: "/images/pr-7.png",
      name: "Màn Hình LCD CrystalView",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 21,
      oldPrice: 24500000,
      newPrice: 22500000,
      bestseller: false,
    },
    {
      id: 8,
      category: "laptop",
      discount: 12,
      image: "/images/pr-8.png",
      name: "UltraTech Note X",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 4,
      reviews: 5,
      oldPrice: 22500000,
      newPrice: 20000000,
      bestseller: false,
    },
    {
      id: 9,
      category: "accessories",
      discount: 46,
      image: "/images/pr-9.png",
      name: "Bàn Phím Silent Touch Pro",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 7,
      oldPrice: 1650000,
      newPrice: 890000,
      bestseller: true,
    },
    {
      id: 10,
      category: "accessories",
      discount: 30,
      image: "/images/pr-10.png",
      name: "Tai nghe Airpod Pro 3",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 18,
      oldPrice: 4700000,
      newPrice: 3297000,
      bestseller: true,
    },
    {
      id: 11,
      category: "phone",
      discount: 10,
      image: "/images/cate-3.png",
      name: "Nexus Mobile Pro 256GB",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 4,
      reviews: 32,
      oldPrice: 15000000,
      newPrice: 13500000,
      bestseller: false,
    },
    {
      id: 12,
      category: "audio",
      discount: 15,
      image: "/images/cate-5.png",
      name: "Loa Bluetooth SoundWave",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 4,
      oldPrice: 4500000,
      newPrice: 3825000,
      bestseller: false,
    },
  ];

  const filteredProducts = productList
    .filter(
      (p) => selectedCategory === "all" || p.category === selectedCategory,
    )
    .filter((p) => p.newPrice <= priceRange)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.newPrice - b.newPrice;
      if (sortBy === "price-high") return b.newPrice - a.newPrice;
      if (sortBy === "bestseller")
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return 0;
    });

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
              productsCount={filteredProducts.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="row g-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
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
