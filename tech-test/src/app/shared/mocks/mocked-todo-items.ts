import { ITodoItem } from 'src/app/core/models';

export const MOCKED_TODO_ITEMS: ITodoItem[] = [
  {
    id: 1,
    label: "Finish technical test",
    description:  "Finish technical test ASAP",
    category: "work",
    done: true
  },{
    id: 2,
    label: "Clean flat",
    description:  "Clean flat after technical test",
    category: "home",
    done: false
  },
];
