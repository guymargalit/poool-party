"use client";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { otpAuthSchema, venmoAuthSchema } from "@/lib/validations/auth";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Loader2, LockIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import * as React from "react";
import * as z from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof venmoAuthSchema>;

function UsernameForm({
  setUsername,
  setPassword,
  deviceId,
}: {
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  deviceId: string | null;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const body = {
      username: data.username,
      password: data.password,
      deviceId: deviceId,
    };

    const result = await fetch("/api/auth/venmo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await result?.json();
    if (response?.error) {
      // Check if two factor error
      if (response?.error?.code === 81109) {
        setUsername(data.username);
        setPassword(data.password);
      } else {
        setIsLoading(false);
        return toast({
          title: "Something went wrong.",
          description: response.error?.message,
          variant: "destructive",
        });
      }
    }
    // else if (response?.user) {
    //   await mutate(response?.user);
    //   setLoading(false);
    //   Router.push("/profile");
    // }

    setIsLoading(false);
  }

  return (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={venmoAuthSchema}
      fieldConfig={{
        username: {
          inputProps: {
            type: "text",
            placeholder: "Enter email, mobile, or username",
            showLabel: false,
          },
        },
        password: {
          inputProps: {
            type: "password",
            placeholder: "Password",
            showLabel: false,
          },
        },
      }}
    >
      <div className="flex flex-col">
        <Button
          variant="venmo"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <svg className="h-4 w-4 fill-white mr-2" viewBox="0 0 20 20">
                <path d="M17.8403 0.77C18.5249 1.87835 18.8338 3.01961 18.8338 4.46184C18.8338 9.06059 14.8274 15.0349 11.5754 19.23H4.14835L1.17 1.77723L7.67325 1.17209L9.2479 13.5911C10.7198 11.242 12.5352 7.55014 12.5352 5.03327C12.5352 3.65605 12.2945 2.71704 11.9181 1.94497L17.8403 0.77Z"></path>
              </svg>
              Link Venmo Account
            </>
          )}
        </Button>
        <p className="text-gray-500 text-sm flex items-center justify-center mt-2">
          <LockIcon className="h-4 w-4 min-w-4 min-h-4 mr-2" />
          Poool Party does not store your Venmo password.
        </p>
      </div>
    </AutoForm>
  );
}

function OtpForm({
  username,
  password,
  deviceId,
}: {
  username: string | null;
  password: string | null;
  deviceId: string | null;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: { otp: string }) {
    setIsLoading(true);

    const body = {
      username: username,
      password: password,
      deviceId: deviceId,
      otp: values.otp,
    };

    try {
      const result = await fetch("/api/auth/venmo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await result?.json();
      if (response?.error) {
        setIsLoading(false);
        return toast({
          title: "Something went wrong.",
          description: response.error?.message,
          variant: "destructive",
        });
      }

      // Handle successful OTP verification
      await signIn("email", {
        redirect: false,
      });
    } catch (error) {
      setIsLoading(false);
      return toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="text-gray-500 text-center">
          Enter the code sent to your device.
        </p>
      </div>
      <AutoForm
        onSubmit={onSubmit}
        formSchema={otpAuthSchema}
        className="flex flex-col justify-center items-center gap-2"
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
          variant="venmo"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Submit Code"
          )}
        </Button>
      </AutoForm>
    </>
  );
}

export function VenmoAuthForm({ className, ...props }: UserAuthFormProps) {
  const [username, setUsername] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [deviceId, setDeviceId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadFingerprint = async () => {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      setDeviceId(result.visitorId);
    };

    loadFingerprint();
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex items-center justify-center">
        <svg className="h-6 mb-2" viewBox="0 0 211 41">
          <path
            d="M34.5771 0.822021C35.9974 3.16733 36.6377 5.58301 36.6377 8.63451C36.6377 18.3672 28.3277 31.0107 21.5832 39.8888H6.17825L0 2.95296L13.4887 1.67258L16.7552 27.9548C19.8074 22.9834 23.5738 15.171 23.5738 9.84453C23.5738 6.92902 23.0743 4.94318 22.2935 3.30806L34.5771 0.822021Z"
            fill="#0074DE"
          />
          <path
            d="M52.0595 17.0887C54.5417 17.0887 60.7907 15.9534 60.7907 12.4024C60.7907 10.6973 59.5848 9.84676 58.1637 9.84676C55.6776 9.84676 52.415 12.8275 52.0595 17.0887ZM51.7751 24.1214C51.7751 28.4573 54.1865 30.1584 57.3834 30.1584C60.8647 30.1584 64.1979 29.3078 68.5303 27.1065L66.8985 38.1852C63.846 39.6763 59.0888 40.6713 54.4713 40.6713C42.7584 40.6713 38.5664 33.5693 38.5664 24.6908C38.5664 13.1834 45.3853 0.9646 59.4436 0.9646C67.1837 0.9646 71.5117 5.30013 71.5117 11.3371C71.5124 21.0695 59.0188 24.051 51.7751 24.1214Z"
            fill="#0074DE"
          />
          <path
            d="M110.439 9.34835C110.439 10.7687 110.224 12.8289 110.009 14.1753L105.962 39.7474H92.8275L96.5196 16.3059C96.5896 15.6701 96.8048 14.3901 96.8048 13.6799C96.8048 11.9747 95.7393 11.5493 94.4583 11.5493C92.7568 11.5493 91.0513 12.3298 89.9155 12.8997L85.7278 39.7477H72.5195L78.5537 1.46185H89.9855L90.1302 4.51773C92.8272 2.74224 96.3785 0.822022 101.417 0.822022C108.093 0.821292 110.439 4.2319 110.439 9.34835Z"
            fill="#0074DE"
          />
          <path
            d="M149.432 5.15577C153.194 2.45936 156.746 0.9646 161.643 0.9646C168.387 0.9646 170.733 4.37521 170.733 9.49167C170.733 10.9121 170.518 12.9723 170.304 14.3187L166.261 39.8907H153.123L156.886 15.9538C156.955 15.3139 157.101 14.5334 157.101 14.0383C157.101 12.1184 156.035 11.6926 154.754 11.6926C153.123 11.6926 151.492 12.4028 150.281 13.043L146.094 39.8911H132.96L136.722 15.9541C136.791 15.3143 136.933 14.5338 136.933 14.0387C136.933 12.1188 135.866 11.693 134.59 11.693C132.885 11.693 131.183 12.4735 130.047 13.0434L125.856 39.8915H112.652L118.686 1.60552H129.978L130.333 4.80176C132.96 2.88628 136.508 0.966057 141.265 0.966057C145.384 0.964599 148.08 2.74045 149.432 5.15577Z"
            fill="#0074DE"
          />
          <path
            d="M196.869 16.3076C196.869 13.1821 196.087 11.0512 193.746 11.0512C188.563 11.0512 187.498 20.2133 187.498 24.9003C187.498 28.456 188.493 30.6566 190.834 30.6566C195.733 30.6566 196.869 20.9942 196.869 16.3076ZM174.15 24.3345C174.15 12.2608 180.539 0.963379 195.238 0.963379C206.314 0.963379 210.363 7.49985 210.363 16.522C210.363 28.4556 204.043 40.814 188.989 40.814C177.842 40.814 174.15 33.497 174.15 24.3345Z"
            fill="#0074DE"
          />
        </svg>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        {username ? (
          <OtpForm
            username={username}
            password={password}
            deviceId={deviceId}
          />
        ) : (
          <UsernameForm
            setUsername={setUsername}
            setPassword={setPassword}
            deviceId={deviceId}
          />
        )}
      </React.Suspense>
    </div>
  );
}
