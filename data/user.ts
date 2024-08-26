import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export const useUser = () => {
  const { data, mutate, isLoading, error } = useSWR("/api/user", fetcher);
  return { data, mutate, isLoading, error };
};
