type CourseListElement = {
  id: string;
  name: string;
  desctiption: string;
};

type CreatedCourseListElementCommand = {
  name: string;
  desctiption: string;
};

type DeleteCourseListElementCommand = {
  id: string;
};

type TodoListElement = {
  id: string;
  desription: string;
};

type CreatedTodoListElementCommand = {
  id: string;
  desription: string;
};

type DeleteTodoListElementCommand = {
  id: string;
};
