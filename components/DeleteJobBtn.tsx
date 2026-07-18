import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

const DeleteJobBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("There was an error");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast.success("Job removed successfully");
    },
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      className="rounded-xl cursor-pointer"
      onClick={() => mutate(id)}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </>
      )}
    </Button>
  );
};

export default DeleteJobBtn;
