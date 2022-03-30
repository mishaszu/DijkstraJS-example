import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {Cell as GraphCell, Kind} from '../utils/graph'
import {faFlagCheckered, faFontAwesome, faMountain, faRoadSpikes, faSun} from '@fortawesome/free-solid-svg-icons';
import './Cell.css'

interface Props {
  cell: GraphCell,
  size: number,
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
  modeSelected: boolean,
  selectTimeout: number | null
}


const kindToIcon = (kind: Kind, iconSize: "2x" | "3x" | "5x") => {
  switch (kind) {
    case Kind.Start:
      return <FontAwesomeIcon size={iconSize} icon={faFontAwesome} />
    case Kind.Finish:
      return <FontAwesomeIcon size={iconSize} icon={faFlagCheckered} />
    case Kind.Wormhole:
      return <FontAwesomeIcon size={iconSize} icon={faSun} />
    case Kind.Boulder:
      return <FontAwesomeIcon size={iconSize} icon={faMountain} />
    case Kind.Gravel:
      return <FontAwesomeIcon size={iconSize} icon={faRoadSpikes} />
    default:
      return null
  }
}

const matchIconSize = (size: number) => {
  if (size > 120) {
    return "5x"
  } else if (size > 80) {
    return "3x"
  } else {
    return "2x"
  }
}

export const Cell: FC<Props> = ({
  cell,
  size,
  onClick,
  modeSelected,
  selectTimeout
}) => {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    let timeout: any = null
    if (selectTimeout !== null) {
      timeout = setTimeout(() => {
        setSelected(true)
      }, selectTimeout * 100 + 100)
    } else {
      setSelected(false)
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [selectTimeout])

  return (
    <div onClick={onClick} style={{width: `${size}px`, height: `${size}px`}} className={`flex items-center justify-center text-black flex-wrap border cell-min-size ${modeSelected ? "cursor-copy" : "cursor-pointer"} hover:bg-emerald-100 ${selected ? "bg-blue-200" : ""}`}>
      {
        kindToIcon(cell.kind, matchIconSize(size))
      }
    </div>
  )
}
