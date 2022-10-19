import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import BotonCerrar from './BotonCerrar';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
} from '@mantine/core';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import {
  FaFire,
  FaCalculator,
  FaHandHoldingMedical,
  FaAppleAlt,
  FaTable,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAuth, AuthContextProvider } from '../context/AuthContext';

const Layout = ({ children, href, setUsuario }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [logueo, setLogueo] = useState(true);
  const [mensajeCuentaCreada, setMensajeCuentaCreada] = useState(null);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (user === null) {
    return (
      <AuthContextProvider>
        {logueo ? (
          <div>
            <Login
              setLogueo={setLogueo}
              mensajeCuentaCreada={mensajeCuentaCreada}
              setMensajeCuentaCreada={setMensajeCuentaCreada}
              setUsuario={setUsuario}
            />
          </div>
        ) : (
          <Registro
            setLogueo={setLogueo}
            setMensajeCuentaCreada={setMensajeCuentaCreada}
          />
        )}
      </AuthContextProvider>
    );
  }

  return (
    <AppShell
      padding='md'
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          width={{ sm: 300, lg: 300 }}
          p='m'
          hiddenBreakpoint='sm'
          hidden={!opened}
        >
          {
            <div className={styles.nav__opciones}>
              <Link href='/'>
                <div
                  className={
                    router.pathname === '/'
                      ? styles.nav__seleccionado
                      : styles.nav__opcion
                  }
                >
                  <BsFillHouseDoorFill className={styles.nav__icono} />
                  <h2>Inicio</h2>
                </div>
              </Link>

              <Link href='/bmi'>
                <div
                  className={
                    router.pathname === '/bmi'
                      ? styles.nav__seleccionado
                      : styles.nav__opcion
                  }
                >
                  <FaCalculator className={styles.nav__icono} />
                  <h2>IMC</h2>
                </div>
              </Link>

              <Link href='/energia'>
                <div
                  className={
                    router.pathname === '/energia'
                      ? styles.nav__seleccionado
                      : styles.nav__opcion
                  }
                >
                  <FaFire className={styles.nav__icono} />
                  <h2>Energía</h2>
                </div>
              </Link>

              <Link href='/dietosintetico'>
                <div
                  className={
                    router.pathname === '/dietosintetico'
                      ? styles.nav__seleccionado
                      : styles.nav__opcion
                  }
                >
                  <FaTable className={styles.nav__icono} />
                  <h2>Cuadro Dietosintetico</h2>
                </div>
              </Link>

              <Link href='/alimentos'>
                <div
                  className={
                    router.pathname === '/alimentos'
                      ? styles.nav__seleccionado
                      : styles.nav__opcion
                  }
                >
                  <FaAppleAlt className={styles.nav__icono} />
                  <h2>Alimentos</h2>
                </div>
              </Link>
              <Divider my='sm' />
              <BotonCerrar setUsuario={setUsuario} />
            </div>
          }
        </Navbar>
      }
      header={
        <Header height={70} p='md'>
          {
            <div className={styles.nav}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>
              <Link href='/'>
                <div className={styles.nav__header}>
                  <FaHandHoldingMedical className={styles.nav__header__icono} />
                  <h1>Consultorio</h1>
                </div>
              </Link>
            </div>
          }
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
