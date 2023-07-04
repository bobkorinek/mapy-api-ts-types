// @ts-nocheck
declare namespace JAK {
  class Signals {
    addListener(
      owner: object,
      type: string,
      handleFunction: string,
      sender: object
    ): void;

    removeListener(id: string): void;

    removeListeners(array: string[]): void;

    makeEvent(type: string, data: object): void;
  }

  interface ISignals {
    setInteface(intefaceName: string): JAK.Signals;

    getInteface(): JAK.Signals;

    addListener(type: string, handleFunction: string, sender: object): void;

    removeListener(id: string): void;

    removeListeners(array: string[]): void;

    makeEvent(type: string, data: object): void;
  }

  class Promise<T, R> {
    constructor(
      resolver: (resolve: (result: T) => any, reject: (result: R) => any) => any
    );

    when(all: Promise<any, any>[]);

    then(onFulfilled: (value: T) => any, onRejected: (value: R) => any);

    chain(promise);
  }

  class Vector {}

  abstract class AbstractDecorator<T extends object> {
    decorate(instance: T): T;
  }

  class EXIF {
    constructor(data: number[]);

    getTags(): Array<unknown>;
  }
}

/**
 * SMap Mapa.
 * @fires map-redraw Obecná změna stavu mapy (střed, zoom, natočení).
 * @fires map-lock Zamknutí mapy (i při změně parametrů nebude docházet k překreslení).
 * @fires map-unlock Odemknutí mapy.
 * @fires map-click Kliknutí do mapy.
 * @fires map-contextmenu Pokus o vyvolání kontextové nabídky.
 * @fires map-focus Mapa je nyní "aktivní" (bylo do ní kliknuto).
 * @fires map-blur Mapa už není "aktivní" (bylo kliknuto mimo).
 * @fires zoom-start Začátek animovaného zoomu.
 * @fires zoom-range-change Změna cíle animovaného zoomu.
 * @fires zoom-step Krok animovaného zoomu.
 * @fires zoom-stop Konec animovaného zoomu.
 * @fires rotation-start Začátek animovaného otáčení.
 * @fires rotation-step Krok animovaného otáčení.
 * @fires rotation-stop Konec animovaného otáčení.
 * @fires map-pan Pohyb s mapou.
 * @fires port-sync Přepočítání viewportu mapy.
 * @see http://api.mapy.cz/doc/SMap.html
 */
declare class SMap {
  /**
   * @see http://api.mapy.cz/doc/SMap.html#MOUSE_PAN
   */
  static readonly MOUSE_PAN;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MOUSE_WHEEL
   */
  static readonly MOUSE_WHEEL;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MOUSE_ZOOM_IN
   */
  static readonly MOUSE_ZOOM_IN;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MOUSE_ZOOM_OUT
   */
  static readonly MOUSE_ZOOM_OUT;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MOUSE_ZOOM
   */
  static readonly MOUSE_ZOOM;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#KB_PAN
   */
  static readonly KB_PAN;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#KB_ZOOM
   */
  static readonly KB_ZOOM;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_TILE
   */
  static readonly LAYER_TILE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_SHADOW
   */
  static readonly LAYER_SHADOW;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_GEOMETRY
   */
  static readonly LAYER_GEOMETRY;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_MARKER
   */
  static readonly LAYER_MARKER;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_ACTIVE
   */
  static readonly LAYER_ACTIVE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_HUD
   */
  static readonly LAYER_HUD;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#NORTH
   */
  static readonly NORTH;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#WEST
   */
  static readonly WEST;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#SOUTH
   */
  static readonly SOUTH;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#EAST
   */
  static readonly EAST;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_BASE
   */
  static readonly DEF_BASE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_TURIST
   */
  static readonly DEF_TURIST;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO
   */
  static readonly DEF_OPHOTO;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_HYBRID
   */
  static readonly DEF_HYBRID;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_HISTORIC
   */
  static readonly DEF_HISTORIC;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO0203
   */
  static readonly DEF_OPHOTO0203;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO0406
   */
  static readonly DEF_OPHOTO0406;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OBLIQUE
   */
  static readonly DEF_OBLIQUE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART_BASE
   */
  static readonly DEF_SMART_BASE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART_OPHOTO
   */
  static readonly DEF_SMART_OPHOTO;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART_TURIST
   */
  static readonly DEF_SMART_TURIST;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_RELIEF
   */
  static readonly DEF_RELIEF;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_PANO
   */
  static readonly DEF_PANO;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_TURIST_WINTER
   */
  static readonly DEF_TURIST_WINTER;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART_WINTER
   */
  static readonly DEF_SMART_WINTER;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART_SUMMER
   */
  static readonly DEF_SMART_SUMMER;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_GEOGRAPHY
   */
  static readonly DEF_GEOGRAPHY;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO1012
   */
  static readonly DEF_OPHOTO1012;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_HYBRID_SPARSE
   */
  static readonly DEF_HYBRID_SPARSE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO1415
   */
  static readonly DEF_OPHOTO1415;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_OPHOTO1618
   */
  static readonly DEF_OPHOTO1618;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#GEOMETRY_POLYLINE
   */
  static readonly GEOMETRY_POLYLINE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#GEOMETRY_POLYGON
   */
  static readonly GEOMETRY_POLYGON;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#GEOMETRY_CIRCLE
   */
  static readonly GEOMETRY_CIRCLE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#GEOMETRY_ELLIPSE
   */
  static readonly GEOMETRY_ELLIPSE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#GEOMETRY_PATH
   */
  static readonly GEOMETRY_PATH;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MAPSET_BASE
   */
  static readonly MAPSET_BASE;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#MAPSET_TURIST
   */
  static readonly MAPSET_TURIST;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#proj4
   */
  static proj4;

  /**
   * Zpetna kompatibilita.
   * @see http://api.mapy.cz/doc/SMap.html#Vector
   */
  static Vector;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#TileSetOblique
   */
  static TileSetOblique;

  /**
   * CSS vlastnost.
   * @see http://api.mapy.cz/doc/SMap.html#TRANSFORM
   */
  static TRANSFORM;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LAYER_VECTOR
   */
  static LAYER_VECTOR;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_SMART
   */
  static DEF_SMART;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_RELIEF_L
   */
  static DEF_RELIEF_L;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#DEF_RELIEF_H
   */
  static DEF_RELIEF_H;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#OphotoDate
   */
  static OphotoDate;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#WMMarker
   */
  static WMMarker;

  /**
   * Seznam vsech parametru pro suggest.
   * @see http://api.mapy.cz/doc/SMap.html#SuggestParams
   */
  static SuggestParams;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#POIServer
   */
  static POIServer;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LOOKUP_MARKER
   */
  static LOOKUP_MARKER;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#LOOKUP_GEOMETRY
   */
  static LOOKUP_GEOMETRY;

  /**
   * Hlavní konstruktor map.
   * @param {Node} container Prvek, do kterého se mapa vyrobí.
   * @param {SMap.Coords} [center] Souřadnice středu.
   * @param {number} [zoom] Zoom.
   * @param {object} [options] Konfigurační objekt.
   */
  constructor(
    container: Node,
    center?: SMap.Coords,
    zoom?: number,
    options?: object
  );

  /**
   * Všechny destruktory dělají toto:
  - vymažou kontejner, pokud prvek nějaký má
  - zavolají destruktor všech podřízených prvků
  - odvěsí své události
  Nedochází tedy k selektivnímu odvěšování - na to se používá .removeXXX().
   * @see http://api.mapy.cz/doc/SMap.html#$destructor
   */
  $destructor(): void;

  /**
   * Umožní zobrazování POI z poiserverů v API.
   * @see http://api.mapy.cz/doc/SMap.html#createDefaultDataProvider
   */
  createDefaultDataProvider(): void;

  /**
   * Zamkne mapu. Pokud je mapa zamknutá, nedochází k automatickému překreslování vrstev, když je potřeba.
   * @see http://api.mapy.cz/doc/SMap.html#lock
   */
  lock(): void;

  /**
   * Odemkne mapu; tím dojde k překreslení a aktualizaci všech vrstev (typicky po konci pohybu).
   * @see http://api.mapy.cz/doc/SMap.html#unlock
   */
  unlock(): void;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#getSignals
   * @returns {JAK.Signals}
   */
  getSignals(): JAK.Signals;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#getZoomRange
   */
  getZoomRange(): void;

  /**
   * Změna zoom rozsahu.
   * @see http://api.mapy.cz/doc/SMap.html#setZoomRange
   * @param {number} min Minimální povolený zoom.
   * @param {number} max Maximální povolený zoom.
   */
  setZoomRange(min: number, max: number): void;

  /**
   * Žádost o explicitní aktualizaci vrstev (má smysl jen při zamčené mapě).
   * @see http://api.mapy.cz/doc/SMap.html#redraw
   */
  redraw(): void;

  /**
   * Vrátí současnou orientaci.
   * @see http://api.mapy.cz/doc/SMap.html#getOrientation
   * @returns {number}
   */
  getOrientation(): number;

  /**
   * Nastaví orientaci.
   * @see http://api.mapy.cz/doc/SMap.html#setOrientation
   * @param {number} o Konstanta směru, který je "nahoru".
   * @param {boolean} [animate=true] Animovat?
   */
  setOrientation(o: number, animate?: boolean): void;

  /**
   * Nastaví projekci.
   * @see http://api.mapy.cz/doc/SMap.html#setProjection
   * @param {SMap.Projection} projection
   */
  setProjection(projection: SMap.Projection): void;

  /**
   * Vrátí mapový prvek.
   * @see http://api.mapy.cz/doc/SMap.html#getContainer
   * @returns {Node}
   */
  getContainer(): Node;

  /**
   * Vrátí rodič mapových vrstev.
   * @see http://api.mapy.cz/doc/SMap.html#getContent
   * @returns {Node}
   */
  getContent(): Node;

  /**
   * Vrátí rozměry průhledu.
   * @see http://api.mapy.cz/doc/SMap.html#getSize
   * @returns {SMap.Pixel}
   */
  getSize(): SMap.Pixel;

  /**
   * Vrátí aktuální projekci.
   * @see http://api.mapy.cz/doc/SMap.html#getProjection
   * @returns {SMap.Projection}
   */
  getProjection(): SMap.Projection;

  /**
   * Vrátí posun mapy vůči středu.
   * @see http://api.mapy.cz/doc/SMap.html#getOffset
   * @returns {SMap.Pixel}
   */
  getOffset(): SMap.Pixel;

  /**
   * Vrátí vektorový nástroj.
   * @see http://api.mapy.cz/doc/SMap.html#getGeometryCanvas
   * @returns {JAK.Vector}
   */
  getGeometryCanvas(): JAK.Vector;

  /**
   * Nastaví kurzor mapovému rodiči.
   * @see http://api.mapy.cz/doc/SMap.html#setCursor
   * @param {string | null} cursor CSS hodnota. Null znamená vrácení předchozího.
   * @param {number} [x] Hotspot X.
   * @param {number} [y] Hotspot Y.
   */
  setCursor(cursor: string | null, x?: number, y?: number): void;

  /**
   * Nastaví mapě nový střed.
   * @see http://api.mapy.cz/doc/SMap.html#setCenter
   * @param {SMap.Coords | SMap.Pixel} center Buď nová souřadnice středu, nebo pixelový posun.
   * @param {boolean} [animate=false] Animovat?
   */
  setCenter(center: SMap.Coords | SMap.Pixel, animate?: boolean): void;

  /**
   * Dojde ke zmene zoomu od toho soucasneho?
   * @see http://api.mapy.cz/doc/SMap.html#zoomChange
   * @param {number | string} z Zoom.
   * @returns {boolean}
   */
  zoomChange(z: number | string): boolean;

  /**
   * Nastaví mapě zoom.
   * @see http://api.mapy.cz/doc/SMap.html#setZoom
   * @param {number | string} z Zoom.
   * @param {SMap.Pixel | SMap.Coords} [fixedPoint] Bod, který by měl být vůči zoomu invariantní.
   * @param {boolean} [animate=false] Animovat?
   */
  setZoom(
    z: number | string,
    fixedPoint?: SMap.Pixel | SMap.Coords,
    animate?: boolean
  ): void;

  /**
   * Nastaví střed i zoom.
   * @see http://api.mapy.cz/doc/SMap.html#setCenterZoom
   * @param {SMap.Coords} center Střed.
   * @param {number} zoom Zoom.
   * @param {boolean} [animate=false] Animovat?
   */
  setCenterZoom(center: SMap.Coords, zoom: number, animate?: boolean): void;

  /**
   * Vrátí střed.
   * @see http://api.mapy.cz/doc/SMap.html#getCenter
   * @returns {SMap.Coords}
   */
  getCenter(): SMap.Coords;

  /**
   * Vrátí zoom.
   * @see http://api.mapy.cz/doc/SMap.html#getZoom
   * @returns {number}
   */
  getZoom(): number;

  /**
   * Spočítá střed a zoom pro množinu bodů.
   * @see http://api.mapy.cz/doc/SMap.html#computeCenterZoom
   * @param {Array<SMap.Coords>} arr Pole souřadnic.
   * @param {boolean} [usePadding=false] Má-li se průhled zúžit o paddingy způsobené ovládacími prvky.
   * @returns {array} Střed a zoom.
   */
  computeCenterZoom(
    arr: Array<SMap.Coords>,
    usePadding?: boolean
  ): Array<unknown>;

  /**
   * Přidá do mapy vrstvu.
   * @see http://api.mapy.cz/doc/SMap.html#addLayer
   * @param {SMap.Layer} l Vrstva.
   * @param {boolean} [before] Připnout-li vrstvu dospod ostatních (default = false = navrch).
   * @returns {SMap.Layer}
   */
  addLayer(l: SMap.Layer, before?: boolean): SMap.Layer;

  /**
   * Odebere vrstvu z mapy.
   * @see http://api.mapy.cz/doc/SMap.html#removeLayer
   * @param {SMap.Layer} l Vrstva.
   */
  removeLayer(l: SMap.Layer): void;

  /**
   * Nalezne mapu dle zadaného ID.
   * @see http://api.mapy.cz/doc/SMap.html#getLayer
   * @param {string | number} id ID vrstvy, kterou hledáme.
   * @returns {SMap.Layer | null} Výsledná vrstva, pokud je v mapě.
   */
  getLayer(id: string | number): SMap.Layer | null;

  /**
   * Vrátí držák daného typu vrstvy.
   * @see http://api.mapy.cz/doc/SMap.html#getLayerContainer
   */
  getLayerContainer(): void;

  /**
   * Přidá do mapy ovládací prvek.
   * @see http://api.mapy.cz/doc/SMap.html#addControl
   * @param {SMap.Control} c Ovládací prvek.
   * @param {object} [placement] Umístění - smysluplná kombinace CSS vlastností left/top/right/bottom (DEPRECATED: užijte přímo CSS stylů, každý potomek {@link SMap.Control.Visible} v API má unikátní CSS třídu).
   */
  addControl(c: SMap.Control, placement?: object): void;

  /**
   * Vrátí seznam ovládacích prvků.
   * @see http://api.mapy.cz/doc/SMap.html#getControls
   * @returns {Array<SMap.Control>}
   */
  getControls(): Array<SMap.Control>;

  /**
   * Odebere ovládáci prvek.
   * @see http://api.mapy.cz/doc/SMap.html#removeControl
   * @param {SMap.Control} c Ovládací prvek.
   */
  removeControl(c: SMap.Control): void;

