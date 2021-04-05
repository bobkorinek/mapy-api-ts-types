// Type definitions for API Mapycz
// Project: https://github.com/chriskorinek/mapycz-types
// Definitions by: Kryštof Kořínek https://github.com/chriskorinek

declare namespace JAK {
    class Signals {
        addListener(type: string, handleFunction: string, sender: object): void;

        removeListener(id: string): void;

        removeListeners(array: string[]): void;

        makeEvent(type: string, data: object): void;
    }

    class Promise<T, R> {
        constructor(resolver: (resolve: (result: T) => any, reject: (result: R) => any) => any);

        when(all: Promise<any, any>[]);

        then(onFulfilled: (value: T) => any, onRejected: (value: R) => any);

        chain(promise);
    }

    class Vector {

    }

    abstract class AbstractDecorator {
        decorate<T extends object>(instance: T): T;
    }

    class EXIF {
        constructor(data: number[]);

        getTags(): Array<unknown>;
    }
}

declare class SMap {
    static readonly MOUSE_PAN;

    static readonly MOUSE_WHEEL;

    static readonly MOUSE_ZOOM_IN;

    static readonly MOUSE_ZOOM_OUT;

    static readonly MOUSE_ZOOM;

    static readonly KB_PAN;

    static readonly KB_ZOOM;

    static readonly LAYER_TILE;

    static readonly LAYER_SHADOW;

    static readonly LAYER_GEOMETRY;

    static readonly LAYER_MARKER;

    static readonly LAYER_ACTIVE;

    static readonly LAYER_HUD;

    static readonly NORTH;

    static readonly WEST;

    static readonly SOUTH;

    static readonly EAST;

    static readonly DEF_BASE;

    static readonly DEF_TURIST;

    static readonly DEF_OPHOTO;

    static readonly DEF_HYBRID;

    static readonly DEF_HISTORIC;

    static readonly DEF_OPHOTO0203;

    static readonly DEF_OPHOTO0406;

    static readonly DEF_OBLIQUE;

    static readonly DEF_SMART_BASE;

    static readonly DEF_SMART_OPHOTO;

    static readonly DEF_SMART_TURIST;

    static readonly DEF_RELIEF;

    static readonly DEF_PANO;

    static readonly DEF_TURIST_WINTER;

    static readonly DEF_SMART_WINTER;

    static readonly DEF_SMART_SUMMER;

    static readonly DEF_GEOGRAPHY;

    static readonly DEF_OPHOTO1012;

    static readonly DEF_HYBRID_SPARSE;

    static readonly DEF_OPHOTO1415;

    static readonly DEF_OPHOTO1618;

    static readonly GEOMETRY_POLYLINE;

    static readonly GEOMETRY_POLYGON;

    static readonly GEOMETRY_CIRCLE;

    static readonly GEOMETRY_ELLIPSE;

    static readonly GEOMETRY_PATH;

    static readonly MAPSET_BASE;

    static readonly MAPSET_TURIST;

    static proj4;

    static Vector;

    static TileSetOblique;

    static TRANSFORM;

    static LAYER_VECTOR;

    static DEF_SMART;

    static DEF_RELIEF_L;

    static DEF_RELIEF_H;

    static OphotoDate;

    static WMMarker;

    static SuggestParams;

    static POIServer;

    static LOOKUP_MARKER;

    static LOOKUP_GEOMETRY;

    /**
    * Hlavní konstruktor map.
    */
    constructor(container: Node, center: SMap.Coords, zoom: number, options: object);

    /**
    * Všechny destruktory dělají toto: 
    - vymažou kontejner, pokud prvek nějaký má 
    - zavolají destruktor všech podřízených prvků 
    - odvěsí své události 
    Nedochází tedy k selektivnímu odvěšování - na to se používá .removeXXX()
    */
    $destructor(): void;

    /**
    * Umožní zobrazování POI z poiserverů v API
    */
    createDefaultDataProvider(): void;

    /**
    * Zamkne mapu. Pokud je mapa zamknutá, nedochází k automatickému překreslování vrstev, když je potřeba
    */
    lock(): void;

    /**
    * Odemkne mapu; tím dojde k překreslení a aktualizaci všech vrstev (typicky po konci pohybu)
    */
    unlock(): void;

    getSignals(): JAK.Signals;

    getZoomRange(): void;

    /**
    * Změna zoom rozsahu
    */
    setZoomRange(min: number, max: number): void;

    /**
    * Žádost o explicitní aktualizaci vrstev (má smysl jen při zamčené mapě)
    */
    redraw(): void;

    /**
    * Vrátí současnou orientaci
    */
    getOrientation(): number;

    /**
    * Nastaví orientaci
    */
    setOrientation(o: number, animate: boolean): void;

    /**
    * Nastaví projekci
    */
    setProjection(projection: SMap.Projection): void;

    /**
    * Vrátí mapový prvek
    */
    getContainer(): Node;

    /**
    * Vrátí rodič mapových vrstev
    */
    getContent(): Node;

    /**
    * Vrátí rozměry průhledu
    */
    getSize(): SMap.Pixel;

    /**
    * Vrátí aktuální projekci
    */
    getProjection(): SMap.Projection;

    /**
    * Vrátí posun mapy vůči středu
    */
    getOffset(): SMap.Pixel;

    /**
    * Vrátí vektorový nástroj
    */
    getGeometryCanvas(): JAK.Vector;

    /**
    * Nastaví kurzor mapovému rodiči
    */
    setCursor(cursor: string | null, x: number, y: number): void;

    /**
    * Nastaví mapě nový střed.
    */
    setCenter(center: SMap.Coords | SMap.Pixel, animate: boolean): void;

    /**
    * Dojde ke zmene zoomu od toho soucasneho?
    */
    zoomChange(z: number | string): boolean;

    /**
    * Nastaví mapě zoom
    */
    setZoom(z: number | string, fixedPoint: SMap.Pixel | SMap.Coords, animate: boolean): void;

    /**
    * Nastaví střed i zoom
    */
    setCenterZoom(center: SMap.Coords, zoom: number, animate: boolean): void;

    /**
    * Vrátí střed
    */
    getCenter(): SMap.Coords;

    /**
    * Vrátí zoom
    */
    getZoom(): number;

    /**
    * Spočítá střed a zoom pro množinu bodů
    */
    computeCenterZoom(arr: Array<SMap.Coords>, usePadding: boolean): Array<SMap.Coords>;

    /**
    * Přidá do mapy vrstvu
    */
    addLayer(l: SMap.Layer, before: boolean): SMap.Layer;

    /**
    * Odebere vrstvu z mapy
    */
    removeLayer(l: SMap.Layer): void;

    /**
    * Nalezne mapu dle zadaného ID
    */
    getLayer(id: string | number): SMap.Layer | null;

    /**
    * Vrátí držák daného typu vrstvy
    */
    getLayerContainer(): void;

    /**
    * Přidá do mapy ovládací prvek
    */
    addControl(c: SMap.Control, placement: object): void;

    /**
    * Vrátí seznam ovládacích prvků
    */
    getControls(): Array<SMap.Control>;

    /**
    * Odebere ovládáci prvek
    */
    removeControl(c: SMap.Control): void;

    /**
    * Zobrazí vizitku
    */
    addCard(card: SMap.Card, coords: SMap.Coords, noPan: boolean): void;

    /**
    * Zavře vizitku
    */
    removeCard(): void;

    /**
    * Vrátí právě zobrazenou vizitku
    */
    getCard(): SMap.Card;

    /**
    * Sesynchronizuje mapu s portem
    */
    syncPort(): void;

    /**
    * Nastaví vnitřní padding (rezervovanou oblast, kde nesmí být vizitka). Používá se jen při posunu mapy v důsledku otevření vizitky.
    */
    setPadding(which: string, value: number): void;

    /**
    * Vrátí vnitřní padding
    */
    getPadding(which: string): number;

    /**
    * Top-level volání getMap() vrací instanci mapy
    */
    getMap(): SMap;

    /**
    * Vyrobí výchozí vrstvu dle zadané konstanty
    */
    addDefaultLayer(id: string | number): SMap.Layer;

    /**
    * Vyrobí výchozí kontextové menu
    */
    addDefaultContextMenu(): void;

    /**
    * Vyrobí typické ovládácí prvky
    */
    addDefaultControls(): void;

