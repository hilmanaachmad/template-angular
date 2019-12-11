import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any
  constructor(private service: AppService) { }

  ngOnInit() {

    //Get by URL + Enviroment
    // this.service.get('/api/iot/master-data/user/get-authorization/3684', '')
    //   .subscribe(data => {


    //   })


    //Get Full URL
    this.service.getUseFullURL('http://factoryapps.aio.co.id:21000/api-php/api/authentication/get_data', '')
      .subscribe(data => {
        var result = JSON.parse(data)
        this.data = result[0]
      })


  }

}
