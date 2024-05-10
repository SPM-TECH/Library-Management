import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteUser } from "@/api/users";
import { useMutation, useQueryClient } from "react-query";
import { useGlobalContext } from "@/context/GlobalContext";

const DeleteConfirmDialog = () => {
  const qc = useQueryClient();

  const { deleteId, deleteModalOpen, setDeleteModalOpen, setDeleteId } =
    useGlobalContext();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(deleteId!),
    onSuccess: (data) => {
      if (data) {
        qc.setQueryData("student_list", (old: unknown) => {
          if (Array.isArray(old)) {
            return old.filter((old) => old.id !== deleteId);
          }
        });
      }
      setDeleteId(null);
      setDeleteModalOpen(false);
    },
  });

  return (
    <Dialog
      open={deleteModalOpen}
      onOpenChange={() => setDeleteModalOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <DialogDescription>Do you want to delete this user?</DialogDescription>
        <DialogFooter>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button
            onClick={() => mutate()}
            className="bg-red-600 dark:bg-red-300"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
