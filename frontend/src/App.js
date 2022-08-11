import "./sass/App.scss";
import Navbar from "./components/layout/Navbar";
import DotsAndLines from "./components/experiments/dotsAndLines/DotsAndLines";
import SunClock from './components/experiments/sunClockSimple/SunClock'
import CrushClone from './components/crushClone/CrushClone'

function App() {
  return (
    <div className="App">
      <Navbar />
      <SunClock bgColor={'#3a3a3a'}/>
    </div>
  );
}

export default App;
