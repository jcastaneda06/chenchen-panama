import { useState } from 'react'
import Information from '../components/Info'
import TextInput from '../components/TextInput'
import { formatSalary } from '../helpers'
import InfoCircleOutlined from '@ant-design/icons'
import CalculatorOutlined from '@ant-design/icons'
import { Pension } from '../types/Pension'
import { Button, Popover } from 'antd'

const RetirementCalculator = () => {
  const [pension, setPension] = useState<Pension>()
  const [salarioMensual, setSalarioMensual] = useState<string>('')
  const [tiempoTrabajo, setTiempoTrabajo] = useState<string>('')
  const [edadJubilacion, setEdadJubilacion] = useState<string>('')

  function getFactorActuarial(edad: number): number {
    const factores: { [edad: number]: number } = {
      35: 3.84,
      36: 3.87,
      37: 3.89,
      38: 3.92,
      39: 3.95,
      40: 3.98,
      41: 4.01,
      42: 4.04,
      43: 4.08,
      44: 4.11,
      45: 4.15,
      46: 4.19,
      47: 4.23,
      48: 4.27,
      49: 4.32,
      50: 4.37,
      51: 4.42,
      52: 4.47,
      53: 4.52,
      54: 4.58,
      55: 4.64,
      56: 4.7,
      57: 4.77,
      58: 4.84,
      59: 4.91,
      60: 4.99,
      61: 5.07,
      62: 5.15,
      63: 5.24,
      64: 5.34,
      65: 5.44,
      66: 5.55,
      67: 5.66,
      68: 5.78,
      69: 5.91,
      70: 6.04,
      71: 6.18,
      72: 6.33,
      73: 6.49,
      74: 6.66,
      75: 6.85,
      76: 7.04,
      77: 7.24,
      78: 7.46,
      79: 7.69,
      80: 7.94,
    }

    const edadClamped = Math.max(35, Math.min(80, Math.floor(edad)))

    return factores[edadClamped]
  }

  const handleCalcularPension = (pension: Pension) => {
    const { tiempoTrabajo, tasaAporte, tasaInteresCompuesto, edadJubilacion } =
      pension

    const salario = Number(salarioMensual)
    const cuotasTotales = tiempoTrabajo * 12
    const tasaMensual = tasaInteresCompuesto / 12

    let fondoTotal = 0

    for (let m = 0; m < cuotasTotales; m++) {
      fondoTotal = fondoTotal * (1 + tasaMensual) + salario * tasaAporte
    }

    const factorActuarial = getFactorActuarial(edadJubilacion)
    const pensionMensualEstimado = (fondoTotal / 1000) * factorActuarial

    // Garantía mínima legal (ajustada a Ley 462)
    let pensionFinalConGarantía = pensionMensualEstimado

    if (cuotasTotales >= 240 && pensionMensualEstimado < 265) {
      pensionFinalConGarantía = 265
    } else if (
      cuotasTotales >= 120 &&
      cuotasTotales < 240 &&
      pensionMensualEstimado < 144
    ) {
      pensionFinalConGarantía = 144
    } else if (cuotasTotales < 120) {
      pensionFinalConGarantía = 0
    }

    return {
      cuotasAntes: 0,
      cuotasDespues: cuotasTotales,
      cuotasTotales,
      fondoAntesLey: '0.00',
      fondoDespuesLey: fondoTotal.toFixed(2),
      fondoTotal: fondoTotal.toFixed(2),
      pensionMensualEstimado: pensionMensualEstimado.toFixed(2),
      pensionFinalConGarantía: pensionFinalConGarantía.toFixed(2),
      tasaInteresCompuesto,
      tasaAporte,
      tasaAnteriorLey: 0,
      factorActuarial,
      edadJubilacion,
      fondoAdicionalRequerido: '0.00',
    }
  }

  const handlePension = () => {
    const pension: Pension = {
      salarioMensual: Number(salarioMensual),
      tiempoTrabajo: Number(tiempoTrabajo),
      edadJubilacion: Number(edadJubilacion),
      tasaInteresCompuesto: 0.04,
      tasaAnteriorLey: 0.03,
      tasaAporte: 0.135,
    }

    setPension(pension)
  }

  const jubilacion = pension && handleCalcularPension(pension)

  return (
    <main className='flex flex-col gap-4'>
      <article>
        <Information text='Esta calculadora usa datos aproximados y podría no ser precisa. Sus resultados deben ser tomados como referencia y nunca hechos 100% precisos.' />
      </article>
      <section className='border border-gray-300 p-4 rounded flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='flex-1 flex flex-col justify-between'>
            <label>Salario al mes promedio</label>
            <TextInput
              value={salarioMensual}
              type='number'
              onChange={(e) => setSalarioMensual(e.target.value)}
            />
          </div>
          <div className='flex-1 flex flex-col justify-between'>
            <label>Años de trabajo</label>
            <TextInput
              value={tiempoTrabajo}
              type='number'
              onChange={(e) => setTiempoTrabajo(e.target.value)}
            />
          </div>
          <div className='flex-1 flex flex-col justify-between'>
            <label>Edad de jubilacion</label>
            <TextInput
              value={edadJubilacion}
              type='number'
              onChange={(e) => setEdadJubilacion(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            onClick={handlePension}
            icon={<CalculatorOutlined />}
          >
            Calcular
          </Button>
        </div>
      </section>
      {Number(jubilacion?.pensionMensualEstimado) > 0 && (
        <section className='flex flex-col gap-4'>
          <div className='text-xl'>
            <p>Jubilacion estimada</p>
            <div className='flex gap-2 items-center'>
              <p className='font-bold'>
                {formatSalary(Number(jubilacion?.pensionMensualEstimado))}
              </p>
              <p className='text-gray-500 text-sm'>
                {(
                  (Number(jubilacion?.pensionMensualEstimado) /
                    Number(salarioMensual)) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <p className='col-span-2 text-lg text-gray-500'>Desglose</p>
            <p>Cuotas</p>
            <p>{jubilacion?.cuotasTotales}</p>
            <span className='w-full h-[1px] border-b border-b-gray-300 col-span-2' />
            <p>Factor actuarial</p>
            <p>{jubilacion?.factorActuarial}</p>
            <span className='w-full h-[1px] border-b border-b-gray-300 col-span-2' />
            <p>Interés compuesto</p>
            <div className='flex items-center gap-2'>
              <p>{jubilacion?.tasaInteresCompuesto! * 100}% </p>
              <Popover
                title={'Interés compuesto'}
                content={
                  <p>
                    La tasa de interés compuesto es el porcentaje que se aplica
                    a un monto de dinero que ahorras o inviertes, pero no solo
                    sobre el monto original, sino también sobre los intereses
                    que ya has ganado.
                  </p>
                }
              >
                <InfoCircleOutlined />
              </Popover>
            </div>
            <span className='w-full h-[1px] border-b border-b-gray-300 col-span-2' />
            <p>Capitalización individual</p>
            <div className='flex items-center gap-2'>
              <p>{jubilacion?.tasaAporte! * 100}%</p>
              <Popover
                title='Capitalización individual'
                content={
                  <p>
                    La capitalización individual es la tasa de aporte personal
                    (9.75%) más la tasa de aporte de tu empleador (13.25% hasta
                    febrero de 2027) de los cuales una porción (3.75%) se suma
                    la capitalización individual, y el resto se reparte a otros
                    programas de la CSS.
                  </p>
                }
              >
                <InfoCircleOutlined size={16} />
              </Popover>
            </div>
            <span className='w-full h-[1px] border-b border-b-gray-300 col-span-2' />
            <p>Fondos acumulados</p>
            <p>{formatSalary(Number(jubilacion?.fondoTotal))}</p>
            <span className='w-full h-[1px] border-b border-b-gray-300 col-span-2' />
            <p>Jubilacion con garantia</p>
            <p className='font-bold'>
              {formatSalary(Number(jubilacion?.pensionFinalConGarantía))}
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

export default RetirementCalculator
