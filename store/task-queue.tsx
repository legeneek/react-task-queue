import { createContext, useContext, useReducer } from "react";

export interface Task {
  type?: string;
  executor: any;
  onFinish?: any;
  onError?: any;
}

export interface QueueTask extends Task {
  id: number;
}

interface AddActionData {
  tasks: Task[];
}

interface DoneActionData {
  id: number;
}

interface LimitActionData {
  n: number;
}

let baseId = 1;

let limit = 1;

const TaskQueueContext = createContext<any>(null);

const TaskQueueDispatchContext = createContext<any>(null);

export function TaskQueueProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, {
    pending: [],
    processing: [],
  });

  return (
    <TaskQueueContext value={state}>
      <TaskQueueDispatchContext value={dispatch}>
        {children}
      </TaskQueueDispatchContext>
    </TaskQueueContext>
  );
}

export function useTaskQueue() {
  return useContext(TaskQueueContext);
}

export function useTaskQueueDispatch() {
  return useContext(TaskQueueDispatchContext);
}

function reducer(
  state: { pending: QueueTask[]; processing: QueueTask[] },
  action: {
    type: string;
    data: AddActionData | DoneActionData | LimitActionData;
  }
) {
  switch (action.type) {
    case "add": {
      let pending = [...state.pending];
      let processing = [...state.processing];
      const { tasks } = action.data as AddActionData;
      const newTasks: QueueTask[] = tasks.map((t) => {
        baseId += 1;
        return {
          ...t,
          id: baseId,
        };
      });
      const capacity = limit - processing.length;
      if (capacity > 0) {
        processing = processing.concat(newTasks.slice(0, capacity));
        pending = pending.concat(newTasks.slice(capacity));
      } else {
        pending = state.pending.concat(newTasks);
      }
      return {
        pending,
        processing,
      };
    }
    case "done": {
      const { id } = action.data as DoneActionData;
      let pending = [...state.pending];
      let processing = state.processing.filter((t) => {
        return t.id != id;
      });
      const capacity = limit - processing.length;
      if (capacity > 0 && pending.length > 0) {
        processing = processing.concat(pending.slice(0, capacity));
        pending = pending.slice(capacity);
      }
      return {
        pending,
        processing,
      };
    }
    case "limit": {
      const { n } = action.data as LimitActionData;
      limit = n;
      return state;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
