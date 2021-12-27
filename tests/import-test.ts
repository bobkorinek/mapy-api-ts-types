import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import 'mocha';
import { Page } from '../src/scripts/types';
import { importPage } from '../src/scripts/import/page';
import { getPropertiesSections } from '../src/scripts/import/property-section';

const createDoc = (html: string, insertContent = true) =>
    new JSDOM(`<!DOCTYPE html>` + (insertContent ? '<div id="content">' + html + `</div>` : html)).window.document;

describe('import', () => {
    describe('page', () => {
        it("import page's name", () => {
            const doc = createDoc('<h1 class="classTitle">Třída SMap.Layer</h1>');

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.Layer.html');

            assert.strictEqual(page.name, 'SMap.Layer');
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

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            assert.deepStrictEqual(page.events[0], {
                name: 'map-redraw',
                description: 'Obecná změna stavu mapy (střed, zoom, natočení)',
            } as Page.Event);
            assert.deepStrictEqual(page.events[1], {
                name: 'map-unlock',
                description: 'Odemknutí mapy',
            } as Page.Event);
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
                <a name="Card"> </a>
                <div class="fixedFont">
                    &lt;statická&gt;
					<span class="light">SMap.</span><b>Card</b>
				</div>
                <div class="description"></div>
                <div class="sectionTitle">Metody - detailně</div>
                <a name="removeCard"> </a>
                <div class="fixedFont">
                    &lt;statická&gt;
                    <span class="light">{array}</span>
                    <b>removeCard</b>()
                </div>
                <div class="description">Zavře vizitku</div>
                <hr>
            `);

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            assert.strictEqual(page.propertySections.length, 2);
            assert.deepStrictEqual(page.propertySections[0], {
                name: 'MOUSE_PAN',
                visibility: 'konstanta',
                url: 'https://api.mapy.cz/doc/SMap.html#MOUSE_PAN',
            } as Page.PropertySection);
            assert.deepStrictEqual(page.propertySections[1], {
                name: 'Card',
                visibility: 'statická',
                url: 'https://api.mapy.cz/doc/SMap.html#Card',
            } as Page.PropertySection);
        });

        it("import page's method section", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Metody - detailně</div>
                <a name="computeCenterZoom"> </a>
                <div class="fixedFont">
                    <span class="light">{array}</span>
                    <b>computeCenterZoom</b>(arr, usePadding)
                </div>
                <div class="description">Spočítá střed a zoom pro množinu bodů</div>
                <dl class="detailList">
                    <dt class="heading">Parametry:</dt>
                    <dt>
                        <span class="light fixedFont">{Array[<a href="SMap.Coords.html#">SMap.Coords</a>]}</span>
                        <b>arr</b>
                    </dt>
                    <dd>Pole souřadnic</dd>
                    <dt>
                        <span class="light fixedFont">{bool}</span>
                        <b>usePadding</b>
                        <em>volitelný, výchozí: false</em>
                    </dt>
                    <dd>Má-li se průhled zúžit o paddingy způsobené ovládacími prvky</dd>
                </dl>
                <dl class="detailList">
                    <dt class="heading">Vrací:</dt>
                    <dt>
                        <!-- returny u funkci -->
                    </dt>
                    <dd>
                        <span class="light fixedFont">{array}</span>
                        <b></b>
                        Střed a zoom
                    </dd>
                </dl>
            `);

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            const method = page.methodSections[0];

            assert.strictEqual(method.name, 'computeCenterZoom', "Expected the method to have name 'computeCenterZoom'");
            assert.strictEqual(method.description, 'Spočítá střed a zoom pro množinu bodů', 'Expected the method to have description');
        });

        it("import page's method section 1", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Metody - detailně</div>
                <a name="removeCard"> </a>
                <div class="fixedFont">
                    &lt;statická&gt;
                    <span class="light">{array}</span>
                    <b>removeCard</b>()
                </div>
                <div class="description">Zavře vizitku</div>
            `);

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            const method = page.methodSections[0];

            assert.strictEqual(method.name, 'removeCard', "Expected the method to have name 'removeCard'");
            assert.strictEqual(method.description, 'Zavře vizitku', 'Expected the method to have description');
            assert.strictEqual(method.static, true, 'Expected the method to be static');
            assert.strictEqual(method.url, 'https://api.mapy.cz/doc/SMap.html#removeCard');
        });

        it("import method's argument section 2", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Metody - detailně</div>
                <a name="setCenter"> </a>
                <div class="fixedFont">
                    <b>setCenter</b>(center, animate)
                </div>
                <div class="description"></div>
                <dl class="detailList">
                    <dt class="heading">Parametry:</dt>
                    <dt>
                        <span class="light fixedFont">{<a href="SMap.Coords.html#">SMap.Coords</a>|<a href="SMap.Pixel.html#">SMap.Pixel</a>}</span> 
                        <b>center</b>
                    </dt>
                    <dd>Buď nová souřadnice středu, nebo pixelový posun</dd>
                    <dt>
                        <span class="light fixedFont">{bool}</span> 
                        <b>animate</b>
                        <em>volitelný, výchozí: false</em>
                    </dt>
                    <dd>Animovat?</dd>
                </dl>
            `);

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            const method = page.methodSections[0];

            const firstArgument = method.argumentSections[0];
            const secondArgument = method.argumentSections[1];

            assert.strictEqual(firstArgument.name, 'center');
            assert.strictEqual(firstArgument.type, 'SMap.Coords|SMap.Pixel');
            assert.strictEqual(firstArgument.description, 'Buď nová souřadnice středu, nebo pixelový posun');

            assert.strictEqual(secondArgument.name, 'animate');
            assert.strictEqual(secondArgument.type, 'bool');
            assert.strictEqual(secondArgument.description, 'Animovat?');
            assert.strictEqual(secondArgument.optional, true);
            assert.strictEqual(secondArgument.default, 'false');
        });

        it("import method's return value section", () => {
            const doc = createDoc(`<h1 class="classTitle">Třída SMap</h1>
                <p class="description">SMap Mapa</p>
                <div class="sectionTitle">Metody - detailně</div>
                <a name="getCard"> </a>
                <div class="fixedFont">
                    <span class="light">{SMap.Card}</span>
                    <b>getCard</b>()
                </div>
                <div class="description">Vrátí právě zobrazenou vizitku</div>
                <dl class="detailList">
                    <dt class="heading">Vrací:</dt>
                    <dt>
                        <!-- returny u funkci -->
                    </dt>
                    <dd>
                        <span class="light fixedFont">{<a href="SMap.Card.html#">SMap.Card</a>}</span>
                        <b></b>
                        Zobrazená vizitka
                    </dd>
                </dl>
            `);

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            const method = page.methodSections[0];
            const returnValue = method.returnValueSection;

            assert.strictEqual(returnValue.type, 'SMap.Card');
            assert.strictEqual(returnValue.description, 'Zobrazená vizitka');
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

            const page = importPage(doc, 'https://api.mapy.cz/doc/SMap.html');

            assert.ok(page.constructorSection);
        });
    });

    describe('property', () => {
        it('get property sections', () => {
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
                <div class="sectionTitle">Metody - detailně</div>
                <a name="removeCard"> </a>
                <div class="fixedFont">
                    &lt;statická&gt;
                    <span class="light">{array}</span>
                    <b>removeCard</b>()
                </div>
                <div class="description">Zavře vizitku</div>
                <hr>
            `);
            const propertySections = getPropertiesSections(doc);

            assert.strictEqual(propertySections.length, 2);
        });
    });
});