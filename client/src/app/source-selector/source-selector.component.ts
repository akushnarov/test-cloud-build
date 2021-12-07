import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-selector',
  templateUrl: './source-selector.component.html',
  styleUrls: ['./source-selector.component.scss']
})
export class SourceSelectorComponent implements OnInit {
  triggers: Array<string> = [
    'weather',
    'bundesliga',
    'pollen',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}