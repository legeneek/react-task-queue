"use client";
import {
  QueueTask,
  useTaskQueue,
  useTaskQueueDispatch,
} from "@/store/task-queue";
import { useEffect, useRef } from "react";

export function TaskExecutor() {
  const { processing } = useTaskQueue();
  return processing.map((t: QueueTask) => {
    const { id } = t;
    return <Executor key={id} task={t} />;
  });
}

function Executor(props: { task: QueueTask }) {
  const { task } = props;
  const dispatch = useTaskQueueDispatch();
  const fired = useRef(false);

  // task will not change
  useEffect(() => {
    const { type, executor, onFinish, onError } = task;

    async function executTask() {
      console.log("start task", type);
      try {
        const res = await executor();
        if (typeof onFinish === "function") {
          onFinish(res);
        }
      } catch (err) {
        if (typeof onError === "function") {
          onError(err);
        }
      }
      dispatch({ type: "done", data: task });
      console.log("end task", type);
    }

    if (fired.current) return;
    fired.current = true;
    executTask();
  }, [task]);
  return null;
}
