import {FC, useState, useRef, useEffect} from "react"
import {Graph} from "../utils/graph"
import {Cell} from "./Cell"
import './Grid.css'

interface Props {
  graph: Graph,
  updateGraph(id: string): void,
  modeSelected: boolean,
  result?: string[],
  className?: string
}

const sizeFromRef = (ref: any, width: number, height: number, def = 40): [number, boolean] => {
  if (!ref?.current) return [def, true];
  const smallerSide = width > height ? height : width;
  const smallerInnerSide = ref.current.offsetWidth > ref.current.offsetHeight
    ? ref.current.offsetHeight
    : ref.current.offsetWidth
  const size = Math.floor(smallerInnerSide / smallerSide) - 10
  return [size, size > def]
}

export const Grid: FC<Props> = ({graph, updateGraph, modeSelected, result = [], className = ""}) => {
  const [[size, justify], setSizeAndJustify] = useState([50, true])
  const ref = useRef(null)
  useEffect(() => {
    setSizeAndJustify(sizeFromRef(ref, graph.width, graph.height))
  }, [graph.width, graph.height])
  return (
    <div ref={ref} className={`flex flex-col ${justify ? "items-center justify-center" : "p-4"} w-3/4 h-full overflow-auto ${className}`}>
      {
        Array(graph.height).fill(null).map((_, index) => <div key={`row-${index}`} className="flex">
          {
            graph.cells.slice(index * graph.width, (index + 1) * graph.width).map(c => {
              const indexOf = result.indexOf(c.id);
              const selectTimeout = indexOf > -1 ? indexOf : null

              return <Cell
                selectTimeout={selectTimeout}
                onClick={_ => updateGraph(c.id)}
                modeSelected={modeSelected}
                key={c.id}
                cell={c}
                size={size}
              />
            })
          }
        </div>)
      }
    </div>
  )
}
      // {
//
// graph.cells.map
      // }
