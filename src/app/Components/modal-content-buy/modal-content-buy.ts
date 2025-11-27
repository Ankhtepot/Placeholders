import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-modal-content-buy',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-content-buy.html',
  styleUrls: ['./modal-content-buy.scss'],
  standalone: true
})
export class ModalContentBuy {
  sending = signal(false);

  contact = {
    name: '',
    email: '',
    message: '',
    wantPathAlbum: false,
    wantFlashbackAlbum: false,
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.sending.set(true);

      const body = {
        to_name: 'Petr',
        web_name: 'Shiatsu Petrklic',
        from_name: this.contact.name,
        email: this.contact.email,
        message: this.contact.message,
        time: new Date().toLocaleString(),
      };

      emailjs.send(
        environment.emailServiceId,
        environment.emailTemplateId,
        body,
        environment.emailUserId)
        .then((response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent. Thank you for contacting us!');
          form.resetForm();
        }, (error) => {
          console.log('FAILED...', error);
          alert('Something went wrong, please try again');
        }).finally(() => {
        this.sending.set(false);
      });
    }
  }
}
