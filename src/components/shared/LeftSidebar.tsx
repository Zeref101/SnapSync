import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";




const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const handleSignOutClick = async () => {
    // Ensure that the signOut function returns a Promise<void>
    await signOut();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess, navigate]);

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex-center gap-3 items-center">
          <img src={user.imageUrl || "public/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-12">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                <NavLink to={link.route} className={`flex gap-4 items-center p-4 group-hover:invert-white ${isActive && "invert-white"}`}>
                  <img src={link.imgURL} alt={link.label} />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
        <Button variant="ghost" className="shad-button_ghost flex gap-2" onClick={handleSignOutClick}>
          <img src="public/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>


    </nav>
  )
}

export default LeftSidebar
