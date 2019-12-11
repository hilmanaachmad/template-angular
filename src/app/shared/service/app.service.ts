import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { map, catchError } from 'rxjs/operators';
import { SessionService } from '../../shared/service/session.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { DatePipe, Location } from '@angular/common'
import { environment } from '../../../environments/environment'
declare var $: any;


@Injectable()

export class AppService {


    public interval = []
    private Token
    private appversion = "";
    constructor(
        protected _http: Http,
        protected http: HttpClient,
        protected router: Router,
        protected session: SessionService,
        public datepipe: DatePipe,
        private location: Location
    ) {

        let sessionToken = this.session.getSession('iot-token');

        if (sessionToken != null) {
            this.Token = sessionToken
        } else {
            this.Token = ''
        }
    }

    HariIni() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    }


    goBack() {
        this.location.back();
    }


    formatStatusCatatan(status) {
        if (status === 1 || status === '1') {
            return '<p class="badge badge-primary">Submit</p>'
        } else if (status === 2 || status === '2') {
            return '<p class="badge badge-danger">Problem</p>'
        } else if (status === 3 || status === '3') {
            return '<p class="badge badge-info">Assign</p>'
        } else if (status === 4 || status === '4') {
            return '<p class="badge badge-success">Complete</p>'
        }
    }


    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    noSpecialChars(event) {
        var k = event.keyCode,
            $return = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
        if (!$return && k != 95) {
            return false;
        }
    }

    JqueryConfirm(text) {
        $.confirm({
            icon: 'fa fa-warning',
            theme: 'dark',
            title: 'Warning',
            content: text,
            type: 'red',
            typeAnimated: true,
            buttons: {
                okBtn: {
                    text: 'OK',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                }
            }
        });
    }


    formatStatusDoc(item) {
        if (item == 1) {
            return '<span class="badge badge-secondary">Submitted</span>'
        } else if (item == 2) {
            return '<span class="badge badge-danger">Problem</span>'
        } else if (item == 3) {
            return '<span class="badge badge-info">Complete</span>'
        } else if (item == 4) {
            return '<span class="badge badge-primary">Assign</span>'
        } else if (item == 5) {
            return '<span class="badge badge-warning">Revise</span>'
        }

    }


    formatDateAndTime(date) {
        if (date != '' && date != null && date != undefined) {
            return this.datepipe.transform(date, 'yyyy-MM-dd H:m:s');
        } else {
            return '-'
        }

    }


    lineprod(){
        return environment.lineprod
    }












    //AutoComplete
    getAIOEmploye(term: string): Observable<any[]> {

        if (term == '' || term == null) {
            term = 'a'
        }
        return this.http.get<any>(`${environment.baseUrlapi}/api/iot/master-data/employe/autocomplete/3/${term}`).pipe(
            catchError(() => of(({
                items: []
            }))),
            map(rsp => rsp),
        );
    }

    getOSEmploye(term: string): Observable<any[]> {
        if (term == '' || term == null) {
            term = 'a'
        }
        return this.http.get<any>(`${environment.baseUrlapi}/api/master-data/employe-outsourcing/autocomplete/3/${term}`).pipe(
            catchError(() => of(({
                items: []
            }))),
            map(rsp => rsp),
        );
    }

    PICgetAIOEmploye(term: string): Observable<any[]> {

        if (term == '' || term == null) {
            term = 'a'
        }
        let data = {
            'plant': this.getPlantUser(),
            'sectionParent': this.session.getSession('iot-PIC'),
            'key': term
        }
        return this.http.post<any>(`${environment.baseUrlapi}/api/pic/master-data/employe/autocomplete/`, data).pipe(
            catchError(() => of(({
                items: []
            }))),
            map(rsp => rsp),
        );
    }

    PICgetOSEmploye(term: string): Observable<any[]> {
        if (term == '' || term == null) {
            term = 'a'
        }

        let data = {
            'plant': this.getPlantUser(),
            'sectionParent': this.session.getSession('iot-PIC'),
            'key': term
        }

        return this.http.post<any>(`${environment.baseUrlapi}/api/pic/master-data/employe-outsourcing/autocomplete/`, data).pipe(
            catchError(() => of(({
                items: []
            }))),
            map(rsp => rsp),
        );
    }

    getPROSyrup(term: string): Observable<any[]> {

        if (term == '' || term == null) {
            term = '0'
        }
        return this.http.get<any>(`${environment.baseUrlapi}/api/iot/master-data/get-pro-preparasi-autocomplete/${term}`).pipe(
            catchError(() => of(({
                items: []
            }))),
            map(rsp => rsp),
        );
    }
    //AutoComplete

    urlAPIforFile() {
        return environment.baseUrlapi
    }
    getPlantUser() {
        return 3
    }
    urlAPI() {
        return environment.baseUrlapi + 'api'
    }

    lg_location() {
        return '3';
    }

    fake_token(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    //api get
    get(url, data): Observable<string> {
        let res: any;
        return this._http.get(
            environment.baseUrlapi + url,
            {
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'authorization': this.Token
                    })
            }
        ).pipe(
            map((response: Response) => {
                return response.text();
            }), catchError((err) => {
                if (err.statusText == "Unauthorized") {
                    // this.router.navigate(['/auth/logout'])
                    // this.openErrorSwal('Your Session is Expired')
                } else {
                    return Observable.throw(err);
                }

            })
        )

    }

    //post data
    post(url, data): Observable<string> {
        return this._http.post(
            environment.baseUrlapi + url,
            data,
            {
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'authorization': this.Token
                    })
            }
        ).pipe(map((response: Response) => {
            return response.text();
        }), catchError((err) => {
            if (err.statusText == "Unauthorized") {
                this.ExpiredBro()
                // this.router.navigate(['/auth/logout'])
                // this.openErrorSwal('Your Session is Expired')
            } else {
                return Observable.throw(err);
            }

        }))
    }

    //update data
    put(url, data): Observable<string> {
        return this._http.put(
            environment.baseUrlapi + url,
            data,
            {
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'authorization': this.Token
                    }
                )
            }
        ).pipe(map((response: Response) => {
            return response.text();
        }), catchError((err) => {
            if (err.statusText == "Unauthorized") {
                // this.router.navigate(['/auth/logout'])
                // this.openErrorSwal('Your Session is Expired')
            } else {
                return Observable.throw(err);
            }

        }))
    }

    //delete data
    delete(url, data): Observable<string> {
        return this._http.delete(
            environment.baseUrlapi + url,
            {
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'authorization': this.Token
                    })
            }
        ).pipe(map((response: Response) => {
            return response.text();
        }), catchError((err) => {
            if (err.statusText == "Unauthorized") {
                // this.router.navigate(['/auth/logout'])
                // this.openErrorSwal('Your Session is Expired')
            } else {
                return Observable.throw(err);
            }

        }))
    }



    getUseFullURL(url, data): Observable<string> {
        let res: any;
        return this._http.get(
            url,
            {
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'authorization': this.Token
                    })
            }
        ).pipe(
            map((response: Response) => {
                return response.text();
            }), catchError((err) => {
                if (err.statusText == "Unauthorized") {
                    // 
                } else {
                    return Observable.throw(err);
                }

            })
        )
    }


    ExpiredBro() {
        swal.mixin({
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                input: 'text',
                title: 'Your Session Expired',
                text: 'Username'
            },
            {
                input: 'password',
                title: 'Your Session Expired',
                text: 'Password'
            },

        ]).then((result) => {
            if (result.value) {
                this.router.navigate(['/auth/login-params'], {
                    queryParams:
                    {
                        username: result.value[0],
                        password: result.value[1]
                    }
                });
            } else if (result.dismiss == 'backdrop' || result.dismiss == 'cancel') {
                this.router.navigate(['/auth/logout'])
                this.openErrorSwal('Your Session is Expired')
            }
        })
    }

    errorserver() {
        console.log("Can't connect to server.")
    }

    //not found
    notfound() {
        console.log("Data not found.")
    }

    //success notification
    openSuccessSwal(message) {
        swal.fire({
            title: 'Information!',
            text: message,
            type: 'success',
            timer: 1500
        })
    }
    //Error notification
    openErrorSwal(message) {
        swal.fire({
            title: 'Information!',
            text: message,
            type: 'warning',
            timer: 1500
        })
    }

    closeSwal() {
        swal.close()
    }


    //http client get
    httpClientGet(url, data) {
        return this.http.get(url);
    }

    //http client post
    httpClientPost(url, data) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        this.http.post(url, data, { headers }).subscribe(result => {
            if (result['code'] != '1') {
            }
        }, error => {
            this.errorserver();
        });
    }

    //http client update
    httpCLientPut(url, id, data) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        this.http.put(url + '/' + id, data, { headers }).subscribe(result => {
            if (result['code'] != '1') {
                swal.fire(
                    'Information!',
                    "Update Data Failed",
                    'error'
                );
            }
        },
            error => {
                this.errorserver();
            });
    }

    //http client delete with confirm
    httpClientDelete(url, data, id, index) {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result == true) {
                this.http.delete(url + '/' + id)
                    .subscribe(result => {
                        var resource = result;
                        if (resource['code'] == '1') {
                            if (index !== -1) {
                                data.splice(index, 1);
                            }
                        }
                        else {
                            swal.fire(
                                'Information!',
                                "Delete Data Failed",
                                'error'
                            );
                        }
                    },
                        error => {
                            this.errorserver();
                        });
            }
        })
    }

    //http client post
    httpClientPostArray(url, data) {
        var success = false;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        for (var i = 0; i < data.length; i++) {
            this.http.post(url, data[i], { headers }).subscribe(result => {
                if (result['code'] != '1') {
                    swal.fire(
                        'Information!',
                        "Insert Data Failed",
                        'error'
                    );
                }
            },
                error => {
                    this.errorserver();
                });
        }
    }

    //http client post
    httpClientPostModal(url, data, refreshdata, dataarray) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        this.http.post(url, data, { headers }).subscribe(result => {
            if (result['code'] == '1') {
                refreshdata.push(dataarray);
            }
            else {
                swal.fire(
                    'Information!',
                    "Insert Data Failed",
                    'error'
                );
            }
        },
            error => {
                this.errorserver();
            });
    }

    //http client update
    httpCLientPutModal(url, id, data, index, refreshdata, dataarray) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        this.http.put(url + '/' + id, data, { headers }).subscribe(result => {
            if (result['code'] == '1') {
                if (index !== -1) {
                    refreshdata[index] = dataarray;
                }
            }
            else {
                swal.fire(
                    'Information!',
                    "Update Data Failed",
                    'error'
                );
            }
        },
            error => {
                this.errorserver();
            });
    }

    getNativeWindow() {
        return window;
    }


    //http client update
    httpCLientPutPassword(url, id, data, routingtrue, routingfalse) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        var routingtruearr = routingtrue.split(',');
        this.http.put(url + '/' + id, data, { headers }).subscribe(result => {
            if (result['code'] == '1') {
                if (routingtruearr.length > 1) {
                    this.router.navigate([routingtruearr[0], routingtruearr[1], routingtruearr[2]]);
                } else {
                    var routelogoutrole = routingtrue.split('-');
                    this.router.navigate([routelogoutrole[0]], { queryParams: { id: id, role: routelogoutrole[1] } });
                }
            }
            else {
                swal.fire({
                    title: 'Information!',
                    text: result['message'],
                    type: 'error'
                })
                // this.router.navigate([routingfalse], { queryParams: { id: id } });
            }
        },
            error => {
                this.errorserver();
            });
    }

    DateConversion(date) {
        var dateString = date.substr(0, 10).replace(/\b0/g, '');
        var dateConversion = dateString.split("/");
        var newConversion = dateConversion[0] + "-" + dateConversion[1] + "-" + dateConversion[2];
        return newConversion;
    }

    httpCLientPutNew(url, id, data, getdata) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ');
        headers = headers.set('Version', this.appversion);
        this.http.put(url + '/' + id, data, { headers }).subscribe(result => {
            if (result['code'] == '1') {
                this.http.get(getdata);
            }
            else {
                swal.fire(
                    'Information!',
                    "Update Data Failed",
                    'error'
                );
            }
        },
            error => {
                this.errorserver();
            });
    }

    backDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate() - 1),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    formatDateID(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    ISO_date(date) {
        var year = "" + date.getFullYear();
        var month = "" + (date.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + date.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + date.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + date.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + date.getSeconds(); if (second.length == 1) { second = "0" + second; }

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }
}
