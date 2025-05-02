import { Route, Routes } from "react-router-dom";
import "./App.css";
import BugList from "./components/BugList";

function App() {
  return (
    <div className="app">
      <Routes>
          <Route path="/" element={<BugList />} />
        </Routes>
    </div>
  );
}

export default App;
