import "./App.css";
import { Route, Routes } from "react-router-dom";
import ExcelFileUploader from "./components/ExcelFileUploader";
import ExcelDataTable from "./components/ExcelDataTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExcelFileUploader />}></Route>
        <Route path="/" element={<ExcelDataTable />}></Route>
      </Routes>
    </div>
  );
}

export default App;
