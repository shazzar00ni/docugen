interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
  const baseStyles = 'bg-dark-800 animate-pulse';

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

export function SkeletonCard() {
  return (
    <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6">
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

export function SkeletonButton() {
  return <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />;
}

export function SkeletonInput() {
  return <Skeleton variant="rectangular" width="100%" height={48} className="rounded-lg" />;
}

export function SkeletonFeature() {
  return (
    <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 space-y-4">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton width="60%" height={24} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
  );
}

export function SkeletonTestimonial() {
  return (
    <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 space-y-4">
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
