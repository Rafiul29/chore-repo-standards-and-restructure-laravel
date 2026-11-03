
'use client';

import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';

// Theme class map
const getThemeClasses = (theme: string) => {
  const safeThemes = {
    blue: {
      base: 'from-blue-100 to-blue-50',
      hover: 'hover:from-blue-200 hover:to-blue-50',
      text: 'text-blue-600 dark:text-blue-400',
    },
    lime: {
      base: 'from-lime-100 to-lime-50',
      hover: 'hover:from-lime-200 hover:to-lime-50',
      text: 'text-lime-600 dark:text-lime-400',
    },
    green: {
      base: 'from-green-100 to-green-50',
      hover: 'hover:from-green-200 hover:to-green-50',
      text: 'text-green-600 dark:text-green-400',
    },
    emerald: {
      base: 'from-emerald-100 to-emerald-50',
      hover: 'hover:from-emerald-200 hover:to-emerald-50',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    red: {
      base: 'from-red-100 to-red-50',
      hover: 'hover:from-red-200 hover:to-red-50',
      text: 'text-red-600 dark:text-red-400',
    },
    purple: {
      base: 'from-purple-100 to-purple-50',
      hover: 'hover:from-purple-200 hover:to-purple-50',
      text: 'text-purple-600 dark:text-purple-400',
    },
    amber: {
      base: 'from-amber-100 to-amber-50',
      hover: 'hover:from-amber-200 hover:to-amber-50',
      text: 'text-amber-600 dark:text-amber-400',
    },
    indigo: {
      base: 'from-indigo-100 to-indigo-50',
      hover: 'hover:from-indigo-200 hover:to-indigo-50',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    zinc: {
      base: 'from-zinc-100 to-zinc-50',
      hover: 'hover:from-zinc-200 hover:to-zinc-50',
      text: 'text-zinc-600 dark:text-zinc-400',
    },
    black: {
      base: 'from-black/10 to-black/5',
      hover: 'hover:from-black/20 hover:to-black/10',
      text: 'text-black dark:text-white',
    },
    gray: {
      base: 'from-gray-100 to-gray-50',
      hover: 'hover:from-gray-200 hover:to-gray-50',
      text: 'text-gray-600 dark:text-gray-400',
    },
  } as const;

  return safeThemes[theme as keyof typeof safeThemes] || safeThemes.blue;
};

type IconComponent = React.ComponentType<{ size?: number }>;

type BrandButtonIcon = IconComponent | React.ReactNode;

type ToolTipAlign = 'auto' | 'right' | 'left' | 'bottom' | 'top';

interface BrandButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  onClick?: () => void;
  icon?: BrandButtonIcon;
  size?: number;
  fontSize?: number;
  title?: string | null;
  disabledTitle?: string | null;
  className?: string;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  theme?: string;
  isLoading?: boolean;
  text?: React.ReactNode;

  /**
   * Tooltip side preference:
   * - "auto": choose best side to avoid viewport overflow
   * - "right" | "left" | "top" | "bottom": force side
   */
  toolTipAlign?: ToolTipAlign;
}

/**
 * Renders a themed button with an accessible label and controlled tooltip.
 */
export const BrandButton = ({
  onClick,
  icon,
  size = 18,
  title = null,
  disabledTitle = null,
  className = '',
  disabled = false,
  type = 'button',
  theme = 'blue',
  isLoading = false,
  text = '',
  toolTipAlign = 'bottom',
  children,
  'aria-label': ariaLabel,
}: BrandButtonProps) => {
  const RenderedIcon = (() => {
    if (!icon) return null;

    if (typeof icon === 'function') {
      const IconComponent = icon as IconComponent;
      return <IconComponent size={size} />;
    }

    return icon;
  })();

  const color = getThemeClasses(theme);
  const blocked = disabled || isLoading;
  const paddingClass = icon ? 'px-1 py-1' : 'px-2';

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const [tooltipSide, setTooltipSide] =
    useState<Exclude<ToolTipAlign, 'auto'>>('top');

  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Calculates the tooltip position while keeping it inside the viewport.
   */
  const updateTooltipPlacement = useCallback(() => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const wrap = wrapperRef.current;
    const tip = tooltipRef.current;

    if (!wrap || !tip) return;

    const wrapRect = wrap.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    const GAP = 8;
    const PADDING = 8;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceRight = vw - wrapRect.right;
    const spaceLeft = wrapRect.left;
    const spaceTop = wrapRect.top;
    const spaceBottom = vh - wrapRect.bottom;

    const neededW = tipRect.width + GAP;
    const neededH = tipRect.height + GAP;

    let side: Exclude<ToolTipAlign, 'auto'> = 'right';

    if (toolTipAlign !== 'auto') {
      side = toolTipAlign;
    } else if (spaceRight >= neededW) {
      side = 'right';
    } else if (spaceLeft >= neededW) {
      side = 'left';
    } else if (spaceTop >= neededH) {
      side = 'top';
    } else if (spaceBottom >= neededH) {
      side = 'bottom';
    } else {
      side = 'top';
    }

    let left = 0;
    let top = 0;

    if (side === 'right') {
      left = wrapRect.right + GAP;
      top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2;
    } else if (side === 'left') {
      left = wrapRect.left - GAP - tipRect.width;
      top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2;
    } else if (side === 'bottom') {
      left = wrapRect.left + wrapRect.width / 2 - tipRect.width / 2;
      top = wrapRect.bottom + GAP;
    } else {
      left = wrapRect.left + wrapRect.width / 2 - tipRect.width / 2;
      top = wrapRect.top - GAP - tipRect.height;
    }

    left = clamp(left, PADDING, vw - tipRect.width - PADDING);
    top = clamp(top, PADDING, vh - tipRect.height - PADDING);

    setTooltipSide(side);
    setTooltipPos({ left, top });
  }, [toolTipAlign]);

  const tooltipText = useMemo(() => {
    if (disabled) {
      return disabledTitle || 'Disabled';
    }

    return title || '';
  }, [disabled, disabledTitle, title]);

  const displayText = text;

  // An explicit aria-label wins.
  const accessibleLabel =
    ariaLabel ||
    (typeof displayText === 'string' && displayText
      ? displayText
      : title || undefined);

  /**
   * Shows the tooltip and recalculates its viewport position.
   */
  const handleTooltipShow = () => {
    updateTooltipPlacement();
    setShowTooltip(true);
  };

  /**
   * Hides the tooltip when the pointer or focus leaves the button.
   */
  const handleTooltipHide = () => {
    setShowTooltip(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={handleTooltipShow}
      onMouseLeave={handleTooltipHide}
    >
      <button
        type={type}
        onClick={blocked ? undefined : onClick}
        disabled={blocked}
        aria-label={accessibleLabel}
        onFocus={handleTooltipShow}
        onBlur={handleTooltipHide}
        className={`flex items-center rounded-sm bg-gradient-to-t ${color.base} ${color.hover} ${color.text}
          ${paddingClass} py-1 transition-transform transition-filter duration-150 cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 disabled:saturate-200
          dark:from-zinc-800 dark:to-zinc-600 dark:hover:from-zinc-700 dark:hover:to-zinc-500
          ${!disabled ? 'active:scale-95 active:brightness-95' : ''}
          ${className}`}
      >
        {isLoading ? (
          <ImSpinner6 size={size} className="animate-spin opacity-80" />
        ) : RenderedIcon ? (
          <span className="text-role-button-text flex items-center gap-1">
            {RenderedIcon}
            {children || displayText}
          </span>
        ) : (
          <span className="text-role-button-text">{children || displayText}</span>
        )}
      </button>

      {!!tooltipText && (
        <span
          ref={tooltipRef}
          style={
            tooltipPos
              ? {
                  position: 'fixed',
                  left: tooltipPos.left,
                  top: tooltipPos.top,
                }
              : {
                  position: 'fixed',
                  left: -9999,
                  top: -9999,
                }
          }
          className={`z-50 pointer-events-none whitespace-nowrap
            text-role-helper rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1
            text-zinc-900 dark:text-white shadow-sm
            transition-[opacity,transform] duration-150
            will-change-[opacity,transform]
            ${showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          data-side={tooltipSide}
        >
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default BrandButton;
