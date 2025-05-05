import { Menu } from "lucide-react";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

type LinksListProps = {
  isMobile?: boolean;
  onAfterNavigate?: () => void;
};

const LinksList: FC<PropsWithChildren<LinksListProps>> = (props) => {
  const { isMobile, onAfterNavigate } = props;
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <>
      <li>
        <button
          className={`link-button h-full p-4 
            ${isMobile ? "border-0" : "border-b"} 
            ${pathname === "/planilla-asamblea" ? "border-blue-500" : ""}`}
          onClick={() => {
            navigate("/planilla-asamblea");
            if (onAfterNavigate) onAfterNavigate();
          }}
        >
          Planilla asamblea
        </button>
      </li>
      {isMobile && <span className="border-b border-gray-500" />}
      <li>
        <button
          className={`link-button h-full p-4 
            ${isMobile ? "border-0" : "border-b"} 
            ${pathname === "/canal" ? "border-blue-500" : ""}`}
          onClick={() => {
            navigate("/canal");
            if (onAfterNavigate) onAfterNavigate();
          }}
        >
          Canal de Panamá
        </button>
      </li>
      {isMobile && <span className="border-b border-gray-500" />}
      <li>
        <button
          className={`link-button h-full p-4 
            ${isMobile ? "border-0" : "border-b"} 
            ${pathname === "/sugerencias" ? "border-blue-500" : ""}`}
          onClick={() => {
            navigate("/sugerencias");
            if (onAfterNavigate) onAfterNavigate();
          }}
        >
          Sugerencias
        </button>
      </li>
    </>
  );
};

const Navbar: FC = () => {
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
          <LinksList />
        </ul>
      </nav>
      <div
        ref={sidebarRef}
        className={`md:hidden absolute w-48 bg-white h-full shadow-md top-0 right-0 transition-all ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full hidden"
        }`}
      >
        <ul className="flex flex-col relative">
          <LinksList isMobile onAfterNavigate={() => setShowSidebar(false)} />
        </ul>
      </div>
    </>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
