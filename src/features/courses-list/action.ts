"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "./courses.repository";

export const createCourseAction = async (
  command: CreatedCourseListElementCommand,
  revalidatePagePath: string
) => {
  await coursesRepository.createCourseElement(command);
  revalidatePath(revalidatePagePath);
};

export const createTodoAction = async (
  command: CreatedTodoListElementCommand,
  revalidatePagePath: string
) => {
  await coursesRepository.createTodoElement(command);
  revalidatePath(revalidatePagePath);
};
