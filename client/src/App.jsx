import { useState } from 'react'
import logo from './assets/images/logo.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo react" alt="Congregator logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to see our source code
      </p>
    </>
  )
}

export default App
