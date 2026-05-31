import React, { useState } from "react";
import ProductGallery from "../../components/productDetail/ProductGallery";
import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductDescriptionTabs from "../../components/productDetail/ProductDescriptionTabs";
import RelatedProducts from "../../components/productDetail/RelatedProducts";

import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

export default function ProductDetail({ navigate }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("green");
  const [activeTab, setActiveTab] = useState("desc");

  const mainProduct = {
    name: "Tai Nghe Razer Electra",
    price: 300000,
    oldPrice: 375000,
    discount: 20,
    rating: 5,
    reviews: 1,
    description:
      "Lorem ipsum dolor sit amet consectetur. Est morbi cum bibendum id eleifend ultrices enim nec. Vitae morbi mus imperdiet tincidunt ultrices hendrerit. Lobortis donec massa fermentum aliquet sapien. Magna risus donec aliquam diam aliquet consectetur...",
    stock: 10,
    sku: "RZ-ELECTRA-01",
    category: "Tai Nghe Rảnh Tay, Trang Chủ",
    tags: "Phụ kiện, Earbuds, Thiết bị điện tử",
    images: [
      "/images/pr-1.png",
      "/images/pr-4.png",
      "/images/pr-9.png",
      "/images/cate-3.png",
      "/images/pr-3.png",
      "/images/pr-2.png",
      "/images/pr-5.png",
    ],
  };

  const [mainImage, setMainImage] = useState(mainProduct.images[0]);

  const relatedProducts = [
    {
      id: 1,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 2,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 3,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 4,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 5,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 6,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
  ];

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="product-detail-page-wrapper">
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
              <h1 className="fw-bold text-dark mb-0">{mainProduct.name}</h1>
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

      <main className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <ProductGallery
                images={mainProduct.images}
                mainImage={mainImage}
                setMainImage={setMainImage}
                productName={mainProduct.name}
              />
            </div>

            <div className="col-lg-6">
              <ProductInfo
                mainProduct={mainProduct}
                quantity={quantity}
                handleQuantityChange={handleQuantityChange}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                navigate={navigate}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <ProductDescriptionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>

          <RelatedProducts relatedProducts={relatedProducts} />
        </div>
      </main>
    </div>
  );
}
