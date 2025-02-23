"use client";

import { startTransition, use, useState, useTransition } from "react";
import { coursesRepository } from "../courses.repository";
import { Todo } from "@prisma/client";

type User = {
  id: string;
  desription: string;
};

const defaultUsersPromise = coursesRepository.getTodoList();

export function UserPage() {
  const [usersPromis, setUsersPromis] = useState(defaultUsersPromise);
  const refetchUsers = () =>
    startTransition(() => setUsersPromis(coursesRepository.getTodoList()));
  return (
    <main className="container mx-auto p-5 pt-10">
      <h1 className="text-3xl font-bold underline">Задача</h1>
      <CreateUserForm refetchUsers={refetchUsers} />
      <UserList usersPromis={usersPromis} refetchUsers={refetchUsers} />
    </main>
  );
}

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [desription, setDesription] = useState("");
  const [isPanding, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await coursesRepository.createTodoElement({
        desription,
        id: crypto.randomUUID(),
      });
      refetchUsers();
      setDesription("");
    });
  };

  return (
    <form className="flex flex-col max-w-2xl gap-2" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded"
        type="text"
        value={desription}
        onChange={(e) => setDesription(e.target.value)}
        placeholder="название..."
        disabled={isPanding}
      />
      <button
        className="w-[100px] bg-blue-500 disabled:bg-gray-400"
        disabled={isPanding}
        type="submit"
      >
        Добавить
      </button>
    </form>
  );
}

export function UserList({
  usersPromis,
  refetchUsers,
}: {
  usersPromis: Promise<TodoListElement[]>;
  refetchUsers: () => void;
}) {
  const users = use(usersPromis);
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard key={user.id} user={user} refetchUsers={refetchUsers} />
      ))}
    </div>
  );
}

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User;
  refetchUsers: () => void;
}) {
  const [isPanding, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await coursesRepository.deleteCourseElement(user);
      refetchUsers();
    });
  };
  return (
    <div
      className="flex gap-2 border bg-amber-200 p-2 mt-5 rounded"
      key={user.id}
    >
      <div>{user.desription}</div>
      <button
        className="w-[100px] bg-red-400"
        disabled={isPanding}
        onClick={handleDelete}
      >
        Удалить
      </button>
    </div>
  );
}
