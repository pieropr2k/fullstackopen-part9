//const express = require('express');
import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

// Exercise 9.4
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// Exercise 9.5
app.get('/bmi', (req, res) => {
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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});