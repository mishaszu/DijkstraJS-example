import {FC} from "react";
import {Cell as GraphCell} from '../utils/graph'
import './Cell.css'

interface Props {
  cell: GraphCell,
  size: number
}

export const Cell: FC<Props> = ({
  cell,
  size
}) => {
  return (
    <div style={{width: `${size}px`, height: `${size}px`}} className="flex-wrap border cell-min-size"></div>
  )
}
