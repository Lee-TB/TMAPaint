import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { IRectangle } from './models/AbstractProduct/IRectangle';
import { ICircle } from './models/AbstractProduct/ICircle';
import { CanvasSingleton } from './models/CanvasSingleton';

export class Painter {
    private _rectangle?: IRectangle;
    private _circle?: ICircle;

    constructor(private _shapeFactory: IShapeFactory) {}

    // paint specific shape
    public paint(shapeType: string) {
        this._rectangle = this._shapeFactory.createRectangle();
        this._circle = this._shapeFactory.createCircle();

        this.stopPaint();
        if (shapeType === 'rectangle') {
            this._rectangle.paint();
            return;
        }

        if (shapeType === 'circle') {
            this._circle.paint();
            return;
        }

        throw new Error('shapeType is not available!');
    }

    // stop any painting
    public stopPaint(): void {
        this._circle?.stopPaint();
        this._rectangle?.stopPaint();
    }

    // set canvas screen
    public setScreen(width: number, height: number): void {
        CanvasSingleton.getInstance().canvas.width = width;
        CanvasSingleton.getInstance().canvas.height = height;
    }
}
