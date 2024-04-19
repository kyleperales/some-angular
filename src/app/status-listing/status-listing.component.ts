import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, map, of } from 'rxjs';
import { IPetDetails, Status } from './status-listing.model';

@Component({
  selector: 'app-status-listing',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './status-listing.component.html',
  styleUrl: './status-listing.component.scss'
})
export class StatusListingComponent implements OnInit {


  petsList: IPetDetails[] = []
  public petName = ''
  changesDetected = new Subject<void>()
  listed$: Observable<IPetDetails[]> = of([])
  examining$: Observable<IPetDetails[]> = of([])
  backToHuman$: Observable<IPetDetails[]> = of([])

  ngOnInit(): void {
    const isListed = (e: IPetDetails) => e.status === Status.listed
    const isExamining = (e: IPetDetails) => e.status === Status.examining
    const isBackToHuman = (e: IPetDetails) => e.status === Status.backToHuman

    this.listed$ = this.changesDetected.asObservable()
      .pipe(
        map(_ => this.petsList.filter(isListed))
      )

    this.examining$ = this.changesDetected.asObservable()
      .pipe(
        map(_ => this.petsList.filter(isExamining))
      )

    this.backToHuman$ = this.changesDetected.asObservable()
      .pipe(
        map(_ => this.petsList.filter(isBackToHuman))
      )
  }

  onNewPet() {
    if (this.petName) {
      const petDetails: IPetDetails = {
        id: this.petsList.length,
        name: this.petName,
        status: Status.listed
      }
      this.petsList.push(petDetails)
      this.petName = ''
      this.changesDetected.next()
    }
  }

  toExamining(index: number) {
    this.petsList[index].status = Status.examining
    this.changesDetected.next()
  }

  toHuman(index: number) {
    this.petsList[index].status = Status.backToHuman
    this.changesDetected.next()
  }
}
