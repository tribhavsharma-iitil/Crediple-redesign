import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// ─── variant definitions ───────────────────────────────────────────────────
const variants = {
  primary: {
    base:  'bg-[var(--btn-primary)] text-white border border-white',
  },
  secondary: {
    base:  'bg-[var(--btn-secondary)] text-white border border-white',
  },
  dark: {
    base:  'bg-[var(--btn-dark)] text-white border border-white',
  },
  white: {
    base:  'bg-white text-[var(--btn-primary)] border border-[var(--btn-primary)]',
  },
  transparent:{
    base:  'bg-transparent text-[#000] border border-[#000]',
  }

};

// ─── size definitions ──────────────────────────────────────────────────────
// Matches the hero screenshot: lg buttons are generously padded with `rounded-md`
const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-sm gap-1',
  sm: 'px-4 py-2   text-sm rounded-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-sm gap-2',
  lg: 'px-4 py-3   text-sm rounded-sm gap-2.5',
  xl: 'px-4 py-3.5 text-sm  rounded-sm gap-3',
};

// ─── component ─────────────────────────────────────────────────────────────
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  onClick,
  type     = 'button',
  className = '',
  fullWidth = false,
}) {
  const v = variants[variant] ?? variants.primary;
  const s = sizes[size]       ?? sizes.md;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.04 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      className={[
        'inline-flex items-center justify-center',
        'font-semibold tracking-wide',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        v.base,
        v.hover,
        s,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin flex-shrink-0" />
      ) : icon ? (
        <span className="flex-shrink-0 flex items-center">{icon}</span>
      ) : null}

      <span>{children}</span>

      {iconRight && !loading && (
        <span className="flex-shrink-0 flex items-center">{iconRight}</span>
      )}
    </motion.button>
  );
}