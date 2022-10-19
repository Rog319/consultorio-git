import React from "react";
import FormularioEnergia from "../../components/FormularioEnergia";
import Layout from "../../components/Layout";
import { useState } from "react";
import styles from "../../styles/Energia.module.css";
import { AuthContextProvider } from "../../context/AuthContext";

const Energia = () => {
  const [datosPersona, setDatosPersona] = useState(null);

  return (
    <AuthContextProvider>
      <Layout>
        <h1 className={`${styles.titulo} ${styles.negro}`}>
          ¿Qué es una caloría?
        </h1>
        <p className={styles.parrafo}>
          Las calorías miden la energía que nos proporciona un alimento o una
          bebida a partir de los carbohidratos, las grasas, las proteínas y el
          alcohol que contienen.
          <br />
          <br />
          Nuestro cuerpo hace uso de las calorías de los alimentos en diferentes
          procesos, tales como en la producción de calor o para almacenarlas en
          forma de grasa. Es decir, nuestro cuerpo usa cierta cantidad de
          calorías por día para darnos energía y, aquellas que no utiliza a lo
          largo del día, las almacena a través de la grasa.
          <br />
          <br />
          De manera general, la energía que gastamos a diario se distribuye de
          la siguiente forma: 60% de la energía la gastamos en procesos como la
          respiración y la circulación, un 30% en actividad física, y un 10% la
          utilizamos para la digestión y la absorción de nutrientes.
        </p>

        <h1 className={styles.titulo}>
          Calculadora de Energía (Gasto Total Diario de Energía)
        </h1>
        <FormularioEnergia setDatosPersona={setDatosPersona} />
      </Layout>
    </AuthContextProvider>
  );
};

export default Energia;
