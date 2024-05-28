"use client";

import qs from "query-string";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useGetSummaries } from "@/features/summary/api/use-get-summary";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format, subDays } from "date-fns";
import { formatDataRange } from "@/lib/utils";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

export const DateFilter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const { isLoading: isLoadingSummary } = useGetSummaries();
  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };

    const url = qs.stringifyUrl(
      { url: pathname, query },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          disabled={isLoadingSummary}
          variant={"outline"}
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white-30 transition"
        >
          <span>{formatDataRange(paramState)}</span>
          <ChevronDown className="size-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          disabled={isLoadingSummary}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              variant={"outline"}
              className="w-full"
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
