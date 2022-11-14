//const express = require('express');
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json())
// Exercise 9.4
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// Exercise 9.5
app.get('/bmi', (req, res) => {
  //const { weight, height } = req.query
  const { weight, height } = Object.fromEntries(Object.entries(req.query).map(([k, v]) => [k, Number(v)]));

  return (weight && height)
    ? res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    })
    : res.json({
      error: "malformatted parameters"
    })
});

// Exercise 9.7
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  try {
    if (!target || !daily_exercises) {
      return res.status(400).send({ error: 'parameters missing' });
    }
    if (!Number.isFinite(target) || daily_exercises.findIndex((el: unknown) => !Number.isFinite(el)) != -1) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
    const result = calculateExercises(daily_exercises, target)
    return res.send(result);
  } catch (error) {
    //console.log(error)
    return res.send({ error: error.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});