    /**
    * Nahradí v zadaném řetězci všechny placeholdery {nazev} aktuálními hodnotami.
    Povolené hodnoty: cx, cy, lbx, lby, rtx, rty, lx, rx, by, ty, zoom, zoom[+-][12], orientation.
    */
    formatString(template: string, customValues: object): string;

    /**
    * Test, jsou-li na zadaném místě (či aktuálním středu) dostupné šikmé snímky
    */
    isObliqueAvailable(coords: SMap.Coords): void;

    /**
    * Test, jsou-li na zadaném místě (či aktuálním středu) dostupné letecké snímky
    */
    isOphotoAvailable(coords: SMap.Coords): void;

    /**
    * Nové souřadnice, které se od zadaných na zadaném zoomu liší o padding mapy
    */
    adjustCoordsByPadding(coords: SMap.Coords, zoom: number, projection: SMap.Projection): SMap.Coords;

    /**
    * Přepnout do režimu plynulého zoomu
    */
    zoomAnimationStart(fixedPoint: SMap.Pixel, touch: boolean): void;

    /**
    * Krok plynulého zoomu
    */
    zoomAnimationStep(fracZoom: number): void;

    /**
    * Pustit animaci s daným cílem
    */
    zoomAnimationTarget(targetZoom: number, sourceZoom: number): void;

    /**
    * Konec režimu plynulého zoomu
    */
    zoomAnimationStop(): void;

    getCopyrightControl(): void;

    /**
    * Ziskani viewportu mapy - lb - left bottom, rt - righ top body ve WGS84.
    */
    getViewport(): Object;

    /**
    * Vhodnější je setCenter(c, true)
    */
    animate(): void;
}

declare namespace SMap {
    class Coords {
        /**
        * Konstruktor je lepší nepoužívat, namísto toho vyrábět souřadnice pomocí továrních metod
        */
        constructor(x: number, y: number);

        /**
        * Tovární metoda - výroba souřadnic z události
        */
        fromEvent(event: Event, map: SMap): void;

        /**
        * Tovární metoda - výroba souřadnic z PP
        */
        fromPP(PPx: number, PPy: number): void;

        /**
        * Tovární metoda - výroba souřadnic z UTM33
        */
        fromUTM33(x: number, y: number): void;

        /**
        * Tovární metoda - výroba souřadnic z WGS 84
        */
        static fromWGS84(lonD: number, latD: number): void;

        /**
        * Tovární metoda - výroba souřadnic z (S-)JTSK.
        Kód z pascalové verze Jakuba Kerhata (http://www.geospeleos.com/Mapovani/WGS84toSJTSK/WGS84toSJTSK.htm) převedl Josef Zamrzla.
        */
        static fromJTSK(x: number, y: number): void;

        /**
        * Tovární metoda - výroba souřadnic z EXIF GPS dat
        */
        static fromEXIF(exif: JAK.EXIF): void;

        static stringToAltitude(): void;

        /**
        * Převod na pixel
        */
        toPixel(map: SMap, zoom: number): SMap.Pixel;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Coords;

        /**
        * Jsou shodné?
        */
        equals(coords: SMap.Coords): void;

        /**
        * Vypočte azimut mezi dvěma souřadnicemi
        */
        azimuth(target: SMap.Coords): number;

        /**
        * Spočte obloukovou vzdálenost (haversinový vzorec) mezi touto a druhou souřadnicí v zadané nadmořské výšce.
        Výchozí výška je 0 m.n.m., aproximováno na 6371009 metrů.
        */
        distance(target: SMap.Coords, altitude: number): number;

        distanceMiro(): void;

        /**
        * Převod na řetězec
        */
        toString(): string;

        /**
        * Převede souřadnice do WGS 84
        */
        toWGS84(format: number): Array<number> | Array<string>;

        /**
        * Převede souřadnice do PP
        */
        toPP(): Array<number>;

        /**
        * Převede souřadnice do UTM33
        */
        toUTM33(): Array<number>;

        /**
        * Převede souřadnice do (S-)JTSK.
        Kód z pascalové verze Jakuba Kerhata (http://www.geospeleos.com/Mapovani/WGS84toSJTSK/WGS84toSJTSK.htm) převedl Josef Zamrzla.
        */
        toJTSK(): Array<number>;

        isValid(): void;

        /**
        * Ověří, jsou-li tyto souřadnice v průhledu mapy
        */
        inMap(map: SMap, usePadding: boolean): void;

        /**
        * Tovární metoda - výroba souřadnic z Mercator metrů (epsg:3857)
        */
        fromMercator(x: number, y: number): void;

        /**
        * Převod do Mercator metrů (epsg:3857)
        */
        toMercator(): Array<number>;

        fixedPoint(): void;

        newCenter(): void;

        wrap(): void;

        /**
        * Tovární metoda - výroba souřadnic z události
        */
        fromEvent(event: Event, map: SMap): void;

        /**
        * Tovární metoda - výroba souřadnic z PP
        */
        fromPP(PPx: number, PPy: number): void;

        /**
        * Tovární metoda - výroba souřadnic z UTM33
        */
        fromUTM33(x: number, y: number): void;

        /**
        * Tovární metoda - výroba souřadnic z WGS 84
        */
        static fromWGS84(lonD: number, latD: number): void;

        /**
        * Tovární metoda - výroba souřadnic z (S-)JTSK.
        Kód z pascalové verze Jakuba Kerhata (http://www.geospeleos.com/Mapovani/WGS84toSJTSK/WGS84toSJTSK.htm) převedl Josef Zamrzla.
        */
        static fromJTSK(x: number, y: number): void;

        /**
        * Tovární metoda - výroba souřadnic z EXIF GPS dat
        */
        static fromEXIF(exif: JAK.EXIF): void;

        static stringToAltitude(): void;

        /**
        * Převod na pixel
        */
        toPixel(map: SMap, zoom: number): SMap.Pixel;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Coords;

        /**
        * Jsou shodné?
        */
        equals(coords: SMap.Coords): void;

        /**
        * Vypočte azimut mezi dvěma souřadnicemi
        */
        azimuth(target: SMap.Coords): number;

        /**
        * Spočte obloukovou vzdálenost (haversinový vzorec) mezi touto a druhou souřadnicí v zadané nadmořské výšce.
        Výchozí výška je 0 m.n.m., aproximováno na 6371009 metrů.
        */
        distance(target: SMap.Coords, altitude: number): number;

        distanceMiro(): void;

        /**
        * Převod na řetězec
        */
        toString(): string;

        /**
        * Převede souřadnice do WGS 84
        */
        toWGS84(format: number): Array<number> | Array<string>;

        /**
        * Převede souřadnice do PP
        */
        toPP(): Array<number>;

        /**
        * Převede souřadnice do UTM33
        */
        toUTM33(): Array<number>;

        /**
        * Převede souřadnice do (S-)JTSK.
        */
        toJTSK(): Array<number>;

        isValid(): void;

        /**
        * Ověří, jsou-li tyto souřadnice v průhledu mapy
        */
        inMap(map: SMap, usePadding: boolean): void;

        /**
        * Vrátí nadmořskou výšku.
        */
        getAltitude(): JAK.Promise<number, { data: object, status: number }>;

        /**
        * Převod z OpenLocation formátu na SMap.Coords
        */
        fromOLC(olc: string): void;

        /**
        * Převod do OpenLocation formátu.
        */
        toOLC(codeLength: number): string;

        /**
        * Převod z MGRS formátu na SMap.Coords
        */
        fromMGRS(mgrs: string): void;

        /**
        * Převod do MGRS formátu.
        */
        toMGRS(precision: number): string;

        /**
        * Tovární metoda - výroba souřadnic z Mercator metrů (epsg:3857)
        */
        fromMercator(x: number, y: number): void;

        /**
        * Převod do Mercator metrů (epsg:3857)
        */
        toMercator(): Array<number>;

        fixedPoint(): void;

        newCenter(): void;

        wrap(): void;
    }

    class Layer extends SMap.IOwned {
        static Vector;

        constructor(id: any);

        $destructor(): void;

        /**
        * Nastaví vrstvě sadu copyrightů.
        */
        setCopyright(copyright: object): void;

        /**
        * Vrátí copyright pro daný zoom. Pokud není, vrací null.
        */
        getCopyright(zoom: number): string | Array<string> | null;

        /**
        * Vrátí ID vrstvy
        */
        getId(): any;

