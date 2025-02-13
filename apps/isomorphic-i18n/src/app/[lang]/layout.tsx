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

async function fetchShopData() {
  try {
    const res = await fetch(
      "https://testapi.ordrat.com/api/Shop/GetById/952E762C-010D-4E2B-8035-26668D99E23E",
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
      mainColor: shopData.mainColor || "#0000ff",
      mainColorHover: shopData.secondaryColor || "#c96722",
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

function hexToRgba(hex: string, opacity: number) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);
  const shopData = await fetchShopData();
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
        <ShopLocalStorage subdomainName={shopData.subdomainName} logoUrl={shopData.logoUrl} />

        <MantineProvider>

          <AuthProvider session={session}>
            <SessionContextProvider>
              <CartProvider>
                <ThemeProvider>
                  <UserProvider>
                    <NextProgress />
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
