import "./App.css";
import { Route, Routes } from "react-router-dom";
import ExcelFileUploader from "./components/ExcelFileUploader";
import Exceldata from "./exceldata";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExcelFileUploader />}></Route>
        <Route path="/exceldata" element={<Exceldata />}></Route>
      </Routes>
    </div>
  );
}

export default App;
