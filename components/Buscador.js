import React from 'react';
import { TextInput, Button, NumberInput, Group } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import styles from '../styles/Buscador.module.css';

const Buscador = ({ setTermino, titulo }) => {
  const form = useForm({
    initialValues: { termino: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      termino: (value) => (value === '' ? 'Introducir Termino' : null),
    },
  });

  const botonPresionado = function () {
    setTermino(form.values['termino']);
  };

  return (
    <div className={styles.buscador}>
      <h1 className={styles.titulo}>{titulo}</h1>
      <form onSubmit={form.onSubmit(botonPresionado)}>
        <TextInput
          mt='sm'
          size='xl'
          placeholder='Introducir nombre del alimento'
          {...form.getInputProps('termino')}
        />

        <Button
          className={styles.boton}
          type='submit'
          variant='outline'
          color='indigo'
          size='lg'
        >
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default Buscador;
