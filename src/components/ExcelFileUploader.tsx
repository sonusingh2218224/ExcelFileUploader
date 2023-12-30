import { useState } from "react";
import * as XLSX from "xlsx";
import { collection, addDoc } from "firebase/firestore";
import db from "../config/firebase";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import ExcelDataTable from "./ExcelDataTable";

const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = e.target.files?.[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (typeof data === "string") {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          await Promise.all(
            jsonData.map(async (item: any) => {
              await addDoc(collection(db, "ExcelData"), item);
            })
          );
          toast.success("Excel file uploaded successfully!");
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="container">
      <h2>Upload Your Excel File</h2>
      <div className="file_upload_input">
        <TextField
          type="file"
          inputProps={{ accept: ".xlsx" }}
          onChange={handleFileChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </div>
      <ExcelDataTable />
    </div>
  );
};

export default ExcelUpload;
