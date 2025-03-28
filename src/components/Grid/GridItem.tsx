import React from 'react';

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  mdColSpan?: number;
  lgColSpan?: number;
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  colSpan,
  mdColSpan,
  lgColSpan,
}) => {
  // Generate column span classes if provided
  const getColumnSpanClasses = () => {
    const classes = [];
    
    if (colSpan) {
      classes.push(`col-span-${colSpan}`);
    }
    
    if (mdColSpan) {
      classes.push(`md:col-span-${mdColSpan}`);
    }
    
    if (lgColSpan) {
      classes.push(`lg:col-span-${lgColSpan}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div className={`${getColumnSpanClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default GridItem; 