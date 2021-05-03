
import Header from './components/Header'
import Pomodoro from './Pomodoro'
import Footer from './components/Footer'
import Todo from './todo';
import Background from './cucumber.svg';
function App() {
  return (
    <div className="App">
      <Header/>
      <div className="grid" style={{backgroundImage: `url(${Background} )` }}>
      <div className="clock">
      <Pomodoro />
      </div>
      <div className="tasks">
      <Todo/>
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
