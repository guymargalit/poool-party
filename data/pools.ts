import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export const usePools = () => {
  const { data, mutate, isLoading, error } = useSWR("/api/pools", fetcher);
  return { data, mutate, isLoading, error };
};
