import React from "react";
import { Button, Card, Image, Text, Badge, Group } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import CuadroPorcentaje from "./CuadroPorcentaje";
import styles from "../styles/CuadroDietosintetico.module.css";
import CuadroGEntreKG from "./CuadroGEntreKG";

const CuadroDietosintetico = ({ datosPersona, resetearDatos }) => {
  const [opcionElegido, setOpcionElegido] = useState(null);
  const [value, setValue] = useState(0);

  const porcentajeSeleccionado = () => setOpcionElegido("porcentaje");
  const gEntreKGSeleccionado = () => setOpcionElegido("gEntreKG");

  const datosDePersona = () => {
    return (
      <div className={styles.datos}>
        <Card shadow="sm" p="lg" radius="md" withBorder className={styles.card}>
          <Card.Section>
            <Image src="/assets/img/mis-datos.png" height={170} alt="imagen" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text size="xl" align="center" weight={700}>
              Tus Datos
            </Text>
          </Group>
          <Text size="lg">• Peso: {datosPersona["peso"]} KG</Text>
          <Text size="lg">• Altura: {datosPersona["altura"] / 100} M</Text>
          <Text size="lg">• Edad: {datosPersona["edad"]} Años</Text>
          <Text size="lg">
            • Sexo:{" "}
            {datosPersona["sexo"].charAt(0).toUpperCase() +
              datosPersona["sexo"].slice(1)}
          </Text>
          <Text size="lg">
            • Actividad:{" "}
            {datosPersona["actividad"].charAt(0).toUpperCase() +
              datosPersona["actividad"].slice(1)}
          </Text>
          <Text size="lg">• Calorias: {datosPersona["get"]} kcal x dia</Text>

          <Button
            onClick={resetearDatos}
            variant="light"
            color="red"
            fullWidth
            mt="md"
            radius="md"
          >
            Cambiar Datos
          </Button>
        </Card>
      </div>
    );
  };

  if (opcionElegido === null) {
    return (
      <div className={styles.centrar}>
        {datosDePersona()}
        <h2>Seleccionar cómo generar la tabla</h2>

        <div className={styles.botones}>
          <Button
            className={styles.boton}
            size="md"
            onClick={porcentajeSeleccionado}
          >
            Utilizando porcentajes %
          </Button>
          <Button
            className={styles.boton}
            size="md"
            onClick={gEntreKGSeleccionado}
          >
            Utilizando gramo entre kilogramo g/kg
          </Button>
        </div>
      </div>
    );
  } else if (opcionElegido === "porcentaje") {
    return (
      <div className={styles.centrar}>
        {datosDePersona()}
        <div className={styles.botones}>
          <Button size="md" onClick={gEntreKGSeleccionado}>
            Cambiar a g/kg
          </Button>
        </div>
        <CuadroPorcentaje
          className={styles.margen}
          datosPersona={datosPersona}
        />
      </div>
    );
  } else if (opcionElegido === "gEntreKG") {
    return (
      <div className={styles.centrar}>
        {datosDePersona()}
        <div className={styles.botones}>
          <Button size="md" onClick={porcentajeSeleccionado}>
            Cambiar a porcentajes %
          </Button>
        </div>
        <CuadroGEntreKG datosPersona={datosPersona} />
      </div>
    );
  }
};

export default CuadroDietosintetico;
