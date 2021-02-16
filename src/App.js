import "./Sass/App.scss";
import Navbar from "./components/layout/Navbar";
import DotsAndLines from "./components/experiments/dotsAndLines/DotsAndLines";
import SunClock from './components/experiments/sunClock/SunClock'
import CrushClone from './components/crushClone/CrushClone'

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <DotsAndLines/> */}
      <SunClock bgColor={'#3a3a3a'}/>
      {/* <CrushClone /> */}
    </div>
  );
}

export default App;
