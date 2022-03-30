import {Graph, Kind} from './graph'

it("should find correct cells", () => {
  const graph = new Graph(3,3)
  const cell = graph.getNeighbourByParentId("2")
  expect(cell[0].id).toBe("1")
  expect(cell[1].id).toBe("3")
  expect(cell[2].id).toBe("5")
  expect(cell[3]).toBeUndefined()
})

it("should find correct cells 2", () => {
  const graph = new Graph(3,3)
  const cell = graph.getNeighbourByParentId("5")
  expect(cell[0].id).toBe("4")
  expect(cell[1].id).toBe("6")
  expect(cell[2].id).toBe("2")
  expect(cell[3].id).toBe("8")
  expect(cell[4]).toBeUndefined()
})

it("should find correct cells 3", () => {
  const graph = new Graph(3,3)
  const cell = graph.getNeighbourByParentId("4")
  expect(cell[0].id).toBe("5")
  expect(cell[1].id).toBe("1")
  expect(cell[2].id).toBe("7")
  expect(cell[3]).toBeUndefined()
})
