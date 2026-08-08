import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeBanner from "../../components/home/HomeBanner";
import CategorySlider from "../../components/home/CategorySlider";
import FeaturedShowcase from "../../components/home/FeaturedShowcase";
import PopularGrid from "../../components/home/PopularGrid";
import BrandSlider from "../../components/home/BrandSlider";
import "../../styles/layouts/home.css";

export default function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [activePopularTab, setActivePopularTab] = useState("all");

  const products = [
    {
      id: 1,
      category: "headphone",
      discount: 20,
      image: "/images/pr-1.png",
      name: "Tai Nghe Razer Electra",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 1500000,
      newPrice: 1200000,
    },
    {
      id: 2,
      category: "mouse",
      discount: 2,
      image: "/images/pr-2.png",
      name: "Chuột Hyper Glide",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 2500000,
      newPrice: 2450000,
    },
    {
      id: 3,
      category: "keyboard",
      discount: 9,
      image: "/images/pr-3.png",
      name: "Màn Hình LCD Radiant View",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 24500000,
      newPrice: 22500000,
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
      reviews: 5,
      oldPrice: 20000000,
      newPrice: 17000000,
    },
  ];

  const handleLegacyNavigate = (page, slug = null) => {
    if (page === "product-detail" && slug) {
      navigate(`/product/${slug}`);
    } else if (page === "products" || page === "shop") {
      navigate("/shop");
    } else if (page === "cart") {
      navigate("/cart");
    } else if (page === "checkout") {
      navigate("/checkout");
    } else {
      navigate("/");
    }
  };

  return (
    <main className="home-page-main">
      <HomeBanner navigate={handleLegacyNavigate} />
      <CategorySlider />
      <FeaturedShowcase
        products={products}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigate={handleLegacyNavigate}
      />
      <PopularGrid
        activePopularTab={activePopularTab}
        setActivePopularTab={setActivePopularTab}
        navigate={handleLegacyNavigate}
      />
      <BrandSlider />
    </main>
  );
}