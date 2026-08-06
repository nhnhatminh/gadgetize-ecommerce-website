import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductGallery from "../../components/productDetail/ProductGallery";
import ProductInfo from "../../components/productDetail/ProductInfo";
import ProductDescriptionTabs from "../../components/productDetail/ProductDescriptionTabs";
import RelatedProducts from "../../components/productDetail/RelatedProducts";
import { productApi } from "../../api/productApi";
import { CartContext } from "../../context/CartContext";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("desc");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await productApi.getProducts({ limit: 40 });
        if (data.products.length > 0) {
          const p =
            data.products.find((item) => item.slug === slug) ||
            data.products[0];

          setCurrentProduct({
            id: p.id,
            variantId: p.variant_id,
            name: p.name,
            price:
              (parseFloat(p.base_price) + parseFloat(p.price_modifier || 0)) *
              (1 - parseFloat(p.discount_percent || 0) / 100),
            oldPrice: parseFloat(p.base_price),
            discount: parseInt(p.discount_percent || 0, 10),
            rating: Math.round(parseFloat(p.rating || 5)),
            reviews: parseInt(p.review_count || 0, 10),
            description: p.description,
            stock: parseInt(p.stock_quantity || 10, 10),
            sku: p.sku,
            category: p.category_name,
            tags: "Phụ kiện, Thiết bị điện tử",
            images: [
              p.image_url || "/images/pr-1.png",
              "/images/pr-2.png",
              "/images/pr-3.png",
              "/images/pr-4.png",
              "/images/pr-5.png",
            ],
          });
          setMainImage(p.image_url || "/images/pr-1.png");
          setSelectedColor(p.color_name || "Black");

          const formattedRelated = data.products
            .filter((item) => item.id !== p.id)
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
        console.error(error);
      }
    };
    fetchProductDetail();
  }, [slug]);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!currentProduct || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart(currentProduct.variantId, quantity);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleLegacyNavigate = (page, targetSlug = null) => {
    if (page === "product-detail" && targetSlug) {
      navigate(`/product/${targetSlug}`);
    } else if (page === "products" || page === "shop") {
      navigate("/shop");
    } else {
      navigate("/");
    }
  };

  if (!currentProduct) {
    return (
      <div className="text-center py-5">Loading product data matrix...</div>
    );
  }

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
