import {Graph} from './graph'

// [1 2 3]
// [4 5 6]
// [7 8 9]

type Costs = {
  [key: string]: number
}
type Processed = string[]

const lowestCostNode = (costs: Costs, processed: Processed) =>
  Object
    .keys(costs)
    .reduce((lowest, node) => {
      if (lowest === null || costs[Number(node)] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null as string | null);

export const dijkstra = async (graph: Graph) => {
  const start = graph.cells.find(c => c.isStart)
  const finish = graph.cells.find(c => c.isFinish)
  if (start === undefined) {
    throw new Error("Start node not specified")
  }
  if (finish === undefined) {
    throw new Error("Finish node not specified")
  }

  const costs: Costs = {finish: Infinity};
  const parents: any = {finish: null}
  const processed: Processed = [start.id]

  graph.getNeighbourByParentId(start.id).forEach(child => {
    parents[child.id] = start.id
    costs[child.id] = child.cost
  })

  let node = lowestCostNode(costs, processed)
  while (node) {
    // loop will run only with no null node variable
    const noNullNode = node as string
    const cost = costs[noNullNode]
    const parentCell = graph.findCellById(noNullNode)
    graph.getNeighbourByParentId(noNullNode).forEach(child => {
      const childCost = parentCell && (parentCell.vortexConnection === null) ? child.cost : 0
      let newCost = cost + childCost
      if (!costs[child.id]) {
        costs[child.id] = newCost
        parents[child.id] = noNullNode
      }
      if (costs[child.id] > newCost) {
        costs[child.id] = newCost
        parents[child.id] = noNullNode
      }
      if (child.isFinish) {
        costs["finish"] = newCost
        parents["finish"] = noNullNode
      }
    })
    processed.push(noNullNode)
    if (parents["finish"] !== null) {
      node = null
    } else {
      node = lowestCostNode(costs, processed)
    }
  }

  const optimalPath = ["finish"]
  let parent = parents.finish

  while (parent) {
    optimalPath.push(parent === "finish" ? finish.id : parent)
    parent = parents[parent]
  }

  optimalPath.reverse()

  return {
    distance: costs.finish,
    path: optimalPath.length === 1 ? null : optimalPath
  };
}
