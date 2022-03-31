import {Graph} from './graph'

const bouldersRatio = 0.2
const gravelRatio = 0.2
const wormholeRatio = 0.05

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const graphRandomFill = (graph: Graph) => {
  const range = graph.width * graph.height
  const bouldersAmount = Math.floor(range*bouldersRatio)
  const gravelsAmount = Math.floor(range*gravelRatio)
  const wormholeAmount = Math.ceil(range*wormholeRatio)

  const boulders = Array(bouldersAmount).fill(0).map(_ => randomBetween(1, range))
  const gravels = Array(gravelsAmount).fill(0).map(_ => randomBetween(1, range))
  const wormholes = Array(wormholeAmount).fill(0).map(_ => randomBetween(1, range))
  const start = randomBetween(1, range)
  let finish = randomBetween(1, range)
  while (start === finish && range > 1) {
    finish = randomBetween(1, range)
  }

  boulders.forEach(b => graph.setBoulder(`${b}`))
  gravels.forEach(g => graph.setGravel(`${g}`))
  wormholes.forEach(w => graph.setWormhole(`${w}`))
  graph.setStart(`${start}`)
  graph.setFinish(`${finish}`)
  return Object.create(graph)
}
