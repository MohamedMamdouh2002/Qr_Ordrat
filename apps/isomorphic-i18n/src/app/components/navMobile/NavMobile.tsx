'use client';
import { AlignCenter, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useUserContext } from "../context/UserContext";
import { motion } from 'framer-motion';
import { useTranslation } from "@/app/i18n/client";

const NavMobile = ({ lang }: { lang: string }) => {
  const [active, setActive] = useState("");
  const { GetHome } = useUserContext();
  const [home, setHome] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة للمودال
  const navRef = useRef<HTMLUListElement>(null);
  const { t ,i18n} = useTranslation(lang!, 'nav');

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHome({ lang });
      setHome(data);
      setActive(data[0]?.id || "");
      console.log("Fetched Data:", data);
    };

    fetchData();
  }, [GetHome, lang]);

  useEffect(() => {
    const sections = home?.map(item => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            const index = home.findIndex(item => item.id === entry.target.id);
            scrollToItem(index);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    sections?.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections?.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [home]);

  const scrollToItem = (index: number) => {
    if (navRef.current) {
      const itemWidth = navRef.current.scrollWidth / home.length;
      const scrollAmount = index * itemWidth;
      const centerOffset = (navRef.current.clientWidth - itemWidth) / 2;

      navRef.current.scrollTo({
        left: scrollAmount - centerOffset,
        behavior: "smooth",
      });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    // التحكم بالتمرير بناءً على isModalOpen
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  if (typeof window === 'undefined') return null;

  return (
    <nav className="lg:hidden w-full m-auto border-b border-t mt-5 border-gray-200 gap-4 pt-5 bg-white sticky top-12 z-50 overflow-x-auto">
      <div className="w-5/6 mx-auto flex">
        <button
          onClick={() => setIsModalOpen(true)} // فتح المودال عند الضغط على الأيقونة
          className={`transition duration-150`}
        >
          <AlignCenter />
        </button>
        <ul ref={navRef} className="flex items-center ps-5 gap-6 whitespace-nowrap overflow-x-auto flex-nowrap w-full h-16">
          {home?.map((item, index) => (
            <li key={item.id} className="relative w-full h-full text-left">
              <Link
                to={item.id}
                smooth={true}
                duration={500}
                offset={-135}
                className={`text-sm text-center relative cursor-pointer h-full flex items-center justify-center font-semibold ${
                  active === item.id ? "text-orange-500" : "text-gray-700"
                }`}
                onClick={() => {
                  setActive(item.id);
                  scrollToItem(index);
                }}
              >
                {item.name}
              </Link>
              {active === item.id && (
                <span className="absolute bottom-0 bg-orange-500 h-[4px] rounded-t-full transition-all duration-700 left-0 right-0"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* مودال */}
      {isModalOpen && (
        <>
        <div className="fixed  z-[9999] inset-0 bg-gray-600 bg-opacity-50 " onClick={handleOutsideClick} />
          <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 right-0 left-0 lg:hidden flex items-end z-[1000000] "
            >
            <div className="bg-white  rounded-t-lg shadow-lg py-6 w-full">
              <div className="flex items-center gap-3 mx-4 mb-6">

                <X
                    onClick={() => handleClose()}
                    className= ""
                    size={25}
                />
                <h2 className="text-lg font-medium">{t('menu')}</h2>
              </div>
              <ul className="flex flex-col gap-4"> 
                {home?.map((item, index) => (
                  <>
                    <Link
                      key={item.id}
                      to={item.id}
                      smooth={true}
                      duration={500}
                      offset={-135}
                      className={`text-sm relative cursor-pointer h-full flex justify-between items-center font-semibold ${
                        active === item.id ? "text-orange-500" : "text-gray-700"
                      }`}
                      onClick={() => {
                        setActive(item.id);
                        scrollToItem(index);
                        handleClose();
                      }}
                    >
                      <li className="flex justify-between items-center mx-4 w-full "> {/* استخدام justify-between لتوزيع العناصر */}
                        <span>{item.name}</span>
                        <span>{item.numberOfProducts}</span>
                      </li>
                      {active === item.id && (
                        <span className="absolute  bg-orange-500 h-[30px] w-1 rounded-e-full transition-all duration-700 left-0 -top-1 bottom-0 "></span>
                      )}
                    </Link>
                    <hr className=" mx-2"/>
                  </>
                ))}
              </ul>
            
            </div>
          </motion.div>

        </>
      )}
    </nav>
  );
};

export default NavMobile;
