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
  orcId: number;
  @Output() orcSaved = new EventEmitter();


  constructor(private orcService: OrcService, private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      raceType: ['', Validators.required],
      killCount: [null, [Validators.required, Validators.min(0)]],
      weapons: this.formBuilder.array([], this.checkBoxValidator.bind(this)),
    });

    this.orcService.resetForm.subscribe(
      () => {
        this.orcId = null;
        this.formData.reset();
      },
    );

  }

  ngOnInit() {
    this.orcService.getInitialFormData().subscribe(
      (formInitData) => {
        this.weaponOptions = formInitData.weapons;
        this.createCheckboxControls();
        this.raceTypes = formInitData.raceTypes;
        this.orcId = this.orcService.orcId;
        if (this.orcId) {
          this.getOrcDetails(this.orcId);
        }
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


  onSubmit() {
    const data = {...this.formData.value};
    data.weapons = this.createWeaponsArrayToSend();
    this.orcId ? this.updateOrc(data) : this.createOrc(data);
  }

  createOrc(data: OrcFormDataModel) {
    this.orcService.createOrc(data).subscribe({
      next: (value) => console.log('Sikeres mentés!'),
      error: (err) => console.log(err),
      complete: () => {
        console.log('Lefutott a complete ág!');
        this.orcSaved.emit();
      }
    });
  }


  updateOrc(data: OrcFormDataModel) {
    this.orcService.updateOrc(data, this.orcId).subscribe(
      () => this.orcSaved.emit(),
      error => console.warn(error),
    );
  }

  checkBoxValidator(arr: AbstractControl): { required: boolean } {
    let counter = 0;
    if (arr instanceof FormArray) {
      arr.getRawValue().forEach(value => value ? counter++ : counter);
    }
    return counter > 3 ? {required: true} : null;
  }


  createWeaponsFormArray = (weaponsNames: string[]) => {
    return this.weaponOptions.map(weaponOption => {
      return weaponsNames.includes(weaponOption.name);
    });
  };


  private getOrcDetails(orcId: number) {
    this.orcService.fetchOrcDetails(orcId).subscribe(
      (response: OrcFormDataModel) => {
        if (response) {
          this.formData.patchValue({
            name: response.name,
            killCount: response.killCount,
            raceType: response.raceType,
            weapons: this.createWeaponsFormArray(response.weapons),
          });
        }
      },
    );
  }
}
