export const TaskListStyles = {
  card: "mt-4 max-h-[24rem] overflow-y-auto p-4 border border-blue-300 shadow-md rounded bg-gray-800 mx-auto w-full sm:w-3/4 lg:w-2/3 xl:w-[40rem]",

  taskItem: (completed: boolean) =>
    `p-4 border rounded shadow-sm text-black flex items-center ${
      completed ? "bg-blue-300" : "bg-gray-300"
    }`,

  checkbox: "mr-4",

  taskTitle: (completed: boolean) =>
    `text-m font-bold flex-grow ${
      completed ? "line-through text-gray-600" : "text-gray-800"
    } whitespace-pre-wrap`,

  divider: "w-px h-full bg-blue-500 mx-4",

  buttonGroup: "flex gap-2 ml-auto flex-col sm:flex-row", 

  editButton: (completed: boolean) =>
    `text-xs px-2 py-1 border-black ${
      completed
        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
        : "bg-blue-800 text-white hover:bg-blue-600"
    }`,

  deleteButton:
    "bg-red-600 text-white text-xs px-2 py-1 hover:bg-red-500 border-black",
};
