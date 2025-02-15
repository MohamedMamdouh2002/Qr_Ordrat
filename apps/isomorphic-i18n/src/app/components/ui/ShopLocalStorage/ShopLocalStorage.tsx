"use client";

import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";

export default function ShopLocalStorage({ subdomainName, logoUrl, branchZones, shopId }: { subdomainName: string; logoUrl: string;   branchZones: { lat: number; lng: number; zoonRadius: number }[]; shopId:string;
}) {
  const { setBranchZones, setshopId } = useUserContext(); 
  setshopId(shopId);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("subdomainName", subdomainName);
      localStorage.setItem("logoUrl", logoUrl);
      // console.log("branchZones: ",branchZones);
      setBranchZones(branchZones);
    }
  }, [subdomainName, logoUrl]);

  return null;
}
