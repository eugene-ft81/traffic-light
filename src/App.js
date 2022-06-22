import { useReducer, useEffect, useState } from 'react';
import './App.css';
function App() {
  const reducer = (lights, action) => {
    if (action.type === 'light') {
      return lights.map(light => {
        if (action.curLight === light.id)
          return { ...light }
        return light
      })
    }
    return lights
  }
  const data = [
    {id: 0, color: 'red'}, {id: 1, color: 'yellow'}, {id: 2, color: 'green'}
  ]
  const [lights, dispatch] = useReducer(reducer, data)
  const durations = [3000, 2000, 1000];
  const [curLight, setCurLight] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'light', curLight })
      setCurLight((curLight + 1) % 3)
    }, durations[setCurLight])
    return () => { clearTimeout(timer) }
  })
  return (<> {
       lights.length > 0 && ( 
        <div className='container'>
          <div className='light-box'>{
              lights.map(light => { return <p
                  key={light.id} 
                  id='light' 
                  style={{
                  backgroundColor: light.color, 
                  opacity: curLight === light.id ? 1 : 0.3, 
                  }} >
              </p> })
            }
          </div>
        </div>
      )} </>);
}
export default App;
