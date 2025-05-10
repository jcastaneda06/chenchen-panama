import { FC, memo, useEffect, useState } from "react";
import { Planilla } from "../types/Data";
import moment from "moment";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Props = {
  data: Planilla[];
  itemsPerPage: number;
};

const PlanillaTable: FC<Props> = (props) => {
  const { data, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg" style={{}}>
        <table className="w-full">
          <thead>
            <tr className="h-[42px]">
              <th className="w-[10%]">Cédula</th>
              <th className="w-[10%]">Salario</th>
              <th className="w-[10%]">Nombre</th>
              <th className="w-[10%]">Apellido</th>
              <th className="w-[10%]">Posición</th>
              <th className="w-[10%]">Inicio de labores</th>
              <th className="w-[40%]">Planilla</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((d) => (
              <tr>
                <td className="truncate">{d.cedula}</td>
                <td className="truncate">${d.salarioBruto}</td>
                <td className="truncate">{d.nombre}</td>
                <td className="truncate">{d.apellido}</td>
                <td className="truncate">{d.posicion}</td>
                <td className="truncate">
                  {moment(d.fechaInicio).locale("es").format("DD MMMM YYYY")}
                </td>
                <td className="truncate">{d.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-2">
          <p>{totalPages} páginas</p>
          <button
            className="input-base"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1 === 0 ? 1 : currentPage - 1)
            }
          >
            <ArrowLeft size={20} />
          </button>
          {currentPage}
          <button
            className="input-base"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(
                currentPage + 1 > totalPages ? totalPages : currentPage + 1
              );
            }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p>Pagina:</p>
          <select
            className="input-base"
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default memo(PlanillaTable);
