"use client";

import { useRef, useEffect, useState } from "react";
import { motion as Motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Activity, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const FORMSPREE_PACKAGES_ENDPOINT = "https://formspree.io/f/mojnkjyj";

const PACKAGES = [
  {
    id: "basic",
    number: 1,
    title: "BASIC",
    priceValue: 2800,
    priceFormatted: "KSH. 2,800",
    services: [
      "BLOOD PRESSURE + BMI",
      "RBS/FBS",
      "URINALYSIS",
      "FULL HEMOGRAM",
      "HBA1c",
    ],
  },
  {
    id: "standard",
    number: 2,
    title: "STANDARD",
    priceValue: 5200,
    priceFormatted: "KSH. 5,200",
    services: [
      "BLOOD PRESSURE + BMI",
      "CONSULTATION",
      "FHG",
      "RBS/FBS",
      "URINALYSIS",
      "HBA1c",
      "CREATININE",
      "LIPID PROFILE [TCHOL + HDL-C]",
      "GGT",
    ],
  },
  {
    id: "premium",
    number: 3,
    title: "PREMIUM",
    priceValue: 12000,
    priceFormatted: "KSH. 12,000",
    services: [
      "BLOOD PRESSURE + BMI",
      "CONSULTATION",
      "FHG",
      "FBS/RBS",
      "URINALYSIS",
      "UECS + eGFR",
      "UACR",
      "LFTS",
      "TFTS",
      "FASTING LIPOGRAM",
      "EYE SCREENING [Retinopathy]",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15 + i * 0.05,
    },
  }),
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const bulletVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + i * 0.04, duration: 0.35 },
  }),
};

/* Moving border light – star/snake light traveling along the card border; theme-aware (night = cyan, day = amber) */
function BorderSnakeLight({
  duration = 6,
  delay = 0,
  clockwise = true,
  isDark = true,
}: {
  duration?: number;
  delay?: number;
  clockwise?: boolean;
  isDark?: boolean;
}) {
  const a = "3%";
  const b = "97%";
  const path = clockwise
    ? {
        left: [a, b, b, a, a],
        top: [a, a, b, b, a],
        times: [0, 0.25, 0.5, 0.75, 1] as const,
      }
    : {
        left: [a, a, b, b, a],
        top: [a, b, b, a, a],
        times: [0, 0.25, 0.5, 0.75, 1] as const,
      };

  const lightStyle = {
    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(251,140,0,0.85) 40%, transparent 70%)",
    boxShadow:
      "0 0 12px 2px rgba(255,167,38,0.8), 0 0 24px 6px rgba(255,152,0,0.4), 0 0 40px 8px rgba(255,193,7,0.2)",
  };
  const darkStyle = {
    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(0,188,212,0.9) 40%, transparent 70%)",
    boxShadow:
      "0 0 12px 2px rgba(0,188,212,0.9), 0 0 24px 6px rgba(0,188,212,0.5), 0 0 40px 8px rgba(0,188,212,0.3)",
  };

  return (
    <Motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none overflow-visible"
      aria-hidden
    >
      <Motion.div
        className="absolute w-4 h-4 rounded-full origin-center"
        style={{
          left: path.left[0],
          top: path.top[0],
          transform: "translate(-50%, -50%)",
          ...(isDark ? darkStyle : lightStyle),
        }}
        animate={{
          left: path.left,
          top: path.top,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
          times: [...path.times],
        }}
      />
    </Motion.div>
  );
}

/* Floating medical / lab / microbiology icons – 10x count (160) with varied positions & motion */
const ICON_TYPES = ["dna1", "dna2", "dna3", "microscope", "flask", "bacteria", "syringe", "pill", "blood", "heart", "testtube", "virus", "beaker", "cell", "capsule", "pulse"] as const;
const KEYFRAME_SETS: number[][][] = [
  [[0, 0], [15, -20], [-10, 10], [0, 0]], [[0, 0], [-18, 12], [8, -8], [0, 0]], [[0, 0], [-12, -15], [20, 5], [0, 0]],
  [[0, 0], [10, 15], [-15, -10], [0, 0]], [[0, 0], [20, 8], [-5, -18], [0, 0]], [[0, 0], [-14, -8], [6, 14], [0, 0]],
  [[0, 0], [8, 12], [-12, -6], [0, 0]], [[0, 0], [-8, 10], [12, -5], [0, 0]], [[0, 0], [10, -12], [-8, 8], [0, 0]],
  [[0, 0], [12, 8], [-10, -12], [0, 0]], [[0, 0], [-15, 10], [5, -15], [0, 0]], [[0, 0], [18, -8], [-12, 12], [0, 0]],
  [[0, 0], [-10, -10], [14, 6], [0, 0]], [[0, 0], [6, -14], [-18, 8], [0, 0]], [[0, 0], [-6, 18], [16, -8], [0, 0]],
  [[0, 0], [-12, 6], [8, -10], [0, 0]], [[0, 0], [14, 4], [-8, -16], [0, 0]], [[0, 0], [-20, 8], [10, 6], [0, 0]],
  [[0, 0], [4, 18], [-14, -4], [0, 0]], [[0, 0], [-16, -6], [8, 14], [0, 0]], [[0, 0], [6, 12], [-10, -8], [0, 0]],
];

