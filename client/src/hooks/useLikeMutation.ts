import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.patch("http://localhost:3000/api/posts/like/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["feed"] }, data?.data);
    },
  });
};

export default useLikeMutation;
