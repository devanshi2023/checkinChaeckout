import { useState } from 'react';
import './App.css';
import CheckInCheckOut from './components/CheckInCheckOut';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Check-In/Check-Out System</h1>
      {/* Call CheckInCheckOut component */}
      <CheckInCheckOut />
    </div>
  );
}

export default App;
