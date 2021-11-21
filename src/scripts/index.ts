import { importPage } from './import/page';
import { loadPages } from './page';
import { parsePages } from './parse/structure';

loadPages().then((pages) => {
    const result = parsePages(pages.map((page) => importPage(page.body, page.url)));

    return;
});
