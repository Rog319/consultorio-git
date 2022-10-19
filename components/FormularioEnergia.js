import {
  Button,
  NumberInput,
  Select,
  Chip,
  Notification,
  Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import Image from 'next/image';
import styles from '../styles/Energia.module.css';

const FormularioEnergia = ({ setDatosPersona }) => {
  const [calorias, setCalorias] = useState(0);
  const [mensajeError, setMensajeError] = useState('');

  const form = useForm({
    initialValues: {
      peso: null,
      altura: null,
      edad: null,
      sexo: null,
      actividad: null,
      formula: null,
    },
  });

  const calcularEnergia = function () {
    const peso = form.values['peso'];
    const altura = form.values['altura'];
    const edad = form.values['edad'];
    const sexo = form.values['sexo'];
    const actividad = form.values['actividad'];
    const formula = form.values['formula'];

    if (
      peso === null ||
      altura === null ||
      edad === null ||
      sexo === null ||
      actividad === null ||
      formula === null
    ) {
      setMensajeError('Rellenar todos los campos');
      return;
    }
    setMensajeError('');

    let actividadValor;
    switch (actividad) {
      case 'Sedentario':
        actividadValor = 1.2;
        break;

      case 'Ligero':
        actividadValor = 1.3;
        break;

      case 'Moderado':
        actividadValor = 1.5;
        break;

      case 'Activo':
        actividadValor = 1.7;
        break;

      case 'Vigoroso':
        actividadValor = 1.9;
        break;
    }

    let GEB;

    if (sexo === 'masculino') {
      if (formula === 'harris') {
        GEB = 66.5 + 13.75 * peso + 5 * altura - 6.78 * edad;
      } else if (formula === 'oms') {
        GEB = 11.3 * peso + (16 * altura) / 100 + 901;
      } else if (formula === 'owen') {
        GEB = 879 + 10.2 * peso;
      } else if (formula === 'valencia') {
        if (edad > 17 && edad < 30) {
          GEB = 13.37 * peso + 747;
        } else if (edad < 60) {
          GEB = 13.08 * peso + 693;
        } else {
          GEB = 14.21 * peso + 429;
        }
      } else {
        GEB = 10 * peso + 6.25 * altura - 5 * edad + 5;
      }
    } else {
      if (formula === 'harris') {
        GEB = 655.1 + 9.56 * peso + 1.85 * altura - 4.68 * edad;
      } else if (formula === 'oms') {
        GEB = 8.7 * peso - (25 * altura) / 100 + 865;
      } else if (formula === 'owen') {
        GEB = 795 + 7.18 * peso;
      } else if (formula === 'valencia') {
        if (edad > 17 && edad < 30) {
          GEB = 11.02 * peso + 679;
        } else if (edad < 60) {
          GEB = 10.92 * peso + 677;
        } else {
          GEB = 10.98 * peso + 520;
        }
      } else {
        GEB = 10 * peso + 6.25 * altura - 5 * edad - 161;
      }
    }

    let GET;
    if (formula === 'harris') {
      const FA = GEB * actividadValor;
      const TER = GEB * 0.1;
      GET = FA + TER;
    } else {
      GET = GEB * actividadValor;
    }

    setCalorias(GET.toFixed(2));

    setDatosPersona({
      peso: peso,
      altura: altura,
      edad: edad,
      sexo: sexo,
      actividad: actividad,
      get: GET.toFixed(2),
    });
  };

  return (
    <div className={styles.formulario}>
      <Paper shadow='xl' radius='md' p='md'>
        <Image
          src='/assets/img/calorias.png'
          alt='Calcular tu BMI'
          width={500}
          height={300}
          priority
        />
        <form onSubmit={form.onSubmit(calcularEnergia)}>
          <h2 className={styles.label}>Introduce tu peso</h2>
          <NumberInput
            mt='sm'
            size='xl'
            placeholder='Tu peso en Kg'
            step={1}
            {...form.getInputProps('peso')}
          />

          <h2 className={styles.label}>Introduce tu altura</h2>
          <NumberInput
            mt='sm'
            step={1}
            size='xl'
            placeholder='Tu altura en cm'
            {...form.getInputProps('altura')}
          />

          <h2 className={styles.label}>Introduce tu edad</h2>
          <NumberInput
            mt='sm'
            step={1}
            size='xl'
            placeholder='Tu edad'
            {...form.getInputProps('edad')}
          />

          <h2 className={styles.label}>Selecciona tu sexo</h2>
          <Select
            placeholder='Seleccionar...'
            size='xl'
            data={[
              { value: 'masculino', label: 'Masculino' },
              { value: 'femenina', label: 'Femenina' },
            ]}
            {...form.getInputProps('sexo')}
          />

          <h2 className={styles.label}>Seleccionar Actividad</h2>
          <Chip.Group
            className={styles.chips}
            position='center'
            {...form.getInputProps('actividad')}
          >
            <Chip size='lg' value='Sedentario'>
              Sedentario
            </Chip>
            <Chip size='lg' value='Ligero'>
              Ligero
            </Chip>
            <Chip size='lg' value='Moderado'>
              Moderado
            </Chip>
            <Chip size='lg' value='Activo'>
              Activo
            </Chip>
            <Chip size='lg' value='Vigoroso'>
              Vigoroso
            </Chip>
          </Chip.Group>

          <h2 className={styles.label}>Seleccionar Formula</h2>
          <Chip.Group
            className={styles.chips}
            position='center'
            {...form.getInputProps('formula')}
          >
            <Chip size='lg' value='harris'>
              Harris-Benedict
            </Chip>
            <Chip size='lg' value='oms'>
              OMS
            </Chip>
            <Chip size='lg' value='owen'>
              Owen
            </Chip>
            <Chip size='lg' value='valencia'>
              Valencia
            </Chip>
            <Chip size='lg' value='mifflin'>
              Mifflin ST-Jeor
            </Chip>
          </Chip.Group>

          <Button size={'lg'} type='submit' mt='sm' className={styles.boton}>
            Calcular
          </Button>

          {calorias === 0 ? null : (
            <p className={styles.resultado}>
              Gasto Total Diario de Energía: {calorias} kcal x dia
            </p>
          )}

          {calorias === 0 ? null : (
            <Notification
              icon={<IconCheck size={18} />}
              disallowClose
              color='teal'
              title='Datos Actualizados'
            >
              Se han actualizado los datos de tu pérfil
            </Notification>
          )}

          {mensajeError === '' ? null : (
            <Notification
              className={styles.notificacion}
              title='Error'
              icon={<IconX size={22} />}
              color='red'
              disallowClose
            >
              Rellenar todos los campos
            </Notification>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default FormularioEnergia;
