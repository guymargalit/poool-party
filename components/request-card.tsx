import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Interval } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function RequestCard({
  note,
  interval,
  users = [],
  active = false,
  onClick,
  className,
}: {
  note: string;
  interval: Interval | "";
  users?: any[];
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const intervalText = {
    [""]: "One-time",
    [Interval.DAY]: "Daily",
    [Interval.WEEK]: "Weekly",
    [Interval.MONTH]: "Monthly",
  };
  return (
    <Card
      className={cn(
        "flex py-1 items-center cursor-pointer border-none hover:bg-background shadow-none",
        !active ? "opacity-50" : "",
        className
      )}
      onClick={onClick}
    >
      <div
        className="relative flex items-center"
        style={{ width: 40, height: 40 }}
      >
        {users.slice(0, 2).map((user, index) => (
          <Avatar
            key={index}
            className={`absolute rounded-full ring-2 ring-white ${
              index > 0 ? `-ml-2 -mt-2` : ""
            }`}
            style={{
              zIndex: users.length - index,
              left: index * 20,
              top: index * 20,
              height: users.length === 1 ? 40 : 30,
              width: users.length === 1 ? 40 : 30,
            }}
          >
            <AvatarImage src={user.venmo.image} />
          </Avatar>
        ))}
      </div>
      <CardHeader className="p-0 ml-4">
        <CardTitle className="text-base leading-none font-semibold line-clamp-1">
          {note}
        </CardTitle>
        <CardContent className="p-0 text-sm leading-none line-clamp-1 font-medium text-muted-foreground">
          {users.map((user) => user.venmo.displayName).join(", ")}
        </CardContent>
      </CardHeader>
      <div className="flex flex-col justify-center items-end gap-1 ml-auto h-10">
        <span className="text-sm font-medium text-muted-foreground">
          {(
            users.reduce((acc, user) => acc + user.amount / 100, 0) /
            users.length
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <Badge>{intervalText[interval]}</Badge>
      </div>
    </Card>
  );
}
