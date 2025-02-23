"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createCourseAction } from "../action";
import { cn } from "@/lib/utils";

const createCourseFormShema = z.object({
  name: z.string(),
  desctiption: z.string(),
});

export function CreateCourseForm({
  className,
  revalidatePagePath,
}: {
  className: string;
  revalidatePagePath: string;
}) {
  const [isCreateTransition, startCreateTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createCourseFormShema),
    defaultValues: {
      name: "",
      desctiption: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startCreateTransition(async () => {
            createCourseAction(data, revalidatePagePath);
          });
        })}
        className={cn(className, "flex flex-row")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-600">Задача</FormLabel>

              <FormControl>
                <Input placeholder="название..." {...field} />
              </FormControl>
              <Button type="submit">add</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
