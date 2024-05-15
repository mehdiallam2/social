import { useAuthStore } from "@/app/store";
import { IUser } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserQuery = () => {
  const userId = useAuthStore((state) => state.user?._id);
  return useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: () => axios("/users/" + userId).then((response) => response.data),
  });
};

export default useUserQuery;
