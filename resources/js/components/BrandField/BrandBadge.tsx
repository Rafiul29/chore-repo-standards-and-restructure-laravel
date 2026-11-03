import type React from 'react';

const formatStatusLabel = (status?: string | null): string => {
  if (!status) return '—';

  return status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const colorClassMap = {
  gray: 'from-gray-100 to-gray-50 text-gray-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-gray-200',
  blue: 'from-blue-100 to-blue-50 text-blue-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-blue-300',
  sky: 'from-sky-100 to-sky-50 text-sky-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-sky-300',
  red: 'from-red-100 to-red-50 text-red-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-red-500',
  green:
    'from-green-100 to-green-50 text-green-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-green-300',
  orange:
    'from-orange-100 to-orange-50 text-orange-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-orange-300',
  emerald:
    'from-emerald-100 to-emerald-50 text-emerald-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-emerald-300',
  lime: 'from-lime-100 to-lime-50 text-lime-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-lime-300',
  teal: 'from-teal-100 to-teal-50 text-teal-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-teal-300',
  cyan: 'from-cyan-100 to-cyan-50 text-cyan-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-cyan-300',
  indigo:
    'from-indigo-100 to-indigo-50 text-indigo-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-indigo-300',
  amber:
    'from-amber-100 to-amber-50 text-amber-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-amber-300',
  purple:
    'from-purple-100 to-purple-50 text-purple-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-purple-300',
  violet:
    'from-violet-100 to-violet-50 text-violet-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-violet-300',
  fuchsia:
    'from-fuchsia-100 to-fuchsia-50 text-fuchsia-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-fuchsia-300',
  pink: 'from-pink-100 to-pink-50 text-pink-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-pink-300',
  rose: 'from-rose-100 to-rose-50 text-rose-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-rose-300',
  yellow:
    'from-yellow-100 to-yellow-50 text-yellow-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-yellow-300',
  zinc: 'from-zinc-100 to-zinc-50 text-zinc-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-zinc-300',
  slate:
    'from-slate-100 to-slate-50 text-slate-700 dark:from-zinc-800 dark:to-zinc-800 dark:text-slate-300',
};

export type ColorKey = keyof typeof colorClassMap;

/**
 * BrandBadge Component
 *
 * A versatile badge component for displaying status, labels, or categorized information.
 * Supports dynamic color mapping, custom Tailwind colors, icons, and various sizes.
 *
 * @component
 * @example
 * ```tsx
 * // Status badge with predefined colors
 * <BrandBadge
 *   value="active"
 *   values={['active', 'inactive']}
 *   labels={['Active', 'Inactive']}
 *   tailwindColors={['green', 'gray']}
 * />
 *
 * // Simple badge with default color
 * <BrandBadge
 *   value="draft"
 *   defaultLabel="draft"
 *   defaultColor="amber"
 * />
 *
 * // Badge with icon
 * <BrandBadge
 *   value="complete"
 *   defaultLabel="Completed"
 *   defaultColor="green"
 *   showIcon={true}
 *   size="lg"
 * />
 * ```
 */

interface TBadgeProps {
  /**
   * The value to be displayed on the badge.
   */
  value: string | number;
  /**
   * An array of values to map to specific labels and colors.
   */
  values?: (string | number)[];
  /**
   * An array of labels corresponding to the values.
   */
  labels?: string[];
  /**
   * An array of Tailwind colors corresponding to the values.
   */
  tailwindColors?: ColorKey[];
  /**
   * An array of icon components corresponding to the values.
   */
  icons?: React.ComponentType<{ className?: string }>[];
  /**
   * The default label to display when no matching value is found.
   */
  defaultLabel?: string;
  /**
   * The default color to use when no matching value is found.
   */
  defaultColor?: ColorKey;
  /** Custom background color for categories with user-defined colors. */
  customColor?: string;
  defaultIcon?: React.ComponentType<{ className?: string }> | null;
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  className?: string;
  pill?: boolean;
  selectStatus?: boolean;
  fontSize?: string | number;
  width?: string | number;
  minWidth?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
}

const getColorClasses = (color: ColorKey): string => colorClassMap[color] || colorClassMap.gray;

const normalizeSize = (v: string | number | undefined): string | undefined =>
  v == null ? undefined : typeof v === 'number' ? `${v}px` : String(v);

const sizeMap = {
  xs: 'text-role-badge-text px-0.5 py-0.5 gap-1',
  sm: 'text-role-badge-text px-1 py-0.5 gap-1',
  md: 'text-role-badge-text px-1.5 py-1 gap-1.5',
  lg: 'text-role-badge-text px-2 py-1.5 gap-2',
};

const BrandBadge: React.FC<TBadgeProps> = ({
  value,
  values = [],
  labels = [],
  tailwindColors = [],
  icons = [],
  defaultLabel = 'Unknown',
  defaultColor = 'zinc',
  customColor,
  defaultIcon = null,
  showIcon = true,
  iconPosition = 'left',
  iconClassName = 'h-4 w-4',
  className = '',
  pill = false,
  selectStatus = false,
  fontSize,
  width,
  minWidth,
  size = 'md',
  title,
}) => {

  const map: Record<
    string,
    { label: string; color: string; IconComp: React.ComponentType<{ className?: string }> | null }
  > = {};
  values.forEach((v, idx) => {
    const colorKey = tailwindColors[idx] || defaultColor;
    map[String(v)] = {
      label: labels[idx] ?? defaultLabel,
      color: getColorClasses(colorKey),
      IconComp: icons[idx] ?? null,
    };
  });

  const matched = map[String(value)] || {
    label: defaultLabel,
    color: getColorClasses(defaultColor),
    IconComp: defaultIcon,
  };

  const { label: badgeLabel, color: badgeColor, IconComp } = matched;
  const localizedBadgeLabel =badgeLabel
  const displayLabel =
    typeof localizedBadgeLabel === 'string'
      ? formatStatusLabel(localizedBadgeLabel)
      : localizedBadgeLabel;

  const style: React.CSSProperties = {
    width: normalizeSize(width),
    minWidth: normalizeSize(minWidth),
    fontSize: normalizeSize(fontSize),
    ...(customColor ? { backgroundColor: customColor, color: '#fff' } : {}),
  };

  const base = `inline-flex ${customColor ? '' : 'bg-gradient-to-t'} items-center justify-center font-semibold`;
  const rounded = pill ? 'rounded-full' : 'rounded-[6px]';
  const sizing = sizeMap[size] || sizeMap.md;
  const select = selectStatus ? '' : 'select-none';

  return (
    // biome-ignore lint/a11y/useSemanticElements: Using span with role="status" for badge semantics
    <span
      role="status"
      aria-live="polite"
      title={title ?? (typeof displayLabel === 'string' ? displayLabel : undefined)}
      className={`${base} ${rounded} ${sizing} ${badgeColor} ${select} ${className}`}
      style={style}
    >
      {showIcon && iconPosition === 'left' && IconComp ? (
        <span aria-hidden className={`inline-flex items-center justify-center ${iconClassName}`}>
          <IconComp className={iconClassName} />
        </span>
      ) : null}

      <span className="whitespace-nowrap leading-none">{displayLabel}</span>

      {showIcon && iconPosition === 'right' && IconComp ? (
        <span aria-hidden className={`inline-flex items-center justify-center ${iconClassName}`}>
          <IconComp className={iconClassName} />
        </span>
      ) : null}
    </span>
  );
};

export default BrandBadge;
