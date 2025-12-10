// RoadmapIcons.tsx
import React from "react";

type RoadmapIconProps = {
  className?: string;
};

/**
 * Wrapper that renders the electric-blue circular background
 * and centers the icon inside.
 */
export const RoadmapIconCircle: React.FC<
  RoadmapIconProps & { children: React.ReactNode }
> = ({ className = "", children }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-white border-2 border-primary shadow-[0_0_20px_rgba(0,122,255,0.3)] w-14 h-14 ${className}`}
    >
      {children}
    </div>
  );
};

// ⭐ Spark / Inspiration
export const SparkIcon: React.FC<RoadmapIconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#007aff"
    stroke="none"
  >
    <path d="M12 2L13.5 8.5L17.5 6.5L14.5 11L20 12L14.5 13L17.5 17.5L13.5 15.5L12 22L10.5 15.5L6.5 17.5L9.5 13L4 12L9.5 11L6.5 6.5L10.5 8.5L12 2Z" />
  </svg>
);

// 🛡 Shield / Protection
export const ShieldIcon: React.FC<RoadmapIconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="#007aff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L4 6V11C4 16 8 20 12 22C16 20 20 16 20 11V6L12 2Z" />
    <path d="M9 12L11 14L15 10" />
  </svg>
);

// ⚡ Lightning / Advantage
export const LightningIcon: React.FC<RoadmapIconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="#007aff"
    stroke="none"
  >
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

// 🏬 Storefront / Shop
export const StorefrontIcon: React.FC<RoadmapIconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="#007aff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9L5 3H19L21 9" />
    <path d="M3 9C3 10.66 4.34 12 6 12C7.66 12 9 10.66 9 9" />
    <path d="M9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9" />
    <path d="M15 9C15 10.66 16.34 12 18 12C19.66 12 21 10.66 21 9" />
    <path d="M6 12V21" />
    <path d="M18 12V21" />
    <path d="M6 21H18" />
    <rect x="10" y="15" width="4" height="6" />
  </svg>
);
