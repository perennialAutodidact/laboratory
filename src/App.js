import './Sass/App.scss';
import Navbar from './components/layout/Navbar';
import DotsAndLines from './components/experiments/dotsAndLines/DotsAndLines';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <DotsAndLines/>
    </div>
  );
}

export default App;