        /**
        * Povolí vrstvu. Volat až po připnutí do mapy.
        */
        enable(): void;

        /**
        * Zakáže vrstvu.
        */
        disable(): void;

        /**
        * Překreslení vrstvy
        */
        redraw(full: boolean): void;

        /**
        * Dočasné vymazání vrstvy.
        */
        clear(): void;

        /**
        * Vrátí kontejner(y) vrstvy
        */
        getContainer(): object;

        /**
        * Zjistí, zda je vrstva zapnutá
        */
        isActive(): boolean;

        /**
        * Odstranění všech prvků z vrstvy
        */
        removeAll(): void;

        /**
        * Podporuje tato vrstva aktualizaci během animovaného zoomu?
        */
        supportsAnimation(): void;

        /**
        * Jen pokud supportsAnimation()
        */
        zoomTo(): void;

        /**
        * Jen pokud supportsAnimation()
        */
        rotateTo(): void;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;

        /**
        * Nastavení nadřízeného
        */
        setOwner(owner: SMap.IOwned): void;
    }

    class Control extends SMap.IOwned {
        constructor();

        $destructor(): void;

        /**
        * Vrátí vizuální reprezentaci prvku, je-li jaká
        */
        getContainer(): Node;

        /**
        * Nastaví prvku rodiče (mapu)
        */
        setOwner(owner: SMap): void;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;
    }

    class Marker extends SMap.IOwned {
        static FotoPOI;

        constructor(coords: SMap.Coords, id: string | false, options: object);

        /**
        * Statická tovární metoda - výroba značky z XML
        */
        static fromXML(node: Node): void;

        /**
        * Statická tovární metoda - výroba značky z datového objektu
        */
        static fromData(data: object): void;

        $destructor(): void;

        /**
        * Vrátí souřadnice značky
        */
        getCoords(): SMap.Coords;

        /**
        * Vrátí kontejner značky
        */
        getContainer(): object;

        /**
        * Vrátí ukotvení značky
        */
        getAnchor(): SMap.Pixel;

        /**
        * Vrátí popisek značky
        */
        getTitle(): string;

        /**
        * Vrátí id značky
        */
        getId(): void;

        /**
        * Vrátí rozměr značky, je-li znám
        */
        getSize(): void;

        /**
        * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
        Není proveden žádný přepočet pozice.
        */
        setURL(url: string): void;

        /**
        * Změní značce umístění
        */
        setCoords(coords: SMap.Coords): void;

        /**
        * Je tento prvek součásní klikatelné části značky?
        */
        getActive(): void;

        /**
        * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
        */
        click(): void;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;

        /**
        * Nastavení nadřízeného
        */
        setOwner(owner: SMap.IOwned): void;
    }

    class Geometry extends SMap.IOwned {
        static Multi;

        constructor(type: number, id: any, coords: SMap.Coords, options: object);

        $destructor(): void;

        /**
        * Vrátí id geometrie
        */
        getId(): void;

        /**
        * Vrátí typ geometrie
        */
        getType(): void;

        /**
        * Vrátí souřadnice
        */
        getCoords(): void;

        /**
        * Vrátí pixelové souřadnice
        */
        getPixels(): void;

        /**
        * Vrátí optiony
        */
        getOptions(): void;

        /**
        * Nastaví podmnožinu optionů
        */
        setOptions(): void;

        /**
        * Vrátí uzly vizuální reprezentace
        */
        getNodes(): Array<Node>;

        /**
        * Došlo ke kliknutí na geometrii. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
        */
        click(): void;

        /**
        * Smaže vizuální reprezentaci této geometrie
        */
        clear(): void;

        /**
        * Vykreslí geometrii do daného vectorového canvasu
        */
        draw(): void;

        /**
        * Změna souřadnic geometrie
        */
        setCoords(): void;

        /**
        * Spočte střed a zoom mapy pro tuto geometrii
        */
        computeCenterZoom(map: SMap, usePadding: boolean): void;

        /**
        * Nastavi bbox geometrie.
        */
        countBBox(): void;

        /**
        * Vrati bboxu geometrie
        */
        getBBox(): Object;

        /**
        * Je geometrie viditelna na obrazovce?
        */
        isGeometryVisible(): boolean;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;

        /**
        * Nastavení nadřízeného
        */
        setOwner(owner: SMap.IOwned): void;
    }

    class Card extends SMap.IOwned {
        constructor(width: number, options: object);

        $destructor(): void;

        /**
        * Nastaví vizitce vlastníka
        */
        setOwner(owner: SMap): void;

        /**
        * Vrátí záhlaví vizitky
        */
        getHeader(): void;

        /**
        * Vrátí tělo vizitky
        */
        getBody(): void;

        /**
        * Vrátí zápatí vizitky
        */
        getFooter(): void;

        /**
        * Změní velikost na zadaný rozměr
        */
        setSize(width: number | null, height: number | null): void;

        /**
        * Vrací kontejner vizitky
        */
        getContainer(): Node;

        /**
        * Vrací kotvící bod
        */
        getAnchor(): void;

        /**
        * Umístí vizitku na dané souřadnice
        */
        anchorTo(coords: SMap.Coords): void;

        /**
        * Je vizitka vidět?
        */
        isVisible(): void;

        makeVisible(): boolean;

        /**
        * Aktualizovat výšku těla vizitky tak, aby její celkový výška odpovídala zadaným rozměrům
        */
        sync(): void;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;
    }

    class Pano {
        static debug;

        static tileDir;

        static previewDir;

        static altitude;

        static shaders;

        /**
        * Je technologicky možné v tomto prohlížeči panoramata zobrazovat?
        */
        isSupported(): void;

        /**
        * Získat jedno panorama pro zadané ID
        */
        get(id: number): void;

        /**
        * Získat sousedy pro zadané ID
        */
        getNeighbors(id: number): void;

        /**
        * Získat jedno panorama pro zadané souřadnice a maximální pooloměr vzdálenosti
        */
        getBest(coords: SMap.Coords, radius: number, attribute: object): void;

        /**
        * Vytvoření pano místa.
        */
        create(data: Object): void;
    }

    class Geocoder {
        static METHOD;

        /**
        * Provede dopředné geokódování
        */
        constructor(query: string, callback: Function, options: Object);

        $destructor(): void;

        /**
        * Přeruší probíhající požadavek
        */
        abort(): void;

        getResults(): void;
    }

    class Pixel {
        constructor(x: number, y: number);

        /**
        * Tovární metoda - výroba pixelu z události
        */
        fromEvent(e: Event, map: SMap): void;

        /**
        * Převod na souřadnice
        */
        toCoords(map: SMap, zoom: number): SMap.Coords;

        /**
        * Přičtení jiného pixelu
        */
        plus(pixel: SMap.Pixel): SMap.Pixel;

        /**
        * Odečtení jiného pixelu
        */
        minus(pixel: SMap.Pixel): SMap.Pixel;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Pixel;

        /**
        * Vrátí normu pixelu (vzdálenost k počátku)
        */
        norm(): number;

        /**
        * Vynásobí pixel konstantou či párem konstant
        */
        scale(sx: number, sy: number): void;

        /**
        * Spočte euklidovskou vzdálenost k jinému pixelu
        */
        distance(other: SMap.Pixel): number;

        /**
        * Převod na řetězec
        */
        toString(): string;

        /**
        * Převod na dlaždici
        */
        toTile(map: SMap, tileSize: number): SMap.Tile | null;

        /**
        * Tovární metoda - výroba pixelu z události
        */
        fromEvent(e: Event, map: SMap): void;

        /**
        * Převod na souřadnice
        */
        toCoords(map: SMap, zoom: number): SMap.Coords;

        /**
        * Přičtení jiného pixelu
        */
        plus(pixel: SMap.Pixel): SMap.Pixel;

        /**
        * Odečtení jiného pixelu
        */
        minus(pixel: SMap.Pixel): SMap.Pixel;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Pixel;

        /**
        * Vrátí normu pixelu (vzdálenost k počátku)
        */
        norm(): number;

        /**
        * Vynásobí pixel konstantou či párem konstant
        */
        scale(sx: number, sy: number): void;

        /**
        * Spočte euklidovskou vzdálenost k jinému pixelu
        */
        distance(other: SMap.Pixel): number;

        /**
        * Převod na řetězec
        */
        toString(): string;

