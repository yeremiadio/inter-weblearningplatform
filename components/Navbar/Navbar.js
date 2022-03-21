import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UserDropdown from "../Dropdown/UserDropdown";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/solid";
import { Button } from "@chakra-ui/react";
function Navbar({ setOpen, open }) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const navigations = [
    {
      id: 1,
      name: "Beranda",
      href: "/",
    },
    {
      id: 2,
      name: "Tentang",
      href: "/about",
    },
    {
      id: 3,
      name: "Pengembang",
      href: "/developer",
    },
  ];
  return (
    <header className="sticky top-0 z-40">
      <nav className="w-full bg-white border-b border-blue-50 p-4 lg:px-12">
        <div className="flex flex-row-reverse lg:flex-row items-center justify-between flex-1 container mx-auto">
          <div className="contents">
            <button
              onClick={() => setOpen(!open)}
              className="mr-3 lg:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-secondary"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="/interWithText.svg"
                  className="object-cover w-24 mr-3"
                />
              </div>
            </Link>
          </div>
          <div className="hidden lg:contents">
            <ul className="flex gap-16 p-4">
              {navigations.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a
                      className={
                        "tracking-normal " +
                        (router.asPath === item.href ||
                        router.pathname === item.href
                          ? "text-darkblue-inter font-bold transition ease-in-out delay-75"
                          : "text-darkblue-inter text-opacity-50 hover:text-opacity-100 font-medium transition ease-in-out delay-75")
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:flex gap-2">
            {auth.isAuthenticated ? (
              <UserDropdown user={auth?.user?.user} />
            ) : (
              <>
                <Link href={"login"}>
                  <a>
                    <button className="py-3 px-8 bg-blue-inter transition-all delay-75 hover:bg-blue-600 rounded-md text-white font-bold my-2">
                      Login
                    </button>
                  </a>
                </Link>
                <Link href={"register"}>
                  <a>
                    <button className="py-3 px-8 bg-blue-inter bg-opacity-10 transition-all delay-75 hover:bg-opacity-20 rounded-md text-blue-inter font-bold my-2">
                      Register
                    </button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
