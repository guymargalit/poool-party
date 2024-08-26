import { fetcher } from "@/lib/utils";
import { Status } from "@prisma/client";
import useSWR from "swr";

export const useTransactions = ({ status }: { status: Status | undefined }) => {
  const { data, mutate, isLoading, error } = useSWR(
    `/api/transactions${status ? `?status=${status}` : ""}`,
    fetcher
  );
  return { data, mutate, isLoading, error };
};
