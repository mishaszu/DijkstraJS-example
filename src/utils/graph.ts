export enum Kind {
  Regular = "Regular",
  Start = "Start",
  Finish = "Finish",
  Gravel = "Gravel",
  Boulder = "Boulder",
  Vortex = "Vortex",
}

export class Cell {
  public cost: number = 1
  public kind: Kind = Kind.Regular

  constructor(public x: number, public y: number, public id: string) {
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

  findCellByKind(kind: Kind) {
    return this.cells.find(c => c.kind === kind)
  }


  getNeighbourByParentId(id: number | string): Cell[] {
    const cell = this.cells.find(c => c.id === id)
    if (cell) {
      return this.getNeighbourCells(cell)
    } else {
      return []
    }
  }

  getNeighbourCells({x, y, kind, id}: Cell): Cell[] {
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
    if (kind === Kind.Vortex) {
      this
        .cells
        .filter(c => c.kind === Kind.Vortex && c.id !== id)
        .forEach(c => neigbours.push(c))
    }
    return neigbours.filter(cell => cell.kind !== Kind.Boulder && cell.kind !== Kind.Start)
  }

  private setUniqueKind(id: string, kind: Kind.Start | Kind.Finish) {
    const start = this.findCellByKind(kind)
    const cell = this.findCellById(id);
    if (cell) {
      if (start) {
        start.kind = kind
      }
      cell.kind = kind
      return true
    } else {
      return false
    }
  }

  private setCommonKind(id: string, kind: Kind.Boulder | Kind.Gravel | Kind.Vortex) {
    const cell = this.findCellById(id);
    if (cell) {
      cell.kind = kind
      return true
    } else {
      return false
    }
  }

  setStart(id: string) {
    return this.setUniqueKind(id, Kind.Start)
  }

  setFinish(id: string) {
    return this.setUniqueKind(id, Kind.Finish)
  }

  setBoulder(id: string) {
    return this.setCommonKind(id, Kind.Boulder)
  }

  setGravel(id: string) {
    return this.setCommonKind(id, Kind.Gravel)
  }

  setVortex(id: string) {
    return this.setCommonKind(id, Kind.Vortex)
  }

  static calcDistance(cell: Cell, parent?: Cell) {
    if (parent && parent.kind === Kind.Vortex && cell.kind === Kind.Vortex) {
      return 0
    } else if (cell.kind === Kind.Gravel) {
      return 2
    } else {
      return 1
    }
  }
}
