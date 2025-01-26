import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from '../services/equipment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  imports: [CommonModule, FormsModule],
})
export class UpdateEquipmentComponent implements OnInit {
  itemId: number = 0;
  item: Item | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.loadItem();
    });
  }

  loadItem(): void {
    this.equipmentService.getEquipmentById(this.itemId).subscribe({
      next: (data: Item) => {
        this.item = data;
        this.errorMessage = '';
      },
      error: () => {
        this.item = null;
        this.errorMessage = 'Vybavenie nebolo nájdené.';
      },
    });
  }

  updateItem(): void {
    if (!this.item) {
      this.errorMessage = 'Neexistuje žiadne vybavenie na úpravu.';
      return;
    }

    this.equipmentService.updateEquipment(this.itemId, this.item).subscribe({
      next: (response) => {
        this.successMessage = 'Vybavenie bolo úspešne aktualizované!';
        this.router.navigate(['/equipment']);
      },
      error: (error) => {
        this.errorMessage = 'Nepodarilo sa upravit vybavenie.';
      }
    });
  }
}
