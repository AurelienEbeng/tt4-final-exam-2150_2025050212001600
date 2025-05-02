import { Route, Routes } from "react-router-dom";
import "./App.css";
import BugList from "./components/BugList";
import BugCreate from "./components/BugCreate";

function App() {
  return (
    <div className="app">
      <Routes>
          <Route path="/" element={<BugList />} />
          <Route path="/create" element={<BugCreate />} />
        </Routes>
    </div>
  );
}

export default App;
