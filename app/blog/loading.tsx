"use client"

export default function Loading() {
    return (
        <div>Loading</div>
    );
}

export function LoadingBlogLists() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="border rounded-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2.5 w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      );
}