  /**
   * Zobrazí vizitku.
   * @see http://api.mapy.cz/doc/SMap.html#addCard
   * @param {SMap.Card} card Vizitka.
   * @param {SMap.Coords} coords Souřadnice, na kterách se má otevřít.
   * @param {boolean} noPan Neposouvat mapu tak, aby byla vizitka vidět.
   */
  addCard(card: SMap.Card, coords: SMap.Coords, noPan: boolean): void;

  /**
   * Zavře vizitku.
   * @see http://api.mapy.cz/doc/SMap.html#removeCard
   */
  removeCard(): void;

  /**
   * Vrátí právě zobrazenou vizitku.
   * @see http://api.mapy.cz/doc/SMap.html#getCard
   * @returns {SMap.Card}
   */
  getCard(): SMap.Card;

  /**
   * Sesynchronizuje mapu s portem.
   * @see http://api.mapy.cz/doc/SMap.html#syncPort
   */
  syncPort(): void;

  /**
   * Nastaví vnitřní padding (rezervovanou oblast, kde nesmí být vizitka). Používá se jen při posunu mapy v důsledku otevření vizitky.
   * @see http://api.mapy.cz/doc/SMap.html#setPadding
   * @param {string} which Název směru paddingu.
   * @param {number} value Hodnota paddingu.
   */
  setPadding(which: string, value: number): void;

  /**
   * Vrátí vnitřní padding.
   * @see http://api.mapy.cz/doc/SMap.html#getPadding
   * @param {string} which Název směru paddingu.
   * @returns {number} Padding.
   */
  getPadding(which: string): number;

  /**
   * Top-level volání getMap() vrací instanci mapy.
   * @see http://api.mapy.cz/doc/SMap.html#getMap
   * @returns {SMap}
   */
  getMap(): SMap;

  /**
   * Vyrobí výchozí vrstvu dle zadané konstanty.
   * @see http://api.mapy.cz/doc/SMap.html#addDefaultLayer
   * @param {string | number} id Konstanta vrstvy.
   * @returns {SMap.Layer} Výchozí přidaná vrstva.
   */
  addDefaultLayer(id: string | number): SMap.Layer;

  /**
   * Vyrobí výchozí kontextové menu.
   * @see http://api.mapy.cz/doc/SMap.html#addDefaultContextMenu
   */
  addDefaultContextMenu(): void;

  /**
   * Vyrobí typické ovládácí prvky.
   * @see http://api.mapy.cz/doc/SMap.html#addDefaultControls
   */
  addDefaultControls(): void;

  /**
   * Nahradí v zadaném řetězci všechny placeholdery {nazev} aktuálními hodnotami.
  Povolené hodnoty: cx, cy, lbx, lby, rtx, rty, lx, rx, by, ty, zoom, zoom[+-][12], orientation.
   * @see http://api.mapy.cz/doc/SMap.html#formatString
   * @param {string} template Šablona pro nahrazení.
   * @param {object} [customValues] Doplňkové nahrazovací dvojice.
   * @returns {string} Nahrazený řetězec.
   */
  formatString(template: string, customValues?: object): string;

  /**
   * Test, jsou-li na zadaném místě (či aktuálním středu) dostupné šikmé snímky.
   * @see http://api.mapy.cz/doc/SMap.html#isObliqueAvailable
   * @param {SMap.Coords} [coords] Souřadnice pro otestování. Při nezadání se použije aktuální střed.
   */
  isObliqueAvailable(coords?: SMap.Coords): void;

  /**
   * Test, jsou-li na zadaném místě (či aktuálním středu) dostupné letecké snímky.
   * @see http://api.mapy.cz/doc/SMap.html#isOphotoAvailable
   * @param {SMap.Coords} [coords] Souřadnice pro otestování. Při nezadání se použije aktuální střed.
   */
  isOphotoAvailable(coords?: SMap.Coords): void;

  /**
   * Nové souřadnice, které se od zadaných na zadaném zoomu liší o padding mapy.
   * @see http://api.mapy.cz/doc/SMap.html#adjustCoordsByPadding
   * @param {SMap.Coords} coords Souřadnice, které posouváme.
   * @param {number} [zoom] Zoom, ve kterém je definovaný pixelový posun.
   * @param {SMap.Projection} [projection] Volitelně projekce (pokud není zadána, použije se aktuální).
   * @returns {SMap.Coords}
   */
  adjustCoordsByPadding(
    coords: SMap.Coords,
    zoom?: number,
    projection?: SMap.Projection
  ): SMap.Coords;

  /**
   * Přepnout do režimu plynulého zoomu.
   * @see http://api.mapy.cz/doc/SMap.html#zoomAnimationStart
   * @param {SMap.Pixel} fixedPoint
   * @param {boolean} touch Je to dotyk?
   */
  zoomAnimationStart(fixedPoint: SMap.Pixel, touch: boolean): void;

  /**
   * Krok plynulého zoomu.
   * @see http://api.mapy.cz/doc/SMap.html#zoomAnimationStep
   * @param {number} fracZoom
   */
  zoomAnimationStep(fracZoom: number): void;

  /**
   * Pustit animaci s daným cílem.
   * @see http://api.mapy.cz/doc/SMap.html#zoomAnimationTarget
   * @param {number} targetZoom
   * @param {number} [sourceZoom]
   */
  zoomAnimationTarget(targetZoom: number, sourceZoom?: number): void;

  /**
   * Konec režimu plynulého zoomu.
   * @see http://api.mapy.cz/doc/SMap.html#zoomAnimationStop
   */
  zoomAnimationStop(): void;

  /**
   * @see http://api.mapy.cz/doc/SMap.html#getCopyrightControl
   */
  getCopyrightControl(): void;

  /**
   * Ziskani viewportu mapy - lb - left bottom, rt - righ top body ve WGS84.
   * @see http://api.mapy.cz/doc/SMap.html#getViewport
   * @returns {Object}
   */
  getViewport(): Object;

  /**
   * Vhodnější je setCenter(c, true).
   * @see http://api.mapy.cz/doc/SMap.html#animate
   */
  animate(): void;
}

declare namespace SMap {
  /**
   * Zeměpisná poloha - dvojice souřadnic.
   * @see http://api.mapy.cz/doc/SMap.Coords.html
   */
  class Coords {
    /**
     * Konstruktor je lepší nepoužívat, namísto toho vyrábět souřadnice pomocí továrních metod.
     * @param {number} x Xová interní souřadnice.
     * @param {number} y Yová interní souřadnice.
     */
    constructor(x: number, y: number);

    /**
     * Tovární metoda - výroba souřadnic z události.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromEvent
     * @param {Event} event
     * @param {SMap} map
     * @returns {SMap.Coords}
     */
    static fromEvent(event: Event, map: SMap): SMap.Coords;

    /**
     * Tovární metoda - výroba souřadnic z PP.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromPP
     * @param {number} PPx Xová souřadnice.
     * @param {number} PPy Yová souřadnice.
     * @returns {SMap.Coords}
     */
    static fromPP(PPx: number, PPy: number): SMap.Coords;

    /**
     * Tovární metoda - výroba souřadnic z UTM33.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromUTM33
     * @param {number} x Xová souřadnice.
     * @param {number} y Yová souřadnice.
     * @returns {SMap.Coords}
     */
    static fromUTM33(x: number, y: number): SMap.Coords;

    /**
     * Tovární metoda - výroba souřadnic z WGS 84.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromWGS84
     * @param {number} lonD Longitude (zeměpisná délka) ve stupních jako desetinné číslo nebo řetězec.
     * @param {number} latD Latitude (zeměpisná šířka) ve stupních jako desetinné číslo nebo řetězec.
     * @returns {SMap.Coords}
     */
    static fromWGS84(lonD: number, latD: number): SMap.Coords;

    /**
     * Tovární metoda - výroba souřadnic z (S-)JTSK.
    Kód z pascalové verze Jakuba Kerhata (http://www.geospeleos.com/Mapovani/WGS84toSJTSK/WGS84toSJTSK.htm) převedl Josef Zamrzla.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromJTSK
     * @param {number} x
     * @param {number} y
     * @returns {SMap.Coords}
     */
    static fromJTSK(x: number, y: number): SMap.Coords;

    /**
     * Tovární metoda - výroba souřadnic z EXIF GPS dat.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromEXIF
     * @param {JAK.EXIF} exif Exif nadstavba nad obrazovými daty.
     * @returns {SMap.Coords}
     */
    static fromEXIF(exif: JAK.EXIF): SMap.Coords;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#stringToAltitude
     */
    static stringToAltitude(): void;

    /**
     * Převod na pixel.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toPixel
     * @param {SMap} map Mapa, vůči jejímu středu se pozice počítá.
     * @param {number} [zoom=map.zoom] Zoom.
     * @returns {SMap.Pixel} Nový pixel.
     */
    toPixel(map: SMap, zoom?: number): SMap.Pixel;

    /**
     * Vrátí duplikát.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#clone
     * @returns {SMap.Coords}
     */
    clone(): SMap.Coords;

    /**
     * Jsou shodné?
     * @see http://api.mapy.cz/doc/SMap.Coords.html#equals
     * @param {SMap.Coords} coords
     */
    equals(coords: SMap.Coords): void;

    /**
     * Vypočte azimut mezi dvěma souřadnicemi.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#azimuth
     * @param {SMap.Coords} target Cílová souřadnice.
     * @returns {number} Azimut k dané souřadnici ve stupních.
     */
    azimuth(target: SMap.Coords): number;

    /**
     * Spočte obloukovou vzdálenost (haversinový vzorec) mezi touto a druhou souřadnicí v zadané nadmořské výšce.
    Výchozí výška je 0 m.n.m., aproximováno na 6371009 metrů.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#distance
     * @param {SMap.Coords} target Cílová souřadnice.
     * @param {number} [altitude=0] Nadmořská výška.
     * @returns {number} Vzdálenost v metrech.
     */
    distance(target: SMap.Coords, altitude?: number): number;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#distanceMiro
     */
    distanceMiro(): void;

    /**
     * Převod na řetězec.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toString
     * @returns {string}
     */
    toString(): string;

    /**
     * Převede souřadnice do WGS 84.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toWGS84
     * @param {number} [format] Formát pro převod na řetězec: čím větší číslo, tím detailnější je řetězec (0 = stupně, 1 = minuty, 2 = vteřiny). Při nezadání bude vrácena dvojice floatů.
     * @returns {Array<number> | Array<string>} Pole [longitude, latitude].
     */
    toWGS84(format?: number): Array<number> | Array<string>;

    /**
     * Převede souřadnice do PP.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toPP
     * @returns {Array<number>}
     */
    toPP(): Array<number>;

    /**
     * Převede souřadnice do UTM33.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toUTM33
     * @returns {Array<number>}
     */
    toUTM33(): Array<number>;

    /**
     * Převede souřadnice do (S-)JTSK.
    Kód z pascalové verze Jakuba Kerhata (http://www.geospeleos.com/Mapovani/WGS84toSJTSK/WGS84toSJTSK.htm) převedl Josef Zamrzla.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toJTSK
     * @returns {Array<number>}
     */
    toJTSK(): Array<number>;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#isValid
     */
    isValid(): void;

    /**
     * Ověří, jsou-li tyto souřadnice v průhledu mapy.
     * @see http://api.mapy.cz/doc/SMap.Coords.html#inMap
     * @param {SMap} map
     * @param {boolean} [usePadding=false] Má-li se průhled zúžit o paddingy způsobené ovládacími prvky
    FIXME prepsat na bbox.
     */
    inMap(map: SMap, usePadding?: boolean): void;

    /**
     * Tovární metoda - výroba souřadnic z Mercator metrů (epsg:3857).
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fromMercator
     * @param {number} x Xová souřadnice.
     * @param {number} y Yová souřadnice.
     */
    fromMercator(x: number, y: number): void;

