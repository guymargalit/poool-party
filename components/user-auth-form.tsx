"use client";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { otpAuthSchema, userAuthSchema } from "@/lib/validations/auth";
import { Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import * as z from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

function EmailForm({ setEmail }: { setEmail: (value: string) => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("resend", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    setEmail(data.email);
  }

  return (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={userAuthSchema}
      fieldConfig={{
        email: {
          inputProps: {
            type: "email",
            placeholder: "name@example.com",
            showLabel: false,
          },
        },
      }}
    >
      <Button
        className="w-full h-12 text-white font-bold"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={3} />
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" strokeWidth={3} />
            Continue with Email
          </>
        )}
      </Button>
      <p className="text-primary text-sm">
        By continuing, you agree to our{" "}
        <a href="/terms" className="text-primary underline">
          terms and conditions
        </a>
        .
      </p>
    </AutoForm>
  );
}

function OtpForm({ email }: { email: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();

  async function onSubmit(values: { otp: string }) {
    setIsLoading(true);

    // http://localhost:3000/api/auth/callback/resend?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&token=221563&email=guy%40margalit.com

    const otpResult = await fetch(
      `/api/auth/callback/resend?email=${email}&token=${
        values.otp
      }&callbackUrl=${searchParams?.get("from") || "/dashboard"}`
    );

    if (!otpResult?.ok) {
      return toast({
        title: "Invalid OTP.",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }

    // Handle successful OTP verification
    await signIn("email", {
      redirect: false,
    });
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="text-white font-medium -mb-2">
          Enter the one-time code sent to {email}
        </p>
      </div>
      <AutoForm
        onSubmit={onSubmit}
        formSchema={otpAuthSchema}
        fieldConfig={{
          otp: {
            fieldType: "otp",
            inputProps: {
              maxLength: 6,
              showLabel: false,
            },
          },
        }}
      >
        <Button
          type="submit"
          className="w-full h-12 text-white font-bold"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={3} />
          ) : (
            "Verify code"
          )}
        </Button>
      </AutoForm>
    </>
  );
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = React.useState<string | null>(null);

  if (email) {
    return (
      <div className={cn("grid gap-6", className)} {...props}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <OtpForm email={email} />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EmailForm setEmail={setEmail} />
      </React.Suspense>
    </div>
  );
}
