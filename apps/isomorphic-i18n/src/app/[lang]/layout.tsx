import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import AuthProvider from "@/app/api/auth/[...nextauth]/auth-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { ThemeProvider } from "@/app/shared/theme-provider";
import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca, NotoSansArabic } from "@/app/fonts";
import cn from "@utils/class-names";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { CartProvider } from "@/store/quick-cart/cart.context";
import { UserProvider } from "../components/context/UserContext";

import { MantineProvider } from "@mantine/core";

import { SessionContextProvider } from "@/utils/fetch/contexts";
import ShopLocalStorage from "../components/ui/ShopLocalStorage/ShopLocalStorage";
// import { shopId } from "@/config/shopId";
import { headers } from "next/headers";

const NextProgress = dynamic(() => import("@components/next-progress"), {
  ssr: false,
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
// function getServerSiteUrl() {
//   const host = headers().get("host") || "localhost:3000";
//   const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
<<<<<<< HEAD
//   return ${protocol}://${host};
// }

=======
//   return `${protocol}://${host}`;
// }
>>>>>>> db2b0d9290a7c3e127c40071a2922b49266397f6
function getServerSiteUrl() {
  const host = "Karam%20ELSham";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${host}`;
}
// function getFullServerUrl() {
//   const host = headers().get("host") || "localhost:3000";
//   const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
//   const pathname = headers().get("referer") || "/";
<<<<<<< HEAD
//   // return `${protocol}://${host}${new URL(pathname).pathname}`;
=======
//   return `${protocol}://${host}${new URL(pathname).pathname}`;
>>>>>>> db2b0d9290a7c3e127c40071a2922b49266397f6
// }
async function fetchShopData(shopId: string) {
  const siteUrl = getServerSiteUrl(); // Get website URL dynamically
  // const fullSiteUrl = getFullServerUrl(); // Get website URL dynamically
  console.log("Fetching shop data from:", siteUrl);
  // console.log("Fetching full SiteUrl from:", fullSiteUrl);

  try {
    const res = await fetch(
      `https://testapi.ordrat.com/api/Shop/GetById/${shopId}`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": "en",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch shop details");
    }

    const shopData = await res.json();
    console.log("shopData: ",shopData);
    
    return {
      ...shopData,
      mainColor:  "#003049",
      mainColorHover: "#003049",
      // mainColor: shopData.mainColor || "#003049",
      // mainColorHover: shopData.secondaryColor || "#003049",
      subdomainName: shopData.subdomainName || "",
      logoUrl: shopData.logoUrl || "",
    };
  } catch (error) {
    console.error("Error fetching shop details:", error);
    return {
      mainColor: "#f97316",
      mainColorHover: "#c96722",
      subdomainName: "",
      logoUrl: "",
    };
  }
}

async function fetchBranchZones(shopId: string) {
  try {
    const res = await fetch(
      `https://testapi.ordrat.com/api/Branch/GetByShopId/${shopId}`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": "en",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch branch zones");
    }

    const data = await res.json();
    return data.map((branch: any) => ({
      lat: branch.centerLatitude,
      lng: branch.centerLongitude,
      zoonRadius: branch.coverageRadius,
    }));
  } catch (error) {
    console.error("Error fetching branch zones:", error);
    return [];
  }
}

async function fetchSubdomain(subdomain: string) {
  try {
    const res = await fetch(
      `https://testapi.ordrat.com/api/Shop/GetBySubdomain/${subdomain}`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": "en",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch branch zones");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching branch zones:", error);
    return [];
  }
}

function hexToRgba(hex: string, opacity: number) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default async function RootLayout({
  children,
  params: { lang, id },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const realPath = getServerSiteUrl(); // Get the real site URL
  console.log("Website Real Path:", realPath);
  const shopId = await fetchSubdomain(realPath);
  console.log("subdomain data:", shopId);
  const session = await getServerSession(authOptions);
  const shopData = await fetchShopData(shopId.id);
  const branchZones = await fetchBranchZones(shopId.id);

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={cn(inter.variable, NotoSansArabic.variable, "font-NotoSansArabic")}
      >
        <style>
          {`
            :root {
              --main-color: ${shopData.mainColor};
              --main-color-hover: ${shopData.mainColorHover};
              --navbar-color-scroll: ${hexToRgba(shopData.mainColor, 0.75)};
              --color-20: ${hexToRgba(shopData.mainColor, 0.2)};
              --color-30: ${hexToRgba(shopData.mainColor, 0.3)};
              --color-50: ${hexToRgba(shopData.mainColor, 0.5)};
              --color-90: ${hexToRgba(shopData.mainColor, 0.9)};
            }
          `}
        </style>
        {/* Save subdomainName and logoUrl to localStorage on client-side */}

        <MantineProvider>

          <AuthProvider session={session}>
            <SessionContextProvider>
              <CartProvider>
                <ThemeProvider>
                  <UserProvider>
                    <NextProgress />
<<<<<<< HEAD
                    <ShopLocalStorage subdomainName={shopData.subdomainName} logoUrl={shopData.logoUrl} branchZones={branchZones}  />
=======
                    <ShopLocalStorage subdomainName={shopData.subdomainName} logoUrl={shopData.logoUrl} branchZones={branchZones} shopId={shopId.id} />
>>>>>>> db2b0d9290a7c3e127c40071a2922b49266397f6
                    {children}
                    <Toaster />
                    <GlobalDrawer />
                    <GlobalModal />
                  </UserProvider>
                </ThemeProvider>
              </CartProvider>
            </SessionContextProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}