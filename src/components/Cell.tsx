import {FC} from "react";
import {Cell as GraphCell} from '../utils/graph'

interface Props {
  cost: number,
  isBlocked: boolean,
  isFinish: boolean,
  isStart: boolean,
  vortexConnection: GraphCell
}

export const Cell: FC<Props> = ({
  cost,
  isBlocked,
  isFinish,
  isStart,
  vortexConnection,
}) => {
  return (
    <div></div>
  )
}
