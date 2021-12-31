import { StructureRepair } from '../types';
import { constructorTypeRepair } from './repairs/constructor-type';
import { duplicateMembersRepair } from './repairs/duplicate-members';
import { invalidTypeRepair } from './repairs/invalid-types';
import { objectArgumentRepair } from './repairs/object-argument';
import { scaleConstructorArgumentRepair } from './repairs/scale-constructor-argument';

export const repairs: StructureRepair[] = [
    duplicateMembersRepair,
    objectArgumentRepair,
    invalidTypeRepair,
    constructorTypeRepair,
    scaleConstructorArgumentRepair,
];
