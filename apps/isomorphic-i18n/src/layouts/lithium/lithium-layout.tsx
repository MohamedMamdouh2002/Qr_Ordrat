import Footer from '@/app/components/footer/Footer';
import ScrollToTop from '@/app/components/ui/ScrollToTop';
import Header from '@/layouts/lithium/lithium-header';
export default function LithiumLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  return (
    <main className="flex min-h-screen flex-grow">
      <div className="flex w-full flex-col ">
        <ScrollToTop/>
        <Header lang={lang} />
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer lang={lang!}/>

        </div>
      </div>
    </main>
  );
}