        /**
        * Převod na dlaždici
        */
        toTile(map: SMap, tileSize: number): SMap.Tile | null;
    }

    class Route extends JAK.Signals {
        static ROUTE_TURIST_TYPES;

        constructor(coords: Array<SMap.Coords>, callback: Function, params: object);

        static formatRouteDistance(): void;

        $destructor(): void;

        /**
        * Ručně volat jen pokud bylo do konstruktoru posláno autoSend:false
        */
        send(): void;

        /**
        * Přerušit běžící požadavek
        */
        abort(): void;

        /**
        * Vrátí pole průjezdních bodů
        */
        getCoords(): Array<SMap.Coords>;

        /**
        * Vrátí criterion, tedy parametry route
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
        time – celkový čas trasy ve vteřinách
        */
        getResults(): void;

        getPromise(): void;

        /**
        * Konfigurace routovace - zavola dotaz podle zadanych parametru, vraci promise.
        Defaultne ma vypnute obohaceni dat o nadmorske vysky.
        */
        route(coords: Array<SMap.Coords>, paramsArgs: Object): void;
    }

    class Tile {
        constructor(zoom: number, tileSize: number, x: number, y: number);

        toString(): void;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Tile;

        /**
        * Vrátí px souřadnice levého horního rohu dlaždice vůči středu mapy
        */
        toPixel(map: SMap): SMap.Pixel;

        toString(): void;

        /**
        * Vrátí duplikát
        */
        clone(): SMap.Tile;

        /**
        * Vrátí px souřadnice levého horního rohu dlaždice vůči středu mapy
        */
        toPixel(map: SMap): SMap.Pixel;
    }

    class Util {
        /**
        * Převede JS objekt v tečkové notaci na referenci
        */
        static stringToObject(str: string): void;

        /**
        * Zmerguje jeden JS objekt do druhého
        */
        static mergeObject(from: object, to: object): void;

        /**
        * Použije event nad  linkem, pokud se jedná o klik ctrl+levé tlačítko nebo prostřední tlačítko,
        tak vrací true a otevře odkaz "href" v novém okně.
        */
        linkToNewWindow(): void;

        /**
        * Naformátuje metry na standardní formát vzdálenosti
        */
        standardDistanceFormat(distance: unknown, longDecimal: unknown): void;

        static formatLocaleNumber(): void;

        /**
        * Nachazi se bod point uvnitr polygonu?
        */
        pointInPolygon(point: Array<unknown>, polygon: unknown): void;

        /**
        * Vezme data viewportu mapy a prevede je na google bounds variantu, WGS84.
        [sw, ne] - lat,lon
        */
        viewportToBounds(viewport: Object): void;

        /**
        * Převede JS objekt v tečkové notaci na referenci
        */
        static stringToObject(str: string): void;

        /**
        * Zmerguje jeden JS objekt do druhého
        */
        static mergeObject(from: object, to: object): void;

        /**
        * Použije event nad  linkem, pokud se jedná o klik ctrl+levé tlačítko nebo prostřední tlačítko,
        tak vrací true a otevře odkaz "href" v novém okně.
        */
        linkToNewWindow(): void;

        /**
        * Naformátuje metry na standardní formát vzdálenosti
        */
        standardDistanceFormat(distance: unknown, longDecimal: unknown): void;

        static formatLocaleNumber(): void;

        /**
        * Nachazi se bod point uvnitr polygonu?
        */
        pointInPolygon(point: Array<unknown>, polygon: unknown): void;

        /**
        * Vezme data viewportu mapy a prevede je na google bounds variantu, WGS84.
        [sw, ne] - lat,lon
        */
        viewportToBounds(viewport: Object): void;
    }

    class Suggest {
        /**
        * Vytvoření našeptávače - je potřeba zadat vstupní input a volitelné parametry.
        */
        constructor(input: Element, options: Object);

        /**
        * Funkce pro upravu url parametru.
        */
        urlParams(data: Object): void;

        /**
        * Vlastní funkce pro obohacení parametrů pro request našeptávače
        */
        updateParams(cb: Function): void;

        /**
        * Pomocna funkce pro nastaveni dat ze suggestu.
        */
        dataParams(data: Object): void;

        /**
        * Nastaveni - bind mapy.
        */
        map(map: SMap): void;

        /**
        * Zrušení requestu.
        */
        abort(): void;

        /**
        * Přidání posluchače signálu.
        */
        addListener(name: string, cb: Function, scope: Object): void;

        /**
        * Odstranění posluchače signálu.
        */
        removeListener(name: string, cb: Function, scope: Object): void;

        /**
        * Odstranění našeptávače.
        */
        destroy(): void;

        /**
        * Zobrazení našeptávače.
        */
        open(): void;

        /**
        * Zavření našeptávače.
        */
        close(): void;

        /**
        * Odstranění všech položek našeptávače.
        */
        clearItems(): void;

        /**
        * Zobrazení našeptávače pro danou frázi ve vstupním inputu.
        */
        send(): void;

        handleEvent(): void;

        /**
        * Získání fráze ze vstupního inputu.
        */
        getPhrase(): string;

        /**
        * Získání provideru.
        */
        getProvider(): Object;

        /**
        * Je našeptávač aktivní (otevřený)
        */
        isActive(): boolean;
    }

    class SuggestItem {
        /**
        * Pro vytvoření položky jsou nutné vstupní data a pozice položky v seznamu.
        */
        constructor(data: Object, pos: number);

        /**
        * Odstranění položky našeptávače.
        */
        destroy(): void;

        /**
        * Funkce vrací HTML dané položky.
        */
        getNode(): Element;

        /**
        * Získání dat dané položky.
        */
        getData(): Object;

        /**
        * Získání fráze dané položky.
        */
        getPhrase(): string;

        /**
        * Získání pozice položky v seznamu, začíná se od 1.
        */
        getPosition(): number;
    }

    class SuggestProvider {
        /**
        * Vytvoření provideru pro zajištění dat našeptávače.
        */
        constructor(options: Object);

        /**
        * Nastaveni ze suggestu pro zpetnou kombalitu.
        */
        suggestSet(suggestOpts: Object): void;

        /**
        * Funkce vrací promise s daty pro našeptávač.
        */
        get(phrase: string): JAK.Promise<unknown, unknown>;

        /**
        * Zrušení requestu.
        */
        abort(): void;

        /**
        * Získání limitu - počtu položek našeptávače pro zobrazení/stažení
        */
        getLimit(): number;

        /**
        * Pomocna funkce pro nastaveni dat ze suggestu.
        */
        urlParams(data: Object): void;

        /**
        * Vlastní funkce pro obohacení parametrů pro request našeptávače
        */
        updateParams(cb: Function): void;

        /**
        * Pomocna funkce pro nastaveni dat ze suggestu.
        */
        dataParams(data: Object): void;
    }

    class IOwned {
        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;

        /**
        * Nastavení nadřízeného
        */
        setOwner(owner: SMap.IOwned): void;
    }

    class Projection extends SMap.IOwned {
        constructor();

        getCode(): void;

        getMatrixSet(): void;

        getWorldSize(): void;

        /**
        * Převede souřadnice na absolutní pixelovou hodnotu
        */
        project(coords: SMap.Coords, zoom: number): SMap.Pixel;

        /**
        * Převede absolutní pixelovou hodnotu na souřadnice
        */
        unproject(absPixel: SMap.Pixel, zoom: number): SMap.Coords;

        /**
        * Převede relativní pixelovou hodnotu na zeměpisnou souřadnici
        */
        pixelToCoords(pixel: SMap.Pixel, center: SMap.Coords, zoom: number, orientation: number): void;

        /**
        * Převede zeměpisnou souřadnici na relativní pixelovou hodnotu
        */
        coordsToPixel(coords: SMap.Coords, center: SMap.Coords, zoom: number, orientation: number): void;

        pixelToTile(): void;

        tileToPixel(): void;

        /**
        * Zjistí (směrem nahoru) mapu
        */
        getMap(): SMap;

        /**
        * Nastavení nadřízeného
        */
        setOwner(owner: SMap.IOwned): void;
    }

    namespace Layer {
        class Canvas extends SMap.Layer {
            /**
            * Constructor Canvasove vrstvy
            */
            constructor(id: any, layerId: number);

            $destructor(): void;

            clear(): void;

            getContext(): void;