function buildFloatingIcons(): Array<{ id: string; iconType: string; left: string; top: string; size: number; keyframes: number[][]; duration: number }> {
  const out: Array<{ id: string; iconType: string; left: string; top: string; size: number; keyframes: number[][]; duration: number }> = [];
  for (let i = 0; i < 160; i++) {
    const iconType = ICON_TYPES[i % ICON_TYPES.length];
    out.push({
      id: `float-${i}`,
      iconType,
      left: `${((i * 17 + 3) % 96) + 2}%`,
      top: `${((i * 23 + 7) % 90) + 3}%`,
      size: 14 + (i % 7) * 3,
      keyframes: KEYFRAME_SETS[i % KEYFRAME_SETS.length],
      duration: 17 + (i % 14),
    });
  }
  return out;
}
const FLOATING_ICONS = buildFloatingIcons();

function FloatingIcon({
  id,
  left,
  top,
  size,
  keyframes,
  duration,
  children,
}: {
  id: string;
  left: string;
  top: string;
  size: number;
  keyframes: number[][];
  duration: number;
  children: React.ReactNode;
}) {
  return (
    <Motion.div
      className="absolute pointer-events-none text-amber-500/25 dark:text-primary-400/30"
      style={{ left, top, width: size, height: size }}
      animate={{
        x: keyframes.map(([x]) => x),
        y: keyframes.map(([, y]) => y),
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden
    >
      {children}
    </Motion.div>
  );
}

/* Medical / lab SVG icons – theme-aware: amber (day) / primary (night) via parent */
const IconDNAHelix = ({ size }: { size: number }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-inherit opacity-90">
    <path d="M8 6 Q20 14 32 6 M8 34 Q20 26 32 34" />
    <path d="M8 6 Q20 14 32 6 M8 34 Q20 26 32 34" opacity="0.85" transform="translate(0 4)" />
    <path d="M12 10 Q20 18 28 10 M12 30 Q20 22 28 30" opacity="0.7" />
    <path d="M12 10 Q20 18 28 10 M12 30 Q20 22 28 30" opacity="0.75" transform="translate(0 4)" />
  </svg>
);
const IconMicroscope = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <path d="M22 6h-2v6l4 8h2l-2-8V6zm-4 14h-6l-2 4h10l-2-4zm-6-4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 26h20v2H6v-2z" />
  </svg>
);
const IconFlask = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-inherit opacity-90">
    <path d="M8 2h8v8l6 14H2l6-14V2z" />
    <path d="M8 10h8" opacity="0.7" />
  </svg>
);
const IconBacteria = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <circle cx="16" cy="16" r="4" />
    <circle cx="8" cy="10" r="2.5" />
    <circle cx="24" cy="10" r="2.5" />
    <circle cx="8" cy="22" r="2.5" />
    <circle cx="24" cy="22" r="2.5" />
    <path d="M12 14c2 1 4 1 6 0M12 18c2-1 4-1 6 0" stroke="currentColor" strokeWidth=".8" fill="none" opacity="0.6" />
  </svg>
);
const IconSyringe = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.2" className="text-inherit opacity-90">
    <path d="M14 2v6l6 6v12H4V14l6-6V2h4zM10 2h4M12 8v6M9 11h6" />
  </svg>
);
const IconPill = ({ size }: { size: number }) => (
  <svg viewBox="0 0 28 16" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <path d="M4 8c0-4 4-8 8-8 2 0 4 1 6 3l2 2c2 2 3 4 3 6 0 4-4 8-8 8-2 0-4-1-6-3l-2-2c-2-2-3-4-3-6z" />
    <path d="M24 8c0 4-4 8-8 8-2 0-4-1-6-3l-2-2c-2-2-3-4-3-6 0-4 4-8 8-8 2 0 4 1 6 3l2 2c2 2 3 4 3 6z" opacity="0.8" />
  </svg>
);
const IconBlood = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 32" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <path d="M12 2c0 0-8 10-8 18 0 4.4 3.6 8 8 8s8-3.6 8-8c0-8-8-18-8-18z" />
  </svg>
);
const IconHeart = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 28" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <path d="M16 26l-2-2C6 16 0 10 0 6 0 2 3 0 6 0c3 0 6 2 10 6 4-4 7-6 10-6 3 0 6 2 6 6 0 4-6 10-14 18l-2 2z" />
  </svg>
);
const IconTestTube = ({ size }: { size: number }) => (
  <svg viewBox="0 0 20 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.2" className="text-inherit opacity-90">
    <path d="M6 2h8v20l4 8H2l4-8V2z" />
  </svg>
);
const IconVirus = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <circle cx="16" cy="16" r="3" />
    <circle cx="16" cy="6" r="1.5" />
    <circle cx="16" cy="26" r="1.5" />
    <circle cx="6" cy="16" r="1.5" />
    <circle cx="26" cy="16" r="1.5" />
    <circle cx="10" cy="10" r="1.2" />
    <circle cx="22" cy="22" r="1.2" />
    <circle cx="22" cy="10" r="1.2" />
    <circle cx="10" cy="22" r="1.2" />
  </svg>
);
const IconBeaker = ({ size }: { size: number }) => (
  <svg viewBox="0 0 28 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.2" className="text-inherit opacity-90">
    <path d="M8 4h12l4 22H4L8 4zM8 4v6c0 4 4 6 6 6s6-2 6-6V4" />
  </svg>
);
const IconCell = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <circle cx="16" cy="16" r="6" opacity="0.9" />
    <circle cx="16" cy="16" r="2" />
    <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
);
const IconCapsule = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 14" width={size} height={size} fill="currentColor" className="text-inherit opacity-90">
    <path d="M6 7a5 5 0 0110 0c0 2-2 4-5 6-3-2-5-4-5-6z" />
  </svg>
);
const IconPulse = ({ size }: { size: number }) => (
  <svg viewBox="0 0 32 20" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-inherit opacity-90">
    <path d="M2 10h6l4-8 4 16 4-8h6" />
  </svg>
);

