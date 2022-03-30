import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Graph} from './utils/graph';
import {Grid} from './components/Grid';

function App() {
  const [graph, setGraph] = useState(new Graph(6, 6))

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // @ts-ignore
    const width = Number(event.target.widthInput.value);
    // @ts-ignore
    const height = Number(event.target.heightInput.value);
    console.log(!!width, !!height)
    if (!width && !height) {
      setGraph(new Graph(6, 6))
    }
    else if (!width || !height) {
      alert("Provide width & height for new grid")
    } else {
      setGraph(new Graph(width, height))
    }
  }

  return (
    <>
      <header className="flex items-center justify-center h-1-10">
        <h1 className="text-4xl text-center">Dijkstra algorithm implementation with js/ts</h1>
      </header>
      <main className="flex items-center w-full align-center h-9-10">
        <div className="w-1/4 h-full border-r-4">
          <form className="flex flex-col items-center px-8 pt-6 pb-8 mb-4" onSubmit={v => onSubmit(v)}>
            <h3>Define new grid dimensions</h3>
            <div className="flex items-center justify-around">
              <div className="inline-block w-1/3">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="widthInput">Width</label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="number" name="widthInput" placeholder="6" />
              </div>
              <p>x</p>
              <div className="inline-block w-1/3 my-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="heightInput">Height</label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="number" name="heightInput" placeholder="6" />
              </div>
            </div>
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Set new grid</button>
          </form>
        </div>
        <Grid graph={graph} />
      </main>
    </>
  );
}

export default App;
