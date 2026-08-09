import ProfileSideCard from "../../components/profile/ProfileSideCard";
import OrderLiveTimeline from "../../components/profile/OrderLiveTimeline";
import "../../styles/layouts/profile.css";

export default function Profile() {
  return (
    <div className="profile-page-wrapper">
      <div className="container">
        <div className="profile-page-header">
          <h2 className="profile-page-title">Trung Tâm Cá Nhân & Đơn Hàng</h2>
          <p className="profile-page-subtitle">
            Quản lý hồ sơ cá nhân và theo dõi lộ trình đơn hàng trực tuyến của bạn
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <ProfileSideCard />
          </div>
          <div className="col-lg-8">
            <OrderLiveTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}