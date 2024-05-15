import { IPost } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const useFeedQuery = () => {
  return useQuery<IPost[], AxiosError>({
    queryKey: ["feed"],
    queryFn: () => axios("/posts/").then((response) => response.data),
  });
};

export default useFeedQuery;
