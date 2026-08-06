import { useState, useEffect } from "react";
import "../../styles/layouts/auth.css";

export default function SocialLogin() {
  return (
    <>
      <div className="position-relative d-flex align-items-center justify-content-center my-4">
        <div className="position-absolute border-top w-100 border-light-subtle"></div>
        <span className="position-relative bg-white px-3 text-muted text-des">
          Hoặc kết nối qua
        </span>
      </div>

      <div className="d-flex gap-3">
        <button
          type="button"
          className="btn btn-social-login w-50 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 text-dark fw-medium border"
        >
          <i className="fa-brands fa-google text-danger fs-5"></i> Google
        </button>
        <button
          type="button"
          className="btn btn-social-login w-50 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 text-dark fw-medium border"
        >
          <i className="fa-brands fa-facebook text-primary fs-5"></i> Facebook
        </button>
      </div>
    </>
  );
}
