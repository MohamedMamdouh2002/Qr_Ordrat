import Footer from '@/app/components/footer/Footer';
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
        <Header lang={lang} />
        <div className="">
          {children}
          <Footer/>

        </div>
      </div>
    </main>
  );
}
