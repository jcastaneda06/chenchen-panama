import { Search, SortAsc, SortDesc } from "lucide-react";
import { FC, useMemo, useState } from "react";
import { Planilla, Filters } from "../types";
import rawData from "../assets/data/data.json";
import { useDebounce } from "use-debounce";
import { formatSalary } from "../helpers";
import PlanillaTable from "../components/Grid";

const typedData: Planilla[] = rawData as Planilla[];
const skipEntidad: keyof Planilla = "entidad";

const data = typedData.map((d) => {
  const { [skipEntidad]: _, ...filtered } = d;

  return { ...filtered };
});

const planillas = [
  ...new Set(
    [...data].map((o) => o.ubicacion).sort((a, b) => a.localeCompare(b))
  ),
];

const PlanillaAsamblea: FC = () => {
  const [search, setSearch] = useState<string>();
  const [multiplier, setMultiplier] = useState<"d" | "m" | "y">("m");
  const [filters, setFilters] = useState<Filters>({
    sortBy: "Nombre",
    sort: "-asc",
    planilla: "",
  });

  const [debounced] = useDebounce(search, 1000);

  const dataMemo = useMemo(() => {
    const searchTerm = debounced?.toLowerCase();

    let filtered = [...data];
    if (filters.planilla) {
      filtered = filtered.filter((d) => d.ubicacion === filters.planilla);
    }

    if (filters.sortBy == "Nombre") {
      filtered = [...filtered].sort((a, b) =>
        filters.sort === "-asc"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      );
    }

    if (filters.sortBy == "Salario") {
      filtered = [...filtered].sort((a, b) =>
        filters.sort === "-asc"
          ? b.salarioBruto - a.salarioBruto
          : a.salarioBruto - b.salarioBruto
      );
    }

    if (searchTerm) {
      return (
        filtered.filter((d) => {
          if (!Number.isNaN(Number(searchTerm))) {
            return d.salarioBruto <= Number(searchTerm);
          } else {
            return (
              d.cedula.toLowerCase().includes(searchTerm || "") ||
              d.apellido.toLowerCase().includes(searchTerm || "") ||
              d.nombre.toLowerCase().includes(searchTerm || "")
            );
          }
        }) || []
      );
    }

    return filtered;
  }, [debounced, filters.sortBy, filters.planilla, filters.sort, multiplier]);

  const totalSalaries = dataMemo
    .map((s) => s.salarioBruto)
    .reduce((t, s) => s + t, 0);

  const handleSetFilters = (filters: Filters) => {
    setFilters({ ...filters });
  };
  return (
    <div className="">
      <div className="flex flex-col md:flex-row pb-4 gap-4">
        <div className="flex flex-col gap-4 basis-1/2 min-w-0">
          <div className="input-base flex items-center gap-2 px-2">
            <Search className="text-gray-500" />
            <input
              className="outline-0 w-full"
              type="text"
              value={search}
              placeholder="Buscar nombre, salario, etc..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p>Ordenar por:</p>
              <button
                className="input-base rounded-l"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sort: prev.sort === "-asc" ? "asc" : "-asc",
                  }))
                }
              >
                {filters.sort === "-asc" ? (
                  <SortDesc size={20} />
                ) : (
                  <SortAsc size={20} />
                )}
              </button>
              <select
                className="input-base"
                value={filters.sortBy}
                onChange={(e) =>
                  handleSetFilters({
                    sortBy: e.target.value as typeof filters.sortBy,
                    sort: filters.sort,
                    planilla: filters.planilla,
                  })
                }
              >
                <option value={"Salario"}>Salario</option>
                <option value={"Nombre"}>Nombre</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <p>Planilla:</p>
              <select
                className="input-base max-w-[200px] truncate"
                value={filters.planilla}
                onChange={(e) =>
                  handleSetFilters({
                    sortBy: filters.sortBy,
                    sort: filters.sort,
                    planilla: e.target.value,
                  })
                }
              >
                <option value={""}>Todas</option>
                {planillas.map((o, i) => (
                  <option key={`${o}-${i}`} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end basis-1/2 min-w-0">
          <div className="flex flex-col justify-between items-end">
            <div className="flex">Actualizado 25 abril 2025</div>
            <div className="flex justify-end items-end gap-2">
              <p>
                Total de planilla:{" "}
                <strong>{formatSalary(totalSalaries, multiplier)}</strong>
              </p>
              <select
                className="input-base"
                defaultValue={"m"}
                onChange={(e) =>
                  setMultiplier(e.target.value as typeof multiplier)
                }
              >
                <option value={"d"}>Día</option>
                <option value={"m"}>Mes</option>
                <option value={"y"}>Año</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {dataMemo.length > 0 ? (
        <PlanillaTable data={dataMemo as Planilla[]} itemsPerPage={10} />
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

PlanillaAsamblea.displayName = "PlanillaAsamblea";

export default PlanillaAsamblea;
