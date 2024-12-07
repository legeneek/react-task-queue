"use client";
import { useColorDispatch } from "@/store/color-store";
import {
  QueueTask,
  useTaskQueue,
  useTaskQueueDispatch,
} from "@/store/task-queue";
import { useEffect } from "react";

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
  const colorDispatch = useColorDispatch();
  useEffect(() => {
    // process task
    const { type, data } = task;
    if (type == "pickColor") {
      console.log("start task", task);
      pickColor(data).then((color) => {
        dispatch({ type: "done", data: task });
        colorDispatch({ type: "addColor", data: color });
        console.log("complete task", color);
      });
    }
  }, [task]);
  return null;
}

async function pickColor(type: "r" | "g" | "b") {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      let color;
      const num = Math.floor(255 * Math.random());
      if (type === "r") {
        color = [num, 0, 0];
      } else if (type === "g") {
        color = [0, num, 0];
      } else {
        color = [0, 0, num];
      }
      resolve(color);
    }, 1000);
  });
}
