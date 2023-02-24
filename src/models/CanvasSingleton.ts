import { Shape } from './AbstractProduct/Shape';
import { UndoRedo } from './UndoRedo';

export class CanvasSingleton {
    private static instance: CanvasSingleton;
    public isPainting: boolean = false;
    public readonly canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    public readonly context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    public undoList: Shape[] = [];
    public redoList: Shape[] = [];
    public undoRedo = new UndoRedo();

    private constructor() {}

    public static getInstance(): CanvasSingleton {
        if (!CanvasSingleton.instance) {
            CanvasSingleton.instance = new CanvasSingleton();
        }

        return CanvasSingleton.instance;
    }
}
