export const Logo = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
    <path
      d="M10 12C10 10.8954 10.8954 10 12 10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V12Z"
      fill="white"
      fillOpacity="0.9"
    />
    <circle cx="14" cy="14" r="1.5" fill="url(#logoGradient)" />
    <circle cx="18" cy="14" r="1.5" fill="url(#logoGradient)" />
    <path
      d="M13 17.5C13 17.5 14.5 19 16 19C17.5 19 19 17.5 19 17.5"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;
