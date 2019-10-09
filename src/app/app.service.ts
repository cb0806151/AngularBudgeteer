import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor(
    private http: HttpClient,) {}

    sendEmail(messageReceiver, messageSubject, messageBody) {
        let url = 'https://a4eet81c49.execute-api.us-east-2.amazonaws.com/develop';
        url+= "?receiver_email=" + messageReceiver;
        url+= `&message=Subject:${messageSubject}\n${messageBody}`;

        return this.http.post(url, {});
    }
}