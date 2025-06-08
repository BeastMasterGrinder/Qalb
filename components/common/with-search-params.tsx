'use client';

import { Suspense } from 'react';

export function withSearchParams<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithSearchParamsWrapper(props: P) {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };
} 