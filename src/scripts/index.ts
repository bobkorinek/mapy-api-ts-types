import { path } from '../util/file';
import { createFile } from './export';
import { exportNamespace } from './export/namespace';
import { importPage } from './import/page';
import { loadPages } from './page';
import { parsePages } from './parse/structure';
import {} from 'prettier';

loadPages().then((pages) => {
    const result = parsePages(pages.map((page) => importPage(page.body, page.url)));

    const file = createFile((write) => {
        exportNamespace(result.namespace, write);
    }, path('raw.index.d.ts'));
});
