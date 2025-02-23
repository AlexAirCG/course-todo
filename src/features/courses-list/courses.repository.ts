import { dbClient } from "@/lib/db";
import { cache } from "react";

class CourseRepository {
  getCourseList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany()
  );

  createCourseElement = (
    command: CreatedCourseListElementCommand
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };

  getTodoList = cache(
    (): Promise<TodoListElement[]> => dbClient.todo.findMany()
  );

  createTodoElement = (
    command: CreatedTodoListElementCommand
  ): Promise<TodoListElement> => {
    return dbClient.todo.create({
      data: command,
    });
  };

  deleteTodoElement = (command: DeleteTodoListElementCommand) => {
    return dbClient.todo.delete({
      where: { id: command.id },
    });
  };
}

export const coursesRepository = new CourseRepository();
