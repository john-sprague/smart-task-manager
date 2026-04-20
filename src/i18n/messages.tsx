import { LOCALES } from "../constants";

export const messages = {
  [LOCALES.EN]: {
    app: {
      title: "Smart Task Manager",
      empty: "No tasks yet. Add one above!",
      noResults: 'No tasks found for "{query}"',
    },
    taskInput: {
      taskLabel: "Task",
      taskPlaceholder: "Add a new task...",
      priorityLabel: "Priority",
      dueDateLabel: "Due date",
      submitButton: "Add Task",
    },
    validation: {
      taskRequired: "Task is required",
      priorityRequired: "Select a priority",
      dueDateRequired: "Due date is required",
    },
    search: {
      placeholder: "Search tasks...",
      clear: "Clear search",
    },
    filters: {
      all: "All",
      active: "Active",
      completed: "Completed",
    },
    priority: {
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    task: {
      delete: "Delete task",
    },
    dueDate: {
      select: "Select due date",
      clear: "Clear due date",
      locale: "en-US",
    },
  },
  [LOCALES.ES]: {
    app: {
      title: "Administrador Inteligente de Tareas",
      empty: "Todavía no hay tareas. Agrega una arriba.",
      noResults: 'No se encontraron tareas para "{query}"',
    },
    taskInput: {
      taskLabel: "Tarea",
      taskPlaceholder: "Agrega una nueva tarea...",
      priorityLabel: "Prioridad",
      dueDateLabel: "Fecha límite",
      submitButton: "Agregar tarea",
    },
    validation: {
      taskRequired: "La tarea es obligatoria",
      priorityRequired: "Selecciona una prioridad",
      dueDateRequired: "La fecha límite es obligatoria",
    },
    search: {
      placeholder: "Buscar tareas...",
      clear: "Limpiar búsqueda",
    },
    filters: {
      all: "Todas",
      active: "Activas",
      completed: "Completadas",
    },
    priority: {
      high: "Alta",
      medium: "Media",
      low: "Baja",
    },
    task: {
      delete: "Eliminar tarea",
    },
    dueDate: {
      select: "Selecciona fecha límite",
      clear: "Borrar fecha límite",
      locale: "es-ES",
    },
  },
} as const;

export type MessageSchema = (typeof messages)[typeof LOCALES.EN];
