import { Menu } from "lucide-react";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

type LinksListProps = {
  isMobile?: boolean;
  onAfterNavigate?: () => void;
  links: {
    route: string;
    title: string;
  }[];
};

const LinksList: FC<PropsWithChildren<LinksListProps>> = (props) => {
  const { isMobile, onAfterNavigate, links } = props;
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <>
      {links.map(
        (link) =>
          link.route !== "/" && (
            <>
              <li>
                <button
                  className={`link-button h-full p-4 w-full
            ${
              pathname === link.route ? "border-b-blue-500" : "border-b-white"
            }`}
                  onClick={() => {
                    navigate(link.route);
                    if (onAfterNavigate) onAfterNavigate();
                  }}
                >
                  {link.title}
                </button>
              </li>
              {isMobile && <span className="border-b border-gray-300" />}
            </>
          )
      )}
    </>
  );
};

type NavbarProps = {
  routes: { route: string; title: string }[];
};
const Navbar: FC<NavbarProps> = (props) => {
  const { routes } = props;
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSidebar]);

  return (
    <>
      <nav className="sticky top-0 bg-blue-950 text-blue-50 shadow-md flex justify-between items-center px-8 ">
        <button
          className="text-xl m-0 p-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Chen Chen
        </button>

        <button
          ref={buttonRef}
          className="p-4 md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <Menu />
        </button>
        <ul className="hidden md:flex gap-4 ">
          <LinksList links={routes} />
        </ul>
      </nav>
      <div
        ref={sidebarRef}
        className={`md:hidden fixed w-48 bg-white h-full shadow-md top-0 right-0 transition-all ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full hidden"
        }`}
      >
        <ul className="flex flex-col relative">
          <LinksList
            links={routes}
            isMobile
            onAfterNavigate={() => setShowSidebar(false)}
          />
        </ul>
      </div>
    </>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
