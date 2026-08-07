import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductGallery from "../../components/productDetail/ProductGallery";
import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductDescriptionTabs from "../../components/productDetail/ProductDescriptionTabs";
import RelatedProducts from "../../components/productDetail/RelatedProducts";
import { productApi } from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State quản lý sản phẩm
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("desc");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);
        setQuantity(1); // Reset khi đổi sản phẩm

        const data = await productApi.getProducts({ limit: 100 });
        if (data.products && data.products.length > 0) {
          const foundProduct = data.products.find((item) => item.slug === slug);

          // Quay về trang Cửa hàng nếu không tìm thấy sản phẩm
          if (!foundProduct) {
            navigate("/shop", { replace: true });
            return;
          }

          const basePrice = parseFloat(foundProduct.base_price || 0);
          const priceModifier = parseFloat(foundProduct.price_modifier || 0);
          const discountPercent = parseFloat(foundProduct.discount_percent || 0);
          const finalPrice =
            (basePrice + priceModifier) * (1 - discountPercent / 100);

          const defaultImage = foundProduct.image_url || "/images/no-image.png";

          setCurrentProduct({
            id: foundProduct.id,
            variantId: foundProduct.variant_id,
            name: foundProduct.name,
            price: finalPrice,
            oldPrice: basePrice,
            discount: parseInt(discountPercent, 10),
            rating: Math.round(parseFloat(foundProduct.rating || 5)),
            reviews: parseInt(foundProduct.review_count || 0, 10),
            description:
              foundProduct.description || "Chưa có mô tả cho sản phẩm này.",
            stock: parseInt(foundProduct.stock_quantity || 0, 10),
            sku: foundProduct.sku || `SKU-${foundProduct.id}`,
            category: foundProduct.category_name,
            tags: "Thiết bị điện tử, Gadget",
            images: [defaultImage],
          });

          setMainImage(defaultImage);
          setSelectedColor(foundProduct.color_name || "Mặc định");

          // Danh sách sản phẩm liên quan
          const formattedRelated = data.products
            .filter((item) => item.id !== foundProduct.id)
            .slice(0, 6)
            .map((item) => ({
              id: item.id,
              variantId: item.variant_id,
              slug: item.slug,
              name: item.name,
              image: item.image_url || "/images/no-image.png",
              description: item.description,
              discount: parseInt(item.discount_percent || 0, 10),
              oldPrice: parseFloat(item.base_price),
              newPrice:
                (parseFloat(item.base_price) +
                  parseFloat(item.price_modifier || 0)) *
                (1 - parseFloat(item.discount_percent || 0) / 100),
              rating: parseFloat(item.rating || 5),
              reviews: parseInt(item.review_count || 0, 10),
            }));

          setRelatedProducts(formattedRelated);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug, navigate]);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      if (currentProduct && quantity < currentProduct.stock) {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!currentProduct || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart(currentProduct.variantId, quantity);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleLegacyNavigate = (page, targetSlug = null) => {
    if (page === "product-detail" && targetSlug) {
      navigate(`/product/${targetSlug}`);
    } else if (page === "cart") {
      navigate("/cart");
    } else if (page === "products" || page === "shop") {
      navigate("/shop");
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentProduct) return null;

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
              <h1 className="fw-bold text-dark mb-0">{currentProduct.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <main className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <ProductGallery
                images={currentProduct.images}
                mainImage={mainImage}
                setMainImage={setMainImage}
                productName={currentProduct.name}
              />
            </div>

            <div className="col-lg-6">
              <ProductInfo
                mainProduct={currentProduct}
                quantity={quantity}
                handleQuantityChange={handleQuantityChange}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                navigate={handleLegacyNavigate}
                onAddToCart={handleAddToCart}
                isAdding={isAdding}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <ProductDescriptionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                productImage={mainImage}
                description={currentProduct.description}
              />
            </div>
          </div>

          <RelatedProducts
            relatedProducts={relatedProducts}
            navigate={handleLegacyNavigate}
          />
        </div>
      </main>
    </div>
  );
}