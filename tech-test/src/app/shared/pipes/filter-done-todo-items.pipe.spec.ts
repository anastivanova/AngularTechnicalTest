import { FilterDoneTodoItemsPipe } from './filter-done-todo-items.pipe';

describe('FilterDoneTodoItemsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDoneTodoItemsPipe();
    expect(pipe).toBeTruthy();
  });
});
