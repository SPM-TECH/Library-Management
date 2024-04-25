import { FileSpreadsheetIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { User } from "@/api/users";

const UploadBulk = () => {
  const inputref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<User[]>([]);
  const [ferror, setFerror] = useState("");

  const onclick = () => {
    if (inputref && inputref.current) {
      inputref && inputref.current.click();
    }
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploaded = e.target.files[0];
      const ext = uploaded.name.split(".").at(-1);
      if (ext === "xlsx" || ext === "xls") {
        setFile(uploaded);
        prepareFile();
      } else {
        setFerror("file format not supported.");
      }
    }
  };

  const prepareFile = () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target?.result, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet) as User[];

      setData(sheetData);
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    reader.readAsArrayBuffer(new Blob(file));
  };

  const uploadBulk = async () => {
    console.log(data);
  };

  return (
    <div className="my-4">
      <input hidden type="file" ref={inputref} onChange={changeFile} />
      {data.length > 0 ? (
        <Button onClick={uploadBulk} className="gap-2">
          <UploadIcon />
          <p>Save Details</p>
        </Button>
      ) : (
        <div>
          <Button onClick={onclick} className="gap-2">
            <FileSpreadsheetIcon />
            <p>Upload Spreadsheet</p>
          </Button>
          {file && (
            <div className="flex items-center justify-between my-4">
              <span>{file.name}</span>
              <XIcon onClick={() => setFile(null)} />
            </div>
          )}
        </div>
      )}
      {ferror && <div>{ferror}</div>}
    </div>
  );
};

export default UploadBulk;
