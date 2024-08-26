import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LucidePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function VenmoCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex text-left shadow-none rounded-3xl p-4 cursor-pointer bg-gray-50 hover:bg-gray-100",
        className
      )}
    >
      <div
        className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 p-2 rounded-full text-white bg-blue-500`}
      >
        <svg className="fill-white" viewBox="0 0 20 20">
          <path d="M17.8403 0.77C18.5249 1.87835 18.8338 3.01961 18.8338 4.46184C18.8338 9.06059 14.8274 15.0349 11.5754 19.23H4.14835L1.17 1.77723L7.67325 1.17209L9.2479 13.5911C10.7198 11.242 12.5352 7.55014 12.5352 5.03327C12.5352 3.65605 12.2945 2.71704 11.9181 1.94497L17.8403 0.77Z"></path>
        </svg>
      </div>
      <CardHeader className="p-0 ml-4">
        <CardTitle className="text-lg leading-none font-semibold">
          Link your Venmo
        </CardTitle>
        <CardDescription className="text-base leading-tight line-clamp-2 pb-1 font-medium text-gray-500">
          Link your Venmo account to start sending payment requests.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
