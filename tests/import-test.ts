import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import 'mocha';
import { Page } from '../src/scripts/types';
import { importPage } from '../src/scripts/import/page';

const createDoc = (html: string, insertContent = true) =>
    new JSDOM(`<!DOCTYPE html>` + (insertContent ? '<div id="content">' + html + `</div>` : html)).window.document;

describe('import', () => {
    describe('page', () => {
        it("import page's name", () => {
            const doc = createDoc('<h1 class="classTitle">Třída SMap.Layer</h1>');

            const page = importPage(doc);

            assert.strictEqual('SMap.Layer', page.name);
        });

        it("import page's events", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <ul>
					<li>
						<strong>map-redraw</strong> - Obecná změna stavu mapy (střed, zoom, natočení)
					</li>
                    <li>
						<strong>map-unlock</strong> - Odemknutí mapy
					</li>
                </ul>
            `);

            const page = importPage(doc);

            assert.deepStrictEqual(
                {
                    name: 'map-redraw',
                    description: 'Obecná změna stavu mapy (střed, zoom, natočení)',
                } as Page.Event,
                page.events[0]
            );
            assert.deepStrictEqual(
                {
                    name: 'map-unlock',
                    description: 'Odemknutí mapy',
                } as Page.Event,
                page.events[1]
            );
        });

        it("import page's property sections", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Vlastnosti - detailně</div>
                <a name="MOUSE_PAN"> </a>
                <div class="fixedFont">
                    &lt;konstanta&gt;
					<span class="light">SMap.</span><b>MOUSE_PAN</b>
				</div>
                <div class="description"></div>
                <hr>
                <a name="MOUSE_PAN"> </a>
                <div class="fixedFont">
                    &lt;statická&gt;
					<span class="light">SMap.</span><b>Card</b>
				</div>
                <div class="description"></div>
            `);

            const page = importPage(doc);

            assert.deepStrictEqual(
                {
                    name: 'MOUSE_PAN',
                    visibility: 'konstanta',
                } as Page.PropertySection,
                page.propertySections[0]
            );
            assert.deepStrictEqual(
                {
                    name: 'Card',
                    visibility: 'statická',
                } as Page.PropertySection,
                page.propertySections[1]
            );
        });

        it("find page's constructor section", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Konstruktor - detail</div>
                <div class="fixedFont">
                    <b>SMap</b>(container)
                </div> 
                <div class="description">
					Hlavní konstruktor map.
				</div>
                <dl class="detailList">
                    <dt class="heading">Parametry:</dt>
                        <dt>
                            <span class="light fixedFont">{node}</span> 
                            <b>container</b>
                        </dt>
                    </dt>
                </dl>
            `);

            const page = importPage(doc);

            assert.ok(page.constructorSection);
        });
    });
});
