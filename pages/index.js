import Layout from '../components/Layout';
import Login from '../components/Login';
import Registro from '../components/Registro';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import styles from '../styles/Inicio.module.css';

export default function Home() {
  const { user, login, getUser } = useAuth();
  const [logueo, setLogueo] = useState(true);
  const router = useRouter();

  if (user === null) {
    return (
      <AuthContextProvider>
        {logueo ? (
          <div>
            <Login setLogueo={setLogueo} />
          </div>
        ) : (
          <Registro setLogueo={setLogueo} />
        )}
      </AuthContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <Layout>
        <div className={styles.cuadros}>
          <Card
            className={styles.card}
            shadow='sm'
            p='lg'
            radius='md'
            withBorder
          >
            <Card.Section>
              <Image src='/assets/img/imc.png' height={160} alt='Norway' />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
              <Text size='xl' weight={500}>
                Calcula tu BMI
              </Text>
            </Group>

            <Text size='sm' color='dimmed' className={styles.resumen}>
              Es un número que se calcula con base en el peso y la estatura de
              la persona. Para la mayoría de las personas, y es un indicador
              para la salud.
            </Text>

            <Link href='/bmi'>
              <Button
                variant='light'
                color='blue'
                fullWidth
                mt='md'
                radius='md'
              >
                Calcula tu BMI ahora
              </Button>
            </Link>
          </Card>

          <Card
            className={styles.card}
            shadow='sm'
            p='lg'
            radius='md'
            withBorder
          >
            <Card.Section>
              <Image
                src='/assets/img/caloriascard.png'
                height={160}
                alt='Norway'
              />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
              <Text size='xl' weight={500}>
                Conoce cuántas calorias necesitas
              </Text>
            </Group>

            <Text size='sm' color='dimmed' className={styles.resumen}>
              Las calorías son la energía que se encuentra en los alimentos. El
              cuerpo tiene una demanda constante de energía y utiliza las
              calorías de los alimentos para seguir funcionando.
            </Text>

            <Link href='/energia'>
              <Button
                variant='light'
                color='blue'
                fullWidth
                mt='md'
                radius='md'
              >
                Calcula la cantidad de calorías que necesitas
              </Button>
            </Link>
          </Card>

          <Card
            className={styles.card}
            shadow='sm'
            p='lg'
            radius='md'
            withBorder
          >
            <Card.Section>
              <Image
                src='/assets/img/muchacomida.png'
                height={160}
                alt='Norway'
              />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
              <Text size='xl' weight={500}>
                Cuadro Dietosintético
              </Text>
            </Group>

            <Text size='sm' color='dimmed' className={styles.resumen}>
              Se refiere a la distribución nutrimental que corresponde a los
              porcentajes de macronutrientes determinados por las necesidades
              calóricas del paciente, así como las características de la dieta.
            </Text>

            <Link href='/dietosintetico'>
              <Button
                variant='light'
                color='blue'
                fullWidth
                mt='md'
                radius='md'
              >
                Genera tu Cuadro Dietosintético
              </Button>
            </Link>
          </Card>

          <Card
            className={styles.card}
            shadow='sm'
            p='lg'
            radius='md'
            withBorder
          >
            <Card.Section>
              <Image
                src='/assets/img/platillos.png'
                height={160}
                alt='Norway'
              />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
              <Text size='xl' weight={500}>
                Muchos Alimentos
              </Text>
            </Group>

            <Text size='sm' color='dimmed' className={styles.resumen}>
              Busca cualquier alimento para conocer su información nutricional.
            </Text>

            <Link href='/alimentos'>
              <Button
                variant='light'
                color='blue'
                fullWidth
                mt='md'
                radius='md'
              >
                Buscar Alimentos
              </Button>
            </Link>
          </Card>
        </div>
      </Layout>
    </AuthContextProvider>
  );
}
