import React from 'react';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Alimento from '../../components/Alimento';
import Buscador from '../../components/Buscador';
import Image from 'next/image';
import styles from '../../styles/Alimento.module.css';
import { AuthContextProvider } from '../../context/AuthContext';
import { AspectRatio, SimpleGrid } from '@mantine/core';

const Alimentos = () => {
  let termino = '';
  const [alimentosFiltrados, setAlimentosFiltrados] = useState([]);

  const obtenerTermino = async function (valor) {
    termino = valor;

    const entradas = await obtenerEntradas();

    setAlimentosFiltrados(
      entradas.filter((alimento) =>
        alimento.Alimento.toLowerCase().includes(termino.toLowerCase())
      )
    );
  };

  const obtenerEntradas = async function () {
    const res = await fetch(
      `https://recetas-db-default-rtdb.firebaseio.com/SMAE.json`
    );

    const entradas = await res.json();

    return entradas;
  };

  return (
    <AuthContextProvider>
      <Layout>
        <div>
          <h1 className={`${styles.titulo} ${styles.negro}`}>
            Buscador de alimentos
          </h1>

          <div className={styles.contenido}>
            <AspectRatio>
              <Image
                className={styles.imagen}
                src='/assets/img/comida.png'
                height={220}
                width={350}
              />
            </AspectRatio>
            <p className={styles.parrafo}>
              En esta sección de la página puedes buscar alimentos. En el
              buscador introduce un término, puede ser un ingrediente o el
              nombre de un platillo. Después se te presentará los resultados
              obtenidos y podrás ver más información en los alimentos que te
              interesen.
            </p>
          </div>

          {/* <h1 className={styles.titulo}>Busqueda de Alimentos</h1> */}
          <Buscador setTermino={obtenerTermino} />

          <main>
            <div className={styles.listaAlimentos}>
              {alimentosFiltrados.map((alimento, i) => (
                <Alimento key={i} alimento={alimento} />
              ))}
            </div>
          </main>
        </div>
      </Layout>
    </AuthContextProvider>
  );
};

export default Alimentos;
