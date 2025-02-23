"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export function TodoItem({
  task,
  onDelete,
}: {
  task: TodoListElement;
  onDelete: () => Promise<void>;
}) {
  const [isLodingDelete, startDeleteTransition] = useTransition();
  const handleDelete = () => {
    startDeleteTransition(async () => {
      await onDelete();
    });
  };
  return (
    <div>
      <div>{task.desription}</div>
      <Button disabled={isLodingDelete} onClick={handleDelete}>
        Удалить
      </Button>
    </div>
  );
}
