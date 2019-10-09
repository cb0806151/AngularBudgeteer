import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { isNavigationCancelingError } from '@angular/router/src/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  verifyDeleteModalOpen = false;
  removingCategoryId;
  budgetTotal = 0.00
  newEntry = "";
  newCategory = "";
  categories = []
  entriesNegativeByDefault = false;
  cantSubmitCharactersErrorSignVisible = false;

  messageReceiver = "holycow.baunach@gmail.com";
  messageSubject = "Rapscallion!";
  messageBody = "Pistols at dawn!!!";

  constructor(
    private emailSender: EmailService) {}

  sendEmail() {
    this.emailSender.sendEmail(this.messageReceiver, this.messageSubject, this.messageBody).subscribe(result => {
      console.log(result)
    })
  }

  addCategory() {
    if (this.newCategory.length > 0) {
      this.categories.unshift(
        {
          "name": this.newCategory,
          "budget_entries": [],
          "entry_holder": "",
          "entries_total": 0.00,
          "entries_visible": true
        }
      )
      this.newCategory = ""
    }
  }

  addEntry(categoryIndex) {
    if (this.categories[categoryIndex].entry_holder.length > 0) {
      let entry = parseFloat(this.categories[categoryIndex].entry_holder);

      if (isNaN(entry)) {
        this.cantSubmitCharactersErrorSignVisible = true;
        return;
      } else {
        this.cantSubmitCharactersErrorSignVisible = false;
      }
    
      if (this.categories[categoryIndex].entry_holder.length > 0 &&
          this.entriesNegativeByDefault && 
          this.categories[categoryIndex].entry_holder.indexOf("+") == -1 &&
          entry > 0) {
        entry = entry * -1;
      }
      this.budgetTotal += entry;
      this.categories[categoryIndex].entries_total += entry;
      this.categories[categoryIndex].budget_entries.push(
        {
          "value": entry.toFixed(2)
        }
      )
      this.categories[categoryIndex].entry_holder = ""
    }
  }

  removeEntry(categoryIndex, entriesIndex) {
    let entry = this.categories[categoryIndex].budget_entries[entriesIndex].value;
    this.budgetTotal -= entry;
    this.budgetTotal = parseFloat(this.budgetTotal.toFixed(2));
    this.categories[categoryIndex].entries_total -= entry;
    this.categories[categoryIndex].budget_entries.splice(entriesIndex, 1);
  }

  removeCategory() {
    var component = this;
    this.categories[this.removingCategoryId].budget_entries.forEach(function(entry){
      component.budgetTotal -= entry.value;
    })
    this.budgetTotal = parseFloat(this.budgetTotal.toFixed(2));
    this.categories.splice(this.removingCategoryId, 1);
  }
}
