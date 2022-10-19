import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Input, Alert } from "@mantine/core";
import { IconAt, IconLock, IconAlertCircle } from "@tabler/icons";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";

const Registro = ({ setLogueo }) => {
  const { user, signup } = useAuth();

  const [mensajeError, setMensajeError] = useState("");

  const form = useForm({
    initialValues: {
      correo: "",
      clave: "",
      clave2: "",
    },
  });

  const botonIniciarSesion = () => {
    setLogueo(true);
  };

  const botonCrearCuenta = async () => {
    const correo = form.values["correo"];
    const clave = form.values["clave"];
    const clave2 = form.values["clave2"];

    if (correo === "") {
      setMensajeError("Por favor introduce un correo");
      return;
    }
    if (clave === "") {
      setMensajeError("Es necesario introducir una contraseña");
      return;
    }
    if (clave.length < 6) {
      setMensajeError("Contraseña debe tener por lo menos 6 caracteres");
      return;
    }
    if (clave2 !== clave) {
      setMensajeError("Las contraseñas introducidas no coinciden");
      return;
    }

    setMensajeError("");

    try {
      await signup(correo, clave);
      setLogueo(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMensajeError(
          "La dirección de correo electrónico que utilizas ya está asociada a una cuenta"
        );
      }
    }
  };

  return (
    <div className={styles.logueo}>
      <Image src="/assets/img/consultorio.png" width={400} height={600} />

      <div className={styles.formulario}>
        <h1 className={styles.titulo}>Crear Cuenta</h1>

        <form onSubmit={form.onSubmit(botonCrearCuenta)}>
          <TextInput
            withAsterisk
            icon={<IconAt />}
            label="Correo Electrónico"
            type="email"
            placeholder="tu@correo.com"
            {...form.getInputProps("correo")}
          />

          <TextInput
            withAsterisk
            icon={<IconLock />}
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            {...form.getInputProps("clave")}
          />

          <TextInput
            withAsterisk
            icon={<IconLock />}
            label="Introduce tu contraseña otra vez"
            type="password"
            placeholder="Escribe la misma contraseña"
            {...form.getInputProps("clave2")}
          />

          {mensajeError === "" ? null : (
            <Alert icon={<IconAlertCircle size={16} />} color="red" radius="xs">
              {mensajeError}
            </Alert>
          )}

          <Group position="center" mt="md">
            <Button type="submit">Crear Cuenta</Button>
          </Group>
        </form>

        <button onClick={botonIniciarSesion} className={styles.crear__cuenta}>
          ¿Ya tienes una cuenta? Inicia Sesión
        </button>
      </div>
    </div>
  );
};

export default Registro;
