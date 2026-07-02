"use client";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import AuroraLogo from "@/components/AuroraLogo";
import { useLang } from "@/context/LangContext";

const SOCIALS = [
  { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/aurora-softwarehouse/", label: "LinkedIn" },
  { Icon: FaFacebookF,  url: "https://www.facebook.com/profile.php?id=61583612949472", label: "Facebook" },
  { Icon: FaInstagram,  url: "https://www.instagram.com/aurorasoftwarehouse/", label: "Instagram" },
  { Icon: FaWhatsapp,   url: "https://wa.me/201124885991", label: "WhatsApp" },
  { Icon: FaGithub,     url: "https://github.com/aurorasoftwarehouse", label: "GitHub" },
];

const LINK_HREFS = ["#services","#work","#process","#about","#contact"];

export default function Footer() {
  const { T } = useLang();
  const LINKS = T.footer.navLinks.map((label, i) => ({ label, href: LINK_HREFS[i] }));
  const SERVICES_LIST = T.footer.servicesList;
  return (
    <footer
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(21, 128, 61, 0.1)",
      }}
    >
      {/* ── CTA Banner ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #15803D 0%, #22A559 50%, #2F9E52 100%)",
        }}
      >
        {/* Decorative dots */}
        <div
          className="absolute inset-0 pointer-events-none dot-grid"
          style={{ opacity: 0.12 }}
        />
        {/* Glow circles */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "400px", height: "400px",
            right: "-100px", top: "-100px",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "250px", height: "250px",
            left: "-60px", bottom: "-60px",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <p
            className="font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", lineHeight: 1.15 }}
          >
            {T.footer.ctaH}
            <br />
            <span style={{ color: "#E8DCC0" }}>{T.footer.ctaSub}</span>
          </p>
          <p
            className="mb-8 mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1rem",
              maxWidth: "440px",
              textTransform: "none",
              lineHeight: 1.7,
            }}
          >
            {T.footer.ctaDesc}
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "#fff",
              color: "#15803D",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {T.footer.ctaBtn}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-block mb-5">
              <AuroraLogo variant="light" className="footer-logo" />
            </Link>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "#64748B", textTransform: "none" }}
            >
              {T.footer.desc}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(21, 128, 61,0.07)",
                    border: "1px solid rgba(21, 128, 61,0.15)",
                    color: "#22A559",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(21, 128, 61,0.14)";
                    e.currentTarget.style.color = "#15803D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(21, 128, 61,0.07)";
                    e.currentTarget.style.color = "#22A559";
                  }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[2.5px] mb-5"
              style={{ color: "#94A3B8" }}
            >
              {T.footer.nav}
            </h4>
            <ul className="flex flex-col gap-3">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#64748B", textTransform: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[2.5px] mb-5"
              style={{ color: "#94A3B8" }}
            >
              {T.footer.services}
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICES_LIST.map((s) => (
                <li
                  key={s}
                  className="text-sm"
                  style={{ color: "#64748B", textTransform: "none" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[2.5px] mb-5"
              style={{ color: "#94A3B8" }}
            >
              {T.footer.contact}
            </h4>
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-sm" style={{ color: "#64748B", textTransform: "none" }}>
                aurorasoftwarehouse@gmail.com
              </p>
              <p className="text-sm" style={{ color: "#64748B", textTransform: "none" }}>
                +20 112 488 5991
              </p>
              <p className="text-sm" style={{ color: "#64748B", textTransform: "none" }}>
                Cairo, Egypt
              </p>
            </div>
            <a
              href="https://wa.me/201124885991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:opacity-80"
              style={{ color: "#15803D" }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(21, 128, 61,0.08)", border: "1px solid rgba(21, 128, 61,0.2)" }}
              >
                <FaWhatsapp size={12} />
              </span>
              {T.footer.whatsapp}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(21, 128, 61,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#94A3B8", textTransform: "none" }}>
            © {new Date().getFullYear()} Aurora Software House. {T.footer.rights}
          </p>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
            />
            <p className="text-xs" style={{ color: "#94A3B8", textTransform: "none" }}>
              {T.footer.operational}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
