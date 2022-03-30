export enum Kind {
  Regular = "Regular",
  Start = "Start",
  Finish = "Finish",
  Gravel = "Gravel",
  Boulder = "Boulder",
  Wormhole = "Wormhole",
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
    if (kind === Kind.Wormhole) {
      this
        .cells
        .filter(c => c.kind === Kind.Wormhole && c.id !== id)
        .forEach(c => neigbours.push(c))
    }
    return neigbours.filter(cell => cell.kind !== Kind.Boulder && cell.kind !== Kind.Start)
  }

  private setUniqueKind(id: string, kind: Kind.Start | Kind.Finish) {
    const uniqu = this.findCellByKind(kind)
    const cell = this.findCellById(id);
    if (cell) {
      if (uniqu) {
        uniqu.kind = Kind.Regular
      }
      cell.kind = kind
      return true
    } else {
      return false
    }
  }

  private setCommonKind(id: string, kind: Kind.Boulder | Kind.Gravel | Kind.Wormhole) {
    const cell = this.findCellById(id);
    if (cell && cell.kind !== kind) {
      cell.kind = kind
      return true
    } else if (cell && cell.kind === kind) {
      cell.kind = Kind.Regular
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

  setWormhole(id: string) {
    return this.setCommonKind(id, Kind.Wormhole)
  }

  setRoad(id: string) {
    const cell = this.findCellById(id);
    if (cell) {
      cell.kind = Kind.Regular
      return true
    } else {
      return false
    }
  }

  static calcDistance(cell: Cell, parent?: Cell) {
    if (parent && parent.kind === Kind.Wormhole && cell.kind === Kind.Wormhole) {
      return 0
    } else if (cell.kind === Kind.Gravel) {
      return 2
    } else {
      return 1
    }
  }
}
