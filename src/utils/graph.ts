export class Cell {
  public isBlocked: boolean = false
  public vortexConnection: Cell | null = null
  public cost: number = 1
  public isFinish: boolean = false
  public isStart: boolean = false

  constructor(public x: number, public y: number, public id: string) {
  }

  setBlocked() {
    this.isBlocked = !this.isBlocked
  }

  setSwamp() {
    this.cost = 2
  }

  setRoad() {
    this.cost = 1
  }

  setStart() {
    this.isStart = !this.isStart
  }

  setFinish() {
    this.isFinish = !this.isFinish
  }
}

export class Graph {
  public cells: Cell[]
  constructor(public width: number, public height: number) {
    const cells = []
    for (let a = 0; a < width * height; a++) {
      cells.push(new Cell(a % width, Math.floor(a / width), `${a + 1}`))
    }
    this.cells = cells
  }

  getCell(x: number, y: number) {
    return this.cells[y * this.width + x]
  }

  findCellById(id: string) {
    return this.cells.find(c => c.id === id)
  }

  getNeighbourByParentId(id: number | string): Cell[] {
    const cell = this.cells.find(c => c.id === id)
    if (cell) {
      return this.getNeighbourCells(cell)
    } else {
      return []
    }
  }

  getNeighbourCells({x, y, vortexConnection}: Cell): Cell[] {
    const neigbours = []
    const {cells, width, height} = this
    if (x <= 0) {
      neigbours.push(cells[y * width + x + 1])
    } else if (x >= width - 1) {
      neigbours.push(cells[y * width + (x - 1)])
    } else {
      neigbours.push(cells[y * width + (x - 1)])
      neigbours.push(cells[y * width + x + 1])
    }
    if (y <= 0) {
      neigbours.push(cells[(y + 1) * width + x])
    } else if (y >= height - 1) {
      neigbours.push(cells[(y - 1) * width + x])
    } else {
      neigbours.push(cells[(y - 1) * width + x])
      neigbours.push(cells[(y + 1) * width + x])
    }
    if (vortexConnection) {
      neigbours.push(vortexConnection)
    }
    return neigbours.filter(cell => !cell.isBlocked && !cell.isStart)
  }
}
