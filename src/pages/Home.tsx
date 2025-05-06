import { FileUser, Ship } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router";

const Home: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(page);
  };
  return (
    <main className="flex flex-col text-center p-4 gap-4">
      <article>
        <p className="text-xl font-bold">🙋🏽‍♂️ ¡Bienvenid@!</p>
        <p className="text-md text-gray-500">
          Chen Chen es una aplicación web tipo "bibliotica" que servirá para
          ayudarte a fiscalizar tu chen chen y mantenerte al día de los últimos
          juega vivo de los políticos.
        </p>
      </article>
      <section className="grid grid-cols-2 gap-4">
        <button
          className="flex flex-col items-center justify-center p-4 w-full h-24 input-base hover:text-white hover:bg-blue-950 transition-all cursor-pointer"
          onClick={() => handleNavigate("/planilla-asamblea")}
        >
          <FileUser />
          <p className="font-bold">Planilla Asamblea</p>
        </button>
        <button
          className="flex flex-col items-center justify-center p-4 w-full h-24 input-base hover:text-white hover:bg-blue-950 transition-all cursor-pointer"
          onClick={() => handleNavigate("/canal")}
        >
          <Ship />
          <p className="font-bold">Canal de Panamá</p>
        </button>
      </section>
    </main>
  );
};

Home.displayName = "Home";

export default Home;
