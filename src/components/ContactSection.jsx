"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLang } from "@/context/LangContext";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const SOCIALS = [
  { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/aurora-softwarehouse/", label: "LinkedIn" },
  { Icon: FaFacebookF,  url: "https://www.facebook.com/profile.php?id=61583612949472", label: "Facebook" },
  { Icon: FaInstagram,  url: "https://www.instagram.com/aurorasoftwarehouse/", label: "Instagram" },
  { Icon: FaWhatsapp,   url: "https://wa.me/201124885991", label: "WhatsApp" },
  { Icon: FaGithub,     url: "https://github.com/aurorasoftwarehouse", label: "GitHub" },
];

const CONTACT_VALUES = [
  { Icon: Mail,   value: "aurorasoftwarehouse@gmail.com", key: "email" },
  { Icon: Phone,  value: "+20 112 488 5991",              key: "phone" },
  { Icon: MapPin, value: "Cairo, Egypt · Remote Worldwide", key: "location" },
];

const inputBase = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  outline: "none",
  fontSize: "13px",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  background: "#FAF8F3",
  color: "#0F172A",
  textTransform: "none",
};

export default function ContactSection() {
  const { T, isAr } = useLang();
  const CONTACT_INFO = CONTACT_VALUES.map((c) => ({ ...c, label: T.contact.labels[c.key] }));
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", ideaDescription: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: !value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.fullName.trim())        newErrors.fullName = true;
    if (!form.email.trim())           newErrors.email = true;
    if (!form.phone.trim())           newErrors.phone = true;
    if (!form.ideaDescription.trim()) newErrors.ideaDescription = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(T.contact.toastSuccess);
        setSent(true);
        setForm({ fullName: "", email: "", phone: "", ideaDescription: "" });
      } else {
        toast.error(T.contact.toastError);
      }
    } catch {
      toast.error(T.contact.toastNetwork);
    } finally {
      setLoading(false);
    }
  };

  const getBorder = (fieldErr) =>
    `1px solid ${fieldErr ? "rgba(220,38,38,0.55)" : "rgba(21, 128, 61,0.18)"}`;

  return (
    <section
      id="contact"
      className="py-16 px-6 scroll-mt-16 relative overflow-hidden"
      style={{ background: "#FAF8F3" }}
    >
      {/* bg accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "600px",
          top: "50%", right: "-200px",
          marginTop: "-300px",
          background: "radial-gradient(circle, rgba(21, 128, 61,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-pill mb-6 inline-flex">{T.contact.pill}</span>
          <h2
            className="font-bold mt-6 mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: "#0F172A" }}
          >
            {T.contact.h2_1}
            <span className="text-gradient-warm"> {T.contact.h2_2}</span>
          </h2>
          <p
            className="max-w-md mx-auto leading-relaxed"
            style={{ color: "#64748B", textTransform: "none", fontSize: "1rem" }}
          >
            {T.contact.desc}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {CONTACT_INFO.map(({ Icon, value, label }) => (
              <div
                key={label}
                className="card flex items-start gap-4 p-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(21, 128, 61,0.07)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#15803D" }} strokeWidth={1.75} />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[2px] mb-1"
                    style={{ color: "#94A3B8" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#0F172A", textTransform: "none" }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="card p-5">
              <p
                className="text-xs font-bold uppercase tracking-[2px] mb-4"
                style={{ color: "#94A3B8" }}
              >
                {T.contact.followUs}
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(21, 128, 61,0.07)",
                      border: "1px solid rgba(21, 128, 61,0.18)",
                      color: "#15803D",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(21, 128, 61,0.14)";
                      e.currentTarget.style.color = "#22A559";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(21, 128, 61,0.07)";
                      e.currentTarget.style.color = "#15803D";
                    }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="card p-8 flex flex-col gap-4"
            >
              <h3
                className="font-bold text-lg mb-1"
                style={{ color: "#0F172A" }}
              >
                {T.contact.formTitle}
              </h3>
              <p
                className="text-xs mb-3"
                style={{ color: "#64748B", textTransform: "none" }}
              >
                {T.contact.formDesc}
              </p>

              <input
                type="text"
                name="fullName"
                placeholder={T.contact.fullName}
                value={form.fullName}
                onChange={handleChange}
                style={{ ...inputBase, border: getBorder(errors.fullName) }}
              />
              <input
                type="email"
                name="email"
                placeholder={T.contact.email}
                value={form.email}
                onChange={handleChange}
                style={{ ...inputBase, border: getBorder(errors.email) }}
              />
              <input
                type="tel"
                name="phone"
                placeholder={T.contact.phone}
                value={form.phone}
                onChange={handleChange}
                style={{
                  ...inputBase,
                  border: getBorder(errors.phone),
                  direction: isAr ? "rtl" : "ltr",
                  textAlign: isAr ? "right" : "left",
                }}
              />
              <textarea
                name="ideaDescription"
                placeholder={T.contact.idea}
                rows={5}
                value={form.ideaDescription}
                onChange={handleChange}
                style={{ ...inputBase, border: getBorder(errors.ideaDescription), resize: "none" }}
              />

              <button
                type="submit"
                disabled={loading || sent}
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: sent
                    ? "#059669"
                    : "linear-gradient(135deg, #15803D, #22A559)",
                  boxShadow: "0 8px 24px rgba(21, 128, 61,0.25)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {T.contact.sending}
                  </span>
                ) : sent ? T.contact.sent : T.contact.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} theme="light" transition={Slide} />
    </section>
  );
}
