import { Injectable } from '@angular/core';
import { lab } from 'd3';

@Injectable()
export class SessionService {

  constructor() { 

  } 
 

  logIn = function(token, nik, nama, user, avatar, pic){
    this.setSession('iot-token', token);
    this.setSession('iot-nik', nik);
    this.setSession('iot-nama', nama);
    this.setSession('iot-user', user);
    this.setSession('iot-avatar', avatar);
    this.setSession('iot-pic', pic);
    
    return this.getSession('iot-token');
  };


  setSession(session, data){  
    localStorage.setItem(session, data); 
  }

  getSession(session){
    return localStorage.getItem(session)
  }


  isLoggedIn = function(){ 
    var token = this.getToken();  
    if(token){
      return true;
    }else{
      return false;
    }
  };

  

  logOut = function(){
    localStorage.clear();
  };
  
  checkAccessButton(url){
    var routing = url.split("/");
    let access = []; 
    access = JSON.parse(this.getSession('iot-data')).Access;
	
    var root = "";
    for (const key of Object.keys(access)) {
      if((key != "UserLevelId") && (key != "Name")){
        if(routing[3]){
          root = routing[0]+"/"+routing[1]+"/"+routing[2]+"/"+routing[3]; 
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[2]){
          root = routing[0]+"/"+routing[1]+"/"+routing[2];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[1]){
          root = routing[0]+"/"+routing[1];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
        else if(routing[0]){
          root = routing[0];
          if(root == key){
            var split1 = access[key];
            var split2 = split1.split(''); 
            if(split2[0] == "1"){
              return true;
            }else{
              return false;
            }
          }
        }
      }
    }
  }
}
