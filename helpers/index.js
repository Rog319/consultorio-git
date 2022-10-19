export const bmiResultado = function (value) {
  if (value === 0) {
    return '';
  } else if (value < 18.5) {
    return 'Bajo Peso! Debes comer mas';
  } else if (value < 24.9) {
    return 'Peso Normal. No hay nada de que preocuparse';
  } else if (value < 29.9) {
    return 'Sobrepeso! Debes cuidar tu alimentacion';
  } else if (value < 34.9) {
    return 'Obesidad Grado I! Empieza a hacer cambios en tu estilo de vida';
  } else if (value < 39.9) {
    return 'Obesidad Grado II! Empieza a hacer cambios en tu estilo de vida';
  } else {
    return 'Obesidad Grado III! Cambios drasticos en estilo de vida necesarios';
  }
};

export const formatingValue = function (value) {
  if (value === 0) {
    return '';
  }
  return 'TU BMI: ' + value.toFixed(2);
};
