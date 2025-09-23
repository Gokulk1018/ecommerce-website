import React, { useState } from "react";
import "./App.css";

const ReviewModal = ({ product, onClose, onSave }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSave(product.id, { rating: parseInt(rating), comment });
    setRating(5);
    setComment("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Reviews for {product.name}</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="review-list">
            {product.reviews.map((rev, idx) => (
              <li key={idx} className="review-item">
                <span>{"⭐".repeat(rev.rating)}</span> - {rev.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first!</p>
        )}
        <form onSubmit={handleSubmit} className="review-form">
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5,4,3,2,1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
          />
          <button type="submit" className="auth-btn">Submit Review</button>
        </form>
        <button onClick={onClose} className="remove-btn">Close</button>
      </div>
    </div>
  );
};

export default ReviewModal;
