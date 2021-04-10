import { exportStructures } from "./export";
import { parse } from "./parse/page";
import { resolve } from 'path';

parse().then(classes => exportStructures(classes, resolve(__dirname + '/../..') + '/raw.index.d.ts'));
