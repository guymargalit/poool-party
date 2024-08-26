"use client";

import { useEffect } from "react";

import { PoolDialog } from "@/components/pool-dialog";
import { RequestCard } from "@/components/request-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Interval } from "@prisma/client";
import { useState } from "react";
import { usePools } from "@/data/pools";

type Pool = {
  id: string;
  note: string;
  interval: string;
  active: boolean;
  users: {
    amount: number;
    venmo: { image: string | null; displayName: string };
  }[];
};

export default function Pools() {
  const { data: pools, isLoading } = usePools();
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Accordion defaultValue="pools" type="single" collapsible>
      <PoolDialog
        open={selectedPool !== null}
        onOpenChange={(open) => setSelectedPool(open ? selectedPool : null)}
        data={selectedPool}
      />
      <AccordionItem className="border-none" value="pools">
        <AccordionTrigger className="pb-1 pl-1">
          <span className="font-medium">Pools</span>
        </AccordionTrigger>
        <AccordionContent className="p-1 flex flex-col gap-2">
          {pools.length === 0 ? (
            <div className="flex flex-col items-center justify-center max-w-[320px] mx-auto mt-8">
              <h3 className="text-lg font-semibold">No requests, yet</h3>
              <p className="text-lg p-4 pb-6 leading-tight font-medium max-w-[320px] text-center text-muted-foreground">
                Start sending Venmo requests to your friends to get started.
              </p>
            </div>
          ) : (
            pools.map((pool: Pool) => (
              <RequestCard
                key={pool.id}
                note={pool.note}
                interval={pool.interval as Interval}
                users={pool.users}
                active={pool.active}
                onClick={() => setSelectedPool(pool)}
              />
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