function renderFloatingIcon(id: string, size: number) {
  const props = { size };
  switch (id) {
    case "dna1":
    case "dna2":
    case "dna3":
      return <IconDNAHelix {...props} />;
    case "microscope":
      return <IconMicroscope {...props} />;
    case "flask":
      return <IconFlask {...props} />;
    case "bacteria":
      return <IconBacteria {...props} />;
    case "syringe":
      return <IconSyringe {...props} />;
    case "pill":
      return <IconPill {...props} />;
    case "blood":
      return <IconBlood {...props} />;
    case "heart":
      return <IconHeart {...props} />;
    case "testtube":
      return <IconTestTube {...props} />;
    case "virus":
      return <IconVirus {...props} />;
    case "beaker":
      return <IconBeaker {...props} />;
    case "cell":
      return <IconCell {...props} />;
    case "capsule":
      return <IconCapsule {...props} />;
    case "pulse":
      return <IconPulse {...props} />;
    default:
      return <IconDNAHelix {...props} />;
  }
}

function AnimatedPriceCounter({
  value,
  inView,
  prefix = "KSH. ",
  suffix = "",
}: {
  value: number;
  inView: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const duration = 1200;
  const steps = 40;
  const stepDuration = duration / steps;
  const stepValue = value / steps;

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [inView, value, stepValue, stepDuration]);

  const formatted = display.toLocaleString("en-KE");
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.12;
    const dy = (e.clientY - cy) * 0.12;
    x.set(dx);
    y.set(dy);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </Motion.a>
  );
}

type PackageItem = (typeof PACKAGES)[number];

