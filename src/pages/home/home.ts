import { Component, OnInit, OnDestroy } from '@angular/core';
import { NatureView } from '../../models/nature-view.model';
import { Subscription } from 'rxjs/Subscription';
import { NatureViewService } from '../../services/nature-view.service';
import { NewViewPage } from '../new-view/new-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  natureViewList: NatureView[];
  natureViewListSubscription: Subscription;
  newViewPage = NewViewPage;

  constructor(private natureViewService: NatureViewService) {

  }

  ngOnInit() {
    this.natureViewListSubscription = this.natureViewService.natureViewList$.subscribe(
      (natureViews: NatureView[]) => {
        this.natureViewList = natureViews;
      }
    );
    this.natureViewService.emitList();
  }

  ngOnDestroy() {
    this.natureViewListSubscription.unsubscribe();
  }
}
