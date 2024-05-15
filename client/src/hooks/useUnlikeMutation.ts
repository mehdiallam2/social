import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUnlikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.patch("http://localhost:3000/api/posts/unlike/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["feed"] }, data?.data);
    },
  });
};

export default useUnlikeMutation;
