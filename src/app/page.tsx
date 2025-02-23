import { Button } from "@/components/ui/button";
import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";
import { UserPage } from "@/features/courses-list/pub/create-todo-form";

export default function Home() {
  return (
    // <div className="flex min-h-screen p-8 pb-20">
    <div className="container mx-auto p-5 pt-10">
      <CreateCourseForm
        className="flex flex-col max-w-72 gap-2"
        revalidatePagePath="/"
      />
      <CoursesList revalidatePagePath="/" />
      {/* <div className="flex flex-col max-w-[200px] mb gap-2"> */}
      {/* <CreateTodoForm className="gap-2" revalidatePagePath="/" /> */}
      {/* <UserPage /> */}
      {/* </div> */}
    </div>
    // </div>
  );
}
// items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]
