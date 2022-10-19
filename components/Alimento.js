import React from 'react';
import { useState } from 'react';
import { Card, Text, Badge, Button, Group, Modal } from '@mantine/core';
import styles from '../styles/Alimento.module.css';

const Alimento = ({ alimento }) => {
  const [opened, setOpened] = useState(false);

  console.log(alimento['Categoría']);
  console.log(alimento['EnergíaKcal']);
  return (
    <div className={styles.alimento}>
      <Card className={styles.altura} shadow='sm' p='lg' radius='md' withBorder>
        <Card.Section></Card.Section>

        <Group position='apart' mt='md' mb='xs'>
          <Text className={styles.centrar} size='xl' weight={700}>
            {alimento['Alimento']}
          </Text>
        </Group>

        <Badge
          className={styles.margen}
          size='xl'
          color='green'
          variant='light'
        >
          {alimento['Categoría']}
        </Badge>

        <>
          <Modal
            className={styles.modal}
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <h3>{alimento['Alimento']}</h3>
            <p>Categoría: {alimento['Categoría']}</p>
            <p>Energía: {alimento['EnergíaKcal']} Kcal</p>
            <p>
              Porción: {alimento['Cantidad']} {alimento['Unidad']}
            </p>
            <p>Peso de Porción: {alimento['PesoNetoG']} G</p>
            <p>Carbohidtratos: {alimento['Carbohidratos']} G</p>
            <p>Lípidos: {alimento['Lípidos']} G</p>
            <p>Proteína: {alimento['Proteína']} G</p>
          </Modal>

          <Group position='center'>
            <Button onClick={() => setOpened(true)}>Open Modal</Button>
          </Group>
        </>
      </Card>
    </div>
  );
};

export default Alimento;
