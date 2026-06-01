import { useState, useEffect } from "react";

function FakePaymentModal({ bike, onClose, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleFakePayment = () => {
    setError("");

    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill all payment details");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Card number must be 16 digits");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError("Expiry must be in MM/YY format");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV must be 3 digits");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onSuccess();

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          💳 Secure Checkout
        </h1>

        <div className="bg-gray-100 rounded-2xl p-6">
          <h2 className="text-2xl font-bold">{bike.title}</h2>

          <p className="text-gray-500 mt-2">{bike.brand}</p>

          <p className="text-3xl font-bold text-yellow-500 mt-6">
            ₹{bike.rentPerDay}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            maxLength={16}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            className="w-full border p-4 rounded-xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              maxLength={5}
              onChange={(e) => setExpiry(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              maxLength={3}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              className="border p-4 rounded-xl"
            />
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleFakePayment}
            disabled={loading}
            className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-black text-white py-4 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FakePaymentModal;
