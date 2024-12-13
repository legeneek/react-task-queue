# react-task-queue

A task queue implementation in React project.

## Implementation

Provide the queue in context, ‘pending’ for tasks to be processed, and ‘processing’ for tasks currently being handled(check `store/task-queue.tsx`).

The list of tasks being processed will be rendered as the Executor component.

## Demo

Use `npm run dev` to start the local server and view the demo.

For the first 4 seconds, generate one color blocks per second, and then two color block per second thereafter.

The demo structure is as follows.

```html
<TaskQueueProvider>
  <ColorProvider>
    <ColorList />
    <ColorTaskGen />
  </ColorProvider>
  <TaskExecutor />
</TaskQueueProvider>
```

`ColorTaskGen` generates 20 tasks and puts them into the task queue.

`TaskExecutor` execute tasks.

The number of tasks executed simultaneously is controlled by the variable `limit`.

The `ColorList` component will render the list of generated colors as color blocks.
