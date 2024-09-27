'use client';
import { AlignCenter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useUserContext } from "../context/UserContext";

const NavMobile = () => {
  const [active, setActive] = useState(""); // تعيين الحالة النشطة
  const { GetHome } = useUserContext();
  const [home, setHome] = useState<any[]>([]);
  const navRef = useRef<HTMLUListElement>(null); // مرجع للتعامل مع التمرير الأفقي

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHome();
      setHome(data);
      setActive(data[0]?.id || ""); // تعيين أول رابط كحالة نشطة بشكل افتراضي
      console.log('Fetched Data:', data);
    };

    fetchData();
  }, [GetHome]);

  useEffect(() => {
    const sections = home.map(item => document.getElementById(item.id));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          const index = home.findIndex(item => item.id === entry.target.id);
          scrollToItem(index); // تمرير العنصر النشط إلى منتصف الشاشة
        }
      });
    }, { rootMargin: '0px', threshold: 0.5 });

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [home]);

  // Function to handle horizontal scrolling and center the active item
  const scrollToItem = (index: number) => {
    if (navRef.current) {
      const itemWidth = navRef.current.scrollWidth / home.length; // عرض كل عنصر
      const scrollAmount = index * itemWidth; // المسافة إلى العنصر
      const centerOffset = (navRef.current.clientWidth - itemWidth) / 2; // تعويض لتوسيط العنصر

      navRef.current.scrollTo({
        left: scrollAmount - centerOffset, // تمرير العنصر النشط إلى منتصف الشاشة
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="lg:hidden m-auto border-b border-t mt-5 border-gray-200 gap-4 pt-5 bg-white sticky top-12 z-50 overflow-x-auto">
      <div className="w-5/6 mx-auto flex">
        <button className={`transition duration-150 `}>
          <AlignCenter className="" />
        </button>
        <ul ref={navRef} className="flex items-center ps-5 gap-6 whitespace-nowrap overflow-x-auto flex-nowrap w-full h-16"> {/* تأكد أن الـ ul لديها ارتفاع محدد */}
          {home.map((item, index) => (
            <li key={item.id} className="relative w-full h-full  text-left"> {/* الارتفاع الكامل للعنصر */}
              <Link
                to={item.id}
                smooth={true}
                duration={500}
                offset={-135}
                className={`text-sm text-center relative cursor-pointer h-full flex items-center justify-center font-semibold ${active === item.id ? "text-orange-500" : "text-gray-700"}`}  // تأكد أن العنصر يمتد بشكل عمودي بالكامل
                onClick={() => {
                  setActive(item.id);
                  scrollToItem(index); // التمرير الأفقي عند الضغط
                }}
              >
                {item.name}
              </Link>
              {/* <span
                className={`absolute bottom-0  h-[4px] rounded-t-full transition-all duration-500 transform ${
                  active === item.id ? "w-full translate-x-0 bg-orange-500" : "w-0 translate-x-full"
                }`}
              ></span> */}
                {active === item.id && (
                  <span
                    className={`absolute bottom-0 bg-orange-500 h-[4px] rounded-t-full transition-all duration-700 left-0 right-0`}
                  ></span>
                )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavMobile;
