import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FC} from 'react';

interface Props {
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
  text: string,
  icon: IconDefinition,
  selected: boolean
}

export const ButtonPicker: FC<Props> = ({onClick, text, icon, selected}) =>
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 px-16 py-2 m-2 cursor-pointer ${selected ? "bg-pink-600" : "bg-blue-500 hover:bg-blue-700"}`}
  >
    <FontAwesomeIcon size="3x" icon={icon} />
    <p>{text}</p>
  </div>
