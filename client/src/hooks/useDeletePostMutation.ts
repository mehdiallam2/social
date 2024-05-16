import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.delete("/posts/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export default useDeletePostMutation;
