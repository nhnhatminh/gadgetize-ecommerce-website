import "../../styles/components/showcase.css";

export default function FlashSaleBanner() {
  return (
    <section className="flash-sale-banner-section">
      <div className="container">
        <div className="flash-sale-banner-card">
          <div className="flash-sale-left-text">
            <h3 className="flash-sale-title">
              Tiết Kiệm Lớn Đang Chờ Bạn!
            </h3>
            <p className="flash-sale-subtitle">
              Mua Ngay – Ưu Đãi Cực Sốc!
            </p>
          </div>

          <div className="flash-sale-center-img">
            <img
              src="/images/banner-sale-pr.png"
              alt="Flash Sale Phone"
              className="flash-sale-phone-image"
            />
          </div>

          <div className="flash-sale-right-img">
            <img
              src="/images/banner-sale.png"
              alt="Flash Sale Badge"
              className="flash-sale-badge-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}