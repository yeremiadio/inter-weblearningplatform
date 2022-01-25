import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UserDropdown from "../Dropdown/UserDropdown";

function NavbarDefaultAdmin() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between p-6 lg:py-6 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
      <div className="w-1/4 flex items-center">
        <img
          src="../../interWithText.svg"
          onClick={() => router.replace("/")}
          className="w-full md:w-1/4 object-cover cursor-pointer"
        />
      </div>
      <UserDropdown user={auth.data.user} />
    </div>
  );
}

export default NavbarDefaultAdmin;