function PackageInterestModal({
  pkg,
  onClose,
}: {
  pkg: PackageItem;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_PACKAGES_ENDPOINT || FORMSPREE_PACKAGES_ENDPOINT;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Interest in ${pkg.title} package – Diabetes & Hypertension`,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim() || "(No message)",
          packageName: pkg.title,
          packagePrice: pkg.priceFormatted,
          packageServices: pkg.services.join("; "),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="interest-modal-title"
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-2xl border border-amber-200/80 dark:border-white/10 bg-white dark:bg-[#0a0e14] p-6 shadow-2xl shadow-amber-900/10 dark:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h3 id="interest-modal-title" className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          I&apos;m interested in {pkg.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{pkg.priceFormatted}</p>
        {status === "success" ? (
          <p className="text-amber-700 dark:text-primary-400 font-medium">Thanks! We&apos;ll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-amber-50/80 dark:bg-white/10 border border-amber-200/80 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-primary-500"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-amber-50/80 dark:bg-white/10 border border-amber-200/80 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-primary-500"
            />
            <input
              type="tel"
              required
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-amber-50/80 dark:bg-white/10 border border-amber-200/80 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-primary-500"
            />
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-amber-50/80 dark:bg-white/10 border border-amber-200/80 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-primary-500 resize-none"
            />
            {status === "error" && (
              <p className="text-sm text-red-500 dark:text-red-400">Something went wrong. Please try again or contact us by phone.</p>
            )}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-amber-300/80 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-amber-100/80 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex-1 px-4 py-2 rounded-lg bg-amber-500 dark:bg-primary-500 hover:bg-amber-600 dark:hover:bg-primary-400 text-white font-medium disabled:opacity-60 transition-colors"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        )}
      </Motion.div>
    </div>
  );
}

export default function DiabetesHypertensionPackages() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [interestPackage, setInterestPackage] = useState<PackageItem | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      ref={sectionRef}
      id="packages"
      aria-label="Diabetes and Hypertension health packages"
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/95 to-amber-50/50 dark:bg-none dark:bg-[#0a0e14]"
    >
      {/* Floating ambient glow blobs – day: warm amber/sun; night: very subtle cyan so background stays much darker */}
      <Motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Motion.div
          className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-amber-300/25 dark:bg-primary-500/20 blur-[120px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute top-1/2 -right-32 w-[360px] h-[360px] rounded-full bg-amber-400/20 dark:bg-primary-400/15 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute bottom-0 left-1/3 w-[320px] h-[320px] rounded-full bg-yellow-300/15 dark:bg-cyan-400/10 blur-[80px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </Motion.div>

      {/* Subtle grid – warm (day) / cyan (night); very faint in dark so background stays darker */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.03] bg-[linear-gradient(to_right,rgba(251,191,36,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.4)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00bcd4_1px,transparent_1px),linear-gradient(to_bottom,#00bcd4_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden
      />

      {/* Floating medical / lab / microbiology icons – random drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {FLOATING_ICONS.map((cfg) => (
          <FloatingIcon
            key={cfg.id}
            id={cfg.id}
            left={cfg.left}
            top={cfg.top}
            size={cfg.size}
            keyframes={cfg.keyframes}
            duration={cfg.duration}
          >
            {renderFloatingIcon(cfg.iconType, cfg.size)}
          </FloatingIcon>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section title - scroll reveal; light: plain, dark: luminous blue banner per screenshot */}
        <div className="mb-4 text-center md:text-left dark:inline-block dark:rounded-lg dark:border dark:border-primary-500/50 dark:bg-gradient-to-r dark:from-primary-900/60 dark:via-primary-800/40 dark:to-primary-900/60 dark:py-3 dark:px-4 dark:shadow-[0_0_24px_rgba(0,188,212,0.12)]">
          <Motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-wide border-b border-amber-500/50 dark:border-0 dark:pb-0 dark:mb-0 pb-3"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Diabetes and Hypertension
          </Motion.h2>
        </div>

        {/* Cards row - staggered entrance */}
        <Motion.div
          className="flex flex-col sm:flex-row gap-6 sm:gap-4 md:gap-6 items-stretch justify-center mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        >
          {PACKAGES.map((pkg, cardIndex) => (
            <Motion.article
              key={pkg.id}
              variants={cardVariants}
              className="group relative flex-1 min-w-0 max-w-sm rounded-2xl overflow-hidden"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              whileHover={{
                scale: 1.02,
                rotateX: 4,
                rotateY: 0,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              {/* Glowing gradient border on hover – day: amber, night: cyan */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{
                  padding: "1px",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(0,188,212,0.6), rgba(0,172,193,0.3), rgba(0,188,212,0.5))"
                    : "linear-gradient(135deg, rgba(251,191,36,0.6), rgba(245,158,11,0.35), rgba(251,193,7,0.5))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="relative h-full rounded-2xl border border-amber-200/60 dark:border-white/10 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl p-5 md:p-6 shadow-2xl shadow-amber-900/5 dark:shadow-2xl">
                {/* Moving border light – star/snake along the border */}
                <BorderSnakeLight
                  duration={5 + cardIndex * 1.2}
                  delay={cardIndex * 0.8}
                  clockwise={cardIndex !== 1}
                  isDark={isDark}
                />
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/25 dark:bg-primary-500/20 text-amber-700 dark:text-primary-400 font-bold text-sm mb-3 ring-1 ring-amber-500/40 dark:ring-primary-500/30">
                  {pkg.number}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wide">
                  {pkg.title}
                </h3>
                <Motion.ul
                  className="space-y-1.5 mb-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={cardIndex}
                >
                  {pkg.services.map((service, i) => (
                    <Motion.li
                      key={service}
                      variants={bulletVariants}
                      custom={i}
                      className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-2"
                    >
                      <span className="text-amber-600 dark:text-primary-400">•</span>
                      {service}
                    </Motion.li>
                  ))}
                </Motion.ul>
                {/* Price badge with subtle shimmer */}
                <Motion.div
                  className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/95 to-amber-400/95 dark:from-primary-500/90 dark:to-primary-400/90 text-white font-bold text-sm whitespace-nowrap shadow-lg shadow-amber-500/25 dark:shadow-primary-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.4 + cardIndex * 0.1,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <AnimatedPriceCounter
                    value={pkg.priceValue}
                    inView={inView}
                    prefix="KSH. "
                  />
                </Motion.div>
                <Motion.button
                  type="button"
                  onClick={() => setInterestPackage(pkg)}
                  className="mt-3 w-full px-4 py-2.5 rounded-lg border border-amber-500/50 dark:border-primary-500/50 text-amber-800 dark:text-primary-400 font-medium text-sm hover:bg-amber-500/20 dark:hover:bg-primary-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-primary-500/50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + cardIndex * 0.1, duration: 0.4 }}
                >
                  I&apos;m interested
                </Motion.button>
              </div>
            </Motion.article>
          ))}
        </Motion.div>

        {/* Home/Office collection - glassmorphism; theme-aware */}
        <Motion.div
          className="rounded-2xl border border-amber-200/60 dark:border-white/10 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left mb-8 shadow-xl shadow-amber-900/5 dark:shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-white/90 uppercase tracking-wide">
            Home/Office sample collection available
          </p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-amber-500/25 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500/40 dark:ring-primary-500/30">
              <Activity className="text-amber-700 dark:text-primary-400" size={28} aria-hidden />
            </div>
            <div>
              <Motion.span
                className="inline-block px-2.5 py-1 rounded-full bg-amber-500/95 dark:bg-primary-500/90 text-white text-xs font-bold"
                animate={{
                  boxShadow: isDark
                    ? [
                        "0 0 12px rgba(0,188,212,0.3)",
                        "0 0 20px rgba(0,188,212,0.5)",
                        "0 0 12px rgba(0,188,212,0.3)",
                      ]
                    : [
                        "0 0 12px rgba(251,191,36,0.35)",
                        "0 0 20px rgba(245,158,11,0.45)",
                        "0 0 12px rgba(251,191,36,0.35)",
                      ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                FREE
              </Motion.span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Blood pressure check</p>
              <p className="text-lg font-mono font-bold text-amber-700 dark:text-primary-400">120 / 80</p>
            </div>
          </div>
        </Motion.div>

        {/* Contact - magnetic CTA */}
        <Motion.div
          className="rounded-2xl bg-red-600/90 dark:bg-red-700/90 backdrop-blur-sm py-4 px-6 text-center border border-red-500/30"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.65,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="text-base md:text-lg font-semibold text-white">
            Contact us:{" "}
            <MagneticButton
              href="tel:+254796168900"
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 rounded"
            >
              +254 796-168-900
            </MagneticButton>
          </p>
        </Motion.div>

        {interestPackage && (
          <PackageInterestModal
            pkg={interestPackage}
            onClose={() => setInterestPackage(null)}
          />
        )}
      </div>
    </section>
  );
}
