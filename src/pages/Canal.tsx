import { FC } from "react";
import JointDeclaration from "../assets/data/joint-declaration.jpeg";
import Memorandum from "../assets/data/memorandum-entendimiento.pdf";

type PageProps = {
  title: string;
  file: string;
};

const Page: FC<PageProps> = (props) => {
  const { title, file } = props;
  return (
    <a
      className="flex justify-center items-center text-center h-96 w-64 border border-gray-300 shadow-md"
      href={file}
    >
      <p className="decoration-0">{title}</p>
    </a>
  );
};

const Canal: FC = () => {
  return (
    <article className="text-center pb-4">
      <p className="mb-8">
        Actualmente hemos podido encontrar dos documentos referentes al canal de
        panamá. Ambos documentos no son equivalentes entre sí.
      </p>
      <div className="flex justify-around items-center flex-wrap gap-4">
        <Page
          title="Memorándum de entendimiento (sólo en español)"
          file={Memorandum}
        />
        <Page
          title="Declaración conjunta (sólo en inglés)"
          file={JointDeclaration}
        />
      </div>
    </article>
  );
};

Canal.displayName = "Canal";

export default Canal;
