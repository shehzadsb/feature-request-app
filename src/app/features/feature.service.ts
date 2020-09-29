import {Feature} from './feature.model'
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class FeaturesService {
  private features: Feature[] = []; //original array
  private featuresUpdated = new Subject<{features: Feature[], featureCount: number}>(); //list of features as payload

  constructor(private http: HttpClient, private router: Router) {

  }



  getFeatures() {

    //const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{message, features: any, maxFeatures: number}>(
        'http://localhost:8082/api/features' )
        //observable stream
      .subscribe((transformedPostData) => {
          //console.log(transformedPostData);
          this.features = transformedPostData.features;
          this.featuresUpdated.next({features: [...this.features], featureCount: transformedPostData.maxFeatures});
      });
  }


  getFeatureUpdateListener() {
    return this.featuresUpdated.asObservable();
  }

  addFeature(title: string, description: string,client: string,clientPriority: number, targetDate: Date,productArea: string  ) {
    const feature: Feature = {
      id: null,
      title: title,
      description: description,
      client: client,
      clientPriority: clientPriority,
      targetDate: targetDate,
      productArea: productArea

    };
    this.http.post<{message: string, featureId: string}>('http://localhost:8082/api/features', feature)
      .subscribe((responseData) => {  // this block will execute asynchronously when we get the response

        //Routing to the root
        this.router.navigate(["/"]);
      });
  }

  updateFeature(id: number, title: string, description: string,client: string,clientPriority: number, targetDate: Date,productArea: string) {
    const feature: Feature = {
      id: id,
      title: title,
      description: description,
      client: client,
      clientPriority: clientPriority,
      targetDate: targetDate,
      productArea: productArea

    };

    this.http.put("http://localhost:8082/api/features/" + id, feature)
    .subscribe( response =>  {

        //Routing to the root
        this.router.navigate(["/"]);
    });

  }

  getFeature(id: number) {

    return this.http.get<{id: number; number, title: string, description: string,client: string,clientPriority: number, targetDate: Date,productArea: string}>("http://localhost:8082/api/features/" + id);
  }


  deleteFeature(featureId: number) {
    return this.http.delete("http://localhost:8082/api/features/" + featureId);

  }
}
