import { StructureRepair } from '../types';
import { constructorTypeRepair } from './repairs/constructor-type';
import { duplicatePropertiesRepair } from './repairs/duplicate-properties';
import { invalidTypeRepair } from './repairs/invalid-types';
import { objectArgumentRepair } from './repairs/object-argument';

export const repairs: StructureRepair[] = [objectArgumentRepair, invalidTypeRepair, constructorTypeRepair, duplicatePropertiesRepair];