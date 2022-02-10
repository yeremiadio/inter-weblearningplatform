import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UserDropdown from "../Dropdown/UserDropdown";

function NavbarDefaultAdmin() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between py-3 px-6 lg:py-3 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
      <div className="w-1/4 flex items-center">
        <img
          src="/interWithText.svg"
          onClick={() => router.replace("/")}
          className="w-full md:w-1/4 object-cover cursor-pointer"
        />
      </div>
      <UserDropdown user={auth.user} darkMode={false} />
    </div>
  );
}

export default NavbarDefaultAdmin;