    /**
     * Převod do Mercator metrů (epsg:3857).
     * @see http://api.mapy.cz/doc/SMap.Coords.html#toMercator
     * @returns {Array<number>}
     */
    toMercator(): Array<number>;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#fixedPoint
     */
    fixedPoint(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#newCenter
     */
    newCenter(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Coords.html#wrap
     */
    wrap(): void;
  }

  /**
   * Vrstva v mapě.
   * @fires layer-enable Povolení vrstvy.
   * @fires layer-disable Zakázání vrstvy.
   * @see http://api.mapy.cz/doc/SMap.Layer.html
   */
  class Layer implements SMap.IOwned {
    /**
     * Zpetna kompatibilita.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#Vector
     */
    static Vector;

    /**
     * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
     */
    constructor(id: any);

    /**
     * @see http://api.mapy.cz/doc/SMap.Layer.html#$destructor
     */
    $destructor(): void;

    /**
     * Nastaví vrstvě sadu copyrightů.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#setCopyright
     * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
    copyright = {
      "-3":  "copy1",
      "4-5": "copy2",
      "6":   "copy3",
      "7-": "copy4",
    }.
     */
    setCopyright(copyright: object): void;

    /**
     * Vrátí copyright pro daný zoom. Pokud není, vrací null.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#getCopyright
     * @param {number} zoom Zoom, pro který chceme zjistit copyright.
     * @returns {string | Array<string> | null} Copyright.
     */
    getCopyright(zoom: number): string | Array<string> | null;

    /**
     * Vrátí ID vrstvy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#getId
     * @returns {any}
     */
    getId(): any;

    /**
     * Povolí vrstvu. Volat až po připnutí do mapy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#enable
     */
    enable(): void;

    /**
     * Zakáže vrstvu.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#disable
     */
    disable(): void;

    /**
     * Překreslení vrstvy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#redraw
     * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
     */
    redraw(full: boolean): void;

    /**
     * Dočasné vymazání vrstvy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#clear
     */
    clear(): void;

    /**
     * Vrátí kontejner(y) vrstvy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#getContainer
     * @returns {object}
     */
    getContainer(): object;

    /**
     * Zjistí, zda je vrstva zapnutá.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#isActive
     * @returns {boolean}
     */
    isActive(): boolean;

    /**
     * Odstranění všech prvků z vrstvy.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#removeAll
     */
    removeAll(): void;

    /**
     * Podporuje tato vrstva aktualizaci během animovaného zoomu?
     * @see http://api.mapy.cz/doc/SMap.Layer.html#supportsAnimation
     */
    supportsAnimation(): void;

    /**
     * Jen pokud supportsAnimation().
     * @see http://api.mapy.cz/doc/SMap.Layer.html#zoomTo
     */
    zoomTo(): void;

    /**
     * Jen pokud supportsAnimation().
     * @see http://api.mapy.cz/doc/SMap.Layer.html#rotateTo
     */
    rotateTo(): void;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;

    /**
     * Nastavení nadřízeného.
     * @see http://api.mapy.cz/doc/SMap.Layer.html#setOwner
     * @param {SMap.IOwned} owner
     */
    setOwner(owner: SMap.IOwned): void;
  }

  /**
   * Obecný ovládací prvek.
   * @see http://api.mapy.cz/doc/SMap.Control.html
   */
  class Control implements SMap.IOwned<SMap> {
    /**
     * @see http://api.mapy.cz/doc/SMap.Control.html#$destructor
     */
    $destructor(): void;

    /**
     * Vrátí vizuální reprezentaci prvku, je-li jaká.
     * @see http://api.mapy.cz/doc/SMap.Control.html#getContainer
     * @returns {Node}
     */
    getContainer(): Node;

    /**
     * Nastaví prvku rodiče (mapu).
     * @see http://api.mapy.cz/doc/SMap.Control.html#setOwner
     * @param {SMap} owner Nastaví rodiče ovládacího prvku.
     */
    setOwner(owner: SMap): void;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Control.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;
  }

  /**
   * Značka v mapě.
   * @fires marker-click Kliknutí na značku.
   * @see http://api.mapy.cz/doc/SMap.Marker.html
   */
  class Marker implements SMap.IOwned {
    /**
     * @see http://api.mapy.cz/doc/SMap.Marker.html#FotoPOI
     */
    static FotoPOI;

    /**
     * @param {SMap.Coords} coords Souřadnice značky.
     * @param {string | false} id Jednoznačný identifikátor, při nezadání bude vygenerován.
     * @param {object} [options] Konfigurační objekt.
     */
    constructor(coords: SMap.Coords, id: string | false, options?: object);

    /**
     * Statická tovární metoda - výroba značky z XML.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#fromXML
     * @param {Node} node XML uzel s definicí značky.
     */
    static fromXML(node: Node): void;

    /**
     * Statická tovární metoda - výroba značky z datového objektu.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#fromData
     * @param {object} data Definice např. z poiserveru.
     */
    static fromData(data: object): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Marker.html#$destructor
     */
    $destructor(): void;

    /**
     * Vrátí souřadnice značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getCoords
     * @returns {SMap.Coords}
     */
    getCoords(): SMap.Coords;

    /**
     * Vrátí kontejner značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getContainer
     * @returns {object}
     */
    getContainer(): object;

    /**
     * Vrátí ukotvení značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getAnchor
     * @returns {SMap.Pixel}
     */
    getAnchor(): SMap.Pixel;

    /**
     * Vrátí popisek značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getTitle
     * @returns {string}
     */
    getTitle(): string;

    /**
     * Vrátí id značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getId
     */
    getId(): void;

    /**
     * Vrátí rozměr značky, je-li znám.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getSize
     */
    getSize(): void;

    /**
     * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
    Není proveden žádný přepočet pozice.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#setURL
     * @param {string} url Nové URL.
     */
    setURL(url: string): void;

    /**
     * Změní značce umístění.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#setCoords
     * @param {SMap.Coords} coords Nová pozice.
     */
    setCoords(coords: SMap.Coords): void;

    /**
     * Je tento prvek součásní klikatelné části značky?
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getActive
     */
    getActive(): void;

    /**
     * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#click
     */
    click(): void;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;

    /**
     * Nastavení nadřízeného.
     * @see http://api.mapy.cz/doc/SMap.Marker.html#setOwner
     * @param {SMap.IOwned} owner
     */
    setOwner(owner: SMap.IOwned): void;
  }

  /**
   * Geometrický útvar.
   * @fires geometry-click
   * @see http://api.mapy.cz/doc/SMap.Geometry.html
   */
  class Geometry implements SMap.IOwned {
    /**
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#Multi
     */
    static Multi;

    /**
     * @param {number} type Konstanta SMap.GEOMETRY_*.
     * @param {any} id
     * @param {SMap.Coords} coords Pole souřadnic, čísel či polí souřadnic (liší se dle jednotlivých druhů geometrií).
     * @param {object} options Nastavení vzhledu: může obsahovat položky "title", "minDist", "color", "opacity", "width", "style", "outlineColor", "outlineOpacity", "outlineWidth", "outlineStyle".
     */
    constructor(type: number, id: any, coords: SMap.Coords, options: object);

    /**
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#$destructor
     */
    $destructor(): void;

    /**
     * Vrátí id geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getId
     */
    getId(): void;

    /**
     * Vrátí typ geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getType
     */
    getType(): void;

    /**
     * Vrátí souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getCoords
     */
    getCoords(): void;

    /**
     * Vrátí pixelové souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getPixels
     */
    getPixels(): void;

    /**
     * Vrátí optiony.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getOptions
     */
    getOptions(): void;

    /**
     * Nastaví podmnožinu optionů.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#setOptions
     */
    setOptions(): void;

    /**
     * Vrátí uzly vizuální reprezentace.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getNodes
     * @returns {Array<Node>}
     */
    getNodes(): Array<Node>;

    /**
     * Došlo ke kliknutí na geometrii. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#click
     */
    click(): void;

    /**
     * Smaže vizuální reprezentaci této geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#clear
     */
    clear(): void;

    /**
     * Vykreslí geometrii do daného vectorového canvasu.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#draw
     */
    draw(): void;

    /**
     * Změna souřadnic geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#setCoords
     */
    setCoords(): void;

    /**
     * Spočte střed a zoom mapy pro tuto geometrii.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#computeCenterZoom
     * @param {SMap} map
     * @param {boolean} usePadding
     */
    computeCenterZoom(map: SMap, usePadding: boolean): void;

    /**
     * Nastavi bbox geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#countBBox
     */
    countBBox(): void;

    /**
     * Vrati bboxu geometrie.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getBBox
     * @returns {Object}
     */
    getBBox(): Object;

    /**
     * Je geometrie viditelna na obrazovce?
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#isGeometryVisible
     * @returns {boolean}
     */
    isGeometryVisible(): boolean;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;

    /**
     * Nastavení nadřízeného.
     * @see http://api.mapy.cz/doc/SMap.Geometry.html#setOwner
     * @param {SMap.IOwned} owner
     */
    setOwner(owner: SMap.IOwned): void;
  }

  /**
   * @fires card-open Otevření vizitky.
   * @fires card-close Zavření vizitky.
   * @fires card-close-click Zavření vizitky v důsledku kliknutí na zavírací tlačítko.
   * @see http://api.mapy.cz/doc/SMap.Card.html
   */
  class Card implements SMap.IOwned<SMap> {
    /**
     * @param {number} [width=312] Šířka vizitky.
     * @param {object} [options] Volitelná konfigurace.
     */
    constructor(width?: number, options?: object);

    /**
     * @see http://api.mapy.cz/doc/SMap.Card.html#$destructor
     */
    $destructor(): void;

    /**
     * Nastaví vizitce vlastníka.
     * @see http://api.mapy.cz/doc/SMap.Card.html#setOwner
     * @param {SMap} owner Mapa, která vizitku otevírá.
     */
    setOwner(owner: SMap): void;

    /**
     * Vrátí záhlaví vizitky.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getHeader
     */
    getHeader(): HTMLElement;

    /**
     * Vrátí tělo vizitky.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getBody
     */
    getBody(): HTMLElement;

    /**
     * Vrátí zápatí vizitky.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getFooter
     */
    getFooter(): HTMLElement;

    /**
     * Změní velikost na zadaný rozměr.
     * @see http://api.mapy.cz/doc/SMap.Card.html#setSize
     * @param {number | null} width Šířka, při nezadání se použije výchozí.
     * @param {number | null} height Výška, při nezadání bude dle obsahu.
     */
    setSize(width: number | null, height: number | null): void;

    /**
     * Vrací kontejner vizitky.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getContainer
     * @returns {Node}
     */
    getContainer(): Node;

    /**
     * Vrací kotvící bod.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getAnchor
     */
    getAnchor(): void;

    /**
     * Umístí vizitku na dané souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Card.html#anchorTo
     * @param {SMap.Coords} coords Souradice, ke které se má vizitka ukotvit.
     */
    anchorTo(coords: SMap.Coords): void;

    /**
     * Je vizitka vidět?
     * @see http://api.mapy.cz/doc/SMap.Card.html#isVisible
     */
    isVisible(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Card.html#makeVisible
     * @returns {boolean}
     */
    makeVisible(): boolean;

    /**
     * Aktualizovat výšku těla vizitky tak, aby její celkový výška odpovídala zadaným rozměrům.
     * @see http://api.mapy.cz/doc/SMap.Card.html#sync
     */
    sync(): void;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Card.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;
  }

  /**
   * @see http://api.mapy.cz/doc/SMap.Pano.html
   */
  class Pano {
    /**
     * @see http://api.mapy.cz/doc/SMap.Pano.html#debug
     */
    static debug;

    /**
     * @see http://api.mapy.cz/doc/SMap.Pano.html#tileDir
     */
    static tileDir;

    /**
     * @see http://api.mapy.cz/doc/SMap.Pano.html#previewDir
     */
    static previewDir;

    /**
     * @see http://api.mapy.cz/doc/SMap.Pano.html#altitude
     */
    static altitude;

    /**
     * @see http://api.mapy.cz/doc/SMap.Pano.html#shaders
     */
    static shaders;

    /**
     * Je technologicky možné v tomto prohlížeči panoramata zobrazovat?
     * @see http://api.mapy.cz/doc/SMap.Pano.html#isSupported
     */
    isSupported(): void;

    /**
     * Získat jedno panorama pro zadané ID.
     * @see http://api.mapy.cz/doc/SMap.Pano.html#get
     * @param {number} id
     */
    get(id: number): void;

    /**
     * Získat sousedy pro zadané ID.
     * @see http://api.mapy.cz/doc/SMap.Pano.html#getNeighbors
     * @param {number} id
     */
    getNeighbors(id: number): void;

    /**
     * Získat jedno panorama pro zadané souřadnice a maximální pooloměr vzdálenosti.
     * @see http://api.mapy.cz/doc/SMap.Pano.html#getBest
     * @param {SMap.Coords} coords
     * @param {number} radius V metrech.
     * @param {object} attribute Objekt s upřesněním.
     */
    static async getBest(coords: SMap.Coords, radius: number, attribute: object): Promise;

    /**
     * Vytvoření pano místa.
     * @see http://api.mapy.cz/doc/SMap.Pano.html#create
     * @param {Object} data Vstupní data.
     */
    create(data: Object): void;
  }

  /**
   * Dopředný geocoder. Pro jeho funkčnost je nutné přesměrování /geocode => api4.mapy.cz/geocode.
   * @fires geocode-request Začátek geokódování.
   * @fires geocode-response Konec geokódování.
   * @see http://api.mapy.cz/doc/SMap.Geocoder.html
   */
  class Geocoder {
    /**
     * @see http://api.mapy.cz/doc/SMap.Geocoder.html#METHOD
     */
    static METHOD;

    /**
     * Provede dopředné geokódování.
     * @param {string} query Co hledáme.
     * @param {Function} callback Funkce co zpracuje nalezená data.
     * @param {Object} options Konfigurace.
     */
    constructor(query: string, callback: Function, options: Object);

    /**
     * @see http://api.mapy.cz/doc/SMap.Geocoder.html#$destructor
     */
    $destructor(): void;

    /**
     * Přeruší probíhající požadavek.
     * @see http://api.mapy.cz/doc/SMap.Geocoder.html#abort
     */
    abort(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Geocoder.html#getResults
     */
    getResults(): void;
  }

  /**
   * Pixel - bod v průhledu, relativní vůči středu průhledu.
   * @see http://api.mapy.cz/doc/SMap.Pixel.html
   */
  class Pixel {
    /**
     * @param {number} x Xová souřadnice.
     * @param {number} y Yová souřadnice.
     */
    constructor(x: number, y: number);

    /**
     * Tovární metoda - výroba pixelu z události.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#fromEvent
     * @param {Event} e
     * @param {SMap} map
     */
    fromEvent(e: Event, map: SMap): void;

    /**
     * Převod na souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toCoords
     * @param {SMap} map Mapa, vůči jejímu středu se pozice počítá.
     * @param {number} [zoom=map.zoom] Zoom.
     * @returns {SMap.Coords} Nové souřadnice.
     */
    toCoords(map: SMap, zoom?: number): SMap.Coords;

    /**
     * Přičtení jiného pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#plus
     * @param {SMap.Pixel} pixel Ten, který se přičte.
     * @returns {SMap.Pixel} Pixel po změně.
     */
    plus(pixel: SMap.Pixel): SMap.Pixel;

    /**
     * Odečtení jiného pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#minus
     * @param {SMap.Pixel} pixel Ten, který se odečte.
     * @returns {SMap.Pixel} Pixel po změně.
     */
    minus(pixel: SMap.Pixel): SMap.Pixel;

    /**
     * Vrátí duplikát.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#clone
     * @returns {SMap.Pixel}
     */
    clone(): SMap.Pixel;

    /**
     * Vrátí normu pixelu (vzdálenost k počátku).
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#norm
     * @returns {number}
     */
    norm(): number;

    /**
     * Vynásobí pixel konstantou či párem konstant.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#scale
     * @param {number} sx Scale X.
     * @param {number} [sy=sx] Scale Y.
     */
    scale(sx: number, sy?: number): void;

    /**
     * Spočte euklidovskou vzdálenost k jinému pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#distance
     * @param {SMap.Pixel} other
     * @returns {number}
     */
    distance(other: SMap.Pixel): number;

    /**
     * Převod na řetězec.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toString
     * @returns {string}
     */
    toString(): string;

    /**
     * Převod na dlaždici.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toTile
     * @param {SMap} map Mapa.
     * @param {number} tileSize Šířka strany.
     * @returns {SMap.Tile | null} Nová dlaždice.
     */
    toTile(map: SMap, tileSize: number): SMap.Tile | null;

    /**
     * Tovární metoda - výroba pixelu z události.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#fromEvent
     * @param {Event} e
     * @param {SMap} map
     */
    fromEvent(e: Event, map: SMap): void;

    /**
     * Převod na souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toCoords
     * @param {SMap} map Mapa, vůči jejímu středu se pozice počítá.
     * @param {number} [zoom=map.zoom] Zoom.
     * @returns {SMap.Coords} Nové souřadnice.
     */
    toCoords(map: SMap, zoom?: number): SMap.Coords;

    /**
     * Přičtení jiného pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#plus
     * @param {SMap.Pixel} pixel Ten, který se přičte.
     * @returns {SMap.Pixel} Pixel po změně.
     */
    plus(pixel: SMap.Pixel): SMap.Pixel;

    /**
     * Odečtení jiného pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#minus
     * @param {SMap.Pixel} pixel Ten, který se odečte.
     * @returns {SMap.Pixel} Pixel po změně.
     */
    minus(pixel: SMap.Pixel): SMap.Pixel;

    /**
     * Vrátí duplikát.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#clone
     * @returns {SMap.Pixel}
     */
    clone(): SMap.Pixel;

    /**
     * Vrátí normu pixelu (vzdálenost k počátku).
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#norm
     * @returns {number}
     */
    norm(): number;

    /**
     * Vynásobí pixel konstantou či párem konstant.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#scale
     * @param {number} sx Scale X.
     * @param {number} [sy=sx] Scale Y.
     */
    scale(sx: number, sy?: number): void;

    /**
     * Spočte euklidovskou vzdálenost k jinému pixelu.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#distance
     * @param {SMap.Pixel} other
     * @returns {number}
     */
    distance(other: SMap.Pixel): number;

    /**
     * Převod na řetězec.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toString
     * @returns {string}
     */
    toString(): string;

    /**
     * Převod na dlaždici.
     * @see http://api.mapy.cz/doc/SMap.Pixel.html#toTile
     * @param {SMap} map Mapa.
     * @param {number} tileSize Šířka strany.
     * @returns {SMap.Tile | null} Nová dlaždice.
     */
    toTile(map: SMap, tileSize: number): SMap.Tile | null;
  }

  /**
   * Požadavek na vyhledání trasy.
   * @fires route-request
   * @fires route-response
   * @see http://api.mapy.cz/doc/SMap.Route.html
   */
  class Route implements JAK.ISignals {
    /**
     * @see http://api.mapy.cz/doc/SMap.Route.html#ROUTE_TURIST_TYPES
     */
    static ROUTE_TURIST_TYPES;

    /**
     * @param {Array<SMap.Coords>} coords Pole bodů, skrz které vede trasa.
     * @param {Function} callback Funkce zavolaná po nalezení trasy.
     * @param {object} [params] Volitelná konfigurace.
     */
    constructor(
      coords: Array<SMap.Coords>,
      callback: Function,
      params?: object
    );

    /**
     * @see http://api.mapy.cz/doc/SMap.Route.html#formatRouteDistance
     */
    static formatRouteDistance(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Route.html#$destructor
     */
    $destructor(): void;

    /**
     * Ručně volat jen pokud bylo do konstruktoru posláno autoSend:false.
     * @see http://api.mapy.cz/doc/SMap.Route.html#send
     */
    send(): void;

    /**
     * Přerušit běžící požadavek.
     * @see http://api.mapy.cz/doc/SMap.Route.html#abort
     */
    abort(): void;

    /**
     * Vrátí pole průjezdních bodů.
     * @see http://api.mapy.cz/doc/SMap.Route.html#getCoords
     * @returns {Array<SMap.Coords>}
     */
    getCoords(): Array<SMap.Coords>;

    /**
     * Vrátí criterion, tedy parametry route.
     * @see http://api.mapy.cz/doc/SMap.Route.html#getCriterion
     * @returns {string}
     */
    getCriterion(): string;

    /**
     * Vrátí výsledek plánování. Je to objekt s těmito hlavními vlastnostmi:

    geometry – pole souřadnic geometrie trasy
    altitude – pole nadmořských výšek pro jednotlivé body geometrie
    points – pole průjezdních bodů; každý bod je další (zatím nedokumentovaný) složitý objekt
    ascent – celkové stoupání
    descent – celkové klesání
    url – routovací adresa
    inEurope – vede-li trasa též mimo ČR
    length – celková délka trasy v metrech
    time – celkový čas trasy ve vteřinách.
     * @see http://api.mapy.cz/doc/SMap.Route.html#getResults
     */
    getResults(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Route.html#getPromise
     */
    getPromise(): void;

    /**
     * Konfigurace routovace - zavola dotaz podle zadanych parametru, vraci promise.
    Defaultne ma vypnute obohaceni dat o nadmorske vysky.
     * @see http://api.mapy.cz/doc/SMap.Route.html#route
     * @param {Array<SMap.Coords>} coords Pole bodů, skrz které vede trasa.
     * @param {Object} paramsArgs Konfigurace vystupnich dat.
     */
    route(coords: Array<SMap.Coords>, paramsArgs: Object): void;

    setInteface(intefaceName: string): JAK.Signals;

    getInteface(): JAK.Signals;

    addListener(type: string, handleFunction: string, sender: object): void;

    removeListener(id: string): void;

    removeListeners(array: string[]): void;

    makeEvent(type: string, data: object): void;
  }

  /**
   * Dlaždice (čtvercová).
   * @see http://api.mapy.cz/doc/SMap.Tile.html
   */
  class Tile {
    /**
     * @param {number} zoom Zoom.
     * @param {number} tileSize Velikost dlazdice.
     * @param {number} x Xová souřadnice.
     * @param {number} y Yová souřadnice.
     */
    constructor(zoom: number, tileSize: number, x: number, y: number);

    /**
     * @see http://api.mapy.cz/doc/SMap.Tile.html#toString
     */
    toString(): void;

    /**
     * Vrátí duplikát.
     * @see http://api.mapy.cz/doc/SMap.Tile.html#clone
     * @returns {SMap.Tile}
     */
    clone(): SMap.Tile;

    /**
     * Vrátí px souřadnice levého horního rohu dlaždice vůči středu mapy.
     * @see http://api.mapy.cz/doc/SMap.Tile.html#toPixel
     * @param {SMap} map Mapa.
     * @returns {SMap.Pixel} Nová souřadnice.
     */
    toPixel(map: SMap): SMap.Pixel;

    /**
     * @see http://api.mapy.cz/doc/SMap.Tile.html#toString
     */
    toString(): void;

    /**
     * Vrátí duplikát.
     * @see http://api.mapy.cz/doc/SMap.Tile.html#clone
     * @returns {SMap.Tile}
     */
    clone(): SMap.Tile;

    /**
     * Vrátí px souřadnice levého horního rohu dlaždice vůči středu mapy.
     * @see http://api.mapy.cz/doc/SMap.Tile.html#toPixel
     * @param {SMap} map Mapa.
     * @returns {SMap.Pixel} Nová souřadnice.
     */
    toPixel(map: SMap): SMap.Pixel;
  }

  /**
   * @see http://api.mapy.cz/doc/SMap.Util.html
   */
  class Util {
    /**
     * Převede JS objekt v tečkové notaci na referenci.
     * @see http://api.mapy.cz/doc/SMap.Util.html#stringToObject
     * @param {string} str Řetězec s cestou.
     */
    static stringToObject(str: string): void;

    /**
     * Zmerguje jeden JS objekt do druhého.
     * @see http://api.mapy.cz/doc/SMap.Util.html#mergeObject
     * @param {object} from Zdroj.
     * @param {object} to Cíl.
     */
    static mergeObject(from: object, to: object): void;

    /**
     * Použije event nad  linkem, pokud se jedná o klik ctrl+levé tlačítko nebo prostřední tlačítko,
    tak vrací true a otevře odkaz "href" v novém okně.
     * @see http://api.mapy.cz/doc/SMap.Util.html#linkToNewWindow
     */
    linkToNewWindow(): void;

    /**
     * Naformátuje metry na standardní formát vzdálenosti.
     * @see http://api.mapy.cz/doc/SMap.Util.html#standardDistanceFormat
     * @param {unknown} distance Vzdálenost v metrech.
     * @param {unknown} longDecimal U kilometrů zaokrouhlovat na 3 desetinná místa?
     */
    standardDistanceFormat(distance: unknown, longDecimal: unknown): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Util.html#formatLocaleNumber
     */
    static formatLocaleNumber(): void;

    /**
     * Nachazi se bod point uvnitr polygonu?
     * @see http://api.mapy.cz/doc/SMap.Util.html#pointInPolygon
     * @param {Array<unknown>} point [x, y].
     * @param {unknown} polygon
     */
    pointInPolygon(point: Array<unknown>, polygon: unknown): void;

    /**
     * Vezme data viewportu mapy a prevede je na google bounds variantu, WGS84.
    [sw, ne] - lat,lon.
     * @see http://api.mapy.cz/doc/SMap.Util.html#viewportToBounds
     * @param {Object} viewport Lbx, lby, rtx, rty.
     */
    viewportToBounds(viewport: Object): void;

    /**
     * Převede JS objekt v tečkové notaci na referenci.
     * @see http://api.mapy.cz/doc/SMap.Util.html#stringToObject
     * @param {string} str Řetězec s cestou.
     */
    static stringToObject(str: string): void;

    /**
     * Zmerguje jeden JS objekt do druhého.
     * @see http://api.mapy.cz/doc/SMap.Util.html#mergeObject
     * @param {object} from Zdroj.
     * @param {object} to Cíl.
     */
    static mergeObject(from: object, to: object): void;

    /**
     * Použije event nad  linkem, pokud se jedná o klik ctrl+levé tlačítko nebo prostřední tlačítko,
    tak vrací true a otevře odkaz "href" v novém okně.
     * @see http://api.mapy.cz/doc/SMap.Util.html#linkToNewWindow
     */
    linkToNewWindow(): void;

    /**
     * Naformátuje metry na standardní formát vzdálenosti.
     * @see http://api.mapy.cz/doc/SMap.Util.html#standardDistanceFormat
     * @param {unknown} distance Vzdálenost v metrech.
     * @param {unknown} longDecimal U kilometrů zaokrouhlovat na 3 desetinná místa?
     */
    standardDistanceFormat(distance: unknown, longDecimal: unknown): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Util.html#formatLocaleNumber
     */
    static formatLocaleNumber(): void;

    /**
     * Nachazi se bod point uvnitr polygonu?
     * @see http://api.mapy.cz/doc/SMap.Util.html#pointInPolygon
     * @param {Array<unknown>} point [x, y].
     * @param {unknown} polygon
     */
    pointInPolygon(point: Array<unknown>, polygon: unknown): void;

    /**
     * Vezme data viewportu mapy a prevede je na google bounds variantu, WGS84.
    [sw, ne] - lat,lon.
     * @see http://api.mapy.cz/doc/SMap.Util.html#viewportToBounds
     * @param {Object} viewport Lbx, lby, rtx, rty.
     */
    viewportToBounds(viewport: Object): void;
  }

  /**
   * Našeptávač pro Mapy.
   * @fires open - otevření našeptávače.
   * @fires close - zavření našeptávače.
   * @fires request - byl poslán request s aktuální frází.
   * @fires request-items (Array[]) - vrací pole s aktuálními daty pro našeptávač.
   * @fires enter ({ event, phrase }) - v inputu byl zmáčknut enter, nebyla vybrána položka z našeptávače.
   * @fires suggest ({ phrase, prevPhrase, data, position, limit }) - byla vybrána položka z našeptávače.
   * @see http://api.mapy.cz/doc/SMap.Suggest.html
   */
  class Suggest {
    /**
     * Vytvoření našeptávače - je potřeba zadat vstupní input a volitelné parametry.
     * @param {Element} input Input type text.
     * @param {Object} [options]
     */
    constructor(input: Element, options?: Object);

    /**
     * Funkce pro upravu url parametru.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#urlParams
     * @param {Object} data Objekt s definici hodnot pro url, viz. nize.
     */
    urlParams(data: Object): void;

    /**
     * Vlastní funkce pro obohacení parametrů pro request našeptávače.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#updateParams
     * @param {Function} cb Funkce, kde prvním argumentem je objekt pro vytvoření URL (params).
     */
    updateParams(cb: Function): void;

    /**
     * Pomocna funkce pro nastaveni dat ze suggestu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#dataParams
     * @param {Object} data Nove hodnoty pro upravu url.
     */
    dataParams(data: Object): void;

    /**
     * Nastaveni - bind mapy.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#map
     * @param {SMap} map Instance mapy.
     */
    map(map: SMap): void;

    /**
     * Zrušení requestu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#abort
     */
    abort(): void;

    /**
     * Přidání posluchače signálu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#addListener
     * @param {string} name Jméno signálu.
     * @param {Function} cb Callback funkce.
     * @param {Object} [scope] Vlastní scope pro funkci.
     */
    addListener(name: string, cb: Function, scope?: Object): void;

    /**
     * Odstranění posluchače signálu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#removeListener
     * @param {string} name Jméno signálu.
     * @param {Function} cb Callback funkce.
     * @param {Object} [scope] Vlastní scope pro funkci.
     */
    removeListener(name: string, cb: Function, scope?: Object): void;

    /**
     * Odstranění našeptávače.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#destroy
     */
    destroy(): void;

    /**
     * Zobrazení našeptávače.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#open
     */
    open(): void;

    /**
     * Zavření našeptávače.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#close
     */
    close(): void;

    /**
     * Odstranění všech položek našeptávače.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#clearItems
     */
    clearItems(): void;

    /**
     * Zobrazení našeptávače pro danou frázi ve vstupním inputu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#send
     */
    send(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#handleEvent
     */
    handleEvent(): void;

    /**
     * Získání fráze ze vstupního inputu.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#getPhrase
     * @returns {string}
     */
    getPhrase(): string;

    /**
     * Získání provideru.
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#getProvider
     * @returns {Object}
     */
    getProvider(): Object;

    /**
     * Je našeptávač aktivní (otevřený).
     * @see http://api.mapy.cz/doc/SMap.Suggest.html#isActive
     * @returns {boolean}
     */
    isActive(): boolean;
  }

  /**
   * Položka našeptávače.
   * @see http://api.mapy.cz/doc/SMap.SuggestItem.html
   */
  class SuggestItem {
    /**
     * Pro vytvoření položky jsou nutné vstupní data a pozice položky v seznamu.
     * @param {Object} data Vstupní data z SMap.SuggestProvider.
     * @param {number} pos Pozice <1;n>.
     */
    constructor(data: Object, pos: number);

    /**
     * Odstranění položky našeptávače.
     * @see http://api.mapy.cz/doc/SMap.SuggestItem.html#destroy
     */
    destroy(): void;

    /**
     * Funkce vrací HTML dané položky.
     * @see http://api.mapy.cz/doc/SMap.SuggestItem.html#getNode
     * @returns {Element}
     */
    getNode(): Element;

    /**
     * Získání dat dané položky.
     * @see http://api.mapy.cz/doc/SMap.SuggestItem.html#getData
     * @returns {Object}
     */
    getData(): Object;

    /**
     * Získání fráze dané položky.
     * @see http://api.mapy.cz/doc/SMap.SuggestItem.html#getPhrase
     * @returns {string}
     */
    getPhrase(): string;

    /**
     * Získání pozice položky v seznamu, začíná se od 1.
     * @see http://api.mapy.cz/doc/SMap.SuggestItem.html#getPosition
     * @returns {number}
     */
    getPosition(): number;
  }

  /**
   * Data pro našeptávač.
   * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html
   */
  class SuggestProvider {
    /**
     * Vytvoření provideru pro zajištění dat našeptávače.
     * @param {Object} [options]
     */
    constructor(options?: Object);

    /**
     * Nastaveni ze suggestu pro zpetnou kombalitu.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#suggestSet
     * @param {Object} suggestOpts Nastaveni.
     */
    suggestSet(suggestOpts: Object): void;

    /**
     * Funkce vrací promise s daty pro našeptávač.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#get
     * @param {string} phrase Hledaná fráze.
     * @returns {JAK.Promise}
     */
    get(phrase: string): JAK.Promise<unknown, unknown>;

    /**
     * Zrušení requestu.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#abort
     */
    abort(): void;

    /**
     * Získání limitu - počtu položek našeptávače pro zobrazení/stažení.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#getLimit
     * @returns {number}
     */
    getLimit(): number;

    /**
     * Pomocna funkce pro nastaveni dat ze suggestu.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#urlParams
     * @param {Object} data Nove hodnoty pro upravu url.
     */
    urlParams(data: Object): void;

    /**
     * Vlastní funkce pro obohacení parametrů pro request našeptávače.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#updateParams
     * @param {Function} cb Funkce, kde prvním argumentem je objekt pro vytvoření URL.
     */
    updateParams(cb: Function): void;

    /**
     * Pomocna funkce pro nastaveni dat ze suggestu.
     * @see http://api.mapy.cz/doc/SMap.SuggestProvider.html#dataParams
     * @param {Object} data Nove hodnoty pro upravu url.
     */
    dataParams(data: Object): void;
  }

  /**
   * Projekce - nástroj pro převod mezi pixely a souřadnicemi.
   * @see http://api.mapy.cz/doc/SMap.Projection.html
   */
  class Projection implements SMap.IOwned {
    /**
     * @see http://api.mapy.cz/doc/SMap.Projection.html#getCode
     */
    getCode(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Projection.html#getMatrixSet
     */
    getMatrixSet(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Projection.html#getWorldSize
     */
    getWorldSize(): void;

    /**
     * Převede souřadnice na absolutní pixelovou hodnotu.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#project
     * @param {SMap.Coords} coords
     * @param {number} zoom
     * @returns {SMap.Pixel}
     */
    project(coords: SMap.Coords, zoom: number): SMap.Pixel;

    /**
     * Převede absolutní pixelovou hodnotu na souřadnice.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#unproject
     * @param {SMap.Pixel} absPixel
     * @param {number} zoom
     * @returns {SMap.Coords}
     */
    unproject(absPixel: SMap.Pixel, zoom: number): SMap.Coords;

    /**
     * Převede relativní pixelovou hodnotu na zeměpisnou souřadnici.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#pixelToCoords
     * @param {SMap.Pixel} pixel
     * @param {SMap.Coords} center
     * @param {number} zoom
     * @param {number} orientation
     */
    pixelToCoords(
      pixel: SMap.Pixel,
      center: SMap.Coords,
      zoom: number,
      orientation: number
    ): void;

    /**
     * Převede zeměpisnou souřadnici na relativní pixelovou hodnotu.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#coordsToPixel
     * @param {SMap.Coords} coords
     * @param {SMap.Coords} center
     * @param {number} zoom
     * @param {number} orientation
     */
    coordsToPixel(
      coords: SMap.Coords,
      center: SMap.Coords,
      zoom: number,
      orientation: number
    ): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Projection.html#pixelToTile
     */
    pixelToTile(): void;

    /**
     * @see http://api.mapy.cz/doc/SMap.Projection.html#tileToPixel
     */
    tileToPixel(): void;

    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;

    /**
     * Nastavení nadřízeného.
     * @see http://api.mapy.cz/doc/SMap.Projection.html#setOwner
     * @param {SMap.IOwned} owner
     */
    setOwner(owner: SMap.IOwned): void;
  }

  /**
   * Rozhraní pro všechny, kteří mají nadřízeného.
   * @see http://api.mapy.cz/doc/SMap.IOwned.html
   */
  interface IOwned<O = SMap.IOwned<any>> {
    /**
     * Zjistí (směrem nahoru) mapu.
     * @see http://api.mapy.cz/doc/SMap.IOwned.html#getMap
     * @returns {SMap}
     */
    getMap(): SMap;

    /**
     * Nastavení nadřízeného.
     * @see http://api.mapy.cz/doc/SMap.IOwned.html#setOwner
     * @param {SMap.IOwned} owner
     */
    setOwner(owner: O): void;
  }

  namespace Layer {
    /**
     * Canvasová vrstva.
     * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html
     */
    class Canvas extends SMap.Layer {
      /**
       * Constructor Canvasove vrstvy.
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       * @param {number} layerId Identifikator vrstvy kam bude layer pridan, jedna z konstant SMap.LAYER_*.
       */
      constructor(id: any, layerId: number);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#clear
       */
      clear(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#getContext
       */
      getContext(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#redraw
       */
      redraw(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#disable
       */
      disable(): void;

      /**
       * Překreslení vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#redraw
       * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
       */
      redraw(full: boolean): void;

      /**
       * Dočasné vymazání vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#clear
       */
      clear(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Canvas.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Vizualizátor GPX.
     * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html
     */
    class GPX extends SMap.Layer.Multi {
      /**
       * @param {XMLDocument} xmlDoc Souboru GPX.
       * @param {string} id ID vrstvy.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(xmlDoc: XMLDocument, id: string, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#parseCoords
       */
      static parseCoords(): void;

      /**
       * Nastaví střed a zoom tak, aby byly vidět všechny prvky v GPX datech.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#fit
       */
      fit(): void;

      /**
       * Filtrujeme zadanou mnozinu tak, aby pro "largestCount" vstupnich bodu obsahoval maximalne maxPoints vystupnich bodu.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#filter
       */
      filter(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#createMarker
       */
      createMarker(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#$destructor
       */
      $destructor(): void;

      /**
       * Překreslí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#redraw
       */
      redraw(): void;

      /**
       * Vymaže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#clear
       */
      clear(): void;

      /**
       * Odstraní prvky z podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#removeAll
       */
      removeAll(): void;

      /**
       * Povolí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#enable
       */
      enable(): void;

      /**
       * Zakáže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#disable
       */
      disable(): void;

      /**
       * Nastaví vlastníka.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejnery podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Přidá podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#addLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      addLayer(l: SMap.Layer): void;

      /**
       * Odebere podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#removeLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      removeLayer(l: SMap.Layer): void;

      /**
       * Vrátí všechny podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#getLayers
       * @returns {Array<SMap.Layer>}
       */
      getLayers(): Array<SMap.Layer>;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.GPX.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Vrstva s čárami, mnohoúhelníky a jinými zajímaví tvorové :).
     * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html
     */
    class Geometry extends SMap.Layer {
      /**
       * @param {any} id ID vrstvy.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(id: any, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#zoomTo
       */
      zoomTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#addGeometry
       * @param {SMap.Geometry} geometry
       */
      addGeometry(geometry: SMap.Geometry): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#removeGeometry
       * @param {SMap.Geometry} geometry
       */
      removeGeometry(geometry: SMap.Geometry): void;

      /**
       * Vrátí všechny geometrie v objektu indexovaném jednotlivými ID.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#getGeometries
       * @returns {object}
       */
      getGeometries(): object;

      /**
       * Vymazání vrstvy == dočasné zrušení všech prvků.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#clear
       */
      clear(): void;

      /**
       * Odebere vše z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#removeAll
       */
      removeAll(): void;

      /**
       * Naplní obsah vrstvy z XML nebo z FRPC dat.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#fillFromData
       * @param {Object | Array<unknown>} dataSets Data pro naplnění.
       */
      fillFromData(dataSets: Object | Array<unknown>): void;

      /**
       * Překreslí vrstvu: vezme všechny souřadnice vektorových prvků, přepočte je na pixely (s ohledem na současný zoom)
      a vykreslí ty, které jsou celé v průhledu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#redraw
       */
      redraw(): void;

      /**
       * Překreslení jedné geometrie. Veřejná metoda, aby ji mohla volat sama geometrie.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#redrawGeometry
       */
      redrawGeometry(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Geometry.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Vrstva fixní vůči průhledu.
     * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html
     */
    class HUD extends SMap.Layer {
      /**
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       */
      constructor(id: any);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#clear
       */
      clear(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#enable
       */
      enable(): void;

      /**
       * Nová položka do HUDu.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#addItem
       * @param {Node} node DOM prvek.
       * @param {object} placement Umístění - sada css vlastností.
       * @param {boolean} [prepend] Připnout na první pozici.
       */
      addItem(node: Node, placement: object, prepend?: boolean): void;

      /**
       * Zruší položku z HUDu.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#removeItem
       * @param {Node} node DOM prvek.
       */
      removeItem(node: Node): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#disable
       */
      disable(): void;

      /**
       * Překreslení vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#redraw
       * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
       */
      redraw(full: boolean): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.HUD.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Vrstva s obrázky pevně umístěnými rohy k zeměpisným souřadnicím.
     * @see http://api.mapy.cz/doc/SMap.Layer.Image.html
     */
    class Image extends SMap.Layer {
      /**
       * @param {string} id ID vrstvy.
       */
      constructor(id: string);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Přidání nového obrázku.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#addImage
       * @param {string} url
       * @param {SMap.Coords} leftTop Souřadnice levého horního rohu.
       * @param {SMap.Coords} rightBottom Souřadnice pravého dolního rohu.
       * @param {number} [opacity=1] Průhlednost.
       * @returns {string} ID obrázku, používané pro odebrání.
       */
      addImage(
        url: string,
        leftTop: SMap.Coords,
        rightBottom: SMap.Coords,
        opacity?: number
      ): string;

      /**
       * Odebere dříve přidaný obrázek.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#removeImage
       * @param {string} id ID vrácené voláním addImage.
       */
      removeImage(id: string): void;

      /**
       * Odebere všechny obrázky.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#removeAll
       */
      removeAll(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#redraw
       */
      redraw(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#clear
       */
      clear(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#enable
       */
      enable(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#zoomTo
       */
      zoomTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Image.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Vizualizátor KML.
     * @see http://api.mapy.cz/doc/SMap.Layer.KML.html
     */
    class KML extends SMap.Layer.Multi {
      /**
       * @param {XMLDocument} xmlDoc Soubor KML.
       * @param {string} id ID vrstvy.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(xmlDoc: XMLDocument, id: string, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#filter
       */
      filter(): void;

      /**
       * Nastaví střed a zoom tak, aby byly vidět všechny prvky v KML datech.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#fit
       */
      fit(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getStyle
       */
      getStyle(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getColor
       */
      getColor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getOpacity
       */
      getOpacity(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getURL
       */
      getURL(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#$destructor
       */
      $destructor(): void;

      /**
       * Překreslí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#redraw
       */
      redraw(): void;

      /**
       * Vymaže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#clear
       */
      clear(): void;

      /**
       * Odstraní prvky z podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#removeAll
       */
      removeAll(): void;

      /**
       * Povolí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#enable
       */
      enable(): void;

      /**
       * Zakáže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#disable
       */
      disable(): void;

      /**
       * Nastaví vlastníka.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejnery podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Přidá podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#addLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      addLayer(l: SMap.Layer): void;

      /**
       * Odebere podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#removeLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      removeLayer(l: SMap.Layer): void;

      /**
       * Vrátí všechny podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getLayers
       * @returns {Array<SMap.Layer>}
       */
      getLayers(): Array<SMap.Layer>;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.KML.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Vrstva se značkami.
     * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html
     */
    class Marker extends SMap.Layer {
      /**
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví slučovač značek.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#setClusterer
       * @param {SMap.Marker.Clusterer | null} clusterer
       */
      setClusterer(clusterer: SMap.Marker.Clusterer | null): void;

      /**
       * Přidá do vrstvy značku nebo značky.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#addMarker
       * @param {SMap.Marker | Array<SMap.Marker>} marker Značka k přidání.
       * @param {boolean} [noRedraw=false] Zakázat překreslení.
       */
      addMarker(
        marker: SMap.Marker | Array<SMap.Marker>,
        noRedraw?: boolean
      ): void;

      /**
       * Odebere značku nebo značky z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#removeMarker
       * @param {SMap.Marker | Array<SMap.Marker>} marker Značka k odebrání.
       * @param {boolean} [noRedraw=false] Zakázat překreslení.
       */
      removeMarker(
        marker: SMap.Marker | Array<SMap.Marker>,
        noRedraw?: boolean
      ): void;

      /**
       * Odebere všechny značky.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#removeAll
       */
      removeAll(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#getMarkers
       * @returns {Array<SMap.Marker>}
       */
      getMarkers(): Array<SMap.Marker>;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Naplní obsah vrstvy externími daty.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#fillFromData
       * @param {Object | Array<unknown>} data Data pro naplnění - buďto datové objekty, nebo XML dokumenty.
       */
      fillFromData(data: Object | Array<unknown>): void;

      /**
       * Zapne rozhazování značek tak, aby se nepřekrývaly. Využívá k tomu SMap.Marker.Repositioner.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#setReposition
       * @param {null | object} options Parametry pro repositioner, zatím nedokumentované.
       */
      setReposition(options: null | object): void;

      /**
       * Překreslí vrstvu: vezme značky a spočte viditelnost. Viditelné ukáže a napozicuje, neviditelné odepne.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#redraw
       */
      redraw(): void;

      /**
       * Přepozicování značky. Metoda je veřejná, aby ji mohla volat sama značka.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#positionMarker
       * @param {SMap.Marker} marker Značka k přepozicování.
       */
      positionMarker(marker: SMap.Marker): void;

      /**
       * Dočasně vymaže vrstvu. POZOR - neodebírá z vrstvy značky, při nejbližším překreslení se vrstva zase vykreslí.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#clear
       */
      clear(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Marker.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Metavrstva, sdružující více jiných vrstev.
     * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html
     */
    class Multi extends SMap.Layer {
      /**
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       */
      constructor(id: any);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#$destructor
       */
      $destructor(): void;

      /**
       * Překreslí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#redraw
       */
      redraw(): void;

      /**
       * Vymaže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#clear
       */
      clear(): void;

      /**
       * Odstraní prvky z podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#removeAll
       */
      removeAll(): void;

      /**
       * Povolí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#enable
       */
      enable(): void;

      /**
       * Zakáže podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#disable
       */
      disable(): void;

      /**
       * Nastaví vlastníka.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejnery podřízených vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Přidá podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#addLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      addLayer(l: SMap.Layer): void;

      /**
       * Odebere podřízenou vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#removeLayer
       * @param {SMap.Layer} l Podřízená vrstva.
       */
      removeLayer(l: SMap.Layer): void;

      /**
       * Vrátí všechny podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#getLayers
       * @returns {Array<SMap.Layer>}
       */
      getLayers(): Array<SMap.Layer>;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Multi.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Chytrá dlaždicová vrstva, automaticky přepíná (base-)ophoto-oblique (+ hybrid).
    Drží si u sebe podřízené vrstvy, které střídavě zapíná a vypína.
     * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html
     */
    class Smart extends SMap.Layer {
      /**
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       */
      constructor(id: any);

      /**
       * Vrátí podřízené vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getLayers
       */
      getLayers(): void;

      /**
       * Zapne/vypne zobrazovani hybridu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#setHybrid
       */
      setHybrid(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#redraw
       */
      redraw(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getSimpleLayerId
       */
      getSimpleLayerId(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#clear
       */
      clear(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#zoomTo
       */
      zoomTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#rotateTo
       */
      rotateTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getCopyright
       */
      getCopyright(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#setOwner
       */
      setOwner(): void;

      /**
       * Pozor - zapínání není delegování na aktuální podvrstvu, protože ta nemusí být vůbec zapnutelná (oblique při non-oblique projekci).
      Proto při našem zapnutí jen překreslíme ($super) - a při překreslení vrstvu zapneme, až to bude bezpečné.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#enable
       */
      enable(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#disable
       */
      disable(): void;

      /**
       * Sloucene kontejnery vsech podrizenych vrstev.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#disable
       */
      disable(): void;

      /**
       * Překreslení vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#redraw
       * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
       */
      redraw(full: boolean): void;

      /**
       * Dočasné vymazání vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#clear
       */
      clear(): void;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Vrstva s dlaždicemi. Posílá dotazy na dlaždice, jejichž názvy ve výchozím nastavení mají tvar ZOOM_X_Y?a=ORIENTATION.
     * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html
     */
    class Tile extends SMap.Layer {
      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#Oblique
       */
      static Oblique;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#DEFAULT_OPTIONS
       */
      static DEFAULT_OPTIONS;

      /**
       * @param {string} id ID vrstvy.
       * @param {string} url Základní URL dlaždic.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(id: string, url: string, options?: object);

      /**
       * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí).
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#setOptions
       */
      setOptions(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#redraw
       */
      redraw(): void;

      /**
       * Nastaví vrstvě nové URL.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Vymazat vrstvu == zrušit DOM a cache.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#clear
       */
      clear(): void;

      /**
       * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Dočasně natočit - krok animovaného otáčení.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#rotateTo
       */
      rotateTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#getURL
       */
      getURL(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Tile.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Turistická vrstva: zapínatelné turist- a cyklo-trasy.
     * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html
     */
    class Turist extends SMap.Layer {
      /**
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       */
      constructor(id: any);

      /**
       * Změna viditelnosti tur. stezek.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#setTrail
       * @param {boolean} trail
       */
      setTrail(trail: boolean): void;

      /**
       * Změna viditelnosti cyklostezek.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#setBike
       * @param {boolean} bike
       */
      setBike(bike: boolean): void;

      /**
       * Jsou zaplé turistické trasy?
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getTrail
       */
      getTrail(): void;

      /**
       * Jsou zaplé cyklostezky?
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getBike
       */
      getBike(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#disable
       */
      disable(): void;

      /**
       * Překreslení vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#redraw
       * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
       */
      redraw(full: boolean): void;

      /**
       * Dočasné vymazání vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#clear
       */
      clear(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Turist.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Dlaždicová vrstva s daty získanými přes WMS.
     * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html
     */
    class WMS extends SMap.Layer.Tile {
      /**
       * @param {any} id
       * @param {string} url
       * @param {object} params WMS parametry, povinné zejména "layers".
       */
      constructor(id: any, url: string, params: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#redraw
       */
      redraw(): void;

      /**
       * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí).
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#setOptions
       */
      setOptions(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#redraw
       */
      redraw(): void;

      /**
       * Nastaví vrstvě nové URL.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Vymazat vrstvu == zrušit DOM a cache.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#clear
       */
      clear(): void;

      /**
       * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Dočasně natočit - krok animovaného otáčení.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#rotateTo
       */
      rotateTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMS.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Dlaždicová vrstva s daty získanými přes WMTS.
     * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html
     */
    class WMTS extends SMap.Layer.Tile {
      /**
       * @param {any} id
       * @param {string} url
       * @param {object} params WMTS parametry.
       * @param {object} options Pro SMap.Tile.
       */
      constructor(id: any, url: string, params: object, options: object);

      /**
       * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí).
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#setOptions
       */
      setOptions(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#redraw
       */
      redraw(): void;

      /**
       * Nastaví vrstvě nové URL.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Vymazat vrstvu == zrušit DOM a cache.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#clear
       */
      clear(): void;

      /**
       * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Dočasně natočit - krok animovaného otáčení.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#rotateTo
       */
      rotateTo(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#disable
       */
      disable(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.WMTS.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Zimni mapa - vrstva down a up.
     * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html
     */
    class Winter extends SMap.Layer {
      /**
       * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
       */
      constructor(id: any);

      /**
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví vrstvě sadu copyrightů.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#setCopyright
       * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
      copyright = {
        "-3":  "copy1",
        "4-5": "copy2",
        "6":   "copy3",
        "7-": "copy4",
      }.
       */
      setCopyright(copyright: object): void;

      /**
       * Vrátí copyright pro daný zoom. Pokud není, vrací null.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#getCopyright
       * @param {number} zoom Zoom, pro který chceme zjistit copyright.
       * @returns {string | Array<string> | null} Copyright.
       */
      getCopyright(zoom: number): string | Array<string> | null;

      /**
       * Vrátí ID vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#getId
       * @returns {any}
       */
      getId(): any;

      /**
       * Povolí vrstvu. Volat až po připnutí do mapy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#enable
       */
      enable(): void;

      /**
       * Zakáže vrstvu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#disable
       */
      disable(): void;

      /**
       * Překreslení vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#redraw
       * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
       */
      redraw(full: boolean): void;

      /**
       * Dočasné vymazání vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#clear
       */
      clear(): void;

      /**
       * Vrátí kontejner(y) vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Zjistí, zda je vrstva zapnutá.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#isActive
       * @returns {boolean}
       */
      isActive(): boolean;

      /**
       * Odstranění všech prvků z vrstvy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#removeAll
       */
      removeAll(): void;

      /**
       * Podporuje tato vrstva aktualizaci během animovaného zoomu?
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#supportsAnimation
       */
      supportsAnimation(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#zoomTo
       */
      zoomTo(): void;

      /**
       * Jen pokud supportsAnimation().
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#rotateTo
       */
      rotateTo(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Layer.Winter.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    namespace Smart {
      /**
       * Turistická vrstva: smart a navíc zapínatelné turist- a cyklo-trasy.
       * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html
       */
      class Turist extends SMap.Layer.Smart {
        /**
         * @param {any} id Jednoznačné ID vrsty. Při nezadání bude vygenerováno.
         */
        constructor(id: any);

        /**
         * Změna viditelnosti tur. stezek.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#setTrail
         * @param {boolean} trail
         */
        setTrail(trail: boolean): void;

        /**
         * Změna viditelnosti cyklostezek.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#setBike
         * @param {boolean} bike
         */
        setBike(bike: boolean): void;

        /**
         * Jsou zaplé turistické trasy?
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getTrail
         */
        getTrail(): void;

        /**
         * Jsou zaplé cyklostezky?
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getBike
         */
        getBike(): void;

        /**
         * Vrátí podřízené vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getLayers
         */
        getLayers(): void;

        /**
         * Zapne/vypne zobrazovani hybridu.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#setHybrid
         */
        setHybrid(): void;

        /**
         * Pozor - zapínání není delegování na aktuální podvrstvu, protože ta nemusí být vůbec zapnutelná (oblique při non-oblique projekci).
        Proto při našem zapnutí jen překreslíme ($super) - a při překreslení vrstvu zapneme, až to bude bezpečné.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#enable
         */
        enable(): void;

        /**
         * Sloucene kontejnery vsech podrizenych vrstev.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getContainer
         * @returns {object}
         */
        getContainer(): object;

        /**
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#$destructor
         */
        $destructor(): void;

        /**
         * Nastaví vrstvě sadu copyrightů.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#setCopyright
         * @param {object} copyright Objekt, jehož každá položka specifikuje zoom nebo interval a odpovídající copyright. Příklad:
        copyright = {
          "-3":  "copy1",
          "4-5": "copy2",
          "6":   "copy3",
          "7-": "copy4",
        }.
         */
        setCopyright(copyright: object): void;

        /**
         * Vrátí copyright pro daný zoom. Pokud není, vrací null.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getCopyright
         */
        getCopyright(): void;

        /**
         * Vrátí copyright pro daný zoom. Pokud není, vrací null.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getCopyright
         * @param {number} zoom Zoom, pro který chceme zjistit copyright.
         * @returns {string | Array<string> | null} Copyright.
         */
        getCopyright(zoom: number): string | Array<string> | null;

        /**
         * Vrátí ID vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getId
         * @returns {any}
         */
        getId(): any;

        /**
         * Zakáže vrstvu.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#disable
         */
        disable(): void;

        /**
         * Překreslení vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#redraw
         */
        redraw(): void;

        /**
         * Překreslení vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#redraw
         * @param {boolean} full Je-li nutné přepočítávat polohu prvkům vrstvy.
         */
        redraw(full: boolean): void;

        /**
         * Dočasné vymazání vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#clear
         */
        clear(): void;

        /**
         * Zjistí, zda je vrstva zapnutá.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#isActive
         * @returns {boolean}
         */
        isActive(): boolean;

        /**
         * Odstranění všech prvků z vrstvy.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#removeAll
         */
        removeAll(): void;

        /**
         * Podporuje tato vrstva aktualizaci během animovaného zoomu?
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#supportsAnimation
         */
        supportsAnimation(): void;

        /**
         * Jen pokud supportsAnimation().
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#zoomTo
         */
        zoomTo(): void;

        /**
         * Jen pokud supportsAnimation().
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#rotateTo
         */
        rotateTo(): void;

        /**
         * Zjistí (směrem nahoru) mapu.
         * @see http://api.mapy.cz/doc/SMap.Layer.Smart.Turist.html#getMap
         * @returns {SMap}
         */
        getMap(): SMap;
      }
    }
  }

  namespace Control {
    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Compass.html
     */
    class Compass {
      /**
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Compass.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Compass.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Compass.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Compass.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Kontextové menu.
     * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html
     */
    class ContextMenu extends SMap.Control {
      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#setOwner
       */
      setOwner(): void;

      /**
       * Otevře menu na zadané pixelové pozici.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#open
       * @param {Event} event
       * @param {SMap.Coords} [coords] Volitelně souřadnice bodu, ke kterému se menu vztahuje (pokud se liší od místa kliknutí).
       */
      open(event: Event, coords?: SMap.Coords): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#close
       */
      close(): void;

      /**
       * Přidá položku menu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#addItem
       * @param {SMap.Control.ContextMenu.Item} item
       * @param {number} [pos] Pozice; při nezadání se přidá na konec.
       */
      addItem(item: SMap.Control.ContextMenu.Item, pos?: number): void;

      /**
       * Odebere existující položku menu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#removeItem
       * @param {SMap.Control.ContextMenu.Item} item
       */
      removeItem(item: SMap.Control.ContextMenu.Item): void;

      /**
       * Vrátí položky.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#getItems
       * @returns {Array<SMap.Control.ContextMenu.Item>}
       */
      getItems(): Array<SMap.Control.ContextMenu.Item>;

      /**
       * Vyčistí položky.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#clearItems
       */
      clearItems(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí vizuální reprezentaci prvku, je-li jaká.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html
     */
    class Copyright {
      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#setOwner
       */
      setOwner(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#addCopyright
       */
      addCopyright(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#setDate
       */
      setDate(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Copyright.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Obrázek, jehož URL se mění v závislosti na pozici a zoomu mapy.
     * @see http://api.mapy.cz/doc/SMap.Control.Image.html
     */
    class Image extends SMap.Control.Visible {
      /**
       * @param {string} url Základní část URL.
       */
      constructor(url: string);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Image.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Image.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Image.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Image.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Ovladač klávesnice.
     * @fires control-keyboard-move Dokončení posunu mapou pomocí klávesnice.
     * @fires control-keyboard-zoom Změna zoomu pomocí klávesnice.
     * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html
     */
    class Keyboard extends SMap.Control {
      /**
       * @param {number} mode Bitová maska určující, co všechno klávesnice ovládá - konstanty SMap.KB_*.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(mode: number, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#setOwner
       */
      setOwner(): void;

      /**
       * Za běhu změní funkci ovladače klávesnice.
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#configure
       */
      configure(): void;

      /**
       * Vrátí právě používanou bitovou masku.
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#getMode
       */
      getMode(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí vizuální reprezentaci prvku, je-li jaká.
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Keyboard.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Layer.html
     */
    class Layer {
      /**
       * @param {object} [options] Konfigurace.
       */
      constructor(options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#setOwner
       */
      setOwner(): void;

      /**
       * Přidá vrstvu do ovládacího prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#addLayer
       * @param {any} id ID vrstvy.
       * @param {string} label Popisek.
       * @param {string} src Název obrázku vrstvy v ovladacim prvku.
       * @param {string} title Titulek.
       */
      addLayer(id: any, label: string, src: string, title: string): void;

      /**
       * Přidá vestavěnou vrstvu do ovládacáho prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#addDefaultLayer
       * @param {any} id ID vestavěné vrstvy (SMap.DEF_*).
       */
      addDefaultLayer(id: any): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#getContent
       * @returns {Node}
       */
      getContent(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#getActiveId
       */
      getActiveId(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Layer.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html
     */
    class Minimap {
      /**
       * @param {number} [width=150] Šířka.
       * @param {number} [height=150] Výška.
       * @param {object} [options] Konfigurace.
       */
      constructor(width?: number, height?: number, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#setOwner
       */
      setOwner(): void;

      /**
       * Změna nastavení za běhu.
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#setOptions
       * @param {object} options Viz poslední parametr konstruktoru.
       */
      setOptions(options: object): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Minimap.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Ovladač myši.
     * @fires control-mouse-move Dokončení posunu mapou pomocí myši.
     * @fires control-mouse-zoom Změna zoomu pomocí myši.
     * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html
     */
    class Mouse extends SMap.Control {
      /**
       * @param {number} mode Bitová maska určující, co všechno myš/prst ovládá - konstanty SMap.MOUSE_*.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(mode: number, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí právě používanou bitovou masku.
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#getMode
       */
      getMode(): void;

      /**
       * Překonfigurování režimu ovladače.
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#configure
       */
      configure(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí vizuální reprezentaci prvku, je-li jaká.
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Mouse.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Orientation.html
     */
    class Orientation {
      /**
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(options?: object);

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Orientation.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Orientation.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.Orientation.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Orientation.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Overview.html
     */
    class Overview {
      /**
       * @param {string} url Základní část URL.
       */
      constructor(url: string);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Overview.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Overview.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Overview.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Overview.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Ukazatel ukotvení bodu.
     * @fires pointer-click Stisk kapicky.
     * @see http://api.mapy.cz/doc/SMap.Control.Pointer.html
     */
    class Pointer {
      /**
       * Možnosti vytvoření kapky.
       * @see http://api.mapy.cz/doc/SMap.Control.Pointer.html#TYPES
       */
      static readonly TYPES;

      /**
       * Konstruktor.
       * @param {object} [options] Nastavení.
       */
      constructor(options?: object);

      /**
       * Zobrazeni kapičky ke středu.
       * @see http://api.mapy.cz/doc/SMap.Control.Pointer.html#setCoords
       * @param {SMap.Coords} [center] Souřadnice, kam se má kapička točit; při nezadání se kapka skryje.
       * @param {boolean} [alwaysShow=false] Vždy zobrazit kapku, i když není mimo obrazovku; nastavuje se jako stav.
       */
      setCoords(center?: SMap.Coords, alwaysShow?: boolean): void;

      /**
       * Překreslení kapky na obrazovce.
       * @see http://api.mapy.cz/doc/SMap.Control.Pointer.html#redraw
       */
      redraw(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Pointer.html#setOwner
       */
      setOwner(): void;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html
     */
    class Rosette {
      /**
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Rosette.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Scale.html
     */
    class Scale {
      /**
       * Starý formát:.
       * @param {number} [conf=1] Počet dílků v měřítku ()

      nový formát:.
       * @param {Object} [conf]
       */
      constructor(conf?: number, conf2?: Object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Scale.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Scale.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Scale.html#$destructor
       */
      $destructor(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Scale.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Selection.html
     */
    class Selection {
      /**
       * @param {number} thickness Tloušťka rámečku.
       */
      constructor(thickness: number);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Selection.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Selection.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Selection.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.Selection.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Selection.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Synchronizuje mapu s portem, potažmo mapu s portem a oknem.
     * @fires map-resize Změna velikosti prvku a tedy i mapy.
     * @see http://api.mapy.cz/doc/SMap.Control.Sync.html
     */
    class Sync extends SMap.Control {
      /**
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Sync.html#setOwner
       */
      setOwner(): void;

      /**
       * Změna odsazení mapy odspodu.
       * @see http://api.mapy.cz/doc/SMap.Control.Sync.html#setBottomSpace
       * @param {number} [bottomSpace] Počet pixelů, o které se (odspodu) bude lišit výška mapy od výšky okna.
       */
      setBottomSpace(bottomSpace?: number): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Sync.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí vizuální reprezentaci prvku, je-li jaká.
       * @see http://api.mapy.cz/doc/SMap.Control.Sync.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Sync.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * Abstraktní viditelný ovládací prvek.
     * @see http://api.mapy.cz/doc/SMap.Control.Visible.html
     */
    class Visible extends SMap.Control {
      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Visible.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Visible.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.Visible.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Visible.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html
     */
    class Zoom {
      /**
       * @param {object} labels Objekt s popisky speciálních zoomů - klíčem je číslo zoomu a hodnotou textový popisek.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(labels: object, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#setZoom
       */
      setZoom(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#setOwner
       */
      setOwner(): void;

      /**
       * Přidání zoom menu.
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#addZoomMenu
       */
      addZoomMenu(): void;

      /**
       * Odebrání zoom menu.
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#removeZoomMenu
       */
      removeZoomMenu(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.Zoom.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    /**
     * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html
     */
    class ZoomNotification {
      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html#setOwner
       */
      setOwner(): void;

      /**
       * Vrátí kontejner prvku.
       * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html#getContainer
       * @returns {Node}
       */
      getContainer(): Node;

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html#$destructor
       */
      $destructor(): void;

      /**
       * Nastaví prvku rodiče (mapu).
       * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html#setOwner
       * @param {SMap} owner Nastaví rodiče ovládacího prvku.
       */
      setOwner(owner: SMap): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Control.ZoomNotification.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    namespace ContextMenu {
      /**
       * Souřadnicová položka kontextového menu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Coords.html
       */
      class Coords extends SMap.Control.ContextMenu.Item {
        /**
         * @param {string} label Popisek.
         */
        constructor(label: string);

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Coords.html#setCoords
         */
        setCoords(): void;

        /**
         * Vyvoláno po kliknutí na položku.
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Coords.html#click
         * @param {Event} e
         * @param {SMap.Control.ContextMenu} menu
         */
        click(e: Event, menu: SMap.Control.ContextMenu): void;
      }

      /**
       * Položka kontextového menu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html
       */
      class Item {
        /**
         * @param {string} label Popisek.
         */
        constructor(label: string);

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#$destructor
         */
        $destructor(): void;

        /**
         * Vyvoláno po kliknutí na položku.
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#click
         * @param {Event} e
         * @param {SMap.Control.ContextMenu} menu
         */
        click(e: Event, menu: SMap.Control.ContextMenu): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#enable
         */
        enable(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#disable
         */
        disable(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#setCoords
         */
        setCoords(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Item.html#getContainer
         */
        getContainer(): void;
      }

      /**
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Separator.html
       */
      class Separator extends SMap.Control.ContextMenu.Item {
        /**
         * @param {string} label Popisek.
         */
        constructor(label: string);

        /**
         * Vyvoláno po kliknutí na položku.
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Separator.html#click
         * @param {Event} e
         * @param {SMap.Control.ContextMenu} menu
         */
        click(e: Event, menu: SMap.Control.ContextMenu): void;
      }

      /**
       * Zoomovací položka kontextového menu.
       * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Zoom.html
       */
      class Zoom extends SMap.Control.ContextMenu.Item {
        /**
         * @param {string} label Popisek.
         * @param {number} zoomDiff O kolik změnit zoom.
         */
        constructor(label: string, zoomDiff: number);

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Zoom.html#setCoords
         */
        setCoords(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Zoom.html#click
         */
        click(): void;

        /**
         * Vyvoláno po kliknutí na položku.
         * @see http://api.mapy.cz/doc/SMap.Control.ContextMenu.Zoom.html#click
         * @param {Event} e
         * @param {SMap.Control.ContextMenu} menu
         */
        click(e: Event, menu: SMap.Control.ContextMenu): void;
      }
    }
  }

  namespace Marker {
    /**
     * Shluk značek.
     * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html
     */
    class Cluster extends SMap.Marker {
      /**
       * @param {any} id
       * @param {object} [options]
       */
      constructor(id: any, options?: object);

      /**
       * Přidání značky do shluku.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#addMarker
       * @param {SMap.Marker} marker
       */
      addMarker(marker: SMap.Marker): void;

      /**
       * Všechny značky v tomto shluku.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getMarkers
       * @returns {Array<SMap.Marker>}
       */
      getMarkers(): Array<SMap.Marker>;

      /**
       * Po kliku na cluster se změní střed a zoom na jeho podznačky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#click
       */
      click(): void;

      /**
       * Nastavit velikost.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#setSize
       * @param {number} min Velikost nejmenšího okolního shluku.
       * @param {number} max Velikost největšího okolního shluku.
       */
      setSize(min: number, max: number): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí souřadnice značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getCoords
       * @returns {SMap.Coords}
       */
      getCoords(): SMap.Coords;

      /**
       * Vrátí kontejner značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Vrátí ukotvení značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getAnchor
       * @returns {SMap.Pixel}
       */
      getAnchor(): SMap.Pixel;

      /**
       * Vrátí popisek značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getTitle
       * @returns {string}
       */
      getTitle(): string;

      /**
       * Vrátí id značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getId
       */
      getId(): void;

      /**
       * Vrátí rozměr značky, je-li znám.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getSize
       */
      getSize(): void;

      /**
       * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
      Není proveden žádný přepočet pozice.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Změní značce umístění.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#setCoords
       * @param {SMap.Coords} coords Nová pozice.
       */
      setCoords(coords: SMap.Coords): void;

      /**
       * Je tento prvek součásní klikatelné části značky?
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getActive
       */
      getActive(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Marker.Cluster.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Tvořič shluků značek.
     * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html
     */
    class Clusterer {
      /**
       * @param {SMap} map
       * @param {number} [maxDistance=100] Do této vzdálenosti patří značka do shluku.
       * @param {Function} [clusterCtor=SMap.Marker.Cluster] Konstruktor shluku.
       */
      constructor(map: SMap, maxDistance?: number, clusterCtor?: Function);

      /**
       * Vše vyčistit.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#clear
       */
      clear(): void;

      /**
       * Přidání značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#addMarker
       * @param {SMap.Marker} marker
       */
      addMarker(marker: SMap.Marker): void;

      /**
       * Odebrání značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#removeMarker
       * @param {SMap.Marker} marker
       */
      removeMarker(marker: SMap.Marker): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#getAllMarkers
       * @returns {Array<SMap.Marker>}
       */
      getAllMarkers(): Array<SMap.Marker>;

      /**
       * Vrátí neshluklé značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#getMarkers
       * @returns {Array<SMap.Marker>}
       */
      getMarkers(): Array<SMap.Marker>;

      /**
       * Vrátí shluklé značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#getClusters
       * @returns {Array<SMap.Marker.Cluster>}
       */
      getClusters(): Array<SMap.Marker.Cluster>;

      /**
       * Provede vlastní rozhození značek.
       * @see http://api.mapy.cz/doc/SMap.Marker.Clusterer.html#compute
       */
      compute(): void;
    }

    /**
     * Jmenný prostor dekorátorů.
     * @see http://api.mapy.cz/doc/SMap.Marker.Feature.html
     */
    class Feature {}

    /**
     * Značka z typického POI serveru.
     * @fires marker-poi-click Kliknutí na značku.
     * @fires marker-poi-enter Najetí kurzorem myši na značku.
     * @fires marker-poi-leave Odjetí kurzorem myši ze značky.
     * @see http://api.mapy.cz/doc/SMap.Marker.POI.html
     */
    class POI extends SMap.Marker {
      /**
       * Hlavní obalovací prvek pro nové markery. Název elementu je psán malými písmeny.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#nodeName
       */
      static nodeName;

      /**
       * Jednotlivé vizuální typy [DETAIL, BIG, MIDDLE, UNIVERSAL, SMALL, SMALLER, LITTLE].
      Všechny typy kromě verze [UNIVERSAL, SMALLER, LITTLE] jsou schopné zobrazit obrázek/ikonu.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#VISUAL
       */
      static VISUAL;

      /**
       * @param {SMap.Coords} coords
       * @param {any} id
       * @param {object} options
       */
      constructor(coords: SMap.Coords, id: any, options: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#fromXML
       */
      static fromXML(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#fromData
       */
      static fromData(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#$destructor
       */
      $destructor(): void;

      /**
       * Získání konfigurace vizuálního zobrazení markeru.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getVisual
       * @returns {Object}
       */
      getVisual(): Object;

      /**
       * Nastavení zdroje POIe.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setSource
       * @param {string} source
       */
      setSource(source: string): void;

      /**
       * Získání zdroje POIe.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getSource
       * @returns {string}
       */
      getSource(): string;

      /**
       * Nastavení ID POIe.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setPlainId
       * @param {number} plainId
       */
      setPlainId(plainId: number): void;

      /**
       * Získání ID POIe.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getPlainId
       * @returns {number}
       */
      getPlainId(): number;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#click
       */
      click(): void;

      /**
       * Změna vizuálu značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setVisual
       * @param {object} [visual]
       */
      setVisual(visual?: object): void;

      /**
       * Zapnutí/vypnutí animace zvětšování obsahu markeru.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setActive
       * @param {boolean} state Hodnota stavu.
       * @param {boolean} [noAnim=false] Vypnout animaci zvětšování markeru.
       */
      setActive(state: boolean, noAnim?: boolean): void;

      /**
       * Nastavení callback funkce pro naplnění obsahu vizitky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setPopupCallback
       * @param {Function} cb Funkci se předává na prvním argumentu instance třídy SMap.Card; pokud funkce vrací {JAK.Promise}, vizitka se zobrazí až po splnění promise.
       */
      setPopupCallback(cb: Function): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setCardOptions
       */
      setCardOptions(): void;

      /**
       * Posunuti karty.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#moveCard
       */
      moveCard(): void;

      /**
       * Odstranění zobrazené popup karty.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#removeCard
       */
      removeCard(): void;

      /**
       * Standartni setOwner, ktery posloucha na zoom start, kdy se u novych znacek s kartou musi na zacatku zoomu karta skryt.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setOwner
       */
      setOwner(): void;

      /**
       * Jedná se o vizuální reprezentaci detailu?
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#isDetail
       * @returns {boolean}
       */
      isDetail(): boolean;

      /**
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí souřadnice značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getCoords
       * @returns {SMap.Coords}
       */
      getCoords(): SMap.Coords;

      /**
       * Vrátí kontejner značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Vrátí ukotvení značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getAnchor
       * @returns {SMap.Pixel}
       */
      getAnchor(): SMap.Pixel;

      /**
       * Vrátí popisek značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getTitle
       * @returns {string}
       */
      getTitle(): string;

      /**
       * Vrátí id značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getId
       */
      getId(): void;

      /**
       * Vrátí rozměr značky, je-li znám.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getSize
       */
      getSize(): void;

      /**
       * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
      Není proveden žádný přepočet pozice.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Změní značce umístění.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#setCoords
       * @param {SMap.Coords} coords Nová pozice.
       */
      setCoords(coords: SMap.Coords): void;

      /**
       * Je tento prvek součásní klikatelné části značky?
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getActive
       */
      getActive(): void;

      /**
       * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#click
       */
      click(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Marker.POI.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;
    }

    namespace Feature {
      /**
       * Dekorátor, přidávající značce otevření vizitky s obsahem.
       * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Card.html
       */
      class Card extends JAK.AbstractDecorator<SMap.Marker> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Card.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker): SMap.Marker;

        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Card.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @param {SMap.Card} card Vizitka.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker, card: SMap.Card): SMap.Marker;

        /**
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Card.html#click
         */
        click(): void;

        /**
         * Získání odkazu na instanci vizitky.
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Card.html#getCard
         * @returns {SMap.Card}
         */
        getCard(): SMap.Card;
      }

      /**
       * Dekorátor, který činí značku přesouvatelnou.
       * @fires marker-drag-start Začátek tažení značky.
       * @fires marker-drag-move Tažení značky.
       * @fires marker-drag-stop Konec tažení značky.
       * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Draggable.html
       */
      class Draggable extends JAK.AbstractDecorator<SMap.Marker> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Draggable.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker): SMap.Marker;

        /**
         * Změna stavu tahatelnosti.
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Draggable.html#setDrag
         * @param {boolean} state
         */
        setDrag(state: boolean): void;
      }

      /**
       * Dekorátor přidávající značce klikací obrázkovou mapu.
       * @see http://api.mapy.cz/doc/SMap.Marker.Feature.ImageMap.html
       */
      class ImageMap extends JAK.AbstractDecorator<SMap.Marker> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.ImageMap.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker): SMap.Marker;

        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.ImageMap.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @param {object} [options] Konfigurační objekt.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker, options?: object): SMap.Marker;
      }

      /**
       * Dekorátor přidávající značce možnost relativního ukotvení.
       * @see http://api.mapy.cz/doc/SMap.Marker.Feature.RelativeAnchor.html
       */
      class RelativeAnchor extends JAK.AbstractDecorator<SMap.Marker> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.RelativeAnchor.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker): SMap.Marker;

        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.RelativeAnchor.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @param {object} options Konfigurační objekt.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker, options: object): void;
      }

      /**
       * Přidání stínu.
       * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Shadow.html
       */
      class Shadow extends JAK.AbstractDecorator<SMap.Marker> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Shadow.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker): SMap.Marker;

        /**
         * Dekorační metoda - nevolat přímo, ale přes marker.decorate().
         * @see http://api.mapy.cz/doc/SMap.Marker.Feature.Shadow.html#decorate
         * @param {SMap.Marker} marker Značka k odekorování.
         * @param {string} url URL stínu.
         * @returns {SMap.Marker}
         */
        decorate(marker: SMap.Marker, url: string): SMap.Marker;
      }
    }
  }

  namespace Geometry {
    /**
     * Jmenný prostor dekorátorů.
     * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.html
     */
    class Feature {}

    namespace Feature {
      /**
       * Dekorátor, přidávající geometrii otevření vizitky s obsahem.
       * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.Card.html
       */
      class Card extends JAK.AbstractDecorator<SMap.Geometry> {
        /**
         * Dekorační metoda - nevolat přímo, ale přes geometry.decorate().
         * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.Card.html#decorate
         * @param {SMap.Geometry} geometry Geometrie k odekorování.
         * @returns {SMap.Geometry}
         */
        decorate(geometry: SMap.Geometry): SMap.Geometry;

        /**
         * Dekorační metoda - nevolat přímo, ale přes geometry.decorate().
         * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.Card.html#decorate
         * @param {SMap.Geometry} geometry Geometrie k odekorování.
         * @param {SMap.Card} card Vizitka.
         * @returns {SMap.Geometry}
         */
        decorate(geometry: SMap.Geometry, card: SMap.Card): SMap.Geometry;

        /**
         * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.Card.html#click
         */
        click(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Geometry.Feature.Card.html#draw
         */
        draw(): void;
      }
    }
  }

  namespace Pano {
    /**
     * Klikaci maska dostupnosti blizkych panoramat.
     * @see http://api.mapy.cz/doc/SMap.Pano.Clickmask.html
     */
    class Clickmask {
      /**
       * Vrati soupis palety, tj. potencialne blizkych panoramat.
       * @see http://api.mapy.cz/doc/SMap.Pano.Clickmask.html#getPalette
       */
      getPalette(): void;

      /**
       * Vrati ID panoramatu na zadanych metrovych souradnicich.
       * @see http://api.mapy.cz/doc/SMap.Pano.Clickmask.html#getIndex
       * @param {number} dx V metrech.
       * @param {number} dy V metrech.
       * @returns {null | number} Null = zadne, int = index do this._palette.
       */
      getIndex(dx: number, dy: number): null | number;
    }

    /**
     * Vrstva s dostupností panoramat.
     * @fires pano-available
     * @fires pano-unavailable
     * @see http://api.mapy.cz/doc/SMap.Pano.Layer.html
     */
    class Layer {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Layer.html#enable
       */
      enable(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Layer.html#disable
       */
      disable(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Layer.html#getAvail
       */
      getAvail(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Layer.html#redraw
       */
      redraw(): void;
    }

    /**
     * Pano značka.
     * @fires marker-change
     * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html
     */
    class Marker extends SMap.Marker {
      /**
       * @param {SMap.Coords} coords Souřadnice značky.
       * @param {string | false} id Jednoznačný identifikátor, při nezadání bude vygenerován.
       * @param {object} [options] Konfigurační objekt.
       */
      constructor(coords: SMap.Coords, id: string | false, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#setAngle
       */
      setAngle(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#setCoords
       */
      setCoords(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrátí souřadnice značky.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getCoords
       * @returns {SMap.Coords}
       */
      getCoords(): SMap.Coords;

      /**
       * Vrátí kontejner značky.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getContainer
       * @returns {object}
       */
      getContainer(): object;

      /**
       * Vrátí ukotvení značky.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getAnchor
       * @returns {SMap.Pixel}
       */
      getAnchor(): SMap.Pixel;

      /**
       * Vrátí popisek značky.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getTitle
       * @returns {string}
       */
      getTitle(): string;

      /**
       * Vrátí id značky.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getId
       */
      getId(): void;

      /**
       * Vrátí rozměr značky, je-li znám.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getSize
       */
      getSize(): void;

      /**
       * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
      Není proveden žádný přepočet pozice.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#setURL
       * @param {string} url Nové URL.
       */
      setURL(url: string): void;

      /**
       * Změní značce umístění.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#setCoords
       * @param {SMap.Coords} coords Nová pozice.
       */
      setCoords(coords: SMap.Coords): void;

      /**
       * Je tento prvek součásní klikatelné části značky?
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getActive
       */
      getActive(): void;

      /**
       * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#click
       */
      click(): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Pano.Marker.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Pano navigace.
     * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html
     */
    class Nav {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html#$destructor
       */
      $destructor(): void;

      /**
       * Zneaktivnit, ale neschovavat - cekame na dalsi.
       * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html#invalidate
       */
      invalidate(): void;

      /**
       * Nastala zmena mista, je nutne aktualizovat tlacitka.
       * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html#update
       */
      update(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html#updateCamera
       */
      updateCamera(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Nav.html#handleEvent
       */
      handleEvent(): void;
    }

    /**
     * Jeden panoramatický snímek (tj. místo).
     * @see http://api.mapy.cz/doc/SMap.Pano.Place.html
     */
    class Place {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#setTileImages
       */
      setTileImages(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#build
       * @param {WebGL} gl
       */
      build(gl: WebGL): void;

      /**
       * Zrusit geometrii a dalsi webgl data. NENI destruktor!
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#destroy
       */
      destroy(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#isDirty
       */
      isDirty(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#draw
       * @param {WebGL} gl
       * @param {WebGLProgram} program
       * @param {SMap.Pano.Scene} scene Pro pripad, ze bychom nacitali dlazdice, chceme vedet kam uzivatel kouka (tam se nacitaji nejdriv) - radiany, vuci severu.
       */
      draw(gl: WebGL, program: WebGLProgram, scene: SMap.Pano.Scene): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#drawDebug
       */
      drawDebug(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#setOpacity
       */
      setOpacity(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getId
       */
      getId(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getProvider
       */
      getProvider(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getDate
       */
      getDate(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getKappa
       */
      getKappa(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#setLookDir
       */
      setLookDir(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getLookDir
       */
      getLookDir(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getData
       */
      getData(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getCoords
       */
      getCoords(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getUrlTemplate
       */
      getUrlTemplate(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getBackgroundUrl
       */
      getBackgroundUrl(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#setPitchLimit
       */
      setPitchLimit(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getPitchLimit
       */
      getPitchLimit(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#getDefaultView
       */
      getDefaultView(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Place.html#fromImage
       */
      static fromImage(): void;
    }

    /**
     * Abstraktní renderer.
     * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html
     */
    class Renderer {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#get
       */
      static get(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#setPlace
       */
      setPlace(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#setRotation
       */
      setRotation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#setFOV
       */
      setFOV(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#setNeighbors
       */
      setNeighbors(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#highlightNeighbor
       */
      highlightNeighbor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Renderer.html#syncPort
       */
      syncPort(): void;
    }

    /**
     * Panorama, hlavní objekt (scéna).
     * @fires pano-change
     * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html
     */
    class Scene {
      /**
       * @param {Node} parent Rodičovský HTML prvek.
       * @param {object} [options] Konfigurace.
       */
      constructor(parent: Node, options?: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#$destructor
       */
      $destructor(): void;

      /**
       * Vrací instanci objektu JAK.Signals, kterou lze použít pro poslouchání na události scény.
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getSignals
       * @returns {JAK.Signals}
       */
      getSignals(): JAK.Signals;

      /**
       * Zobrazit konkrétní místo.
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#show
       * @param {SMap.Pano.Place} place
       * @param {object} [options] Konfigurace.
       */
      show(place: SMap.Pano.Place, options?: object): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getContainer
       */
      getContainer(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getOptions
       */
      getOptions(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getPlace
       */
      getPlace(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getMarker
       */
      getMarker(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getCamera
       */
      getCamera(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#setCamera
       */
      setCamera(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getRenderer
       */
      getRenderer(): void;

      /**
       * Synchronizovat scénu s rozměry HTML prvku průhledu.
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#syncPort
       */
      syncPort(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#getPixelAngle
       */
      getPixelAngle(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Scene.html#handleEvent
       */
      handleEvent(): void;
    }

    /**
     * Pano WebGL koule.
     * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html
     */
    class Sphere {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#isDirty
       */
      isDirty(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#isBuilt
       */
      isBuilt(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#build
       */
      build(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#setImage
       */
      setImage(): void;

      /**
       * Vykreslit jednotlive dlazdice.
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#draw
       */
      draw(): void;

      /**
       * Vykreslit jednotlive dlazdice v debug rezimu.
       * @see http://api.mapy.cz/doc/SMap.Pano.Sphere.html#drawDebug
       */
      drawDebug(): void;
    }

    /**
     * Pano WebGL dlazdice.
     * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html
     */
    class Tile {
      /**
       * @param {WebGL} gl
       * @param {Array<number>} position [2].
       * @param {object} data
       */
      constructor(gl: WebGL, position: Array<number>, data: object);

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#setBackgroundTexture
       */
      setBackgroundTexture(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#getPosition
       */
      getPosition(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#setImage
       */
      setImage(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#draw
       */
      draw(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.Tile.html#drawDebug
       */
      drawDebug(): void;
    }

    /**
     * WebGL renderer.
     * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html
     */
    class WebGL extends SMap.Pano.Renderer {
      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#isSupported
       */
      static isSupported(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#$destructor
       */
      $destructor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#setPlace
       */
      setPlace(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#setRotation
       */
      setRotation(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#setFOV
       */
      setFOV(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#setNeighbors
       */
      setNeighbors(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#highlightNeighbor
       */
      highlightNeighbor(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Pano.WebGL.html#syncPort
       */
      syncPort(): void;
    }
  }

  namespace Geocoder {
    /**
     * Reverzní geocoder. Pro jeho funkčnost je nutné přesměrování /rgeocode => mapy.cz/rgeocode.
     * @see http://api.mapy.cz/doc/SMap.Geocoder.Reverse.html
     */
    class Reverse extends SMap.Geocoder {
      /**
       * @see http://api.mapy.cz/doc/SMap.Geocoder.Reverse.html#METHOD
       */
      static METHOD;

      /**
       * Provede zpětné geokódování.
       * @param {SMap.Coords} coords Kde hledáme.
       * @param {Function} callback Funkce co zpracuje nalezená data.
       * @param {Object} options Konfigurace.
       */
      constructor(coords: SMap.Coords, callback: Function, options: Object);

      /**
       * Přeruší probíhající požadavek.
       * @see http://api.mapy.cz/doc/SMap.Geocoder.Reverse.html#abort
       */
      abort(): void;
    }
  }

  namespace URL {
    /**
     * Vygenerování url pro routování na mapy.cz.
     * @see http://api.mapy.cz/doc/SMap.URL.Route.html
     */
    class Route {
      /**
       * @see http://api.mapy.cz/doc/SMap.URL.Route.html#$destructor
       */
      $destructor(): void;

      /**
       * Přidání startu. Pokud již nějaký start existuje, smaže se a místo něj se přidá nový. Parametry určují, jak se bude plánovat z tohoto bodu k dalšímu.
       * @see http://api.mapy.cz/doc/SMap.URL.Route.html#addStart
       * @param {object} [coords] Souřadnice SMap.Coords.
       * @param {object} [options] Volitelná konfigurace.
       * @returns {object} Reference na daný objekt.
       */
      addStart(coords?: object, options?: object): object;

      /**
       * Přidání cíle. Pokud již nějaký cíl existuje, smaže se a místo něj se přidá nový.
       * @see http://api.mapy.cz/doc/SMap.URL.Route.html#addDestination
       * @param {object} [coords] Souřadnice SMap.Coords.
       * @param {object} [options] Volitelná konfigurace.
       * @returns {object} Reference na daný objekt.
       */
      addDestination(coords?: object, options?: object): object;

      /**
       * Přidání průjezdního bodu. Přidává se vždy před cílový bod. Parametry určují, jak se bude plánovat z tohoto bodu k dalšímu.
       * @see http://api.mapy.cz/doc/SMap.URL.Route.html#addWaypoint
       * @param {object} [coords] Souřadnice SMap.Coords.
       * @param {object} [options] Volitelná konfigurace.
       * @returns {object} Reference na daný objekt.
       */
      addWaypoint(coords?: object, options?: object): object;

      /**
       * Získání url do plánovače na mapy.cz.
       * @see http://api.mapy.cz/doc/SMap.URL.Route.html#toString
       * @returns {string}
       */
      toString(): string;
    }
  }

  namespace Projection {
    /**
     * Křovákova projekce.
     * @see http://api.mapy.cz/doc/SMap.Projection.Krovak.html
     */
    class Krovak {
      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Krovak.html#project
       */
      project(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Krovak.html#unproject
       */
      unproject(): void;
    }

    /**
     * Mercatorova projekce; při zoomu 0 transformuje svět na čtverec 256x256 pixelů.
     * @see http://api.mapy.cz/doc/SMap.Projection.Mercator.html
     */
    class Mercator {
      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Mercator.html#project
       */
      project(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Mercator.html#unproject
       */
      unproject(): void;
    }

    /**
     * Šikmý snímek.
     * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html
     */
    class Oblique extends SMap.Projection {
      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#CORS
       */
      static CORS;

      /**
       * @param {string} id
       * @param {object} config
       * @param {unknown} Array Ctyri okrajove body.
       * @param {Array<number>} config Best bod.
       */
      constructor(
        id: string,
        config: object,
        Array: unknown,
        config2: Array<number>
      );

      /**
       * Statická tovární metoda: asynchronně začne vytvářet projekci; až je vyrobena, zavolá callback.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#create
       * @param {SMap.Coords} center
       * @param {number} orientation
       * @param {Function} callback Bude volán jen pokud projekce uspěje.
       * @param {Function} [errorCallback] Bude volán jen pokud projekce neuspěje.
       */
      static create(
        center: SMap.Coords,
        orientation: number,
        callback: Function,
        errorCallback?: Function
      ): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#fromXML
       */
      static fromXML(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#setOwner
       */
      setOwner(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#getId
       */
      getId(): void;

      /**
       * Je tato projekce pro danou konfiguraci stale platna?
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#isValid
       */
      isValid(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#unproject
       */
      unproject(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#project
       */
      project(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#pixelToTile
       */
      pixelToTile(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#tileToPixel
       */
      tileToPixel(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#pixelToCoords
       */
      pixelToCoords(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#coordsToPixel
       */
      coordsToPixel(): void;

      /**
       * Vrací provider dané projekce.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#getProvider
       * @returns {string}
       */
      getProvider(): string;

      /**
       * Převede souřadnice na absolutní pixelovou hodnotu.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#project
       * @param {SMap.Coords} coords
       * @param {number} zoom
       * @returns {SMap.Pixel}
       */
      project(coords: SMap.Coords, zoom: number): SMap.Pixel;

      /**
       * Převede absolutní pixelovou hodnotu na souřadnice.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#unproject
       * @param {SMap.Pixel} absPixel
       * @param {number} zoom
       * @returns {SMap.Coords}
       */
      unproject(absPixel: SMap.Pixel, zoom: number): SMap.Coords;

      /**
       * Převede relativní pixelovou hodnotu na zeměpisnou souřadnici.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#pixelToCoords
       * @param {SMap.Pixel} pixel
       * @param {SMap.Coords} center
       * @param {number} zoom
       * @param {number} orientation
       */
      pixelToCoords(
        pixel: SMap.Pixel,
        center: SMap.Coords,
        zoom: number,
        orientation: number
      ): void;

      /**
       * Převede zeměpisnou souřadnici na relativní pixelovou hodnotu.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#coordsToPixel
       * @param {SMap.Coords} coords
       * @param {SMap.Coords} center
       * @param {number} zoom
       * @param {number} orientation
       */
      coordsToPixel(
        coords: SMap.Coords,
        center: SMap.Coords,
        zoom: number,
        orientation: number
      ): void;

      /**
       * Zjistí (směrem nahoru) mapu.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#getMap
       * @returns {SMap}
       */
      getMap(): SMap;

      /**
       * Nastavení nadřízeného.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.html#setOwner
       * @param {SMap.IOwned} owner
       */
      setOwner(owner: SMap.IOwned): void;
    }

    /**
     * Robinsonova projekce; při zoomu 0 transformuje svět na obdélník o velikosti ... FIXME.
     * @see http://api.mapy.cz/doc/SMap.Projection.Robinson.html
     */
    class Robinson {
      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Robinson.html#K
       */
      static K;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Robinson.html#getWorldSize
       */
      getWorldSize(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Robinson.html#project
       */
      project(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.Robinson.html#unproject
       */
      unproject(): void;
    }

    /**
     * UTM zóna 33.
     * @see http://api.mapy.cz/doc/SMap.Projection.UTM33.html
     */
    class UTM33 {
      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.UTM33.html#project
       */
      project(): void;

      /**
       * @see http://api.mapy.cz/doc/SMap.Projection.UTM33.html#unproject
       */
      unproject(): void;
    }

    namespace Oblique {
      /**
       * Matice 3x3.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Matrix.html
       */
      class Matrix {
        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Matrix.html#mulByVector
         */
        mulByVector(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Matrix.html#transpose
         */
        transpose(): void;
      }

      /**
       * Trojuhelnik na zemskem povrchu.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Triangle.html
       */
      class Triangle {
        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Triangle.html#containsPoint
         */
        containsPoint(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Triangle.html#rayIntersection
         */
        rayIntersection(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Triangle.html#interpolatePoint
         */
        interpolatePoint(): void;
      }

      /**
       * Trojrozmerny vektor.
       * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html
       */
      class Vector {
        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#getPoint
         */
        getPoint(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#norm
         */
        norm(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#normalize
         */
        normalize(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#dot
         */
        dot(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#cross
         */
        cross(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#plus
         */
        plus(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#mul
         */
        mul(): void;

        /**
         * @see http://api.mapy.cz/doc/SMap.Projection.Oblique.Vector.html#minus
         */
        minus(): void;
      }
    }
  }
}
