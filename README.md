# react-task-queue

An implementation of a task queue. This may not be the best practice, but it works and has some conveniences.

## Implementation

Use ‘context’ to store the queue, ‘pending’ for tasks to be processed, and ‘processing’ for tasks currently being handled(check `task-queue.tsx`).

The list of tasks being processed will be rendered as the Executor component, which executes the task in an effect, so you need to turn off StrictMode.

The demo structure is as follows.

```html
<TaskQueueProvider>
  <ColorProvider>
    <ColorList />
    <ColorTaskGen />
    <TaskExecutor />
  </ColorProvider>
</TaskQueueProvider>
```

`ColorTaskGen` generates 20 color selection tasks and puts them into the task queue.

`TaskExecutor` execute tasks.

The number of tasks executed simultaneously is controlled by the variable `limit`.

After the color selection task is completed, the obtained color is added to the state of ColorProvider.

The `ColorList` component will render the list of obtained colors as color blocks.

Have a try with `npm run dev`.
