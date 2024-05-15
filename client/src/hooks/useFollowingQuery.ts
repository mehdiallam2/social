import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFollowingQuery = (id: string) => {
  return useQuery({
    queryKey: ["following"],
    queryFn: () => axios("/users/following/" + id).then((response) => response.data),
  });
};

export default useFollowingQuery;
