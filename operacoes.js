const router = require("express").Router();

// Rota para calcular o somatório
router.get("/somatorio", async function (req, res) {
  const { inicio, fim } = req.query;

  if (!inicio) {
    return res.json({ "erro": "Parâmetro 'inicio' é obrigatório" });
  }

  if (!fim) {
    return res.json({ "erro": "Parâmetro 'fim' é obrigatório" });
  }

  const numInicio = parseInt(inicio);
  const numFim = parseInt(fim);

  if (isNaN(numInicio)) {
    return res.json({ "erro": "Parâmetro 'inicio' precisa ser um número" });
  }

  if (isNaN(numFim)) {
    return res.json({ "erro": "Parâmetro 'fim' precisa ser um número" });
  }

  if (numInicio > numFim) {
    return res.json({ "erro": "O valor de 'inicio' não pode ser maior que 'fim'" });
  }

  let resultado = 0;
  for (let i = numInicio; i <= numFim; i++) {
    resultado += i;
  }

  return res.json({ resultado });
});

// Rota para calcular o fatorial
router.get("/fatorial", async function (req, res) {
  const { numero } = req.query;

  if (!numero) {
    return res.json({ "erro": "Parâmetro 'numero' é obrigatório" });
  }

  const num = parseInt(numero);

  if (isNaN(num)) {
    return res.json({ "erro": "Parâmetro 'numero' precisa ser um número" });
  }

  if (num < 0) {
    return res.json({ "erro": "O valor de 'numero' não pode ser negativo" });
  }

  let resultado = 1;
  for (let i = 2; i <= num; i++) {
    resultado *= i;
  }

  return res.json({ resultado });
});

// Rota para calcular a média
router.get("/media", async function (req, res) {
  const { numeros } = req.query;

  if (!numeros) {
    return res.json({ "erro": "Parâmetro 'numeros' é obrigatório" });
  }

  const numerosArray = numeros.split(',').map(Number);

  if (numerosArray.some(isNaN) || !/^[0-9.,]+$/.test(numeros)) {
    return res.json({ "erro": "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }

  const soma = numerosArray.reduce((acc, curr) => acc + curr, 0);
  const resultado = soma / numerosArray.length;

  return res.json({ resultado });
});

router.get("/primo", async function (req, res) {
  const { numero } = req.query;

  if (!numero) {
    return res.json({ "erro": "Parâmetro 'numero' é obrigatório" });
  }

  const num = parseInt(numero);

  if (isNaN(num) || !Number.isInteger(parseFloat(numero))) {
    return res.json({ "erro": "Informe um número inteiro" });
  }

  if (num < 2) {
    return res.json({ "erro": "Informe um número inteiro igual ou maior que 2" });
  }

  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  return res.json({ resultado: isPrime });
});

// Exporta o router para ser usado no servidor principal
module.exports = router;


