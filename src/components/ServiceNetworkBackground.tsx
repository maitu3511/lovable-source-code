import React, { useEffect, useRef } from "react";
import {
  Bot,
  ChartNoAxesCombined,
  Globe2,
  Megaphone,
  Monitor,
  Palette,
  Search,
  Share2,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";

type NetworkNode = {
  label: string;
  icon: LucideIcon;
};

const networkNodes: NetworkNode[] = [
  { label: "People", icon: Users },
  { label: "Computer", icon: Monitor },
  { label: "SEO", icon: Search },
  { label: "AI", icon: Bot },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Social Media", icon: Share2 },
  { label: "Mobile", icon: Smartphone },
  { label: "Marketing", icon: Megaphone },
  { label: "Design", icon: Palette },
  { label: "Global", icon: Globe2 },
];

const networkPaths = [
  "M0 82 L112 34 L226 112 L82 180 L0 82",
  "M0 82 L82 180 L24 294 L158 252 L226 112",
  "M24 294 L158 252 L104 396 L0 454",
  "M0 454 L104 396 L238 510 L0 538",
  "M112 34 L158 252 L292 186",
  "M1000 70 L886 30 L774 116 L918 182 L1000 70",
  "M1000 70 L918 182 L974 296 L842 254 L774 116",
  "M974 296 L842 254 L896 398 L1000 452",
  "M1000 452 L896 398 L764 510 L1000 538",
  "M886 30 L842 254 L708 188",
  "M0 538 L174 466 L316 560",
  "M1000 538 L826 466 L684 560",
] as const;

const particlePaths = [networkPaths[0], networkPaths[2], networkPaths[5], networkPaths[7], networkPaths[10]];

export const ServiceNetworkBackground: React.FC = () => {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        layer.style.setProperty("--network-shift-x", `${x * 7}px`);
        layer.style.setProperty("--network-shift-y", `${y * 5}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div ref={layerRef} className="service-network" aria-hidden="true">
      <svg className="service-network__lines" viewBox="0 0 1000 560" preserveAspectRatio="none">
        <defs>
          <filter id="service-network-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {networkPaths.map((path) => (
          <path key={path} d={path} className="service-network__path" pathLength="1" />
        ))}
        {particlePaths.map((path, index) => (
          <circle key={path} r="3" className={`service-network__particle service-network__particle--${index + 1}`}>
            <animateMotion dur={`${4.8 + index * 0.7}s`} repeatCount="indefinite" path={path} />
          </circle>
        ))}
      </svg>

      <div className="service-network__nodes">
        {networkNodes.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className={`service-network__node service-network__node--${index + 1}`}
            title={label}
          >
            <span className="service-network__halo" />
            <span className="service-network__ring">
              <Icon className="service-network__icon" strokeWidth={1.65} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
