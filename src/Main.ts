/* -----------------------------------------------
/* Author : Matteo Bruni - https://www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://particles.matteobruni.it/
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.12.0
/* ----------------------------------------------- */
import type { Container } from "./Classes/Container";
import { Loader } from "./Classes/Loader";
import type { IOptions } from "./Interfaces/Options/IOptions";
import type { RecursivePartial } from "./Types/RecursivePartial";
import { ShapeUtils } from "./Classes/Utils/ShapeUtils";
import { ShapeType } from "./Enums/ShapeType";
import { LineDrawer } from "./Classes/ShapeDrawers/LineDrawer";
import { CircleDrawer } from "./Classes/ShapeDrawers/CircleDrawer";
import { SquareDrawer } from "./Classes/ShapeDrawers/SquareDrawer";
import { TriangleDrawer } from "./Classes/ShapeDrawers/TriangleDrawer";
import { StartDrawer } from "./Classes/ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "./Classes/ShapeDrawers/PolygonDrawer";
import { HeartDrawer } from "./Classes/ShapeDrawers/HeartDrawer";
import { TextDrawer } from "./Classes/ShapeDrawers/TextDrawer";
import { ImageDrawer } from "./Classes/ShapeDrawers/ImageDrawer";
import { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import { Presets } from "./Classes/Utils/Presets";
import { PresetType } from "./Enums/PresetType";
import { ShapeDrawerFunction } from "./Types/ShapeDrawerFunction";

declare global {
    interface Window {
        particlesJS: any;
        tsParticles: Main;
        pJSDom: () => Container[];
    }
}

/* ---------- global functions - vendors ------------ */

window.customRequestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
})();

window.customCancelRequestAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

/* ---------- tsParticles functions - start ------------ */

/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */
class Main {
    constructor() {
        const squareDrawer = new SquareDrawer();
        const textDrawer = new TextDrawer();

        ShapeUtils.addShapeDrawer(ShapeType.line, new LineDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.circle, new CircleDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.edge, squareDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.square, squareDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.triangle, new TriangleDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.star, new StartDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.polygon, new PolygonDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.heart, new HeartDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.char, textDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.character, textDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.image, new ImageDrawer());

        Presets.addPreset(PresetType.basic, Presets.basic);
        Presets.addPreset(PresetType.backgroundMask, Presets.backgroundMask);
        Presets.addPreset(PresetType.fontAwesome, Presets.fontAwesome);
        Presets.addPreset(PresetType.snow, Presets.snow);
        Presets.addPreset(PresetType.bouncing, Presets.bouncing);
        Presets.addPreset(PresetType.stars, Presets.stars);
        Presets.addPreset(PresetType._60fps, Presets._60fps);
    }
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param params The options array to get the item from
     * @param index If provided gets the corresponding item from the array
     * @returns A Promise with the [[Container]] object created
     */
    public async loadFromArray(tagId: string,
        params: RecursivePartial<IOptions>[],
        index?: number): Promise<Container | undefined> {
        return Loader.loadFromArray(tagId, params, index);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param params The options object to initialize the [[Container]]
     * @returns A Promise with the [[Container]] object created
     */
    public async load(tagId: string, params: RecursivePartial<IOptions>): Promise<Container | undefined> {
        return Loader.load(tagId, params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     * @returns A Promise with the [[Container]] object created
     */
    public loadJSON(tagId: string, pathConfigJson: string): Promise<Container | undefined> {
        return Loader.loadJSON(tagId, pathConfigJson);
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    public setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
        Loader.setOnClickHandler(callback);
    }

    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    public dom(): Container[] {
        return Loader.dom();
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    public domItem(index: number): Container | undefined {
        return Loader.domItem(index);
    }

    /**
     * addCustomShape
     * @param type
     * @param drawer
     */
    public addCustomShape(type: string, drawer: IShapeDrawer | ShapeDrawerFunction): void {
        let customDrawer: IShapeDrawer;

        if (typeof drawer === "function") {
            customDrawer = {
                draw: drawer,
            };
        } else {
            customDrawer = drawer;
        }

        ShapeUtils.addShapeDrawer(type, customDrawer);
    }

    /**
     * addCustomPreset
     * @param preset
     * @param options
     */
    public addCustomPreset(preset: string, options: RecursivePartial<IOptions>): void {
        Presets.addPreset(preset, options);
    }
}

const tsParticles = new Main();

Object.freeze(tsParticles);

export { tsParticles };

/**
 * The new singleton, replacing the old particlesJS
 */
window.tsParticles = tsParticles;

Object.freeze(window.tsParticles);

/* particles.js compatibility */

/**
 * Loads the provided options to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.load
 * @param tagId the particles container element id
 * @param params the options object to initialize the [[Container]]
 */
window.particlesJS = (tagId: string, params: RecursivePartial<IOptions>) => {
    tsParticles.load(tagId, params);
};

/**
 * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
 * @param tagId the particles container element id
 * @param pathConfigJson the json path to use in the GET request
 * @param callback the function called after the [[Container]] object is loaded that will be passed as a parameter
 */
window.particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container: Container) => void) => {
    tsParticles.loadJSON(tagId, pathConfigJson).then((container) => {
        if (container) {
            callback(container);
        }
    });
};

/**
 * Adds an additional click handler to all the loaded [[Container]] objects.
 * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
 * @param callback the function called after the click event is fired
 */
window.particlesJS.setOnClickHandler = (callback: EventListenerOrEventListenerObject) => {
    tsParticles.setOnClickHandler(callback);
};

/**
 * All the [[Container]] objects loaded
 * @deprecated this method is obsolete, please use the new tsParticles.dom
 */
window.pJSDom = () => {
    return window.tsParticles.dom();
};
