import {WeaponOptionModel} from './weaponOption.model';
import {RaceTypeOptionModel} from './raceTypeOption.model';

export interface FormInitDataModel {
    weapons: WeaponOptionModel[];
    raceTypes: RaceTypeOptionModel[];
}
