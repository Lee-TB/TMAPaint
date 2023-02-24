import { Shape } from './AbstractProduct/Shape';

export class Canvas {
    private static instance: Canvas;
    public isPainting: boolean = false;
    public readonly canvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
    public readonly context = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;

    private constructor() {}

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }
}
