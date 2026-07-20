import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'No Credits';
    }
    return value === 1 ? `${value} Credit` : `${value} Credits`;
  }
}
