import { useState } from "react";
import Information from "../components/Info";
import TextInput from "../components/TextInput";
import BuyMeACoffee from "../components/BuyMeACoffee";

const RetirementCalculator = () => {
  const [salarioMensual, setSalarioMensual] = useState<string>("");
  const [tiempoTrabajo, setTiempoTrabajo] = useState<string>("");

  function handleCalcularPension({
    tasaInteres = 0.03,
    tasaAporte = 0.135,
    factorActuarial = 200,
  }: {
    tasaInteres?: number;
    tasaAporte?: number;
    factorActuarial?: number;
  }) {
    const anios = Number(tiempoTrabajo);
    const salario = Number(salarioMensual);
    const cuotas = anios * 12;
    const tasaMensual = tasaInteres / 12;
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
    };
  }

  const jubilacion = handleCalcularPension({});

  return (
    <main className="flex flex-col gap-4">
      <article>
        <Information
          text="Esta calculadora usa datos aproximados como el rendimiento anual
          estimado y podría no ser precisa."
        />
      </article>
      <section className="border border-gray-300 p-4 rounded flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex-1 flex flex-col justify-between">
            <label>Salario al mes promeido</label>
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
              <p className="font-bold">$ {jubilacion.pensionMensualEstimado}</p>
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
            <p>Fondos acumulados</p>
            <p>{jubilacion.fondoAcumulado}</p>
            <span className="w-full h-[1px] border-b border-b-gray-300 col-span-2" />
            <p>Jubilacion con garantia</p>
            <p className="font-bold">$ {jubilacion.pensionFinalConGarantía}</p>
          </div>
          <BuyMeACoffee />
        </section>
      )}
    </main>
  );
};

export default RetirementCalculator;
