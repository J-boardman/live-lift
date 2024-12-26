import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  date: z.number(),
  competitionType: z.enum(["powerlifting"]),
  planType: z.enum(["free", "premium", "enterprise"]),
});

export function AddCompetitionDialog() {
  const [open, setOpen] = useState(false);
  const addCompetition = useMutation(api.competitions.create);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "Powerlifting Competition",
      date: Date.now(),
      competitionType: "powerlifting",
      planType: "free",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const competitionId = await addCompetition({
      competition: values,
    });

    setOpen(false);

    navigate({
      to: "/competitions/$id",
      params: {
        id: competitionId,
      },
    });
  }

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date.getTime());
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("date") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue("date", newDate.getTime());
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Link to="/competitions" className="flex items-center gap-2">
          <Button size={"sm"} variant={"outline"}>
            <PlusIcon className="size-4" />
            New Competition
          </Button>
        </Link>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription className="sr-only">
          Add Competition
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Add Competition</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Competition Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy HH:mm")
                          ) : (
                            <span>DD/MM/YYYY HH:mm</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="sm:flex">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto h-[300px]">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      new Date(field.value).getHours() === hour
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("hour", hour.toString())
                                    }
                                  >
                                    {hour}
                                  </Button>
                                )
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto h-[300px]">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      new Date(field.value).getMinutes() ===
                                        minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString()
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                )
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a competition type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="powerlifting">
                          Powerlifting
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="planType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button className="w-full" type="submit">
                Add Competition
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
