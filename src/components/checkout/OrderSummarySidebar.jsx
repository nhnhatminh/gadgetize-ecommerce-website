import React from "react";

export default function OrderSummarySidebar() {
  return (
    <div className="checkout-right col-12 col-lg-5 px-4 py-5 px-lg-5 border-start border-light-subtle">
      <div className="checkout-summary-inner mx-auto">
        <div className="summary-product d-flex align-items-center gap-3 mb-4">
          <div className="summary-product-img position-relative border rounded-3 bg-white p-2 d-flex align-items-center justify-content-center">
            <img
              src="/images/cate-3.png"
              alt="Silent Touch Pro"
              className="img-fluid object-fit-contain"
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
              1
            </span>
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-0 text-dark fw-bold">Silent Touch Pro</h6>
          </div>
          <div className="fw-medium text-dark fs-7">9.800.000₫</div>
        </div>

        <div className="border-top border-bottom py-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
            <span className="text-dark">Tạm tính</span>
            <span className="fw-medium text-dark">9.800.000₫</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
            <span className="text-dark">Phí vận chuyển</span>
            <span className="fw-medium text-dark">Miễn phí</span>
          </div>
          <div className="d-flex justify-content-between align-items-center fs-7">
            <span className="text-dark">Thuế tạm tính</span>
            <span className="fw-medium text-dark">Thuế tạm tính</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-dark">Tổng cộng</span>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted fs-8">VND</span>
            <span className="fw-bold fs-4 text-dark">11.368.000₫</span>
          </div>
        </div>
      </div>
    </div>
  );
}
