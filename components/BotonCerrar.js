import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import styles from '../styles/BotonCerrar.module.css';

const BotonCerrar = () => {
  const { user, login, getUser, logout } = useAuth();

  const cerrarSesion = () => {
    logout();
  };

  return (
    <Button
      onClick={cerrarSesion}
      variant='outline'
      color='red'
      size='md'
      fullWidth
      className={styles.logout}
    >
      <IconLogout />
      Cerrar Sesión
    </Button>
  );
};

export default BotonCerrar;
