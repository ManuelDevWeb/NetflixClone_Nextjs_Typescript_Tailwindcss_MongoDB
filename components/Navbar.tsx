import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// Icons
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

// Components
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup (This is important to prevent memory leaks and better performance)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((currentShowMenu) => !currentShowMenu);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((currentShowMenu) => !currentShowMenu);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex items-center transition-all duration-500  ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        {/* Logo */}
        <div className="h-4 lg:h-7">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            height={100}
            width={150}
            className="h-full w-full"
          />
        </div>
        {/* Menu */}
        <div className="ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        {/* Mobile Menu */}
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition-all duration-300 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        {/* Account Menu*/}
        <div className="flex ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src={"/images/default-blue.png"}
                alt="Profile"
                height={100}
                width={100}
                className="h-full w-full"
              />
            </div>
            <BsChevronDown
              className={`text-white transition-all duration-300 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
