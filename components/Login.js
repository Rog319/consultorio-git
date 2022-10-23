import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Group,
  Input,
  Alert,
  Center,
  AspectRatio,
  Grid,
} from '@mantine/core';
import { IconAt, IconLock, IconAlertCircle } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import { useAuth } from '../context/AuthContext';

const Login = ({ setLogueo, mensajeCuentaCreada, setUsuario }) => {
  const { user, login, getUser } = useAuth();

  const [mensajeError, setMensajeError] = useState('');
  const router = useRouter();

  const form = useForm({
    initialValues: {
      correo: '',
      clave: '',
    },
  });

  const iniciarSesion = async () => {
    const correo = form.values['correo'];
    const clave = form.values['clave'];

    if (correo === '') {
      setMensajeError('Por favor introduce un correo');
      return;
    }
    if (clave === '') {
      setMensajeError('Por favor introduce una contraseña');
      return;
    }
    setMensajeError('');

    try {
      await login(correo, clave);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setMensajeError(
          'No pudimos encontrar una cuenta con el correo introducido'
        );
      }
      if (error.code === 'auth/wrong-password') {
        setMensajeError('Contraseña incorrecta');
      }
    }
  };

  const botonCrearCuenta = () => {
    setLogueo(false);
  };

  return (
    <Center>
      <div className={styles.logueo}>
        <div className={styles.formulario}>
          <AspectRatio>
            <Image src='/assets/img/consultorio.png' width={400} height={600} />
          </AspectRatio>
          <div className={styles.inputs}>
            <h1 className={styles.titulo}>Inicia Sesión</h1>

            <form onSubmit={form.onSubmit(iniciarSesion)}>
              <TextInput
                withAsterisk
                icon={<IconAt />}
                label='Correo Electrónico'
                type='email'
                placeholder='tu@correo.com'
                {...form.getInputProps('correo')}
              />

              <TextInput
                withAsterisk
                icon={<IconLock />}
                label='Contraseña'
                type='password'
                placeholder='Tu contraseña'
                {...form.getInputProps('clave')}
              />

              {mensajeError === '' ? null : (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  color='red'
                  radius='xs'
                >
                  {mensajeError}
                </Alert>
              )}

              <Group position='center' mt='md'>
                <Button type='submit'>Iniciar Sesión</Button>
              </Group>
            </form>

            <button onClick={botonCrearCuenta} className={styles.crear__cuenta}>
              ¿No tienes una cuenta? Registrate
            </button>
          </div>
        </div>
      </div>
    </Center>
  );
};

export default Login;
