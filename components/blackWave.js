export default function BlackWave(props) {
  return (
    <svg
      viewBox="0 0 1920 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 16.5H116C221 16.5 432 16.5 643 73.5C854 130.5 1066 156 1277 156C1488 156 1699 130.5 1804 73.5L1910 16.5V188.5H1804C1699 188.5 1488 188.5 1277 188.5C1066 188.5 854 188.5 643 188.5C432 188.5 221 188.5 116 188.5H10L10 16.5Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 16.5H116C221 16.5 432 16.5 643 73.5C854 130.5 1066 156 1277 156C1488 156 1699 130.5 1804 73.5L1910 16.5V188.5H1804C1699 188.5 1488 188.5 1277 188.5C1066 188.5 854 188.5 643 188.5C432 188.5 221 188.5 116 188.5H10L10 16.5Z"
          stroke="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0.5"
          width="1920"
          height="192"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-6" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
