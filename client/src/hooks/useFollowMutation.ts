import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useFollowMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.patch("http://localhost:3000/api/users/follow/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["profile"], ["feed"]] });
    },
  });
};

export default useFollowMutation;
