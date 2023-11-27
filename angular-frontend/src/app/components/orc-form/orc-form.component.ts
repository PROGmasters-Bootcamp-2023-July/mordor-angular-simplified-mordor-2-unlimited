import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {OrcService} from '../../services/orc.service';
import {RaceTypeOptionModel} from '../../models/raceTypeOption.model';
import {WeaponOptionModel} from '../../models/weaponOption.model';
import {OrcFormDataModel} from "../../models/orcFormData.model";


@Component({
  selector: 'app-orc-form',
  templateUrl: './orc-form.component.html',
})
export class OrcFormComponent implements OnInit {

  formData: FormGroup;
  raceTypes: RaceTypeOptionModel[];
  weaponOptions: WeaponOptionModel[];
  @Output() orcSaved = new EventEmitter();

  orc: OrcFormDataModel = {name: "", raceType: "", killCount: null, weapons: []};

  constructor(private orcService: OrcService, private formBuilder: FormBuilder) {
    this.formDataValues();

  }

  ngOnInit() {
    this.orcService.getInitialFormData().subscribe(
      (formInitData) => {
        this.weaponOptions = formInitData.weapons;
        this.createCheckboxControls();
        this.raceTypes = formInitData.raceTypes;
      });

    this.orcService.orcToModifySubject.subscribe({
      next: (value) => {
        this.orc = value;
        console.log(value);
        console.log(this.orc);
        console.log(this.orc.name);
        console.log(this.orc.id);
      }
    });
  }

  formDataValues() {
    this.formData = this.formBuilder.group({
      name: [this.orc.name, Validators.required],
      raceType: [this.orc.raceType, Validators.required],
      killCount: [this.orc.killCount, [Validators.required, Validators.min(0)]],
      weapons: this.formBuilder.array([], this.checkBoxValidator.bind(this)),
    });
  }

  private createCheckboxControls() {
    this.weaponOptions.forEach(() => {
      const control = new FormControl(false);
      (<FormArray>this.formData.controls.weapons).push(control);
    });
  }

  private createWeaponsArrayToSend(): string[] {
    return this.formData.value.weapons
      .map((weapon: string, index: number) => weapon ? this.weaponOptions[index].name : null)
      .filter((weapon: string) => weapon !== null);
  }

  saveOrc() {

    const data: OrcFormDataModel = {...this.formData.value};
    data.weapons = this.createWeaponsArrayToSend();

    console.log(data);
    console.log(this.orc.id);

    if (this.orc.id > 0) {
      console.log('XXXXXXXXXXXXXX');
    }

    this.orcService.createOrc(data).subscribe({
      next: (value) => console.log('Sikeres mentés!'),
      error: (err) => console.log(err),
      complete: () => {
        console.log('Lefutott a complete ág!');
        this.orcSaved.emit();
      }
    });
  }

  checkBoxValidator(arr: AbstractControl): { required: boolean } {
    let counter = 0;
    if (arr instanceof FormArray) {
      arr.getRawValue().forEach(value => value ? counter++ : counter);
    }
    return counter > 3 ? {required: true} : null;
  }
}
