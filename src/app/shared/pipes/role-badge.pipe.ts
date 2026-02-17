import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleBadge'
})
export class RoleBadgePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
