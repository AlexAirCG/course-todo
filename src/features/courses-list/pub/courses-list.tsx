import { revalidatePath } from "next/cache";
import { coursesRepository } from "../courses.repository";
import { CourseItem } from "../ui/course-item";
import { TodoItem } from "../ui/todo-item";

export async function CoursesList({
  revalidatePagePath,
}: {
  revalidatePagePath: string;
}) {
  const coursesList = await coursesRepository.getCourseList();
  const todoList = await coursesRepository.getTodoList();

  const handlerDeleteActionCourse = async (courseId: string) => {
    "use server";

    await coursesRepository.deleteCourseElement({ id: courseId });
    revalidatePath(revalidatePagePath);
  };

  const handlerDeleteActionTodo = async (taskId: string) => {
    "use server";

    await coursesRepository.deleteCourseElement({ id: taskId });
    revalidatePath(revalidatePagePath);
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        {coursesList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handlerDeleteActionCourse.bind(null, course.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {todoList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={handlerDeleteActionTodo.bind(null, task.id)}
          />
        ))}
      </div>
    </div>
  );
}
