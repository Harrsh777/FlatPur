"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import DatePicker from "./DatePicker";
import SearchPopupNav from "../base/SearchPopupNav";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { addDays, parse, format, differenceInDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import MobileNav from "../base/MobileNav";

export default function SearchPopup({ session }: { session: any }) {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    country: "Anywhere",
    weeks: "",
  });
  const [date, setDate] = useState<Array<DateStateType>>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const startDateParam = params?.get("startDate");
    const endDateParam = params?.get("endDate");

    if (startDateParam && endDateParam) {
      const startDate = parse(startDateParam, "dd-MM-y", new Date());
      const endDate = parse(endDateParam, "dd-MM-y", new Date());

      const difference = differenceInDays(endDate, startDate);

      if (difference) {
        setSearchParams({
          ...searchParams,
          weeks: `${difference} days`,
          country: params?.get("country") ? params?.get("country")! : "Anywhere",
        });
      }
    }
  }, [params]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDateChange = (item: any) => {
    setDate([item.selection]);
  };

  const handleSubmit = () => {
    const startDate = format(date?.[0].startDate, "dd-MM-y");
    const endDate = format(date?.[0].endDate, "dd-MM-y");

    router.replace(
      `/?country=${search}&startDate=${startDate}&endDate=${endDate}`
    );
    setOpen(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <div className="w-full md:w-auto">
          <div
            className={`md:flex space-x-2 shadow-sm rounded-3xl p-2 border items-center hidden cursor-pointer ${
              isFocused ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setOpen(true)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <span className="pl-2 text-sm">{searchParams.country}</span>
            <span>|</span>
            <span className="text-sm">
              {searchParams.weeks !== "" ? searchParams.weeks : "Any week"}
            </span>
            <span>|</span>
            <span className="text-muted-foreground text-sm">Add Guest</span>
            <span className="bg-brand text-white p-2 rounded-full pr-2">
              <Search width={14} height={14} />
            </span>
          </div>
          <div onClick={() => setOpen(true)}>
            <MobileNav />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="top" showCloseIcon={false} className="text-center">
        <SheetHeader>
          <SearchPopupNav
            session={session}
            searchCallback={handleSearchChange}
          />
          <SheetDescription asChild>
            <div className="flex justify-center items-center flex-col">
              <DatePicker state={date} changeCallback={handleDateChange} />

              <div className="flex w-1/3 justify-between items-center mt-5">
                <Button className="bg-brand" onClick={handleSubmit}>
                  Search
                </Button>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
