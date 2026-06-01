import React from "react";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

export default function ProductDescriptionTabs({ activeTab, setActiveTab }) {
  return (
    <div className="product-description-tabs bg-white rounded-4 p-4 p-lg-5 mb-5 shadow-sm">
      <ul
        className="nav nav-tabs justify-content-center border-bottom mb-4"
        role="tablist"
      >
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "desc" ? "active" : ""}`}
            onClick={() => setActiveTab("desc")}
            type="button"
          >
            Mô Tả
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
            type="button"
          >
            Thông Tin Bổ Sung
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
            type="button"
          >
            Đánh Giá
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === "desc" && (
          <div className="tab-pane fade show active">
            <h4 className="fw-bold mb-4">Mô Tả</h4>
            <p className="text-muted text-des mb-4">
              Lorem ipsum dolor sit amet consectetur. Est morbi cum bibendum id
              eleifend ultrices enim nec. Vitae morbi mus imperdiet tincidunt
              ultrices hendrerit. Lobortis donec massa fermentum aliquet sapien.
              Magna risus donec aliquam diam aliquet consectetur. Etiam accumsan
              ipsum augue sed vitae. Tortor volutpat et dui in malesuada
              euismod. Sociis aenean porttitor aliquet sit amet.
            </p>
            <p className="text-muted text-des mb-5">
              Nibh nunc at eget netus dictumst aenean ultricies ligula nunc.
              Morbi elit eu neque amet nulla posuere amet dictum. Nisl viverra
              sagittis elit proin donec sed. Enim ipsum at dolor nulla. Accumsan
              in commodo in facilisi ut euismod imperdiet dui. Fringilla
              pellentesque consectetur ac nibh diam morbi mattis iaculis.
            </p>
            <div className="text-center mb-5">
              <div className="row g-4">
                <div className="col-lg-6">
                  <img
                    src="/images/pr-5.png"
                    alt="Product Details"
                    className="img-fluid w-75 object-fit-contain"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
                <div className="col-lg-6">
                  <img
                    src="/images/pr-6.png"
                    alt="Product Details"
                    className="img-fluid w-75 object-fit-contain"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
              </div>
            </div>
            <p className="text-muted text-des mb-4">
              Lorem ipsum dolor sit amet consectetur. Est morbi cum bibendum id
              eleifend ultrices enim nec. Vitae morbi mus imperdiet tincidunt
              ultrices hendrerit. Lobortis donec massa fermentum aliquet sapien.
              Magna risus donec aliquam diam aliquet consectetur. Etiam accumsan
              ipsum augue sed vitae. Tortor volutpat et dui in malesuada
              euismod. Sociis aenean porttitor aliquet sit amet.
            </p>
            <p className="text-muted text-des mb-0">
              Nibh nunc at eget netus dictumst aenean ultricies ligula nunc.
              Morbi elit eu neque amet nulla posuere amet dictum. Nisl viverra
              sagittis elit proin donec sed. Enim ipsum at dolor nulla. Accumsan
              in commodo in facilisi ut euismod imperdiet dui. Fringilla
              pellentesque consectetur ac nibh diam morbi mattis iaculis.
            </p>
          </div>
        )}
        {activeTab === "info" && (
          <div className="tab-pane fade show active">
            <h4 className="fw-bold mb-4">Thông Tin Bổ Sung</h4>
            <p className="text-muted text-des">
              Nội dung thông tin bổ sung đang được cập nhật...
            </p>
          </div>
        )}
        {activeTab === "review" && (
          <div className="tab-pane fade show active">
            <h4 className="fw-bold mb-4">Đánh Giá Sản Phẩm</h4>
            <p className="text-muted text-des">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
