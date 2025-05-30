// app/components/ProgressBar.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // When pathname changes, finish the progress bar
    NProgress.configure({ showSpinner: false });
    NProgress.done();
  }, [pathname]);

  return null;
}
