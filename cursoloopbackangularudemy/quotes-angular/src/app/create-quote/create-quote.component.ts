import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { QuotesComponent } from '../quotes/quotes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {
  authors;
  content;
  authorId;

  constructor(private dataService: DataService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.dataService.getData(`${environment.api_url}/api/authors`).subscribe(data => {
      console.log(data);
      this.authors = data;
    })
  }

  saveQuote() {
    const postData = {
      content: this.content,
      authorId: this.authorId
    }

    this.dataService.postData(`${environment.api_url}/api/quotes`,postData).subscribe(data => {
      console.log(data);
      this.snackBar.open('Quote created successfully');
      this.router.navigate([QuotesComponent]);
    }, (err) => {
      console.log(err);
      this.snackBar.open('Lo sentimos ha ocurrido un error', 'close');
    })
  }
}
