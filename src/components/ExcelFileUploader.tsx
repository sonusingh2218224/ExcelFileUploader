import { useState } from "react";
import * as XLSX from "xlsx";
import { collection, addDoc } from "firebase/firestore";
import db from "../config/firebase";
import { toast } from "react-toastify";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = e.target.files?.[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      // Display a warning toast if the file is not selected
      toast.warning("Please upload an Excel file.");
      return;
    }
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
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
        } catch (error) {
          console.error("Error during file upload:", error);
          toast.error(
            "An error occurred during file upload. Please try again."
          );
        } finally {
          setIsUploading(false);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="container">
      <h2>Upload Your Excel File (.XLSX)</h2>
      <div className="file_upload_input">
        <TextField
          type="file"
          inputProps={{ accept: ".xlsx" }}
          onChange={handleFileChange}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload"
          )}
        </Button>
        <Link to="/exceldata" className="link">
          Excel Retrieve Data
        </Link>
      </div>
    </div>
  );
};

export default ExcelUpload;
