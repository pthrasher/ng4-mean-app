import { Component, OnInit } from '@angular/core';
import { MakeService } from './make.service';
import { ModelService } from './model.service';

import { Make } from './make';
import { Model } from './model';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  template: `
    <h4>Select a make:</h4>
    <dropdown
      [items]="makes"
      [valueKey]="'makeName'"
      [selected]="selectedMake"
      (selectedChange)="getModels($event)"
    ></dropdown>
    <div *ngIf="selectedMake != null">
      <h4>Select a model:</h4>
      <dropdown
        [items]="models"
        [valueKey]="'modelName'"
        [(selected)]="selectedModel"
        ></dropdown>
    </div>
    <div class="imgContainer" *ngIf="selectedModel != null">
      <h4>{{selectedMake.makeName}} - {{selectedModel.modelName}}</h4>
      <img [src]="selectedModel.imgSrc" />
    </div>
  `,
})
export class AppComponent implements OnInit {
  makes: Make[];
  selectedMake: Make;
  models: Model[];
  selectedModel: Model;

  constructor(
    private makeService: MakeService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.makeService.getMakes().then(makes => this.makes = makes);
  }

  getModels(make: Make): void {
    console.log(make)
    this.selectedMake = make;
    this.models = [];
    this.modelService.getModelsForMake(make).then(models => this.models = models);
  }
}
