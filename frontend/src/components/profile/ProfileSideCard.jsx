import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/profile.css";

export default function ProfileSideCard() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "Quận Bình Thạnh, TP. Hồ Chí Minh",
  });

  const [avatarPreview, setPreviewUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="profile-side-card">
      <div className="profile-cover-box">
        <img
          src="/images/green-bg-banner.png"
          alt="Cover Banner"
          className="profile-cover-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/horizontal-banner.png";
          }}
        />
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-box">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User Avatar"
                className="profile-avatar-img"
              />
            ) : (
              <span className="profile-avatar-initial">
                {user?.firstName?.charAt(0) || "M"}
              </span>
            )}
            <label className="profile-avatar-upload-btn" htmlFor="avatar-upload">
              <i className="fa-solid fa-camera"></i>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                className="profile-avatar-input"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="profile-header-info">
        <h5 className="profile-user-fullname">
          {user ? `${user.lastName} ${user.firstName}` : "Nguyễn Huỳnh Nhật Minh"}
        </h5>
        <span className="profile-join-date">
          <i className="fa-regular fa-calendar-check"></i> Thành viên từ tháng 8/2025
        </span>
      </div>

      <form className="profile-details-form" onSubmit={handleFormSubmit}>
        <h6 className="profile-section-heading">Thông tin liên hệ</h6>

        {saveSuccess && (
          <div className="profile-alert-success">
            <i className="fa-solid fa-circle-check"></i> Đã lưu thay đổi thành công!
          </div>
        )}

        <div className="profile-form-row">
          <div className="profile-form-group">
            <label className="profile-form-label">Họ</label>
            <input
              type="text"
              name="lastName"
              className="profile-form-input"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-form-label">Tên</label>
            <input
              type="text"
              name="firstName"
              className="profile-form-input"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form-group">
          <label className="profile-form-label">Địa chỉ Email</label>
          <div className="profile-input-icon-box">
            <input
              type="email"
              className="profile-form-input profile-form-input--disabled"
              value={user?.email || "nhatminh@gadgetize.com"}
              readOnly
            />
            <i className="fa-regular fa-envelope profile-input-icon"></i>
          </div>
        </div>

        <div className="profile-form-group">
          <label className="profile-form-label">Số điện thoại</label>
          <div className="profile-input-icon-box">
            <input
              type="text"
              name="phone"
              className="profile-form-input"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Thêm số điện thoại..."
            />
            <i className="fa-solid fa-phone profile-input-icon"></i>
          </div>
        </div>

        <div className="profile-form-group">
          <label className="profile-form-label">Địa chỉ giao hàng mặc định</label>
          <textarea
            name="address"
            rows="2"
            className="profile-form-textarea"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="profile-submit-btn"
          disabled={isSaving}
        >
          {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
        </button>
      </form>

      <div className="profile-membership-section">
        <h6 className="profile-section-heading">Danh hiệu & Điểm thưởng</h6>
        <div className="profile-badges-group">
          <span className="profile-badge-item profile-badge-item--vip">
            <i className="fa-solid fa-crown"></i> VIP Member
          </span>
          <span className="profile-badge-item profile-badge-item--buyer">
            <i className="fa-solid fa-bag-shopping"></i> Khách Hàng Thân Thiết
          </span>
        </div>
        <div className="profile-points-box">
          <span className="profile-points-label">Điểm tích lũy Gadget:</span>
          <span className="profile-points-value">1.250 PTS</span>
        </div>
      </div>
    </div>
  );
}