interface ParsedValues {
  avg: number;
  arr: Array<number>;
}

const parseArguments = (args: Array<string>): ParsedValues => {
  if (args.length <= 3) throw new Error('Not enough arguments');

  const arr = args.slice(3,process.argv.length).map(el=>Number(el));

  if (!isNaN(Number(args[2])) && !arr.includes(NaN) ) {
    return {
      avg: Number(args[2]),
      arr
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const getRatingInfo = (exercisesHoursAmount: number): Rating => {
  if (exercisesHoursAmount < 1.5) {
    return {
      rating: 1,
      ratingDescription: 'you should improve your concentration'
    }
  } else if (exercisesHoursAmount < 3) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better'
    }
  } else {
    return {
      rating: 3,
      ratingDescription: 'you are so productive, keep it up!'
    }
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string,
  target: number;
  average: number;
}

export const calculateExercises = (exerciseHoursPerDay: Array<number>, targetAmount: number): Result => {
  let average: number = exerciseHoursPerDay.reduce((a, b) => a + b, 0)/exerciseHoursPerDay.length
  //console.log(exerciseHoursPerDay.filter(el=>el!=0))
  const { rating, ratingDescription } = getRatingInfo(average)
  return {
    periodLength: exerciseHoursPerDay.length,
    trainingDays: exerciseHoursPerDay.filter(el => el!=0).length,
    success: targetAmount === average,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));

try {
  const { avg, arr } = parseArguments(process.argv);
  console.log(calculateExercises(arr, avg));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}