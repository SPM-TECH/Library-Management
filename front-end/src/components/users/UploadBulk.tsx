import { FileSpreadsheetIcon, Loader2, UploadIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { bulkUploadUsers, User } from "@/api/users";
import { validateDetails } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";
import InstructionHoverCard from "./InstructionHoverCard";

const UploadBulk = () => {
  const inputref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<User[]>([]);
  const [rejected, setRejected] = useState<User[]>([]);
  const [ferror, setFerror] = useState("");

  const qc = useQueryClient();

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
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = new Uint8Array(event?.target?.result as ArrayBufferLike);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet) as User[];

          const validated = validateDetails(jsonData);
          setData(validated.correct);
          setRejected(validated.wrong);
        };

        reader.readAsArrayBuffer(uploaded);
      } else {
        setFerror("file format not supported.");
      }
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bulkUploadUsers(data),
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        qc.setQueryData("student_list", (old: unknown) => {
          if (Array.isArray(old)) {
            return [...data, ...old] as User[];
          }
        });
      }
      setFile(null);
      setData([]);
      setRejected([]);
    },
  });

  return (
    <div className="my-4">
      <InstructionHoverCard />
      <input hidden type="file" ref={inputref} onChange={changeFile} />
      {data.length > 0 || rejected.length > 0 ? (
        <div>
          <p className="text-sm  my-1">{`You have uploaded ${data.length} correct students details`}</p>
          <p className="text-sm text-red-400 my-1">{`You have uploaded ${rejected.length} wrong students details`}</p>
          <Button
            onClick={() => mutate()}
            className="gap-2"
            disabled={data.length === 0}
          >
            {isLoading ? <Loader2 /> : <UploadIcon />}

            <p>{`Save ${data.length} Details`}</p>
          </Button>
        </div>
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
