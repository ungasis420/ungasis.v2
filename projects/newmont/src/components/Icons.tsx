import React from 'react';

const _ic = (paths: React.ReactNode, fill?: boolean) => {
  const IconComponent = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
      {...props}
    >
      {paths}
    </svg>
  );
  IconComponent.displayName = 'CCIcon';
  return IconComponent;
};

export const DashboardIcon = _ic(
  <>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </>
);

export const GapsIcon = _ic(
  <>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </>
);

export const CalcIcon = _ic(
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 11h2M8 15h2M14 11h2M14 15h2M12 11v8" />
  </>
);

export const ReqsIcon = _ic(
  <>
    <path d="M5 3h9l5 5v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5M8 13h8M8 17h5" />
  </>
);

export const HoldIcon = _ic(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 9v6M14 9v6" />
  </>
);

export const LayersIcon = _ic(
  <>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5M3 18l9 5 9-5" opacity="0" />
    <path d="M21 12l-9 5-9-5M21 16l-9 5-9-5" />
  </>
);

export const TargetIcon = _ic(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </>
);

export const ClockIcon = _ic(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </>
);

export const AlertIcon = _ic(
  <>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </>
);

export const FolderIcon = _ic(
  <>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </>
);

export const PauseIcon = _ic(
  <>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </>
);

export const ArrowUpIcon = _ic(
  <>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </>
);

export const ArrowDownIcon = _ic(
  <>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </>
);

export const MinusIcon = _ic(
  <>
    <path d="M5 12h14" />
  </>
);

export const SearchIcon = _ic(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>
);

export const BoltIcon = _ic(
  <>
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </>
  , true
);

export const CheckIcon = _ic(
  <>
    <path d="M20 6 9 17l-5-5" />
  </>
);

export const WarnIcon = _ic(
  <>
    <path d="M12 3l9 16H3z" />
    <path d="M12 10v4M12 17h.01" />
  </>
);

export const XIcon = _ic(
  <>
    <path d="M18 6 6 18M6 6l12 12" />
  </>
);

export const GlobeIcon = _ic(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
  </>
);

export const TrendIcon = _ic(
  <>
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M14 8h6v6" />
  </>
);

export const FlameIcon = _ic(
  <>
    <path d="M12 3c2 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 1.5 1 2 1.5 2C10 7 12 6 12 3z" />
  </>
);

export const CCIcons = {
  dashboard: DashboardIcon,
  gaps: GapsIcon,
  calc: CalcIcon,
  reqs: ReqsIcon,
  hold: HoldIcon,
  layers: LayersIcon,
  target: TargetIcon,
  clock: ClockIcon,
  alert: AlertIcon,
  folder: FolderIcon,
  pause: PauseIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  minus: MinusIcon,
  search: SearchIcon,
  bolt: BoltIcon,
  check: CheckIcon,
  warn: WarnIcon,
  x: XIcon,
  globe: GlobeIcon,
  trend: TrendIcon,
  flame: FlameIcon,
};
