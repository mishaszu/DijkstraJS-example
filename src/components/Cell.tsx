import {FC} from "react";
import {Cell as GraphCell} from '../utils/graph'
import './Cell.css'

interface Props {
  id: string,
  cost: number,
  isBlocked: boolean,
  isFinish: boolean,
  isStart: boolean,
  size: number,
  vortexConnection: GraphCell | null
}

export const Cell: FC<Props> = ({
  id,
  cost,
  isBlocked,
  isFinish,
  isStart,
  size,
  vortexConnection,
}) => {
  return (
    <div style={{width: `${size}px`, height: `${size}px`}} className="flex-wrap border cell-min-size"></div>
  )
}
