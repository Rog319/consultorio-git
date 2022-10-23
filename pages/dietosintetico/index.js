import React from 'react';
import { useState } from 'react';
import FormularioEnergia from '../../components/FormularioEnergia';
import CuadroDietosintetico from '../../components/CuadroDietosintetico';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AspectRatio, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import Layout from '../../components/Layout';
import styles from '../../styles/CuadroDietosintetico.module.css';
import { AuthContextProvider } from '../../context/AuthContext';

const Dietosintetico = () => {
  const [datosPersona, setDatosPersona] = useState(null);

  const resetearDatos = () => setDatosPersona(null);

  const informacionCuadro = () => {
    return (
      <div>
        <AuthContextProvider>
          <h1 className={`${styles.titulo}`}>Cuadro Dietosintético</h1>

          <div className={styles.contenido}>
            <AspectRatio>
              <Image
                className={styles.imagen}
                src='/assets/img/banner-comida.png'
                alt='banner-comida'
                width={500}
                height={400}
              />
            </AspectRatio>

            <p className={styles.parrafo}>
              Por definición, el cuadro dietosintético se refiere a la
              distribución nutrimental que corresponde a los porcentajes de
              macronutrientes determinados por las necesidades calóricas del
              paciente, así como las características de la dieta.
              <br /> <br />
              La distribución puede ser elaborada en base a porcentajes
              estándares establecidos o a un cálculo de gramos de
              macronutrientes considerando el peso actual del paciente.
              <br /> <br />
              Los porcentajes normales ó estándar para adulto promedio son
              hidratos de carbono (55-65%), proteínas (10-15%) y lípidos
              (25-30%) de las kcal estimadas para ese paciente.
              <br />
              <br />
              Los gramos normales o estándar dependerán del peso del paciente,
              el cálculo de los gramos de proteínas en la dieta es el de mayor
              relevancia ya que en diversas condiciones tanto patológicas como
              de mejora de composición corporal es muy utilizado; la
              recomendación en adultos normopeso y con condiciones óptimas de
              salud es de 0.8 a 1 gramos de proteína por kilogramo peso corporal
              al día.
            </p>
          </div>
        </AuthContextProvider>
      </div>
    );
  };

  if (datosPersona === null) {
    return (
      <AuthContextProvider>
        <Layout>
          {informacionCuadro()}
          <h1 className={styles.titulo2}>
            Calculadora de Energía (Gasto Total Diario de Energía)
          </h1>
          <FormularioEnergia
            setDatosPersona={setDatosPersona}
            resetearDatos={resetearDatos}
          />
        </Layout>
      </AuthContextProvider>
    );
  } else {
    return (
      <AuthContextProvider>
        <Layout>
          <div>
            <h1 className={styles.titulo}>Generar tu Cuadro Dietosintético</h1>
            <CuadroDietosintetico
              datosPersona={datosPersona}
              resetearDatos={resetearDatos}
            />
          </div>
        </Layout>
      </AuthContextProvider>
    );
  }
};

export default Dietosintetico;
