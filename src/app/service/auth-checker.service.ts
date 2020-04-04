import { Injectable  } from '@angular/core';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpService: HttpService) {}

  checker() {
    this.httpService.getServer('/checker');
  }
}
