import { Component, OnInit } from '@angular/core';
import { MakeService } from './make.service';
import { ModelService } from './model.service';

import { Make } from './make';
import { Model } from './model';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
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
