import { useCallback, useEffect, useState } from 'react'

import './App.css'
import CounterButtong from './components/CounterButton'
import { doubleTheNum, funkyNum } from './utils'

function App() {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const elem = document.elementFromPoint(x, y);

    // obtain the element
    console.log(elem);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
    }
  }, []);

  return (
    <div className='card'>
      <CounterButtong text='2x count is: ' count={count1} onClick={() => setCount1(doubleTheNum)} />

      <CounterButtong text='funky count is: ' count={count2} onClick={() => setCount2(funkyNum)} />
      <p>Edit <code>src/app.tsx</code> and save test HMR</p>
    </div>
  )
}

export default App
