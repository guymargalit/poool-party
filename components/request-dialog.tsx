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
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Interval } from "@prisma/client";
import { Check, ChevronLeft, Loader2, User, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function ConfirmationStep({
  selectedUsers,
  setSelectedUsers,
  totalAmount,
  setTotalAmount,
  interval,
  setInterval,
  startDate,
  setStartDate,
  note,
  setNote,
}: {
  selectedUsers: any[];
  setSelectedUsers: (users: any[]) => void;
  totalAmount: string;
  setTotalAmount: (amount: string) => void;
  interval: Interval;
  setInterval: (interval: Interval) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  note: string;
  setNote: (note: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 pt-0 p-4">
        {selectedUsers.length > 1 && (
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-base">Total Amount</span>
            <CurrencyInput
              prefix="$"
              allowDecimals
              decimalScale={2}
              placeholder="$0"
              className={`h-10 border float-right clear-both ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[100px] text-base font-bold flex items-center bg-primary/5 border-input rounded-2xl px-2 py-2 ${
                parseFloat(totalAmount) > 0 &&
                selectedUsers.reduce(
                  (acc, user) => acc + parseFloat(user.amount),
                  0
                ) !== parseFloat(totalAmount)
                  ? "border-red-500 border-2"
                  : ""
              }`}
              value={totalAmount}
              allowNegativeValue={false}
              onValueChange={(value: string | undefined) => {
                if (!value) return;
                setTotalAmount(value);
                const perUserAmount = (
                  parseFloat(value) / selectedUsers.length
                ).toFixed(2);
                let remainingAmount = parseFloat(value);
                setSelectedUsers(
                  selectedUsers.map((user, index) => {
                    const amount =
                      index === selectedUsers.length - 1
                        ? remainingAmount.toFixed(2)
                        : perUserAmount;
                    remainingAmount -= parseFloat(amount);
                    return {
                      ...user,
                      amount: amount.toString(),
                      manualAmount: false,
                    };
                  })
                );
              }}
            />
          </div>
        )}
        {selectedUsers.map((user: any, index: number) => (
          <div
            key={user.username}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.profile_picture_url} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-bold">{user.display_name}</span>
            </div>
            <CurrencyInput
              prefix="$"
              decimalScale={2}
              allowDecimals
              allowNegativeValue={false}
              value={user.amount}
              placeholder="$0"
              className="h-10 border float-right clear-both ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[100px] text-base font-bold flex items-center bg-primary/5 border-input rounded-2xl px-2 py-2"
              onValueChange={(value: string | undefined) => {
                if (!value) return;
                const remainingAmount =
                  parseFloat(totalAmount) - parseFloat(value);
                const remainingUsers = selectedUsers.length - 1;
                const perUserAmount = (
                  remainingAmount / remainingUsers
                ).toFixed(2);
                setSelectedUsers(
                  selectedUsers.map((u, i) => {
                    if (i === index) {
                      return {
                        ...u,
                        amount: value.toString(),
                        manualAmount: true,
                      };
                    } else if (!u.manualAmount) {
                      return { ...u, amount: perUserAmount.toString() };
                    } else {
                      return u;
                    }
                  })
                );
              }}
            />
          </div>
        ))}
        <div className="mt-2 border-t border-primary/10"></div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-base">Interval</span>
              <Select
                value={interval}
                onValueChange={(value) => setInterval(value as Interval)}
                defaultValue={Interval.MONTH}
              >
                <SelectTrigger className="w-[180px] font-bold border-input rounded-2xl bg-primary/5 px-4 py-2">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <div className="rounded-2xl">
                    <SelectItem
                      className="font-bold rounded-2xl"
                      value={Interval.WEEK}
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      className="font-bold rounded-2xl"
                      value={Interval.MONTH}
                    >
                      Monthly
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>
            </div>
            {interval && (
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-bold text-base">
                  Start Date
                </span>
                <div className="flex items-center justify-center">
                  <DatePicker
                    date={startDate}
                    setDate={(date) => setStartDate(date || new Date())}
                    className="w-[180px] font-bold border-input rounded-2xl bg-primary/5 px-4 py-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 border-t border-primary/10"></div>
        <div className="flex items-center justify-between gap-2">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's this for?"
            className="font-bold text-base h-12 border-input rounded-2xl bg-primary/5 px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
}

function SearchStep({
  selectedUsers,
  setSelectedUsers,
}: {
  selectedUsers: any[];
  setSelectedUsers: (users: any[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading } = useSWR(
    `/api/venmo/users?query=${searchTerm}`,
    fetcher
  );

  const handleUserClick = (user: any) => {
    if (!selectedUsers.some((u) => u.username === user.username)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchTerm("");
    }
  };

  const handleRemoveUser = (username: string) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user.username !== username)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedUsers.length > 0
    ) {
      handleRemoveUser(selectedUsers[selectedUsers.length - 1].username);
    }
  };

  return (
    <>
      <div className="p-4 md:p-0 pt-0">
        <div className="flex items-center bg-primary/5 border-input rounded-2xl px-4 py-2 pr-2">
          <span className="text-muted-foreground text-base font-bold">To</span>
          <div className="flex flex-wrap items-center ml-3 gap-1 flex-grow">
            {selectedUsers.length > 0 &&
              selectedUsers.map((user: any) => (
                <Badge
                  key={user.username}
                  className="flex items-center text-sm gap-1 h-8 cursor-pointer"
                  onClick={() => handleRemoveUser(user.username)}
                >
                  <span>{user.display_name}</span>
                </Badge>
              ))}
            <div className="flex flex-grow">
              <Input
                placeholder="Venmo @username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-0 p-1 outline-none bg-transparent placeholder:text-muted-foreground/50 placeholder:text-base placeholder:font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          {searchTerm.length > 0 && (
            <Button
              onClick={() => setSearchTerm("")}
              className="ml-2 p-1 w-7 h-7 min-w-7 min-h-7 rounded-full bg-primary/90 hover:bg-primary transition-colors duration-200"
            >
              <X className="h-4 w-4 text-background" strokeWidth={4} />
            </Button>
          )}
        </div>
        <div
          className="flex flex-col gap-1 h-[300px] overflow-y-auto mt-4 transition-opacity duration-500"
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          {users.map((user: any) => {
            const isSelected = selectedUsers.some(
              (u) => u.username === user.username
            );
            return (
              <div
                key={user.username}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-xl transition-colors duration-200 ${
                  selectedUsers.some((u) => u.username === user.username)
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleUserClick(user)}
              >
                <Avatar>
                  <AvatarImage src={user.profile_picture_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 flex-grow">
                  <span className="font-bold text-base leading-none">
                    {user.display_name}
                  </span>
                  <span className="text-gray-500 text-sm leading-none">
                    @{user.username}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center w-6 h-6 min-w-6 min-h-6 rounded-full border-2 ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-primary/50"
                  }`}
                >
                  {isSelected ? (
                    <Check
                      className="h-3 w-3 text-background"
                      strokeWidth={4}
                    />
                  ) : (
                    <div className="h-4 w-4"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function RequestDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [interval, setInterval] = useState<Interval>(Interval.MONTH);
  const [note, setNote] = useState("");

  const steps = [
    {
      component: (
        <SearchStep
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      ),
      buttonConfig: { text: "Continue" },
    },
    {
      component: (
        <ConfirmationStep
          {...{
            selectedUsers,
            setSelectedUsers,
            totalAmount,
            setTotalAmount,
            interval,
            setInterval,
            startDate,
            setStartDate,
            note,
            setNote,
          }}
        />
      ),
      buttonConfig: {
        text: "Confirm",
        icon: (
          <svg className="h-4 w-4 fill-background mr-2" viewBox="0 0 20 20">
            <path d="M17.8403 0.77C18.5249 1.87835 18.8338 3.01961 18.8338 4.46184C18.8338 9.06059 14.8274 15.0349 11.5754 19.23H4.14835L1.17 1.77723L7.67325 1.17209L9.2479 13.5911C10.7198 11.242 12.5352 7.55014 12.5352 5.03327C12.5352 3.65605 12.2945 2.71704 11.9181 1.94497L17.8403 0.77Z"></path>
          </svg>
        ),
      },
    },
  ];

  async function handleSubmit() {
    setSubmitting(true);

    try {
      const res = await fetch("/api/pools", {
        method: "POST",
        body: JSON.stringify({
          users: selectedUsers,
          interval,
          startDate,
          note,
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        setSubmitting(false);
      } else {
        await mutate("/api/pools");
        await mutate("/api/transactions?status=pending");
        setOpen(false);
        setSubmitting(false);
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen} dismissable={false}>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="rounded-none md:rounded-2xl h-screen md:h-auto">
        <CredenzaHeader className="flex flex-row justify-between items-center">
          {currentStep === 0 ? (
            <CredenzaTitle className="text-xl font-bold">
              New Pool
            </CredenzaTitle>
          ) : (
            <ChevronLeft
              onClick={() => setCurrentStep(currentStep - 1)}
              className="h-6 w-6 cursor-pointer hover:text-primary/80"
              strokeWidth={3}
            />
          )}
          {currentStep === 0 && (
            <CredenzaClose
              style={{ marginTop: 0 }}
              className="rounded-sm ring-offset-background transition-colors hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5" strokeWidth={4} />
              <span className="sr-only">Close</span>
            </CredenzaClose>
          )}
        </CredenzaHeader>
        {steps[currentStep].component}
        <CredenzaFooter>
          <Button
            className="w-full h-12 rounded-full text-base"
            disabled={
              (currentStep === steps.length - 1 &&
              (selectedUsers.some((user) => parseFloat(user.amount) <= 0) || !note))
            }
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                {steps[currentStep].buttonConfig.icon}
                {steps[currentStep].buttonConfig.text}
              </>
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
