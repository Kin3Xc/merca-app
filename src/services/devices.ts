import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/config';

@Injectable()
export class DeviceService{

    constructor(public http: Http){
    }

    public saveToken(device) {
        console.log(device)
        return this.http.post(`${AppConfig.API_URL}/device`, device)
        .map(res => res.json())
        .toPromise();
    }

}

