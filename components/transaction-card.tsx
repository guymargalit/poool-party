import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getColorAndEmoji } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Status } from "@prisma/client";

function getStatusColor(status: Status) {
  if (status === Status.PENDING) {
    return "bg-amber-500";
  }
  if (status === Status.CANCELLED) {
    return "bg-gray-500";
  }
  if (status === Status.SUCCEEDED) {
    return "bg-green-500";
  }
  if (status === Status.FAILED) {
    return "bg-red-500";
  }
}

export function TransactionCard({
  note,
  amount,
  name,
  image,
  status,
  className,
}: {
  note: string;
  amount: number;
  name: string;
  image: string | null;
  status: Status;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex py-1 items-center cursor-pointer border-none hover:bg-background shadow-none",
        className
      )}
    >
      <div className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10">
        <Avatar>
          <AvatarImage src={image || ""} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader className="p-0 ml-4">
        <CardTitle className="text-base leading-none font-semibold line-clamp-1">
          {note}
        </CardTitle>
        <CardContent className="p-0 text-sm leading-none line-clamp-1 font-medium text-muted-foreground">
          {name}
        </CardContent>
      </CardHeader>
      <div className="flex flex-col justify-center items-end gap-1 ml-auto h-10">
        <span className="text-sm font-medium text-muted-foreground">
          {(amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>
    </Card>
  );
}
