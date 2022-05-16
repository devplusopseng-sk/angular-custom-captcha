import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  captchaCodeG = "";
  captchaCodeI = "";
  @ViewChild('myCanvasRef', { static: true }) myCanvasRef!: ElementRef;
  context!: CanvasRenderingContext2D;
  lengthOtp = 6;

  constructor() { }

  ngOnInit(): void {
    this.context = (this.myCanvasRef.nativeElement).getContext('2d');
    this.createCaptcha();
  }

  createCaptcha() {
    console.log("Inside createCaptcha");
    this.context.clearRect(0, 0, this.myCanvasRef.nativeElement.width, this.myCanvasRef.nativeElement.height);
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var captcha = [];
    for (var i = 0; i < this.lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    this.context.font = "25px Georgia";
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    const x = (this.myCanvasRef.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.myCanvasRef.nativeElement as HTMLCanvasElement).height / 2;
    this.context.strokeText(captcha.join(""), x, y);
    // this.context.strokeText(captcha.join(""), 0, 30);
    this.captchaCodeG = captcha.join("");
  }

  // validateCaptcha() {
  //   console.log("Inside validateCaptcha");
  //   if (this.captchaCodeI === this.captchaCodeG) {
  //     return true;
  //   } else {
  //     this.createCaptcha();
  //     return false;
  //   }
  // }

  onSubmit() {
    console.log("Inside onSubmit");
  }
}
