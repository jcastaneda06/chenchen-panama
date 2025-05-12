import { FileUser, HandCoins, Ship } from "lucide-react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
};

const GridMenuButton: FC<Props> = (props) => {
  const { onClick, text, icon } = props;
  return (
    <button
      className="flex flex-col items-center justify-center p-4 w-full h-24 input-base hover:text-white hover:bg-blue-950 transition-all cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <p className="font-bold">{text}</p>
    </button>
  );
};

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col text-center p-4 gap-4">
      <article>
        <p className="text-xl font-bold">🙋🏽‍♂️ ¡Bienvenid@!</p>
        <p className="text-md text-gray-500">
          Chen Chen es una aplicación web tipo "biblioteca" que servirá para
          ayudarte a fiscalizar tu chen chen y mantenerte al día de los últimos
          juega vivo de los políticos.
        </p>
      </article>
      <section className="grid grid-cols-2 gap-4">
        <GridMenuButton
          text="Planilla Asamblea"
          icon={<FileUser />}
          onClick={() => navigate("/planilla-asamblea")}
        />
        <GridMenuButton
          text="Canal de Panamá"
          icon={<Ship />}
          onClick={() => navigate("/canal")}
        />
        <GridMenuButton
          text="Calculadora de Jubilación Ley 462"
          icon={<HandCoins />}
          onClick={() => navigate("/calculo-jubilacion")}
        />
      </section>
    </main>
  );
};

Home.displayName = "Home";

export default Home;
