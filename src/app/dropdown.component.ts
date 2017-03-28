import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  styleUrls: ['./dropdown.component.css'],
  template: `
    <ul>
      <li
        *ngFor="let item of items"
        (click)="handleClick(item)"
        [class.is-selected]="selected === item"
        >{{item[valueKey]}}</li>
    </ul>
    `,
})
export class DropdownComponent  {
  @Input() items: any[];
  @Input() valueKey: string;
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter<any>();

  handleClick(item): void {
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
