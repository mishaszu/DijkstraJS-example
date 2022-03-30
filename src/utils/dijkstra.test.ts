import {Graph} from './graph'
import {dijkstra} from './dijkstra'

it("Basic 3x3 scenario", async () => {
  const graph = new Graph(3, 3);
  graph.setStart("3")
  graph.setFinish("9")
  const result = await dijkstra(graph)
  expect(result.path).toHaveLength(3)
  expect(result.path).toEqual(["3", "6", "9"])
  expect(result.distance).toBe(2)
})

it("Basic 4x4 scenario", async () => {
  const graph = new Graph(4, 4);
  graph.setStart("2")
  graph.setFinish("14")
  const result = await dijkstra(graph)
  expect(result.path).toHaveLength(4)
  expect(result.path).toEqual(["2", "6", "10", "14"])
  expect(result.distance).toBe(3)
})

it("Basic 4x4 scenario 2", async () => {
  const graph = new Graph(4, 4);
  graph.setStart("2")
  graph.setFinish("15")
  const result = await dijkstra(graph)
  expect(result.path).toHaveLength(5)
  expect(result.distance).toBe(4)
})

it("Boulder 3x3 scenario", async () => {
  const graph = new Graph(3, 3);
  graph.setStart("2")
  graph.setFinish("8")
  graph.setBoulder("5")
  const result = await dijkstra(graph)
  expect(result.path).toHaveLength(5)
  expect(result.distance).toBe(4)
})

it("No pass 3x3", async () => {
  const graph = new Graph(3, 3);
  graph.setStart("2")
  graph.setFinish("8")
  graph.setBoulder("4")
  graph.setBoulder("5")
  graph.setBoulder("6")
  const result = await dijkstra(graph)
  expect(result.path).toBe(null)
  expect(result.distance).toBe(Infinity)
})

it("Gravel 3x3 scenario", async () => {
  const graph = new Graph(3, 3);
  graph.setStart("2")
  graph.setFinish("8")
  graph.setGravel("5")
  const result = await dijkstra(graph)
  expect(result.path).toHaveLength(3)
  expect(result.distance).toBe(3)
})
