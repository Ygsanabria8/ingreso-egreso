import { Pipe, PipeTransform } from '@angular/core';
import { EntryEgrees } from '../../models/entry-egress.model';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {

  transform(items: EntryEgrees[]):  EntryEgrees[] {
    return items.sort((a, b) => {
      if (a.type === 'ingreso'){
        return -1;
      } else{
        return 1;
      }
    });
  }

}
