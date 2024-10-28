'use client';

import NextTopLoader from 'nextjs-toploader';

export default function NextProgress() {
  return <NextTopLoader color='#f97316' showSpinner={false} crawlSpeed={100} speed={100} />;
}
