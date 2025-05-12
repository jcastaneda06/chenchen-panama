import { RefObject, useRef, useState } from "react";
import Information from "../components/Info";
import TextInput from "../components/TextInput";
import { formatSalary } from "../helpers";
import { Info, X } from "lucide-react";

const RetirementCalculator = () => {
  const [salarioMensual, setSalarioMensual] = useState<string>("");
  const [tiempoTrabajo, setTiempoTrabajo] = useState<string>("");

  const interesCompuestoRef = useRef<HTMLDivElement>(null);
  const capitalizacionRef = useRef<HTMLDivElement>(null);

  const handleCalcularPension = ({
    tasaInteresCompuesto = 0.03,
    tasaAporte = 0.135,
    factorActuarial = 200,
  }: {
    tasaInteresCompuesto?: number;
    tasaAporte?: number;
    factorActuarial?: number;
  }) => {
    const anios = Number(tiempoTrabajo);
    const salario = Number(salarioMensual);
    const cuotas = anios * 12;
    const tasaMensual = tasaInteresCompuesto / 12;
    let fondo = 0;

    for (let m = 0; m < cuotas; m++) {
      fondo = fondo * (1 + tasaMensual) + salario * tasaAporte;
    }

    const pensionMensualEstimado = fondo / factorActuarial;
    let pensionFinalConGarantía = pensionMensualEstimado;

    if (cuotas >= 240 && pensionMensualEstimado < 294.4) {
      pensionFinalConGarantía = 294.4;
    } else if (
      cuotas >= 180 &&
      cuotas < 240 &&
      pensionMensualEstimado < 160.0
    ) {
      pensionFinalConGarantía = 160.0;
    } else if (cuotas < 180) {
      pensionFinalConGarantía = 0;
    }

    return {
      cuotas,
      fondoAcumulado: fondo.toFixed(2),
      pensionMensualEstimado: pensionMensualEstimado.toFixed(2),
      pensionFinalConGarantía: pensionFinalConGarantía.toFixed(2),
      tasaInteresCompuesto,
      tasaAporte,
      factorActuarial,
    };
  };

  const jubilacion = handleCalcularPension({});

  const toggleTooltip = (el: HTMLDivElement, value: "none" | "block") => {
    el.style.display = value;
  };

  const handleTooltip = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const display = ref.current.style.display;
      if (display === "block") {
        toggleTooltip(ref.current, "none");
      } else {
        toggleTooltip(ref.current, "block");
      }
    }
  };

  return (
    <main className="flex flex-col gap-4">
      <article>
        <Information text="Esta calculadora usa datos aproximados como el interés compuesto y podría no ser precisa. Sus resultados deben ser tomados como referencia y nunca hechos 100% precisos." />
      </article>
      <section className="border border-gray-300 p-4 rounded flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex-1 flex flex-col justify-between">
            <label>Salario al mes promedio</label>
            <TextInput
              value={salarioMensual}
              type="number"
              onChange={(e) => setSalarioMensual(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <label>Años de trabajo</label>
            <TextInput
              value={tiempoTrabajo}
              type="number"
              onChange={(e) => setTiempoTrabajo(e.target.value)}
            />
          </div>
        </div>
      </section>
      {Number(jubilacion.pensionMensualEstimado) > 0 && (
        <section className="flex flex-col gap-4">
          <div className="text-xl">
            <p>Jubilacion estimada</p>
            <div className="flex gap-2 items-center">
              <p className="font-bold">
                {formatSalary(Number(jubilacion.pensionMensualEstimado))}
              </p>
              <p className="text-gray-500 text-sm">
                {(
                  (Number(jubilacion.pensionMensualEstimado) /
                    Number(salarioMensual)) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="col-span-2 text-lg text-gray-500">Desglose</p>
            <p>Cuotas</p>
            <p>{jubilacion.cuotas}</p>
            <span className="w-full h-[1px] border-b border-b-gray-300 col-span-2" />
            <p>Interés compuesto</p>
            <div className="flex items-center gap-2">
              <p>{jubilacion.tasaInteresCompuesto * 100}% </p>
              <div className="relative flex">
                <div
                  ref={interesCompuestoRef}
                  className="absolute hidden -translate-x-1/2 left-3 bottom-10 w-[250px] bg-white p-4 shadow-md rounded border border-gray-300"
                >
                  <div className="text-gray-500 flex justify-between items-center mb-2">
                    <p className="text-sm font-bold">Interés compuesto</p>
                    <button
                      className="input-base"
                      onClick={() => handleTooltip(interesCompuestoRef)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm/tight">
                    La tasa de interés compuesto es el porcentaje que se aplica
                    a un monto de dinero que ahorras o inviertes, pero no solo
                    sobre el monto original, sino también sobre los intereses
                    que ya has ganado.
                  </p>
                </div>
                <button
                  className="w-4 h-4 text-gray-500"
                  onClick={() => handleTooltip(interesCompuestoRef)}
                >
                  <Info size={16} />
                </button>
              </div>
            </div>
            <span className="w-full h-[1px] border-b border-b-gray-300 col-span-2" />
            <p>Capitalización individual</p>
            <div className="flex items-center gap-2">
              <p>{jubilacion.tasaAporte * 100}%</p>
              <div className="relative flex">
                <div
                  ref={capitalizacionRef}
                  className="absolute hidden -translate-x-1/2 bottom-10 w-[250px] bg-white p-4 shadow-md rounded border border-gray-300"
                >
                  <div className="text-gray-500 flex justify-between items-center mb-2">
                    <p className="text-sm font-bold">
                      Capitalización individual
                    </p>
                    <button
                      className="input-base"
                      onClick={() => handleTooltip(capitalizacionRef)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm/tight">
                    La capitalización individual es la tasa de aporte personal
                    (9.75%) más la tasa de aporte de tu empleador (13.25% hasta
                    febrero de 2027) de los cuales una porción (3.75%) se suma
                    la capitalización individual, y el resto se reparte a otros
                    programas de la CSS.
                  </p>
                </div>
                <button
                  className="w-4 h-4 text-gray-500"
                  onClick={() => handleTooltip(capitalizacionRef)}
                >
                  <Info size={16} />
                </button>
              </div>
            </div>
            <span className="w-full h-[1px] border-b border-b-gray-300 col-span-2" />
            <p>Fondos acumulados</p>
            <p>{formatSalary(Number(jubilacion.fondoAcumulado))}</p>
            <span className="w-full h-[1px] border-b border-b-gray-300 col-span-2" />
            <p>Jubilacion con garantia</p>
            <p className="font-bold">
              {formatSalary(Number(jubilacion.pensionFinalConGarantía))}
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default RetirementCalculator;
