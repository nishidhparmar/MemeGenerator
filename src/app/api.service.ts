import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  geturl="https://api.imgflip.com/get_memes"
  constructor(private http : HttpClient) { }

  getdata(){
    return this.http.get(this.geturl)
  }
  postdata(id,data){
    console.log(id,data);
    
    return this.http.post(`https://api.imgflip.com/caption_image?template_id=${id}&username=Nishidh&password=Nishidh@123&text0=${data.text0}&text1=${data.text1}`,null)
  }
}
