import './extra/App.css';
import AppbarComponent from "./Components/AppbarComponent";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <AppbarComponent />
        <HomePage/>
    </div>
  );
}

export default App;
