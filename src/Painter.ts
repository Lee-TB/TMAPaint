import { IShapeFactory } from './models/IShapeFactory';
import { IRectangle } from './models/IRectangle';
import { ICircle } from './models/ICircle';
import { CanvasSingleton } from './models/CanvasSingleton';
import { IShape } from './models/IShape';

export class Painter {
    private _canvas: HTMLCanvasElement = CanvasSingleton.getInstance().canvas;

    constructor(private _shapeFactory: IShapeFactory) {}

    public paint(shapeType: string) {
        const rectangle: IRectangle = this._shapeFactory.createRectangle();
        const circle: ICircle = this._shapeFactory.createCircle();
        if (shapeType === 'rectangle') {
            rectangle.paint();
            this.stopPaint(circle);
            return;
        }

        if (shapeType === 'circle') {
            circle.paint();
            this.stopPaint(rectangle);
            return;
        }
        throw new Error('shapeType is not available!');
    }

    public stopPaint(shape: IShape): void {
        shape.stopPaint();
    }

    public setScreen(width: number, height: number): void {
        this._canvas.width = width;
        this._canvas.height = height;
    }
}
