import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFollowersQuery = (id: string) => {
  return useQuery({
    queryKey: ["followers"],
    queryFn: () => axios("/users/followers/" + id).then((response) => response.data),
  });
};

export default useFollowersQuery;
