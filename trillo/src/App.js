import React from 'react'

import Item from './components/Item'

const data = [
  'Subwoofer',
  'Non-porous, washable',
  'Wings',
  'Beveled Bezel',
  'Beveled Bezel',
  'Seedless'
]

function App() {
  return (
    <div className="App">
      <div className="Trillo">
        <div style={{ fontWeight: 'bold' }}>Phone Features</div>
        <div className="Container">
          {data.map((str, idx) => (
            <Item key={idx}>{str}</Item>
          ))}
        </div>
        <div style={{ color: '#7f807f', fontWeight: 'bold' }}>
          Add a card...
        </div>
      </div>
    </div>
  )
}

export default App
