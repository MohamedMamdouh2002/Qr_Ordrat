'use client';
import { AlignCenter } from "lucide-react";
import { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-scroll";

const Navbar = () => {
  const [active, setActive] = useState("grills"); // تعيين القيمة الافتراضية هنا

  const menuItems = [
    { name: "Grills", href: "grills" },
    { name: "Popular meals", href: "popular-meals" },
    { name: "Syrian food", href: "syrian-food" },
    { name: "offers", href: "offers" },
    { name: "offers", href: "offers" },
    { name: "offers", href: "offers" },
  ];

  useEffect(() => {
    const sections = menuItems.map(item => document.getElementById(item.href));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
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
  }, [menuItems]);

  return (
    <>
      <nav className="lg:hidden m-auto border-b border-t mt-5 border-gray-200 gap-4 py-5 bg-white sticky top-12 z-50 overflow-x-auto">
        <div className="w-5/6 mx-auto flex">
          <button className={`transition duration-150`}>
            <AlignCenter />
          </button>
          <ul className="flex items-center ps-5 gap-6 whitespace-nowrap overflow-x-auto">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  to={item.href}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className={`text-sm font-semibold ${active === item.href ? "text-orange-500" : "text-gray-700"}`}
                  onClick={() => setActive(item.href)}
                >
                  {item.name}
                </Link>
                <span
                    className={`absolute bottom-[-2px] left-0 h-[2px] rounded-full transition-all duration-500 ${
                        active === item.href ? "bg-orange-500 w-full" : "bg-transparent w-0"
                    }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
