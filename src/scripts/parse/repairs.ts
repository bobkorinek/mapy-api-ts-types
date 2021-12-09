import { StructureRepair } from '../types';
import { invalidTypeRepair } from './repairs/invalid-types';
import { objectArgumentRepair } from './repairs/object-argument';

export const repairs: StructureRepair[] = [objectArgumentRepair, invalidTypeRepair];
