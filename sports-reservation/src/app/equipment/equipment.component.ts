import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../services/equipment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class EquipmentComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { id: 0, name: '', description: '', price: 0 };
  newItemForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.newItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.equipmentService.getEquipment().subscribe(
      (data: Item[]) => {
        this.items = data;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Nepodarilo sa načítať zoznam vybavenia.';
      }
    );
  }

  addItem(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.newItemForm.invalid) {
      this.errorMessage = 'Všetky polia musia byť vyplnené správne.';
      return;
    }

    this.newItem = this.newItemForm.value;

    this.equipmentService.addEquipment(this.newItem).subscribe(
      (response) => {
        console.log('Vybavenie bolo pridané:', response);
        this.successMessage = 'Vybavenie bolo úspešne pridané!';
        this.loadItems();
        this.newItemForm.reset();
      },
      (error) => {
        console.error('Nepodarilo sa pridať vybavenie:', error);
        this.errorMessage = 'Nepodarilo sa pridať vybavenie.';
      }
    );
  }

  goToUpdatePage(item: Item): void {
    const itemId = this.items.findIndex(i => i.name === item.name);

    if (itemId < 0) {
      this.errorMessage = 'Chyba: ID vybavenia je neplatné.';
      return;
    }

    this.router.navigate(['/equipment/update', itemId]);
  }

  deleteItem(item: Item): void {
    this.errorMessage = null;
    this.successMessage = null;

    const index = this.items.findIndex(i => i.name === item.name);

    if (index === -1) {
      this.errorMessage = 'Vybavenie nebolo nájdené.';
      return;
    }

    this.equipmentService.deleteEquipment(index).subscribe(
      (response) => {
        this.successMessage = 'Vybavenie bolo úspešne odstránené!';
        this.loadItems();
      },
      (error) => {
        this.errorMessage = 'Nepodarilo sa odstrániť vybavenie.';
        console.error(error);
      }
    );
  }

  get name() {
    return this.newItemForm.get('name');
  }

  get description() {
    return this.newItemForm.get('description');
  }

  get price() {
    return this.newItemForm.get('price');
  }
}
