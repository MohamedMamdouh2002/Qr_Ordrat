"use client";

import { useEffect } from "react";

export default function ShopLocalStorage({ subdomainName, logoUrl }: { subdomainName: string; logoUrl: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("subdomainName", subdomainName);
      localStorage.setItem("logoUrl", logoUrl);
    }
  }, [subdomainName, logoUrl]);

  return null;
}
