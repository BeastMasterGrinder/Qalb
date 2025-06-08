import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components) {
  return {
    // Typography elements
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-bold mt-5 mb-2" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 my-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 my-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="my-1" {...props}>
        {children}
      </li>
    ),
    
    // Block elements
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Inline elements
    a: ({ children, href, ...props }) => (
      <Link 
        href={href} 
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </Link>
    ),
    
    // Code blocks
    code: ({ children, className, ...props }) => {
      // For inline code
      if (!className) {
        return (
          <code 
            className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm" 
            {...props}
          >
            {children}
          </code>
        )
      }
      
      // For code blocks with language (className will be like "language-jsx")
      return (
        <code 
          className={`${className} block p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto my-4 font-mono text-sm`}
          {...props}
        >
          {children}
        </code>
      )
    },
    
    pre: ({ children, ...props }) => (
      <pre 
        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4" 
        {...props}
      >
        {children}
      </pre>
    ),
    
    // Table elements
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table 
          className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" 
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th 
        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gray-50 dark:bg-gray-800" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td 
        className="px-4 py-2 whitespace-nowrap text-sm" 
        {...props}
      >
        {children}
      </td>
    ),
    
    // Media elements
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <Image
          src={src}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg"
          {...props}
        />
      </div>
    ),
    
    // Override any component props passed in
    ...components,
  }
} 