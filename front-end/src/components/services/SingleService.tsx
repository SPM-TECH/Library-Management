import { deleteService, Service, updateService } from "@/api/service";
import { Check, Edit2, Loader2, Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  index: number;
  service: Service;
};

const SingleService = ({ index, service }: Props) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await updateService({
        name: input,
        id: service.id,
      }),
    onSuccess: (data) => {
      qc.setQueryData("settings", (old: unknown) => {
        if (Array.isArray(old)) {
          return old.map((d) => (d.id === data.id ? data : d));
        }
      });
      onClose();
    },
  });

  const { mutate: deleteOp, isLoading: deleteLoading } = useMutation({
    mutationFn: async () => await deleteService(service.id),
    onSuccess: (data) => {
      if (data) {
        qc.setQueryData("settings", (old: unknown) => {
          if (Array.isArray(old)) {
            return old.filter((d) => d.id !== service.id);
          }
        });
      }

      onClose();
    },
  });

  const onEdit = () => {
    setDeleteMode(false);
    setEditMode(true);
    setInput(service.name);
  };

  const onClose = () => {
    setInput("");
    setEditMode(false);
    setDeleteMode(false);
  };

  const onDelete = () => {
    setEditMode(false);
    setDeleteMode(true);
  };

  const onOK = () => {
    if (deleteMode && !editMode) {
      deleteOp();
    }
    if (editMode && !deleteMode) {
      mutate();
    }
  };

  return (
    <div className="flex items-center w-[500px] justify-between gap-4 my-1">
      <div className="flex-grow">
        {editMode ? (
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        ) : deleteMode ? (
          <h3 className="text-sm text-red-500">
            Are sure wanted to delete this?
          </h3>
        ) : (
          <h3 className="text-sm">
            {index}. {service.name}
          </h3>
        )}
      </div>
      {editMode || deleteMode ? (
        <div className="flex items-center">
          <Button onClick={onOK} variant="ghost">
            {isLoading || deleteLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </Button>
          <Button onClick={onClose} variant="ghost">
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Button onClick={onEdit} variant="ghost">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button onClick={onDelete} variant="ghost">
            <Trash2 className="w-4 h-4 text-red-700" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleService;
