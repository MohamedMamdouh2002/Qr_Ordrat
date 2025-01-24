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

// const NextProgress = dynamic(() => import("@components/next-progress"), {
  // ssr: false,
// });

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);
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
        	<MantineProvider>

        <AuthProvider session={session}>
          <SessionContextProvider>
            <CartProvider>
              <ThemeProvider>
                <UserProvider>
                  {/* <NextProgress /> */}
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
