import Layout from '../../components/Layout';
import FormularioBMI from '../../components/FormularioBMI';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/BMI.module.css';
import { AuthContextProvider } from '../../context/AuthContext';
import { AspectRatio, Paper } from '@mantine/core';

const Bmi = () => {
  return (
    <AuthContextProvider>
      <Layout className={styles.bmi}>
        <h1 className={`${styles.titulo} ${styles.negro}`}>
          Acerca del índice de masa corporal para adultos
        </h1>

        <div className={styles.contenido}>
          <div className={styles.information}>
            <AspectRatio>
              <Image
                className={styles.imagen}
                src='/assets/img/pesando-pesa.png'
                alt='Calcular tu BMI'
                width={400}
                height={300}
              />
            </AspectRatio>

            <p className={styles.parrafo}>
              El índice de masa corporal (IMC) es el peso de una persona en
              kilogramos dividido por el cuadrado de la estatura en metros. El
              IMC es un método de evaluación fácil y económico para la categoría
              de peso: bajo peso, peso saludable, sobrepeso, y obesidad.
              <br /> <br />
              El IMC no mide la grasa corporal directamente, pero el IMC se
              correlaciona moderadamente con medidas más directas de la grasa
              corporal. Además, el IMC parece estar tan fuertemente
              correlacionado con diversos resultados metabólicos y de
              enfermedades como lo están estas medidas más directas de la grasa
              corporal.
            </p>
          </div>
          <h1 className={styles.titulo}>Calculadora de IMC</h1>
          <Paper shadow='xl' p='md' className={styles.formulario}>
            <FormularioBMI />
          </Paper>
        </div>
      </Layout>
    </AuthContextProvider>
  );
};

export default Bmi;
