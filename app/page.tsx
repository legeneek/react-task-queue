"use client";
import { TaskQueueProvider, useTaskQueueDispatch } from "@/store/task-queue";
import { TaskExecutor } from "./task-excutor";
import { ColorProvider, useColor } from "@/store/color-store";
import { useEffect } from "react";

export default function Home() {
  return (
    <TaskQueueProvider>
      <ColorProvider>
        <ColorList />
        <ColorTaskGen />
        <TaskExecutor />
      </ColorProvider>
    </TaskQueueProvider>
  );
}

function ColorTaskGen() {
  const dispatch = useTaskQueueDispatch();
  useEffect(() => {
    const arr = ["r", "g", "b"];
    const list = Array(20)
      .fill(null)
      .map((_, i: number) => {
        return {
          type: "pickColor",
          data: arr[i % 3],
        };
      });
    dispatch({
      type: "add",
      data: {
        tasks: list,
      },
    });
  }, []);
  return null;
}

function ColorList() {
  const { colors } = useColor();

  return (
    <div className="flex gap-1 flex-wrap bg-slate-50">
      {colors.map((color: any, i: number) => {
        const c = `rgb(${color[0]},${color[1]},${color[2]})`;
        return (
          <div key={i} className="w-4 h-4" style={{ background: c }}></div>
        );
      })}
    </div>
  );
}