            redraw(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Překreslení vrstvy
            */
            redraw(full: boolean): void;

            /**
            * Dočasné vymazání vrstvy.
            */
            clear(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class GPX extends SMap.Layer.Multi {
            constructor(xmlDoc: XMLDocument, id: string, options: object);

            static parseCoords(): void;

            /**
            * Nastaví střed a zoom tak, aby byly vidět všechny prvky v GPX datech
            */
            fit(): void;

            /**
            * Filtrujeme zadanou mnozinu tak, aby pro "largestCount" vstupnich bodu obsahoval maximalne maxPoints vystupnich bodu
            */
            filter(): void;

            createMarker(): void;

            $destructor(): void;

            /**
            * Překreslí podřízené vrstvy
            */
            redraw(): void;

            /**
            * Vymaže podřízené vrstvy
            */
            clear(): void;

            /**
            * Odstraní prvky z podřízených vrstev
            */
            removeAll(): void;

            /**
            * Povolí podřízené vrstvy
            */
            enable(): void;

            /**
            * Zakáže podřízené vrstvy
            */
            disable(): void;

            /**
            * Nastaví vlastníka
            */
            setOwner(): void;

            /**
            * Vrátí kontejnery podřízených vrstev
            */
            getContainer(): void;

            /**
            * Přidá podřízenou vrstvu
            */
            addLayer(l: SMap.Layer): void;

            /**
            * Odebere podřízenou vrstvu
            */
            removeLayer(l: SMap.Layer): void;

            /**
            * Vrátí všechny podřízené vrstvy
            */
            getLayers(): Array<SMap.Layer>;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Geometry extends SMap.Layer {
            constructor(id: any, options: object);

            $destructor(): void;

            supportsAnimation(): void;

            zoomTo(): void;

            addGeometry(geometry: SMap.Geometry): void;

            removeGeometry(geometry: SMap.Geometry): void;

            /**
            * Vrátí všechny geometrie v objektu indexovaném jednotlivými ID
            */
            getGeometries(): object;

            /**
            * Vymazání vrstvy == dočasné zrušení všech prvků
            */
            clear(): void;

            /**
            * Odebere vše z vrstvy
            */
            removeAll(): void;

            /**
            * Naplní obsah vrstvy z XML nebo z FRPC dat
            */
            fillFromData(dataSets: Object | Array<unknown>): void;

            /**
            * Překreslí vrstvu: vezme všechny souřadnice vektorových prvků, přepočte je na pixely (s ohledem na současný zoom)
            a vykreslí ty, které jsou celé v průhledu.
            */
            redraw(): void;

            /**
            * Překreslení jedné geometrie. Veřejná metoda, aby ji mohla volat sama geometrie.
            */
            redrawGeometry(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class HUD extends SMap.Layer {
            constructor(id: any);

            clear(): void;

            enable(): void;

            /**
            * Nová položka do HUDu
            */
            addItem(node: Node, placement: object, prepend: boolean): void;

            /**
            * Zruší položku z HUDu
            */
            removeItem(node: Node): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Překreslení vrstvy
            */
            redraw(full: boolean): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Image extends SMap.Layer {
            constructor(id: string);

            supportsAnimation(): void;

            /**
            * Přidání nového obrázku
            */
            addImage(url: string, leftTop: SMap.Coords, rightBottom: SMap.Coords, opacity: number): string;

            /**
            * Odebere dříve přidaný obrázek
            */
            removeImage(id: string): void;

            /**
            * Odebere všechny obrázky
            */
            removeAll(): void;

            redraw(): void;

            clear(): void;

            enable(): void;

            zoomTo(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class KML extends SMap.Layer.Multi {
            constructor(xmlDoc: XMLDocument, id: string, options: object);

            filter(): void;

            /**
            * Nastaví střed a zoom tak, aby byly vidět všechny prvky v KML datech
            */
            fit(): void;

            getStyle(): void;

            getColor(): void;

            getOpacity(): void;

            getURL(): void;

            $destructor(): void;

            /**
            * Překreslí podřízené vrstvy
            */
            redraw(): void;

            /**
            * Vymaže podřízené vrstvy
            */
            clear(): void;

            /**
            * Odstraní prvky z podřízených vrstev
            */
            removeAll(): void;

            /**
            * Povolí podřízené vrstvy
            */
            enable(): void;

            /**
            * Zakáže podřízené vrstvy
            */
            disable(): void;

            /**
            * Nastaví vlastníka
            */
            setOwner(): void;

            /**
            * Vrátí kontejnery podřízených vrstev
            */
            getContainer(): void;

            /**
            * Přidá podřízenou vrstvu
            */
            addLayer(l: SMap.Layer): void;

            /**
            * Odebere podřízenou vrstvu
            */
            removeLayer(l: SMap.Layer): void;

            /**
            * Vrátí všechny podřízené vrstvy
            */
            getLayers(): Array<SMap.Layer>;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Marker extends SMap.Layer {
            constructor(options: object);

            $destructor(): void;

            /**
            * Nastaví slučovač značek
            */
            setClusterer(clusterer: SMap.Marker.Clusterer | null): void;

            /**
            * Přidá do vrstvy značku nebo značky
            */
            addMarker(marker: SMap.Marker | Array<SMap.Marker>, noRedraw: boolean): void;

            /**
            * Odebere značku nebo značky z vrstvy
            */
            removeMarker(marker: SMap.Marker | Array<SMap.Marker>, noRedraw: boolean): void;

            /**
            * Odebere všechny značky
            */
            removeAll(): void;

            getMarkers(): Array<SMap.Marker>;

            supportsAnimation(): void;

            zoomTo(): void;

            /**
            * Naplní obsah vrstvy externími daty
            */
            fillFromData(data: Object | Array<unknown>): void;

            /**
            * Zapne rozhazování značek tak, aby se nepřekrývaly. Využívá k tomu SMap.Marker.Repositioner.
            */
            setReposition(options: null | object): void;

            /**
            * Překreslí vrstvu: vezme značky a spočte viditelnost. Viditelné ukáže a napozicuje, neviditelné odepne.
            */
            redraw(): void;

            /**
            * Přepozicování značky. Metoda je veřejná, aby ji mohla volat sama značka.
            */
            positionMarker(marker: SMap.Marker): void;

            /**
            * Dočasně vymaže vrstvu. POZOR - neodebírá z vrstvy značky, při nejbližším překreslení se vrstva zase vykreslí.
            */
            clear(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Multi extends SMap.Layer {
            constructor(id: any);

            $destructor(): void;

            /**
            * Překreslí podřízené vrstvy
            */
            redraw(): void;

            /**
            * Vymaže podřízené vrstvy
            */
            clear(): void;

            /**
            * Odstraní prvky z podřízených vrstev
            */
            removeAll(): void;

            /**
            * Povolí podřízené vrstvy
            */
            enable(): void;

            /**
            * Zakáže podřízené vrstvy
            */
            disable(): void;

            /**
            * Nastaví vlastníka
            */
            setOwner(): void;

            /**
            * Vrátí kontejnery podřízených vrstev
            */
            getContainer(): void;

            /**
            * Přidá podřízenou vrstvu
            */
            addLayer(l: SMap.Layer): void;

            /**
            * Odebere podřízenou vrstvu
            */
            removeLayer(l: SMap.Layer): void;

            /**
            * Vrátí všechny podřízené vrstvy
            */
            getLayers(): Array<SMap.Layer>;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Smart extends SMap.Layer {
            constructor(id: any);

            /**
            * Vrátí podřízené vrstvy
            */
            getLayers(): void;

            /**
            * Zapne/vypne zobrazovani hybridu
            */
            setHybrid(): void;

            redraw(): void;

            getSimpleLayerId(): void;

            clear(): void;

            zoomTo(): void;

            rotateTo(): void;

            supportsAnimation(): void;

            getCopyright(): void;

            setOwner(): void;

            /**
            * Pozor - zapínání není delegování na aktuální podvrstvu, protože ta nemusí být vůbec zapnutelná (oblique při non-oblique projekci).
            Proto při našem zapnutí jen překreslíme ($super) - a při překreslení vrstvu zapneme, až to bude bezpečné.
            */
            enable(): void;

            disable(): void;

            /**
            * Sloucene kontejnery vsech podrizenych vrstev
            */
            getContainer(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Překreslení vrstvy
            */
            redraw(full: boolean): void;

            /**
            * Dočasné vymazání vrstvy.
            */
            clear(): void;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Tile extends SMap.Layer {
            static Oblique;

            static DEFAULT_OPTIONS;

            constructor(id: string, url: string, options: object);

            /**
            * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí)
            */
            setOptions(): void;

            supportsAnimation(): void;

            redraw(): void;

            /**
            * Nastaví vrstvě nové URL
            */
            setURL(url: string): void;

            /**
            * Vymazat vrstvu == zrušit DOM a cache
            */
            clear(): void;

            /**
            * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu
            */
            zoomTo(): void;

            /**
            * Dočasně natočit - krok animovaného otáčení
            */
            rotateTo(): void;

            getURL(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Turist extends SMap.Layer {
            constructor(id: any);

            /**
            * Změna viditelnosti tur. stezek
            */
            setTrail(trail: boolean): void;

            /**
            * Změna viditelnosti cyklostezek
            */
            setBike(bike: boolean): void;

            /**
            * Jsou zaplé turistické trasy?
            */
            getTrail(): void;

            /**
            * Jsou zaplé cyklostezky?
            */
            getBike(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Překreslení vrstvy
            */
            redraw(full: boolean): void;

            /**
            * Dočasné vymazání vrstvy.
            */
            clear(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class WMS extends SMap.Layer.Tile {
            constructor(id: any, url: string, params: object);

            redraw(): void;

            /**
            * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí)
            */
            setOptions(): void;

            redraw(): void;

            /**
            * Nastaví vrstvě nové URL
            */
            setURL(url: string): void;

            /**
            * Vymazat vrstvu == zrušit DOM a cache
            */
            clear(): void;

            /**
            * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu
            */
            zoomTo(): void;

            /**
            * Dočasně natočit - krok animovaného otáčení
            */
            rotateTo(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class WMTS extends SMap.Layer.Tile {
            constructor(id: any, url: string, params: object, options: object);

            /**
            * Za běhu změní vrstvě nějaké nastavení (a následně ji plně překreslí)
            */
            setOptions(): void;

            redraw(): void;

            /**
            * Nastaví vrstvě nové URL
            */
            setURL(url: string): void;

            /**
            * Vymazat vrstvu == zrušit DOM a cache
            */
            clear(): void;

            /**
            * Dočasně posunout a nazoomovat dlaždice - krok animovaného zoomu
            */
            zoomTo(): void;

            /**
            * Dočasně natočit - krok animovaného otáčení
            */
            rotateTo(): void;

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Winter extends SMap.Layer {
            constructor(id: any);

            $destructor(): void;

            /**
            * Nastaví vrstvě sadu copyrightů.
            */
            setCopyright(copyright: object): void;

            /**
            * Vrátí copyright pro daný zoom. Pokud není, vrací null.
            */
            getCopyright(zoom: number): string | Array<string> | null;

            /**
            * Vrátí ID vrstvy
            */
            getId(): any;

            /**
            * Povolí vrstvu. Volat až po připnutí do mapy.
            */
            enable(): void;

            /**
            * Zakáže vrstvu.
            */
            disable(): void;

            /**
            * Překreslení vrstvy
            */
            redraw(full: boolean): void;

            /**
            * Dočasné vymazání vrstvy.
            */
            clear(): void;

            /**
            * Vrátí kontejner(y) vrstvy
            */
            getContainer(): object;

            /**
            * Zjistí, zda je vrstva zapnutá
            */
            isActive(): boolean;

            /**
            * Odstranění všech prvků z vrstvy
            */
            removeAll(): void;

            /**
            * Podporuje tato vrstva aktualizaci během animovaného zoomu?
            */
            supportsAnimation(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            zoomTo(): void;

            /**
            * Jen pokud supportsAnimation()
            */
            rotateTo(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        namespace Smart {
            class Turist extends SMap.Layer.Smart {
                constructor(id: any);

                /**
                * Změna viditelnosti tur. stezek
                */
                setTrail(trail: boolean): void;

                /**
                * Změna viditelnosti cyklostezek
                */
                setBike(bike: boolean): void;

                /**
                * Jsou zaplé turistické trasy?
                */
                getTrail(): void;

                /**
                * Jsou zaplé cyklostezky?
                */
                getBike(): void;

                /**
                * Vrátí podřízené vrstvy
                */
                getLayers(): void;

                /**
                * Zapne/vypne zobrazovani hybridu
                */
                setHybrid(): void;

                /**
                * Pozor - zapínání není delegování na aktuální podvrstvu, protože ta nemusí být vůbec zapnutelná (oblique při non-oblique projekci).
                Proto při našem zapnutí jen překreslíme ($super) - a při překreslení vrstvu zapneme, až to bude bezpečné.
                */
                enable(): void;

                /**
                * Sloucene kontejnery vsech podrizenych vrstev
                */
                getContainer(): void;

                $destructor(): void;

                /**
                * Nastaví vrstvě sadu copyrightů.
                */
                setCopyright(copyright: object): void;

                /**
                * Vrátí copyright pro daný zoom. Pokud není, vrací null.
                */
                getCopyright(zoom: number): string | Array<string> | null;

                /**
                * Vrátí ID vrstvy
                */
                getId(): any;

                /**
                * Zakáže vrstvu.
                */
                disable(): void;

                /**
                * Překreslení vrstvy
                */
                redraw(full: boolean): void;

                /**
                * Dočasné vymazání vrstvy.
                */
                clear(): void;

                /**
                * Zjistí, zda je vrstva zapnutá
                */
                isActive(): boolean;

                /**
                * Odstranění všech prvků z vrstvy
                */
                removeAll(): void;

                /**
                * Podporuje tato vrstva aktualizaci během animovaného zoomu?
                */
                supportsAnimation(): void;

                /**
                * Jen pokud supportsAnimation()
                */
                zoomTo(): void;

                /**
                * Jen pokud supportsAnimation()
                */
                rotateTo(): void;

                /**
                * Zjistí (směrem nahoru) mapu
                */
                getMap(): SMap;

                /**
                * Nastavení nadřízeného
                */
                setOwner(owner: SMap.IOwned): void;
            }
        }
    }

    namespace Control {
        class Compass {
            constructor(options: object);

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class ContextMenu extends SMap.Control {

            constructor();

            $destructor(): void;

            setOwner(): void;

            /**
            * Otevře menu na zadané pixelové pozici
            */
            open(event: Event, coords: SMap.Coords): void;

            close(): void;

            /**
            * Přidá položku menu
            */
            addItem(item: SMap.Control.ContextMenu.Item, pos: number): void;

            /**
            * Odebere existující položku menu
            */
            removeItem(item: SMap.Control.ContextMenu.Item): void;

            /**
            * Vrátí položky
            */
            getItems(): Array<SMap.Control.ContextMenu.Item>;

            /**
            * Vyčistí položky
            */
            clearItems(): void;

            $destructor(): void;

            /**
            * Vrátí vizuální reprezentaci prvku, je-li jaká
            */
            getContainer(): Node;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Copyright {
            constructor();

            setOwner(): void;

            addCopyright(): void;

            setDate(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Image extends SMap.Control.Visible {
            constructor(url: string);

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Keyboard extends SMap.Control {
            constructor(mode: number, options: object);

            setOwner(): void;

            /**
            * Za běhu změní funkci ovladače klávesnice
            */
            configure(): void;

            /**
            * Vrátí právě používanou bitovou masku
            */
            getMode(): void;

            $destructor(): void;

            /**
            * Vrátí vizuální reprezentaci prvku, je-li jaká
            */
            getContainer(): Node;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Layer {
            constructor(options: object);

            $destructor(): void;

            setOwner(): void;

            /**
            * Přidá vrstvu do ovládacího prvku
            */
            addLayer(id: any, label: string, src: string, title: string): void;

            /**
            * Přidá vestavěnou vrstvu do ovládacáho prvku.
            */
            addDefaultLayer(id: any): void;

            getContent(): Node;

            getActiveId(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Minimap {
            constructor(width: number, height: number, options: object);

            setOwner(): void;

            /**
            * Změna nastavení za běhu
            */
            setOptions(options: object): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Mouse extends SMap.Control {
            constructor(mode: number, options: object);

            setOwner(): void;

            /**
            * Vrátí právě používanou bitovou masku
            */
            getMode(): void;

            /**
            * Překonfigurování režimu ovladače
            */
            configure(): void;

            $destructor(): void;

            /**
            * Vrátí vizuální reprezentaci prvku, je-li jaká
            */
            getContainer(): Node;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Orientation {
            constructor(options: object);

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Overview {
            constructor(url: string);

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Pointer {
            static readonly TYPES;

            /**
            * Konstruktor
            */
            constructor(options: object);

            /**
            * Zobrazeni kapičky ke středu
            */
            setCoords(center: SMap.Coords, alwaysShow: boolean): void;

            /**
            * Překreslení kapky na obrazovce.
            */
            redraw(): void;

            setOwner(): void;
        }

        class Rosette {
            constructor(options: object);

            $destructor(): void;

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Scale {
            /**
            * starý formát:
            */
            constructor(conf: number, conf: Object);

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Selection {
            constructor(thickness: number);

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Sync extends SMap.Control {
            constructor(options: object);

            setOwner(): void;

            /**
            * Změna odsazení mapy odspodu
            */
            setBottomSpace(bottomSpace: number): void;

            $destructor(): void;

            /**
            * Vrátí vizuální reprezentaci prvku, je-li jaká
            */
            getContainer(): Node;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Visible extends SMap.Control {
            constructor();

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class Zoom {
            constructor(labels: object, options: object);

            $destructor(): void;

            setZoom(): void;

            setOwner(): void;

            /**
            * Přidání zoom menu.
            */
            addZoomMenu(): void;

            /**
            * Odebrání zoom menu.
            */
            removeZoomMenu(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        class ZoomNotification {
            constructor();

            setOwner(): void;

            /**
            * Vrátí kontejner prvku
            */
            getContainer(): Node;

            $destructor(): void;

            /**
            * Nastaví prvku rodiče (mapu)
            */
            setOwner(owner: SMap): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        namespace ContextMenu {
            class Coords extends SMap.Control.ContextMenu.Item {
                constructor(label: string);

                setCoords(): void;

                /**
                * Vyvoláno po kliknutí na položku
                */
                click(e: Event, menu: SMap.Control.ContextMenu): void;
            }

            class Item {
                constructor(label: string);

                $destructor(): void;

                /**
                * Vyvoláno po kliknutí na položku
                */
                click(e: Event, menu: SMap.Control.ContextMenu): void;

                enable(): void;

                disable(): void;

                setCoords(): void;

                getContainer(): void;
            }

            class Separator extends SMap.Control.ContextMenu.Item {
                constructor(label: string);

                /**
                * Vyvoláno po kliknutí na položku
                */
                click(e: Event, menu: SMap.Control.ContextMenu): void;
            }

            class Zoom extends SMap.Control.ContextMenu.Item {
                constructor(label: string, zoomDiff: number);

                setCoords(): void;

                click(): void;

                /**
                * Vyvoláno po kliknutí na položku
                */
                click(e: Event, menu: SMap.Control.ContextMenu): void;
            }
        }
    }

    namespace Marker {
        class Cluster extends SMap.Marker {
            constructor(id: any, options: object);

            /**
            * Přidání značky do shluku
            */
            addMarker(marker: SMap.Marker): void;

            /**
            * Všechny značky v tomto shluku
            */
            getMarkers(): Array<SMap.Marker>;

            /**
            * Po kliku na cluster se změní střed a zoom na jeho podznačky
            */
            click(): void;

            /**
            * Nastavit velikost
            */
            setSize(min: number, max: number): void;

            $destructor(): void;

            /**
            * Vrátí souřadnice značky
            */
            getCoords(): SMap.Coords;

            /**
            * Vrátí kontejner značky
            */
            getContainer(): object;

            /**
            * Vrátí ukotvení značky
            */
            getAnchor(): SMap.Pixel;

            /**
            * Vrátí popisek značky
            */
            getTitle(): string;

            /**
            * Vrátí id značky
            */
            getId(): void;

            /**
            * Vrátí rozměr značky, je-li znám
            */
            getSize(): void;

            /**
            * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
            Není proveden žádný přepočet pozice.
            */
            setURL(url: string): void;

            /**
            * Změní značce umístění
            */
            setCoords(coords: SMap.Coords): void;

            /**
            * Je tento prvek součásní klikatelné části značky?
            */
            getActive(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Clusterer {
            constructor(map: SMap, maxDistance: number, clusterCtor: Function);

            /**
            * Vše vyčistit
            */
            clear(): void;

            /**
            * Přidání značky
            */
            addMarker(marker: SMap.Marker): void;

            /**
            * Odebrání značky
            */
            removeMarker(marker: SMap.Marker): void;

            getAllMarkers(): Array<SMap.Marker>;

            /**
            * Vrátí neshluklé značky
            */
            getMarkers(): Array<SMap.Marker>;

            /**
            * Vrátí shluklé značky
            */
            getClusters(): Array<SMap.Marker.Cluster>;

            /**
            * Provede vlastní rozhození značek
            */
            compute(): void;
        }

        class Feature {
        }

        class POI extends SMap.Marker {
            static nodeName;

            static VISUAL;

            constructor(coords: SMap.Coords, id: any, options: object);

            static fromXML(): void;

            static fromData(): void;

            $destructor(): void;

            /**
            * Získání konfigurace vizuálního zobrazení markeru.
            */
            getVisual(): Object;

            /**
            * Nastavení zdroje POIe.
            */
            setSource(source: string): void;

            /**
            * Získání zdroje POIe.
            */
            getSource(): string;

            /**
            * Nastavení ID POIe.
            */
            setPlainId(plainId: number): void;

            /**
            * Získání ID POIe.
            */
            getPlainId(): number;

            click(): void;

            /**
            * Změna vizuálu značky.
            */
            setVisual(visual: object): void;

            /**
            * Zapnutí/vypnutí animace zvětšování obsahu markeru.
            */
            setActive(state: boolean, noAnim: boolean): void;

            /**
            * Nastavení callback funkce pro naplnění obsahu vizitky.
            */
            setPopupCallback(cb: Function): void;

            setCardOptions(): void;

            /**
            * Posunuti karty
            */
            moveCard(): void;

            /**
            * Odstranění zobrazené popup karty.
            */
            removeCard(): void;

            /**
            * Standartni setOwner, ktery posloucha na zoom start, kdy se u novych znacek s kartou musi na zacatku zoomu karta skryt
            */
            setOwner(): void;

            /**
            * Jedná se o vizuální reprezentaci detailu?
            */
            isDetail(): boolean;

            $destructor(): void;

            /**
            * Vrátí souřadnice značky
            */
            getCoords(): SMap.Coords;

            /**
            * Vrátí kontejner značky
            */
            getContainer(): object;

            /**
            * Vrátí ukotvení značky
            */
            getAnchor(): SMap.Pixel;

            /**
            * Vrátí popisek značky
            */
            getTitle(): string;

            /**
            * Vrátí id značky
            */
            getId(): void;

            /**
            * Vrátí rozměr značky, je-li znám
            */
            getSize(): void;

            /**
            * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
            Není proveden žádný přepočet pozice.
            */
            setURL(url: string): void;

            /**
            * Změní značce umístění
            */
            setCoords(coords: SMap.Coords): void;

            /**
            * Je tento prvek součásní klikatelné části značky?
            */
            getActive(): void;

            /**
            * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
            */
            click(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;
        }

        namespace Feature {
            class Card extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes marker.decorate()
                */
                decorate(marker: SMap.Marker, card: SMap.Card): void;

                click(): void;

                /**
                * Získání odkazu na instanci vizitky.
                */
                getCard(): SMap.Card;
            }

            class Draggable extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes marker.decorate()
                */
                decorate(marker: SMap.Marker): void;

                /**
                * Změna stavu tahatelnosti
                */
                setDrag(state: boolean): void;
            }

            class ImageMap extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes marker.decorate()
                */
                decorate(marker: SMap.Marker, options: object): void;
            }

            class RelativeAnchor extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes marker.decorate()
                */
                decorate(marker: SMap.Marker, options: object): void;
            }

            class Shadow extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes marker.decorate()
                */
                decorate(marker: SMap.Marker, url: string): void;
            }
        }
    }

    namespace Geometry {
        class Feature {
        }

        namespace Feature {
            class Card extends JAK.AbstractDecorator {
                /**
                * Dekorační metoda - nevolat přímo, ale přes geometry.decorate()
                */
                decorate(geometry: SMap.Geometry, card: SMap.Card): void;

                click(): void;

                draw(): void;
            }
        }
    }

    namespace Pano {
        class Clickmask {
            constructor();

            /**
            * Vrati soupis palety, tj. potencialne blizkych panoramat
            */
            getPalette(): void;

            /**
            * Vrati ID panoramatu na zadanych metrovych souradnicich
            */
            getIndex(dx: number, dy: number): null | number;
        }

        class Layer {
            constructor();

            enable(): void;

            disable(): void;

            getAvail(): void;

            redraw(): void;
        }

        class Marker extends SMap.Marker {
            constructor(coords: SMap.Coords, id: string | false, options: object);

            setAngle(): void;

            setCoords(): void;

            $destructor(): void;

            /**
            * Vrátí souřadnice značky
            */
            getCoords(): SMap.Coords;

            /**
            * Vrátí kontejner značky
            */
            getContainer(): object;

            /**
            * Vrátí ukotvení značky
            */
            getAnchor(): SMap.Pixel;

            /**
            * Vrátí popisek značky
            */
            getTitle(): string;

            /**
            * Vrátí id značky
            */
            getId(): void;

            /**
            * Vrátí rozměr značky, je-li znám
            */
            getSize(): void;

            /**
            * Změní značce URL. Má smysl jen u těch značek, které jsou tvořeny obrázkem.
            Není proveden žádný přepočet pozice.
            */
            setURL(url: string): void;

            /**
            * Změní značce umístění
            */
            setCoords(coords: SMap.Coords): void;

            /**
            * Je tento prvek součásní klikatelné části značky?
            */
            getActive(): void;

            /**
            * Došlo ke kliknutí na značku. Tuto metodu volá vrstva, aby značce řekla, že se tak stalo.
            */
            click(): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Nav {
            constructor();

            $destructor(): void;

            /**
            * Zneaktivnit, ale neschovavat - cekame na dalsi
            */
            invalidate(): void;

            /**
            * Nastala zmena mista, je nutne aktualizovat tlacitka
            */
            update(): void;

            updateCamera(): void;

            handleEvent(): void;
        }

        class Place {
            constructor();

            setTileImages(): void;

            build(gl: WebGL): void;

            /**
            * Zrusit geometrii a dalsi webgl data. NENI destruktor!
            */
            destroy(): void;

            isDirty(): void;

            draw(gl: WebGL, program: WebGLProgram, scene: SMap.Pano.Scene): void;

            drawDebug(): void;

            setOpacity(): void;

            getId(): void;

            getProvider(): void;

            getDate(): void;

            getKappa(): void;

            setLookDir(): void;

            getLookDir(): void;

            getData(): void;

            getCoords(): void;

            getUrlTemplate(): void;

            getBackgroundUrl(): void;

            setPitchLimit(): void;

            getPitchLimit(): void;

            getDefaultView(): void;

            static fromImage(): void;
        }

        class Renderer {
            constructor();

            static get(): void;

            $destructor(): void;

            setPlace(): void;

            setRotation(): void;

            setFOV(): void;

            setNeighbors(): void;

            highlightNeighbor(): void;

            syncPort(): void;
        }

        class Scene {
            constructor(parent: Node, options: object);

            $destructor(): void;

            /**
            * Vrací instanci objektu JAK.Signals, kterou lze použít pro poslouchání na události scény
            */
            getSignals(): JAK.Signals;

            /**
            * Zobrazit konkrétní místo
            */
            show(place: SMap.Pano.Place, options: object): void;

            getContainer(): void;

            getOptions(): void;

            getPlace(): void;

            getMarker(): void;

            getCamera(): void;

            setCamera(): void;

            getRenderer(): void;

            /**
            * Synchronizovat scénu s rozměry HTML prvku průhledu
            */
            syncPort(): void;

            getPixelAngle(): void;

            handleEvent(): void;
        }

        class Sphere {
            constructor();

            $destructor(): void;

            isDirty(): void;

            isBuilt(): void;

            build(): void;

            setImage(): void;

            /**
            * Vykreslit jednotlive dlazdice.
            */
            draw(): void;

            /**
            * Vykreslit jednotlive dlazdice v debug rezimu
            */
            drawDebug(): void;
        }

        class Tile {
            constructor(gl: WebGL, position: Array<number>, data: object);

            $destructor(): void;

            setBackgroundTexture(): void;

            getPosition(): void;

            setImage(): void;

            draw(): void;

            drawDebug(): void;
        }

        class WebGL extends SMap.Pano.Renderer {
            constructor();

            static isSupported(): void;

            $destructor(): void;

            setPlace(): void;

            setRotation(): void;

            setFOV(): void;

            setNeighbors(): void;

            highlightNeighbor(): void;

            syncPort(): void;
        }
    }

    namespace Geocoder {
        class Reverse extends SMap.Geocoder {
            static METHOD;

            /**
            * Provede zpětné geokódování
            */
            constructor(coords: SMap.Coords, callback: Function, options: Object);

            /**
            * Přeruší probíhající požadavek
            */
            abort(): void;
        }
    }

    namespace URL {
        class Route {
            /**
            * Konstruktor
            */
            constructor();

            $destructor(): void;

            /**
            * Přidání startu. Pokud již nějaký start existuje, smaže se a místo něj se přidá nový. Parametry určují, jak se bude plánovat z tohoto bodu k dalšímu.
            */
            addStart(coords: object, options: object): object;

            /**
            * Přidání cíle. Pokud již nějaký cíl existuje, smaže se a místo něj se přidá nový.
            */
            addDestination(coords: object, options: object): object;

            /**
            * Přidání průjezdního bodu. Přidává se vždy před cílový bod. Parametry určují, jak se bude plánovat z tohoto bodu k dalšímu.
            */
            addWaypoint(coords: object, options: object): object;

            /**
            * Získání url do plánovače na mapy.cz
            */
            toString(): string;
        }
    }

    namespace Projection {
        class Krovak {
            constructor();

            project(): void;

            unproject(): void;
        }

        class Mercator {
            constructor();

            project(): void;

            unproject(): void;
        }

        class Oblique extends SMap.Projection {
            static CORS;

            constructor(id: string, config: object, orientation: number, coord: SMap.Coords);

            /**
            * Statická tovární metoda: asynchronně začne vytvářet projekci; až je vyrobena, zavolá callback.
            */
            static create(center: SMap.Coords, orientation: number, callback: Function, errorCallback: Function): void;

            static fromXML(): void;

            setOwner(): void;

            getId(): void;

            /**
            * Je tato projekce pro danou konfiguraci stale platna?
            */
            isValid(): void;

            unproject(): void;

            project(): void;

            pixelToTile(): void;

            tileToPixel(): void;

            pixelToCoords(): void;

            coordsToPixel(): void;

            /**
            * Vrací provider dané projekce.
            */
            getProvider(): string;

            /**
            * Převede souřadnice na absolutní pixelovou hodnotu
            */
            project(coords: SMap.Coords, zoom: number): SMap.Pixel;

            /**
            * Převede absolutní pixelovou hodnotu na souřadnice
            */
            unproject(absPixel: SMap.Pixel, zoom: number): SMap.Coords;

            /**
            * Převede relativní pixelovou hodnotu na zeměpisnou souřadnici
            */
            pixelToCoords(pixel: SMap.Pixel, center: SMap.Coords, zoom: number, orientation: number): void;

            /**
            * Převede zeměpisnou souřadnici na relativní pixelovou hodnotu
            */
            coordsToPixel(coords: SMap.Coords, center: SMap.Coords, zoom: number, orientation: number): void;

            /**
            * Zjistí (směrem nahoru) mapu
            */
            getMap(): SMap;

            /**
            * Nastavení nadřízeného
            */
            setOwner(owner: SMap.IOwned): void;
        }

        class Robinson {
            static K;

            constructor();

            getWorldSize(): void;

            project(): void;

            unproject(): void;
        }

        class UTM33 {
            constructor();

            project(): void;

            unproject(): void;
        }

        namespace Oblique {
            class Matrix {
                constructor();

                mulByVector(): void;

                transpose(): void;
            }

            class Triangle {
                constructor();

                containsPoint(): void;

                rayIntersection(): void;

                interpolatePoint(): void;
            }

            class Vector {
                constructor();

                getPoint(): void;

                norm(): void;

                normalize(): void;

                dot(): void;

                cross(): void;

                plus(): void;

                mul(): void;

                minus(): void;
            }
        }
    }
}
