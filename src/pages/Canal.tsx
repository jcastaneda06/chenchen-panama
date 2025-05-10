import { FC, useEffect, useRef, useState } from "react";
import JointDeclaration from "../assets/data/joint-declaration.jpeg";
import Memorandum from "../assets/data/memorandum-entendimiento.pdf";
import { Scroll } from "lucide-react";

type PageProps = {
  title: string;
  file: string;
};

const Page: FC<PageProps> = (props) => {
  const { title, file } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  useEffect(() => {
    if (linkRef.current) {
      const isTruncated =
        linkRef.current &&
        linkRef?.current.offsetWidth > linkRef?.current.scrollWidth;

      setIsTruncated(isTruncated);
    }
  }, [linkRef.current, window.innerWidth]);

  return (
    <>
      <a
        ref={linkRef}
        data-tooltip-id={isTruncated ? "canal-tooltips" : ""}
        data-tooltip-content={title}
        data-tooltip-place="top"
        className="flex items-center gap-4 p-4 border border-gray-300 hover:shadow-md text-ellipsis text-gray-500"
        href={file}
      >
        <Scroll size={20} className="" />
        <p className="decoration-0 truncate">{title}</p>
      </a>
    </>
  );
};

const Canal: FC = () => {
  return (
    <article className="text-center pb-4">
      <p className="mb-8">
        Actualmente hemos podido encontrar dos documentos referentes al canal de
        panamá. Ambos documentos no son equivalentes entre sí.
      </p>
      <div className="flex flex-col">
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
