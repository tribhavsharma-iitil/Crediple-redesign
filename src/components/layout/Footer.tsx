import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FOOTER_PORTFOLIO, FOOTER_COMPANY } from "../../data/siteData";
import logo from "../../assets/footer_logo.png";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};



const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#FAFAFA" }}>
      {/* Main Footer */}
      <div className="py-14 px-6">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LEFT - Brand */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2 flex "
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#0047AB" }}
            >
              Crediple
            </span>
            <img src={logo} className="w-16" alt="YAKA logo" />
            <p className="text-[12px] mt-1 " style={{ color: "#717171" }}>
              The Architect of Industry Evolution.
            </p>
          </motion.div>

          {/* RIGHT - Links Wrapper */}
          <div className="flex gap-32 md:gap-64 ml-auto ">
            {/* Portfolio */}
            <motion.div variants={itemVariants}>
              <h4
                className="text-[17px] font-[500] mb-4"
                style={{ color: "#653C1A" }}
              >
                Our Portfolio
              </h4>
              <ul>
                {FOOTER_PORTFOLIO.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[13px] transition-colors hover:text-[#1A3EBD]"
                      style={{ color: "#717171" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4
                className="text-[17px] font-[500] mb-4"
                style={{ color: "#653C1A" }}
              >
                Company
              </h4>
              <ul>
                {FOOTER_COMPANY.map((item) => (
                  <li key={item}>
                    <Link
                      to="/about"
                      className="text-[13px] transition-colors hover:text-[#1A3EBD]"
                      style={{ color: "#717171" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
        </motion.div>
      
      </div>

      

      {/* Bottom Bar */}
      <div className="py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#8B6343" }}>
            © 2026 Crediple India Pvt. Ltd. (CIPL) 
          </p>

          <p className="text-sm mt-2 text-right" style={{ color: "#8B6343" }}>
          All Rights Reserved. Empowering Professionals
          Through Convergent Technology.
        </p>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.12, color: "#814310" }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="flex items-center justify-center w-12 h-12"
                style={{ color: "#9B7250" }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
