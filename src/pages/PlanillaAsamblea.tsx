import { FC, useMemo, useState } from "react";
import { Planilla, Filters } from "../types";
import rawData from "../assets/data/data.json";
import { useDebounce } from "use-debounce";
import { formatSalary } from "../helpers";
import Table from "../components/Table";
import { TableProps, Select } from "antd";
import TextInput from "../components/TextInput";

const headings: TableProps<Planilla>["columns"] = [
  {
    key: "cedula",
    dataIndex: "cedula",
    title: "Cedula",
    fixed: "left",
    width: "10%",
    ellipsis: true,
    render: (text) => (
      <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        {text}
      </div>
    ),
  },
  {
    key: "salario",
    dataIndex: "salarioBruto",
    title: "Salario",
    render: (salario) => formatSalary(salario),
    showSorterTooltip: false,
    sorter: (a, b) => a.salarioBruto - b.salarioBruto,
    fixed: "left",
  },
  {
    key: "nombre",
    dataIndex: "nombre",
    title: "Nombre",
    showSorterTooltip: false,
    sorter: (a, b) => a.nombre.localeCompare(b.nombre),
  },
  {
    key: "apellido",
    dataIndex: "apellido",
    title: "Apellido",
    showSorterTooltip: false,
    sorter: (a, b) => a.apellido.localeCompare(b.apellido),
  },
  {
    key: "posicion",
    dataIndex: "posicion",
    title: "Posicion",
  },
  {
    key: "inicioLabores",
    dataIndex: "fechaInicio",
    title: "InicioLabores",
  },
  {
    key: "planilla",
    dataIndex: "ubicacion",
    title: "Planilla",
    showSorterTooltip: false,
    sorter: (a, b) => a.ubicacion.localeCompare(b.ubicacion),
    ellipsis: true,
  },
];

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
    <>
      <div className="flex flex-col md:flex-row pb-4 gap-4">
        <div className="flex flex-col gap-4 basis-1/2 min-w-0">
          <TextInput
            type="text"
            value={search}
            placeholder="Buscar nombre, salario, etc..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p>Planilla:</p>
              <Select
                showSearch
                value={filters.planilla}
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleSetFilters({
                    sortBy: filters.sortBy,
                    sort: filters.sort,
                    planilla: e,
                  })
                }
                options={[
                  { label: "Todas", value: "" },
                  ...planillas.map((o) => ({ label: o, value: o })),
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end basis-1/2 min-w-0">
          <div className="flex flex-col justify-between items-end mt-4">
            <div className="flex">Actualizado 25 abril 2025</div>
            <div className="flex justify-end items-center gap-2">
              <p>
                Total de planilla:{" "}
                <strong>{formatSalary(totalSalaries, multiplier)}</strong>
              </p>
              <Select
                style={{ width: "75px" }}
                defaultValue={"m"}
                options={[
                  {
                    label: "Dia",
                    value: "d",
                  },
                  {
                    label: "Mes",
                    value: "m",
                  },
                  {
                    label: "Año",
                    value: "y",
                  },
                ]}
                onChange={(e) => setMultiplier(e as typeof multiplier)}
              />
            </div>
          </div>
        </div>
      </div>
      {dataMemo.length > 0 ? (
        // <PlanillaTable data={dataMemo as Planilla[]} itemsPerPage={10} />
        <Table columns={[...headings]} dataSource={dataMemo} />
      ) : (
        <Table columns={[]} dataSource={[]} />
      )}
    </>
  );
};

PlanillaAsamblea.displayName = "PlanillaAsamblea";

export default PlanillaAsamblea;
