import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  styleUrls: ['./dropdown.component.css'],
  templateUrl: './dropdown.component.html',
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
