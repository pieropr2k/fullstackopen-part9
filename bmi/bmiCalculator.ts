interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArgumentsBMI = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

type Operation = 'Underweight' | 'Normal (healthy weight)' | 'Overweight (Pre-obese)' | 'Obese';

const calculateBmi = (height: number, weight: number) : Operation => {
  let bmi = weight/Math.pow(height/100, 2)
  //console.log(bmi)
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight (Pre-obese)';
  return 'Obese'
}

//console.log(calculateBmi(173, 58))
console.log(calculateBmi(180, 74))

try {
  const { value1, value2 } = parseArgumentsBMI(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}