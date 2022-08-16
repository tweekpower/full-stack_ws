import logo from './logo.svg';
import './App.css';
import useCollection from './hooks/useCollection';

function App() {
  const [names] = useCollection("names");
  return (
    <div className="App">
      {
        names.map(
          n => <p>{n.test}</p>
        )
      }
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
