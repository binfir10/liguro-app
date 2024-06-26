import React from 'react';

const CategoryCardSkeleton = () => (
  <div className="p-1 flex w-full justify-between items-center animate-pulse border rounded-lg mb-1 group border-muted mt-20">
    {/* Left side content */}
    <div className="flex items-center">
      <div className="flex justify-between items-center">
        {/* Placeholder for icon */}
        <div className="w-8 h-8 bg-muted rounded-full mr-2"></div>
        {/* Placeholder for category name */}
        <div className="h-4 w-24 bg-muted rounded-md"></div>
      </div>
    </div>
    {/* Right side actions menu placeholder */}
    <div className="w-8 h-8 bg-muted rounded-full"></div>
  </div>
);

export default CategoryCardSkeleton;
