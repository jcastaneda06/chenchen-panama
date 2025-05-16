import { FC, useRef } from "react";
import JointDeclaration from "../assets/data/joint-declaration.jpeg";
import Memorandum from "../assets/data/memorandum-entendimiento.pdf";
import Ley462 from "../assets/data/ley-462.pdf";
import { Scroll } from "lucide-react";
import Information from "../components/Info";

type PageProps = {
  title: string;
  file: string;
};

const Page: FC<PageProps> = (props) => {
  const { title, file } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <a
        ref={linkRef}
        href={file}
        target="_blank"
        className="flex items-center gap-4 p-4 border border-gray-300 hover:shadow-md text-ellipsis text-gray-500"
      >
        <Scroll size={20} className="" />
        <p className="decoration-0 truncate">{title}</p>
      </a>
    </>
  );
};

const Canal: FC = () => {
  return (
    <article className="pb-4 flex flex-col gap-4">
      <Information
        text="Actualmente hemos podido encontrar dos documentos referentes al canal de
        panamá. Ambos documentos no son equivalentes entre sí."
      />
      <div className="flex flex-col">
        <Page title="Ley 462 de 2025 CSS" file={Ley462} />
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
