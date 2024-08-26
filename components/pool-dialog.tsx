"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { Interval } from "@prisma/client";
import {
  AlertTriangleIcon,
  Check,
  Loader2,
  RepeatIcon,
  Trash,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import useSWR, { mutate } from "swr";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

async function updatePool(id: string, data: any) {
  const res = await fetch(`/api/pools/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update pool");
  }
  return res.json();
}

async function deletePool(id: string) {
  const res = await fetch(`/api/pools/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete pool");
  }
  return res.json();
}

export function PoolDialog({
  data,
  open,
  onOpenChange,
}: {
  data?: {
    id: string;
    note: string;
    interval: string;
    active: boolean;
    users: any[];
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const poolUsers = data?.users?.map((user: any) => ({
      ...user,
      amount: (parseInt(user.amount) / 100).toString(),
    }));
    setSelectedUsers(poolUsers || []);
    setIsActive(data?.active || false);
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <Credenza open={open} onOpenChange={onOpenChange} dismissable={false}>
      <CredenzaContent className="rounded-none md:rounded-2xl h-screen md:h-auto">
        <CredenzaHeader className="flex flex-row justify-between items-center">
          <CredenzaTitle>{data.note}</CredenzaTitle>
          <CredenzaClose
            style={{ marginTop: 0 }}
            className="rounded-sm ring-offset-background transition-colors hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </CredenzaClose>
        </CredenzaHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            {selectedUsers.map((user: any, index: number) => (
              <div
                key={user.venmo.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.venmo.image} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold">{user.venmo.displayName}</span>
                    <span className="text-sm text-muted-foreground">
                      {user.lastSent
                        ? `Last sent ${new Date(
                            user.lastSent
                          ).toLocaleDateString()}. `
                        : "Request not sent. "}
                      {user.lastSent && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant={"link"}
                              className="text-sm m-0 font-normal underline p-0 text-muted-foreground h-auto"
                            >
                              Send again?
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to send again?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will send another Venmo request to this
                                user.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  setSubmitting(true);
                                  fetch(`/api/venmo/requests`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                      poolId: data.id,
                                      poolUser: {
                                        venmoId: user.venmo.id,
                                        amount: user.amount * 100,
                                      },
                                    }),
                                  })
                                    .then(async () => {
                                      setSubmitting(false);
                                      await mutate("/api/pools");
                                      onOpenChange(false);
                                    })
                                    .catch((e) => {
                                      setSubmitting(false);
                                      console.error(e);
                                    });
                                }}
                                className="bg-primary hover:bg-primary/80"
                              >
                                {submitting ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  "Send again"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </span>
                  </div>
                </div>
                <CurrencyInput
                  prefix="$"
                  decimalScale={2}
                  allowDecimals
                  allowNegativeValue={false}
                  value={user.amount}
                  disabled
                  placeholder="$0"
                  className="h-10 border float-right clear-both ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[100px] text-base font-bold flex items-center bg-primary/5 border-input rounded-2xl px-2 py-2"
                  onValueChange={(value: string | undefined) => {
                    if (!value) return;
                    setSelectedUsers(
                      selectedUsers.map((u, i) => {
                        if (i === index) {
                          return {
                            ...u,
                            amount: value.toString(),
                          };
                        } else {
                          return u;
                        }
                      })
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="my-2 border-t border-primary/10"></div>
          <div className="flex flex-row items-center justify-between rounded-2xl h-12 bg-primary/5 py-3 px-4">
            <div className="flex flex-col space-y-0.5">
              <span className="text-sm font-bold flex items-center">
                <RepeatIcon className="h-4 w-4 mr-2" />
                Repeat every {data.interval}
              </span>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => {
                setIsActive(checked);
              }}
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                className="flex flex-row items-center justify-between rounded-2xl text-red-500 hover:text-white  bg-red-100 h-12 px-4"
              >
                <div className="flex flex-col space-y-0.5">
                  <span className="text-sm font-extrabold  flex items-center">
                    <AlertTriangleIcon className="h-4 w-4 mr-2" />
                    Delete Pool
                  </span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your pool.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setSubmitting(true);
                    deletePool(data.id)
                      .then(async () => {
                        setSubmitting(false);
                        await mutate("/api/pools");
                        onOpenChange(false);
                      })
                      .catch((e) => {
                        setSubmitting(false);
                        console.error(e);
                      });
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CredenzaFooter>
          <Button
            className="w-full h-12 rounded-full text-base"
            onClick={() => {
              setSubmitting(true);
              updatePool(data.id, {
                active: isActive,
                users: selectedUsers,
              })
                .then(async () => {
                  setSubmitting(false);
                  await mutate("/api/pools");
                  onOpenChange(false);
                })
                .catch((e) => console.error(e));
            }}
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
