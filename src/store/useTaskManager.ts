import create from "zustand";

type Task = {
  id: number,
  title: string,
  completed: boolean,
};

type TaskStore = {
  tasks: Task[];
  searchTask: string
  setSearchTask: (title: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: { title: string }) => void;
  deleteTask: (taskId: number) => void;
};

const useTaskManager = create<TaskStore>((set) => ({
  tasks: [] ,

  setSearchTask: (title) => {
    set((state) => ({ searchTask: title }));
  },

  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  updateTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export {
  useTaskManager
}