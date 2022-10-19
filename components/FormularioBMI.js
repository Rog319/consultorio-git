import { AspectRatio, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/BMI.module.css';
import { bmiResultado, formatingValue } from '../helpers';

const FormularioBMI = () => {
  const [bmi, setBMI] = useState(0);

  const form = useForm({
    initialValues: { peso: null, altura: null },

    // functions will be used to validate values at corresponding key
    validate: {
      peso: (value) =>
        value > 300 || value < 5 ? 'Introducir un peso realista' : null,
      altura: (value) =>
        value > 3 || value < 0.3 ? 'Introducir una altura realista' : null,
    },
  });

  const calcularBmi = function () {
    const bmi =
      form.values['peso'] / (form.values['altura'] * form.values['altura']);
    setBMI(bmi);
  };

  return (
    <div className={styles.formElements}>
      <AspectRatio>
        <Image
          src='/assets/img/cual-es-tu-bmi.png'
          alt='Calcular tu BMI'
          width={500}
          height={300}
          className={styles.imgForm}
        />
      </AspectRatio>

      <form onSubmit={form.onSubmit(calcularBmi)}>
        <NumberInput
          mt='sm'
          label='Introduce tu peso'
          placeholder='Tu peso en Kg'
          precision={2}
          step={1}
          size={'xl'}
          {...form.getInputProps('peso')}
        />

        <NumberInput
          mt='sm'
          step={1}
          precision={2}
          size={'xl'}
          label='Introduce tu altura'
          placeholder='Tu altura en metros'
          {...form.getInputProps('altura')}
        />
        <div className={styles.centerForm}>
          <Button size={'lg'} type='submit' mt='sm' className={styles.button}>
            Calcular
          </Button>

          <p className={bmi === 0 ? '' : styles.valor}>{formatingValue(bmi)}</p>
          <p className={bmi === 0 ? '' : styles.resultado}>
            {' '}
            {bmiResultado(bmi)}{' '}
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormularioBMI;
