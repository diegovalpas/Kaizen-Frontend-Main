import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostulacionService} from './postulacion.service';
import { TokenStorageService } from 'src/app/util/token-storage.service'


@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: []
})
export class PostulacionComponent implements OnInit {
  currentUser: any;

  constructor( private fb:FormBuilder,
               private postulacionservice: PostulacionService,
               private token: TokenStorageService) { }

  ngOnInit(): void {
  }

  

  }
