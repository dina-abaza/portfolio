"use client";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/201124885991"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
      style={{
        width: "40px",
        height: "40px",
        background: "linear-gradient(135deg, #22A559, #A98F5C)",
        boxShadow: "0 4px 18px rgba(21, 128, 61,0.35)",
      }}
    >
      {/* Ping ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: "rgba(34, 165, 89,0.22)", animationDuration: "1.8s" }}
      />

      {/* WhatsApp icon — thin outline style */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
        style={{ position: "relative", zIndex: 1 }}
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    </a>
  );
}
