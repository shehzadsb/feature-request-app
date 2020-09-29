import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {Feature } from '../feature.model';

import { FeaturesService} from '../feature.service'
import { PageEvent } from '@angular/material/paginator';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})


export class FeatureListComponent implements OnInit, OnDestroy {


    features: Feature[] = [];
    isLoading = false;
    totalFeatures = 0;

    //userIsAuthenticated = false;
    //userId: string;

    private featuresSub: Subscription;


  //dependency injection
  constructor(public featuresService: FeaturesService) {
      //this.postsService = postsService;
  }

  //this function will be automatically called by Angular when it creates this component
  ngOnInit() {
    this.isLoading = true;
    this.featuresService.getFeatures();


    this.featuresSub = this.featuresService.getFeatureUpdateListener()
      .subscribe( (featureData: {features: Feature[], featureCount: number}) => {
          this.isLoading = false;
          this.totalFeatures = featureData.featureCount;
          this.features = featureData.features;

      });




  }

  onDelete(featureId: number) {
    this.isLoading = true;
    this.featuresService.deleteFeature(featureId).subscribe(() => {
      this.featuresService.getFeatures();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.featuresSub.unsubscribe();

  }

}
