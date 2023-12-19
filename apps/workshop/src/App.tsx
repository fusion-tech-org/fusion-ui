import { useState } from 'react'

import './App.css'
import CounterButtong from './components/CounterButton'
import { doubleTheNum, funkyNum } from './utils'

function App() {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(1)

  return (
    <div className='card'>
      <CounterButtong text='2x count is: ' count={count1} onClick={() => setCount1(doubleTheNum)} />

      <CounterButtong text='funky count is: ' count={count2} onClick={() => setCount2(funkyNum)} />
      <p>Edit <code>src/app.tsx</code> and save test HMR</p>
    </div>
  )
}

export default App
