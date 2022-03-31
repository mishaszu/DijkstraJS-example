import {Graph} from './graph'

const bouldersRatio = 0.2
const gravelRatio = 0.2
const wormholeRatio = 0.025

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const graphRandomFill = (graph: Graph) => {
  const range = graph.width * graph.height
  const bouldersAmount = Math.floor(range*bouldersRatio)
  const gravelsAmount = Math.floor(range*gravelRatio)
  const wormholeAmount = Math.floor(range*wormholeRatio)

  const boulders = Array(bouldersAmount).fill(0).map(_ => randomBetween(1, range))
  const gravels = Array(gravelsAmount).fill(0).map(_ => randomBetween(1, range))
  const wormholesIn = Array(wormholeAmount).fill(0).map(_ => randomBetween(1, range))
  const wormholesOut = Array(wormholeAmount).fill(0).map(_ => randomBetween(1, range))
  const start = randomBetween(1, range)
  let finish = randomBetween(1, range)
  while (start === finish && range > 1) {
    finish = randomBetween(1, range)
  }

  boulders.forEach(b => graph.setBoulder(`${b}`))
  gravels.forEach(g => graph.setGravel(`${g}`))
  wormholesIn.forEach(w => graph.setWormholeEntrance(`${w}`))
  wormholesOut.forEach(w => graph.setWormholeExit(`${w}`))
  graph.setStart(`${start}`)
  graph.setFinish(`${finish}`)
  return Object.create(graph)
}
