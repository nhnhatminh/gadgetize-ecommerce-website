import React from "react";
import "../../styles/layouts/products_page.css";

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  brands,
}) {
  return (
    <aside className="col-lg-3">
      <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            className="form-control py-2 px-3 fs-7"
            placeholder="Tìm Kiếm"
          />
        </div>

        <div className="mb-4">
          <h5 className="fw-bold text-dark mb-3 fs-6">Danh Mục Sản Phẩm</h5>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer d-flex justify-content-between align-items-center fs-7 ${
                  selectedCategory === cat.id
                    ? "text-success fw-semibold"
                    : "text-dark"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="text-muted">(7)</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Tình Trạng</h5>
            <span className="text-muted fs-8 cursor-pointer">Đặt Lại</span>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="stock-in"
                defaultChecked
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="stock-in"
              >
                Còn Hàng (7)
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="stock-out"
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="stock-out"
              >
                Hết Hàng (0)
              </label>
            </div>
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Giá</h5>
            <span
              className="text-muted fs-8 cursor-pointer"
              onClick={() => setPriceRange(30000000)}
            >
              Đặt Lại
            </span>
          </div>
          <div className="price-range-selector">
            <p className="text-muted fs-8 mb-2">
              Mức giá cao nhất là {priceRange.toLocaleString("vi-VN")}₫
            </p>
            <input
              type="range"
              className="form-range custom-range-slider"
              min="1000000"
              max="30000000"
              step="500000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <div className="d-flex align-items-center gap-2 mt-3">
              <span className="fw-bold text-dark fs-7">VND</span>
              <input
                type="number"
                className="form-control py-1 px-2 fs-7 text-center"
                placeholder="Từ"
              />
              <input
                type="number"
                className="form-control py-1 px-2 fs-7 text-center"
                placeholder="Đến"
              />
            </div>
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Loại Sản Phẩm</h5>
            <span className="text-muted fs-8 cursor-pointer">Đặt Lại</span>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input m-0"
              type="checkbox"
              id="type-acc"
              defaultChecked
            />
            <label
              className="form-check-label mt-1 text-dark fs-7"
              htmlFor="type-acc"
            >
              Phụ Kiện (7)
            </label>
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Màu sắc</h5>
            <span className="text-muted fs-8 cursor-pointer">Đặt Lại</span>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <div
              className="rounded-circle border cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#faf8f5",
              }}
            ></div>
            <div
              className="rounded-circle border cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#000000",
              }}
            ></div>
            <div
              className="rounded-circle border cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#008000",
              }}
            ></div>
            <div
              className="rounded-circle border cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#800080",
              }}
            ></div>
            <div
              className="rounded-circle border cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ffff00",
              }}
            ></div>
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Thương Hiệu</h5>
            <span className="text-muted fs-8 cursor-pointer">Đặt Lại</span>
          </div>
          <div className="d-flex flex-column gap-2">
            {brands.map((brand, idx) => (
              <div
                className="form-check d-flex align-items-center gap-2"
                key={idx}
              >
                <input
                  className="form-check-input m-0"
                  type="checkbox"
                  id={`brand-${idx}`}
                />
                <label
                  className="form-check-label mt-1 text-dark fs-7"
                  htmlFor={`brand-${idx}`}
                >
                  {brand} (7)
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Bộ Lọc Khác</h5>
            <span className="text-muted fs-8 cursor-pointer">Đặt Lại</span>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="other-1"
                defaultChecked
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="other-1"
              >
                Phụ Kiện (7)
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="other-2"
                defaultChecked
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="other-2"
              >
                Tai Nghe Không Dây (7)
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="other-3"
                defaultChecked
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="other-3"
              >
                Đồ Điện Tử (7)
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="other-4"
                defaultChecked
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="other-4"
              >
                Tai Nghe Có Dây (7)
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
