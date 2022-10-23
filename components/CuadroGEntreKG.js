import React from 'react';
import { useState } from 'react';
import { Button, NumberInput, Alert } from '@mantine/core';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from '../styles/CuadroDietosintetico.module.css';

const CuadroGEntreKG = ({ datosPersona }) => {
  const [proteinaGEntreKG, setProteinaGEntreKG] = useState(0);
  const [lipidosGEntreKG, setLipidosGEntreKG] = useState(0);
  const [mensajeError, setMensajeError] = useState(null);

  const [proteinas, setProteinas] = useState({
    porcentaje: '-',
    kcal: '-',
    g: '-',
    'g/kg': '-',
  });

  const [lipidos, setLipidos] = useState({
    porcentaje: '-',
    kcal: '-',
    g: '-',
    'g/kg': '-',
  });

  const [carbohidratos, setCarbohidratos] = useState({
    porcentaje: '-',
    kcal: '-',
    g: '-',
    'g/kg': '-',
  });

  const [total, setTotal] = useState({
    porcentaje: '100',
    kcal: datosPersona['get'],
    g: '-',
    'g/kg': '-',
  });

  const borrarDatos = () => {
    setProteinas({
      porcentaje: '-',
      kcal: '-',
      g: '-',
      'g/kg': '-',
    });
    setLipidos({
      porcentaje: '-',
      kcal: '-',
      g: '-',
      'g/kg': '-',
    });
    setCarbohidratos({
      porcentaje: '-',
      kcal: '-',
      g: '-',
      'g/kg': '-',
    });
    setTotal({
      porcentaje: '100',
      kcal: datosPersona['get'],
      g: '-',
      'g/kg': '-',
    });
    setMensajeError(null);
  };

  const generarDatos = () => {
    setMensajeError(null);
    const proteinaG = proteinaGEntreKG * datosPersona['peso'];
    const lipidosG = lipidosGEntreKG * datosPersona['peso'];

    const proteinaKcal = proteinaG * 4;
    const lipidosKcal = lipidosG * 9;
    if (proteinaKcal + lipidosKcal > datosPersona['get']) {
      setMensajeError('Numeros introducidos generan datos incoherentes');
      return;
    }

    const proteinaPorcentaje = (proteinaKcal * 100) / datosPersona['get'];
    const lipidosPorcentaje = (lipidosKcal * 100) / datosPersona['get'];
    if (
      proteinaPorcentaje + lipidosPorcentaje < 0 ||
      proteinaPorcentaje + lipidosPorcentaje > 100
    ) {
      setMensajeError('Numeros introducidos generan datos incoherentes');
      return;
    }

    const carbohidratosPorcentaje =
      100 - proteinaPorcentaje - lipidosPorcentaje;
    const carbohidratosKcal =
      (datosPersona['get'] * carbohidratosPorcentaje) / 100;
    const carbohidratosG = carbohidratosKcal / 4;
    const carbohidratosGEntreKG = carbohidratosG / datosPersona['peso'];

    const totalG = proteinaG + lipidosG + carbohidratosG;
    const totalGEntreKG =
      proteinaGEntreKG + lipidosGEntreKG + carbohidratosGEntreKG;

    setProteinas({
      porcentaje: parseFloat(proteinaPorcentaje).toFixed(2),
      kcal: parseFloat(proteinaKcal).toFixed(2),
      g: parseFloat(proteinaG).toFixed(2),
      'g/kg': parseFloat(proteinaGEntreKG).toFixed(2),
    });

    setLipidos({
      porcentaje: parseFloat(lipidosPorcentaje).toFixed(2),
      kcal: parseFloat(lipidosKcal).toFixed(2),
      g: parseFloat(lipidosG).toFixed(2),
      'g/kg': parseFloat(lipidosGEntreKG).toFixed(2),
    });

    setCarbohidratos({
      porcentaje: parseFloat(carbohidratosPorcentaje).toFixed(2),
      kcal: parseFloat(carbohidratosKcal).toFixed(2),
      g: parseFloat(carbohidratosG).toFixed(2),
      'g/kg': parseFloat(carbohidratosGEntreKG).toFixed(2),
    });

    setTotal({
      porcentaje: '100',
      kcal: datosPersona['get'],
      g: parseFloat(totalG).toFixed(2),
      'g/kg': parseFloat(totalGEntreKG).toFixed(2),
    });
  };

  return (
    <div>
      <h3>Rellenar Datos</h3>

      {mensajeError === null ? null : (
        <Alert
          icon={<FaExclamationTriangle size={16} />}
          title='Error!'
          color='red'
          radius='xs'
          variant='filled'
        >
          {mensajeError}
        </Alert>
      )}

      <div className={styles.cuadro}>
        <div className={styles.cuadro__opcion}></div>
        <div className={styles.cuadro__opcion}>Proteina</div>
        <div className={styles.cuadro__opcion}>Lípidos</div>
        <div className={styles.cuadro__opcion}>Carbohidratos</div>
        <div className={styles.cuadro__opcion}>Total</div>
        <div className={styles.cuadro__opcion}>%</div>
        <div className={styles.cuadro__opcion}>{proteinas['porcentaje']}</div>
        <div className={styles.cuadro__opcion}>{lipidos['porcentaje']}</div>
        <div className={styles.cuadro__opcion}>
          {carbohidratos['porcentaje']}
        </div>
        <div className={styles.cuadro__opcion}>{total['porcentaje']}</div>
        <div className={styles.cuadro__opcion}>kcal</div>
        <div className={styles.cuadro__opcion}>{proteinas['kcal']}</div>
        <div className={styles.cuadro__opcion}>{lipidos['kcal']}</div>
        <div className={styles.cuadro__opcion}>{carbohidratos['kcal']}</div>
        <div className={styles.cuadro__opcion}>{total['kcal']}</div>
        <div className={styles.cuadro__opcion}>g</div>
        <div className={styles.cuadro__opcion}>{proteinas['g']}</div>
        <div className={styles.cuadro__opcion}>{lipidos['g']}</div>
        <div className={styles.cuadro__opcion}>{carbohidratos['g']}</div>
        <div className={styles.cuadro__opcion}>{total['g']}</div>
        <div className={styles.cuadro__opcion}>g/kg</div>
        <NumberInput
          precision={2}
          step={0.1}
          min={0}
          max={100}
          className={styles.cuadro__opcion}
          value={proteinaGEntreKG}
          onChange={(val) => setProteinaGEntreKG(val)}
        />
        <NumberInput
          min={0}
          precision={2}
          step={0.1}
          max={100}
          className={styles.cuadro__opcion}
          value={lipidosGEntreKG}
          onChange={(val) => setLipidosGEntreKG(val)}
        />
        <div className={styles.cuadro__opcion}>{carbohidratos['g/kg']}</div>
        <div className={styles.cuadro__opcion}>{total['g/kg']}</div>
      </div>

      <Button onClick={generarDatos} className={styles.boton}>
        Generar Datos
      </Button>

      <Button onClick={borrarDatos} color='red' className={styles.boton}>
        Borrar Datos
      </Button>
    </div>
  );
};

export default CuadroGEntreKG;
