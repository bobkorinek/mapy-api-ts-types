import { exportClasses } from "./export";
import { parse } from "./parse/page";
import { resolve } from 'path';

parse().then(classes => exportClasses(classes, resolve(__dirname + '/../..') + '/raw.index.d.ts'));
