import { Component, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  template: `<h1>Hello {{name}}</h1>`,
})
export class DropdownComponent  {
  @Input() items
  name = 'Angular';
}
