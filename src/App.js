import "./Sass/App.scss";
import Navbar from "./components/layout/Navbar";
import DotsAndLines from "./components/experiments/dotsAndLines/DotsAndLines";
import SunClock from './components/experiments/sunClock/SunClock'

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <DotsAndLines/> */}
      <SunClock bgColor={'#3a3a3a'}/>

    </div>
  );
}

export default App;
