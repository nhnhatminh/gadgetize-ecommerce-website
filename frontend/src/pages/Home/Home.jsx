import { useNavigate } from "react-router-dom";
import HomeBanner from "../../components/home/HomeBanner";
import CategorySlider from "../../components/home/CategorySlider";
import BestSellers from "../../components/home/BestSellers";
import FlashSaleBanner from "../../components/home/FlashSaleBanner";
import PopularGrid from "../../components/home/PopularGrid";
import BrandSlider from "../../components/home/BrandSlider";
import BlogSection from "../../components/home/BlogSection";
import CountdownBanner from "../../components/home/CountdownBanner";
import "../../styles/layouts/home.css";

export default function Home() {
  const navigate = useNavigate();

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
      <BestSellers navigate={handleLegacyNavigate} />
      <FlashSaleBanner />
      <PopularGrid navigate={handleLegacyNavigate} />
      <BrandSlider />
      <BlogSection navigate={handleLegacyNavigate} />
      <CountdownBanner navigate={handleLegacyNavigate} />
    </main>
  );
}