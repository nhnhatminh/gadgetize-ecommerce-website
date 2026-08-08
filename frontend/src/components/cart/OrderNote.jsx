import { useState } from "react";
import "../../styles/layouts/cart.css";

export default function OrderNote() {
  const [note, setNote] = useState("");

  return (
    <div className="order-note-card">
      <h5 className="order-note-title">
        <i className="fa-solid fa-pen-to-square"></i> Ghi Chú Đơn Hàng
      </h5>
      <p className="order-note-subtitle">
        Ghi chú thêm về thời gian giao hàng hoặc hướng dẫn đặc biệt cho đơn hàng:
      </p>
      <textarea
        className="order-note-textarea"
        rows="4"
        placeholder="Viết ghi chú của bạn tại đây..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}