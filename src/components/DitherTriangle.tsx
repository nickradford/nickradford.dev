interface DitherTriangleSmallProps {
  className?: string;
}

export function DitherTriangle({ className = "" }: DitherTriangleSmallProps) {
  return (
    <svg className={className} viewBox="0 0 108 108">
      {/* Column 1 (rightmost) */}
      <rect x="103" y="56" width="3" height="3" fill="#3f3f46" opacity="0.25" />
      <rect x="103" y="62" width="3" height="3" fill="#3f3f46" opacity="0.4" />
      <rect x="103" y="68" width="3" height="3" fill="#3f3f46" opacity="0.55" />
      <rect x="103" y="74" width="3" height="3" fill="#3f3f46" opacity="0.7" />
      <rect x="103" y="80" width="3" height="3" fill="#3f3f46" opacity="0.85" />
      <rect x="103" y="86" width="3" height="3" fill="#3f3f46" opacity="1" />
      <rect x="103" y="92" width="3" height="3" fill="#3f3f46" opacity="1" />
      <rect x="103" y="98" width="3" height="3" fill="#3f3f46" opacity="1" />
      <rect x="103" y="104" width="3" height="3" fill="#3f3f46" opacity="1" />
      {/* Column 2 */}
      <rect x="97" y="62" width="3" height="3" fill="#3f3f46" opacity="0.38" />
      <rect x="97" y="68" width="3" height="3" fill="#3f3f46" opacity="0.53" />
      <rect x="97" y="74" width="3" height="3" fill="#3f3f46" opacity="0.67" />
      <rect x="97" y="80" width="3" height="3" fill="#3f3f46" opacity="0.79" />
      <rect x="97" y="86" width="3" height="3" fill="#3f3f46" opacity="0.85" />
      <rect x="97" y="92" width="3" height="3" fill="#3f3f46" opacity="0.91" />
      <rect x="97" y="98" width="3" height="3" fill="#3f3f46" opacity="0.97" />
      <rect x="97" y="104" width="3" height="3" fill="#3f3f46" opacity="1" />
      {/* Column 3 */}
      <rect x="91" y="68" width="3" height="3" fill="#3f3f46" opacity="0.46" />
      <rect x="91" y="74" width="3" height="3" fill="#3f3f46" opacity="0.58" />
      <rect x="91" y="80" width="3" height="3" fill="#3f3f46" opacity="0.67" />
      <rect x="91" y="86" width="3" height="3" fill="#3f3f46" opacity="0.7" />
      <rect x="91" y="92" width="3" height="3" fill="#3f3f46" opacity="0.76" />
      <rect x="91" y="98" width="3" height="3" fill="#3f3f46" opacity="0.82" />
      <rect x="91" y="104" width="3" height="3" fill="#3f3f46" opacity="0.91" />
      {/* Column 4 */}
      <rect x="85" y="74" width="3" height="3" fill="#3f3f46" opacity="0.46" />
      <rect x="85" y="80" width="3" height="3" fill="#3f3f46" opacity="0.53" />
      <rect x="85" y="86" width="3" height="3" fill="#3f3f46" opacity="0.55" />
      <rect x="85" y="92" width="3" height="3" fill="#3f3f46" opacity="0.61" />
      <rect x="85" y="98" width="3" height="3" fill="#3f3f46" opacity="0.67" />
      <rect x="85" y="104" width="3" height="3" fill="#3f3f46" opacity="0.76" />
      {/* Column 5 */}
      <rect x="79" y="80" width="3" height="3" fill="#3f3f46" opacity="0.38" />
      <rect x="79" y="86" width="3" height="3" fill="#3f3f46" opacity="0.4" />
      <rect x="79" y="92" width="3" height="3" fill="#3f3f46" opacity="0.46" />
      <rect x="79" y="98" width="3" height="3" fill="#3f3f46" opacity="0.52" />
      <rect x="79" y="104" width="3" height="3" fill="#3f3f46" opacity="0.61" />
      {/* Column 6 */}
      <rect x="73" y="86" width="3" height="3" fill="#3f3f46" opacity="0.25" />
      <rect x="73" y="92" width="3" height="3" fill="#3f3f46" opacity="0.31" />
      <rect x="73" y="98" width="3" height="3" fill="#3f3f46" opacity="0.37" />
      <rect x="73" y="104" width="3" height="3" fill="#3f3f46" opacity="0.46" />
      {/* Column 7 */}
      <rect x="67" y="92" width="3" height="3" fill="#3f3f46" opacity="0.25" />
      <rect x="67" y="98" width="3" height="3" fill="#3f3f46" opacity="0.31" />
      <rect x="67" y="104" width="3" height="3" fill="#3f3f46" opacity="0.38" />
      {/* Column 8 */}
      <rect x="61" y="98" width="3" height="3" fill="#3f3f46" opacity="0.25" />
      <rect x="61" y="104" width="3" height="3" fill="#3f3f46" opacity="0.31" />
      {/* Column 9 (leftmost) */}
      <rect x="55" y="104" width="3" height="3" fill="#3f3f46" opacity="0.25" />
    </svg>
  );
}
