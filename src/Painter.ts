import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { Shape } from './models/AbstractProduct/Shape';
import { CanvasSingleton } from './models/CanvasSingleton';
import { ShapeType } from './models/enums/ShapeType';

export class Painter {
    private _rectangle?: Shape;
    private _circle?: Shape;

    constructor(private _shapeFactory: IShapeFactory) {}

    // paint specific shape
    public paint(shapeType: string) {
        this._rectangle = this._shapeFactory.createShape(ShapeType.rectangle);
        this._circle = this._shapeFactory.createShape(ShapeType.circle);

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
