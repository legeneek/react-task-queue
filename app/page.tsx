"use client";
import { TaskQueueProvider, useTaskQueueDispatch } from "@/store/task-queue";
import { TaskExecutor } from "./task-executor";
import { ColorProvider, useColor, useColorDispatch } from "@/store/color-store";
import { useEffect } from "react";

export default function Home() {
  return (
    <TaskQueueProvider>
      <ColorProvider>
        <ColorList />
        <ColorTaskGen />
      </ColorProvider>
      <TaskExecutor />
    </TaskQueueProvider>
  );
}

async function pickColor(type: string) {
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

function ColorTaskGen() {
  const dispatch = useTaskQueueDispatch();
  const colorDispatch = useColorDispatch();

  useEffect(() => {
    const arr = ["r", "g", "b"];
    const list = Array(20)
      .fill(null)
      .map((_, i: number) => {
        return {
          type: "pickColor",
          executor: async () => pickColor(arr[i % 3]),
          onFinish: (res: any) => {
            colorDispatch({ type: "addColor", data: res });
          },
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
  const dispatch = useTaskQueueDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "limit", data: { n: 2 } });
    }, 4000);
  }, []);

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
