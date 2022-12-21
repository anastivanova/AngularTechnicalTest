import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem } from 'src/app/core/models';

@Pipe({
  name: 'filterDoneTodoItems'
})
export class FilterDoneTodoItemsPipe implements PipeTransform {

  transform(items: ITodoItem[], isSelected: boolean): ITodoItem[] {
      return isSelected ? items.filter(({ done }) => done).map(item => item) : items;
  }
}
