interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
}

/**
 * Skeleton loading component with multiple variants.
 * Displays animated placeholder content while actual content loads.
 *
 * @param className - Additional CSS classes
 * @param variant - Skeleton shape ('text' | 'circular' | 'rectangular')
 * @param width - Custom width (number or string)
 * @param height - Custom height (number or string)
 * @returns Animated skeleton placeholder
 *
 * @example
 * ```typescript
 * <Skeleton variant="text" width="100%" height={20} />
 * <Skeleton variant="circular" width={40} height={40} />
 * ```
 */
export function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
  const baseStyles = 'bg-slate-800 animate-pulse';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : 'auto'),
    height: height || (variant === 'text' ? '1em' : 'auto'),
  };

  return (
    <div
      data-testid="skeleton"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
}

/**
 * Skeleton placeholder that simulates a user card with an avatar and multiple text lines.
 *
 * Renders an outer card containing a circular avatar skeleton and three horizontal line skeletons of varying widths.
 *
 * @returns The JSX element representing the skeleton user card.
 */
export function SkeletonCard() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-3">
          <Skeleton width="40%" height={20} />
          <Skeleton width="60%" height={16} />
          <Skeleton width="80%" height={16} />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton button component with standard button dimensions.
 * Simulates a button during loading state.
 *
 * @returns Skeleton button placeholder component
 */
export function SkeletonButton() {
  return <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />;
}

/**
 * Renders a skeleton placeholder that mimics a standard text input.
 *
 * @returns A Skeleton element representing a full-width input placeholder with standard input height.
 */
export function SkeletonInput() {
  return <Skeleton variant="rectangular" width="100%" height={48} className="rounded-lg" />;
}

/**
 * Renders a skeleton placeholder for a feature card containing an icon and several text lines.
 *
 * @returns A JSX element representing the feature card skeleton
 */
export function SkeletonFeature() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton width="60%" height={24} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
  );
}

/**
 * Renders a skeleton placeholder for a testimonial card containing quote lines and author information.
 *
 * @returns A JSX element representing the testimonial skeleton placeholder
 */
export function SkeletonTestimonial() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
      <Skeleton variant="rectangular" width={32} height={32} className="mb-2" />
      <div className="space-y-2">
        <Skeleton width="100%" height={16} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="75%" height={16} />
      </div>
      <div className="flex items-center space-x-3 pt-2">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-1">
          <Skeleton width={100} height={16} />
          <Skeleton width={80} height={14} />
        </div>
      </div>
    </div>
  );
}