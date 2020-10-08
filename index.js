import estados from './cidades-estados-brasil-json/Estados.json';
import cidades from './cidades-estados-brasil-json/Cidades.json';
import { promises as fs } from 'fs';
// import fs from 'fs';
readUF('MG');

createState();
async function createState() {
  const estadosComCidades = [];
  for (let estado of estados) {
    estadosComCidades.push({
      ID: estado.ID,
      UF: estado.Sigla,
      Nome: estado.Nome,
      Cidades: [],
    });
  }

  try {
    estadosComCidades.map(async (estado) => {
      cidades.map((cidade) => {
        if (cidade.Estado === estado.ID) {
          estado.Cidades.push(cidade.Nome);
        }
      });
      await fs.writeFile(`./estados/${estado.UF}.json`, JSON.stringify(estado));
    });

    console.log('As cidades de maior nome são: ');
    estadosComCidades.map((estado) => {
      estado.Cidades.sort((a, b) => b.length - a.length);
      console.log(`\n ${estado.Cidades[0]} - ${estado.UF}`);
    });
  } catch (err) {
    console.log(err);
  }
  organizaTopCinco(estadosComCidades);
  organizaTopCincoMenores(estadosComCidades);
  cincoMenoresNomesDeCidades(estadosComCidades);
  maiorEntreTodasAsCidades(estadosComCidades);
  menorEntreTodasAsCidades(estadosComCidades);
}
// Lê o estado e retorna a quantidade de cidades

async function readUF(UF) {
  let rawData = await fs.readFile(`./estados/${UF}.json`);
  let estado = JSON.parse(rawData);
  console.log(`O estado ${UF}, tem: ${estado.Cidades.length} cidades`);
}

function cincoMenoresNomesDeCidades(estados) {
  console.log('As cidades de menor nome do Brasil são: \n');
  estados.map((estado) => {
    estado.Cidades.sort((a, b) => b - a);
  });

  estados.map((estado) => {
    console.log(`${estado.Cidades[estado.Cidades.length - 1]} - ${estado.UF}`);
  });
}

function organizaTopCinco(estados) {
  console.log('\nOs cinco estados com mais cidades são:\n');
  let decrescente = estados.sort((a, b) => b.Cidades.length - a.Cidades.length);
  for (let j = 0; j < 5; j++) {
    console.log(`${decrescente[j].UF} - ${decrescente[j].Cidades.length}`);
  }
  console.log('\n');

  let menores = organizaTopCincoMenores(decrescente);
  console.log('Os cinco estados com menos cidades são: \n');
  console.log(menores);
}

function organizaTopCincoMenores(estados) {
  let list = [];
  // descrescente = estados.sort((a, b) => b.Cidades.length - a.Cidades.length);
  for (let i = estados.length - 5; i < estados.length; i++) {
    list.push(estados[i]);
  }
  return list;
}

function maiorEntreTodasAsCidades(estados) {
  let list = [];
  estados.map((estado) => {
    list.push(`${estado.Cidades[0]} - ${estado.UF}`);
  });
  list.sort((a, b) => b.length - a.length);
  console.log('A cidade de maior nome do Brasil é ' + list[0]);
}

function menorEntreTodasAsCidades(estados) {
  let list = [];
  estados.map((estado) => {
    list.push(`${estado.Cidades[estado.Cidades.length - 1]} - ${estado.UF}`);
  });
  list.sort((a, b) => a.length - b.length);
  console.log('A cidade de menor nome do Brasil é ' + list[0]);
}
