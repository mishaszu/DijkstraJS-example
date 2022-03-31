import React, {useEffect, useState} from 'react';
import './App.css';
import {Graph, Kind} from './utils/graph';
import {Grid} from './components/Grid';
import {faDumpster, faFlagCheckered, faFontAwesome, faMountain, faRoadSpikes, faSun} from '@fortawesome/free-solid-svg-icons';
import {ButtonPicker} from './components/ButtonPicker';
import {dijkstra, dijkstraOutput} from './utils/dijkstra'
import {graphRandomFill} from './utils/random'

export enum Mode {
  None,
  Start,
  Finish,
  Boulder,
  Gravel,
  Wormhole,
  Clear
}

const FillP = () => 
  <p className="w-full py-2 my-2 text-center"></p>

function App() {
  const [graph, setGraph] = useState(new Graph(6, 6))
  const [pathResult, setPathResult] = useState({
    time: null,
    result: null,
  } as {
    time: number | null,
    result: dijkstraOutput | null
  })
  const [mode, setMode] = useState(Mode.None)
  const [loading, setLoading] = useState(false)

  const reset = (withGraph = false) => {
    if (withGraph) {
      graph.cells.forEach(c => {c.kind = Kind.Regular})
      setGraph(Object.create(graph))
    }
    setPathResult({
      time: null,
      result: null
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // @ts-ignore
    const width = Number(event.target.widthInput.value);
    // @ts-ignore
    const height = Number(event.target.heightInput.value);
    if (!width && !height) {
      setGraph(new Graph(6, 6))
    }
    else if (!width || !height) {
      alert("Provide width & height for new grid")
    } else {
      setGraph(new Graph(width, height))
    }
    reset()
  }


  const updateGraph = (id: string) => {
    switch (mode) {
      case Mode.Start:
        graph.setStart(id)
        break
      case Mode.Finish:
        graph.setFinish(id)
        break
      case Mode.Boulder:
        graph.setBoulder(id)
        break
      case Mode.Gravel:
        graph.setGravel(id)
        break
      case Mode.Wormhole:
        graph.setWormhole(id)
        break
      case Mode.Clear:
        graph.setRoad(id)
        break
      default:
        break
    }
    setGraph(Object.create(graph))
  }

  const canRun = !!graph.findCellByKind(Kind.Start) && !!graph.findCellByKind(Kind.Finish)

  const modeClick = (mode: Mode) => (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMode(old => {
      if (old === mode) {
        return Mode.None
      } else {
        return mode
      }
    })
  }

  const runDijkstra = () => {
    const start = window.performance.now();
    setLoading(true)
    setTimeout(() => {
      dijkstra(graph).then(result => {
        const end = window.performance.now();
        const time = end - start;
        setLoading(false)
        setPathResult({
          time,
          result
        })
      })
    }, 50)
  }

  const random = () => {
    reset()
    const newGraph = graphRandomFill(new Graph(graph.width, graph.height))
    setGraph(newGraph)
  }

  return (
    <>
      <main className="flex items-center w-full h-full align-center">
        <div className="flex flex-col justify-between w-1/4 h-full text-white border-r-4 bg-emerald-600">
          <h1 className="my-4 text-2xl text-center">Dijkstra algorithm <span className="block">JS/TS</span>implementation</h1>
          <div className="flex flex-col items-center">
            <p className="my-2 text-2xl">{graph.width} x {graph.height} grid</p>
            {
              !canRun &&
              <p className="w-full py-2 text-xl my-2 text-center bg-pink-500">You have to set start and finish</p>
            }
            {
              pathResult.result && pathResult.result.path === null &&
              <p className="w-full text-xl py-2 my-2 text-center bg-pink-500">Path to finish is blocked!</p>
            }
            {
              pathResult.time && pathResult.result &&
              <p className="w-full py-2 my-2 text-xl text-center bg-teal-500">{`Found path in ${pathResult.time}ms on distance ${pathResult.result.distance}`}</p>
            }
            {
              loading &&
              <p className="w-full text-xl py-2 my-2 text-center bg-violet-500">Calculating path</p>
            }
            {
              !loading && canRun && !pathResult.time && !pathResult.result && 
              <p className="w-full text-xl py-2 my-2 text-center">Ready to run</p>
            }
          </div>
          <form className="flex flex-col items-center p-2 border-t border-b" onSubmit={v => onSubmit(v)}>
            <h3 className="text-xl">Define new grid dimensions</h3>
            <div className="flex items-center justify-around">
              <div className="inline-block w-1/3">
                <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="widthInput">Width</label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="number" name="widthInput" placeholder="6" />
              </div>
              <p>x</p>
              <div className="inline-block w-1/3 my-4">
                <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="heightInput">Height</label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="number" name="heightInput" placeholder="6" />
              </div>
            </div>
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Set new grid</button>
          </form>
          <div className="flex flex-wrap justify-center">
            <ButtonPicker
              onClick={modeClick(Mode.Start)}
              text="Start"
              selected={mode === Mode.Start}
              icon={faFontAwesome}
            />
            <ButtonPicker
              onClick={modeClick(Mode.Finish)}
              text="Finish"
              selected={mode === Mode.Finish}
              icon={faFlagCheckered}
            />
            <ButtonPicker
              onClick={modeClick(Mode.Wormhole)}
              text="Wormhole"
              selected={mode === Mode.Wormhole}
              icon={faSun}
            />
            <ButtonPicker
              onClick={modeClick(Mode.Boulder)}
              text="Boulder"
              selected={mode === Mode.Boulder}
              icon={faMountain}
            />
            <ButtonPicker
              onClick={modeClick(Mode.Gravel)}
              text="Gravel"
              selected={mode === Mode.Gravel}
              icon={faRoadSpikes}
            />
            <ButtonPicker
              onClick={modeClick(Mode.Clear)}
              text="Clear"
              selected={mode === Mode.Clear}
              icon={faDumpster}
            />
          </div>
          <div className="flex flex-col items-center my-4">
            <button onClick={_ => runDijkstra()} className={`px-8 py-4 mx-2 text-2xl font-bold text-white rounded cursor-pointer ${canRun ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"}`} disabled={!canRun}>Find route</button>
            <div>
              <button onClick={_ => random()} className={`px-4 py-2 my-4 mx-2 font-bold text-white rounded cursor-pointer bg-teal-500 hover:bg-teal-700`}>Random</button>
              <button onClick={_ => reset(true)} className={`px-4 py-2 my-4 mx-2 font-bold text-white rounded cursor-pointer bg-violet-500 hover:bg-violet-700`}>Reset</button>
            </div>
          </div>
        </div>
        <Grid graph={graph} updateGraph={updateGraph} modeSelected={mode !== Mode.None} result={pathResult.result && pathResult.result?.path ? pathResult.result.path : []} />
      </main>
    </>
  );
}

export default App;
