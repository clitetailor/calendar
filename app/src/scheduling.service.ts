import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()

export class SchedulingService
{
	private noteAnnoucedSource = new Subject<any>();
	private noteConfirmedSource = new Subject<any>();

	noteAnnouced$ = this.noteAnnoucedSource.asObservable();
	noteConfirmed$ = this.noteConfirmedSource.asObservable();

	periodicCheck = undefined;
	sheduling = undefined;

	nextNote = undefined;

	constructor()
	{
		this.noteAnnouced$.subscribe((note) =>
		{
			

			this.periodicCheck = setInterval(() =>
			{

			}, 50000);
		});
	}


	
	getNextNote(notes)
	{

	}
}