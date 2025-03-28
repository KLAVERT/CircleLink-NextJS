import React, { useMemo } from 'react';

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  columns?: ColumnCount;
  mdColumns?: ColumnCount;
  lgColumns?: ColumnCount;
  spacing?: SpacingSize;
  verticalSpacing?: SpacingSize;
}

const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  container = false,
  maxWidth = 'xl',
  columns = 1,
  mdColumns,
  lgColumns,
  spacing = 'md',
  verticalSpacing,
}) => {
  // Custom rem-based spacing (closer to Tailwind's default scale)
  const getSpacingValue = (size: SpacingSize): string => {
    switch (size) {
      case 'xs': return '0.25rem'; // 4px
      case 'sm': return '0.5rem';  // 8px
      case 'md': return '1rem';    // 16px
      case 'lg': return '1.5rem';  // 24px
      case 'xl': return '2rem';    // 32px
    }
  };

  // Convert max width to Tailwind classes
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-2xl';
      case 'md': return 'max-w-4xl';
      case 'lg': return 'max-w-6xl';
      case 'xl': return 'max-w-7xl';
      case 'full': return 'max-w-full';
      case 'none': return '';
    }
  };

  // Generate grid columns classes
  const getGridColumnsClass = () => {
    const baseColumns = `grid-cols-${columns}`;
    const mdColumnsClass = mdColumns ? `md:grid-cols-${mdColumns}` : '';
    const lgColumnsClass = lgColumns ? `lg:grid-cols-${lgColumns}` : '';
    
    return [baseColumns, mdColumnsClass, lgColumnsClass].filter(Boolean).join(' ');
  };

  // Get gap style with rem values
  const gapStyle = useMemo(() => {
    return {
      gap: verticalSpacing ? `${getSpacingValue(verticalSpacing)} ${getSpacingValue(spacing)}` : getSpacingValue(spacing)
    };
  }, [spacing, verticalSpacing]);

  if (container) {
    return (
      <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className={`mx-auto ${getMaxWidthClass()}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`grid ${getGridColumnsClass()} ${className}`}
      style={gapStyle}
    >
      {children}
    </div>
  );
};

export default Grid; 