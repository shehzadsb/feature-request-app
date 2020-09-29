import  {Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Feature } from '../feature.model';

import {NgForm, FormGroup} from '@angular/forms';

import { FeaturesService} from '../feature.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-feature-create',
    templateUrl: './feature-create.component.html',
    styleUrls: ['./feature-create.component.css']
})


export class FeatureCreateComponent implements OnInit, OnDestroy {



  private mode = 'create';
  private featureId: string;
  
  feature: Feature;
  isLoading = false;

  imagePreview: string;


  featureCreated = new EventEmitter<Feature>();



  constructor (public featuresService: FeaturesService,
    public route: ActivatedRoute) {}


  ngOnInit() {


    this.route.paramMap.subscribe( (paramMap: ParamMap) => {

        if(paramMap.has('featureId')) {
          this.mode = 'edit';
          this.featureId = paramMap.get('featureId');
          //spinner
          this.isLoading = true;
          //alert('A');
          
          this.featuresService.getFeature(Number(this.featureId)).subscribe(featureData => {
              this.isLoading = false;
              this.feature =
                { id: featureData.id,
                  title: featureData.title,
                  description: featureData.description,

                  client: featureData.client,
                  clientPriority: featureData.clientPriority,
                  targetDate: featureData.targetDate,
                  productArea: featureData.productArea,

                };

          });

        } else {
          this.mode = 'create';
          this.featureId = null;
        }
    });


  }


  onSaveFeature(form: NgForm) {

    if(form.invalid) {
      return;
    }

   /* id: number;
  title: string;
  description: string;
  client: string;
  clientPriority: number;
  targetDate: Date;
  productArea: string;*/

    this.isLoading = true;
    if(this.mode === 'create') {
      this.featuresService.addFeature(
        form.value.title,
        form.value.description,
        form.value.client,
        form.value.clientPriority,
        form.value.targetDate,
        form.value.productArea

        );
    } else {
      this.featuresService.updateFeature(
        Number(this.featureId),
        form.value.title,
        form.value.description,
        form.value.client,
        form.value.clientPriority,
        form.value.targetDate,
        form.value.productArea
        );
    }

    form.resetForm();
  }

  ngOnDestroy() {
    
  }
}
