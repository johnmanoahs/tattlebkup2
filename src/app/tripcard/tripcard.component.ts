import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tripcard',
	templateUrl: './tripcard.component.html',
	styleUrls: ['./tripcard.component.css']
})
export class TripcardComponent implements OnInit {
	@Input() trip;
	@Input() showBook: boolean;

	constructor() { }

	ngOnInit() {
	}

}
