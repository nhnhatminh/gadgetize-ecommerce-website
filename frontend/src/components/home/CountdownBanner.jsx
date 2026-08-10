import { useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import "../../styles/components/countdown_banner.css";

export default function CountdownBanner({ navigate }) {
  const [targetDate] = useState(() => {
    return new Date(
      Date.now() + (7 * 24 * 60 * 60 + 10 * 3600 + 55 * 60 + 24) * 1000
    );
  });

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <section className="countdown-banner-section">
      <div className="container">
        <div className="countdown-banner-card">
          <div className="countdown-banner-left">
            <h3 className="countdown-banner-title">
              <span className="countdown-highlight-yellow">Nhanh lên!</span>{" "}
              Ưu đãi kết thúc sau
            </h3>
            <button
              type="button"
              className="countdown-buy-btn"
              onClick={() => navigate && navigate("shop")}
            >
              Mua Ngay
            </button>
          </div>

          <div className="countdown-banner-center">
            <div className="countdown-timer-group">
              <div className="countdown-box-wrapper">
                <div className="countdown-number-box">{days}</div>
                <span className="countdown-label">Ngày</span>
              </div>
              <div className="countdown-box-wrapper">
                <div className="countdown-number-box">{hours}</div>
                <span className="countdown-label">Giờ</span>
              </div>
              <div className="countdown-box-wrapper">
                <div className="countdown-number-box">{minutes}</div>
                <span className="countdown-label">Phút</span>
              </div>
              <div className="countdown-box-wrapper">
                <div className="countdown-number-box">{seconds}</div>
                <span className="countdown-label">Giây</span>
              </div>
            </div>
          </div>

          <div className="countdown-banner-right">
            <img
              src="/images/breadcome-pr.png"
              alt="Promotional Products"
              className="countdown-product-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}