import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  data: any = [];
  memesdata: any = [];
  i: any = -1;
  memes: any = [];
  memesarray: any = [];
  start: boolean;
  url: boolean = false;
  urlobj: any = [];
  loading = 'Generate';
  preverr: boolean;
  nexterr: boolean;
  ngOnInit(): void {
    this.api.getdata().subscribe((data) => {
      this.data = data;
      this.memesdata = this.data.data.memes;
      this.memesdata.forEach((element) => {
        if (element.box_count == 2) {
          this.memes.push(element);
        }
      });
    });
  }

  next() {
    if (this.memes.length - 1 == this.i) {
      this.nexterr = true;
    } else {
      this.i++;
      this.memesarray = this.memes[this.i];
      this.start = true;
      this.url = false;
      this.preverr = false;
    }
  }
  prev() {
    if (this.i == 0) {
      this.preverr = true;
    } else {
      this.i--;
      this.memesarray = this.memes[this.i];
      this.start = true;
      this.url = false;
      this.nexterr = false;
    }
  }
  submit(id, meme: NgForm) {
    this.loading = 'Loading...';
    setTimeout(() => {
      this.url = true;
      this.loading = 'Generate';
    }, 1000);
    console.log(id, meme.value);
    this.api.postdata(id, meme.value).subscribe(
      (data) => {
        console.log(data), (this.urlobj = data);
      },
      (error) => console.log(error)
    );
    meme.reset();
  }
}
