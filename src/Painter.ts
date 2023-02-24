import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { Rectangle } from './models/AbstractProduct/Rectangle';
import { Circle } from './models/AbstractProduct/Circle';
import { ShapeType } from './models/enums/ShapeType';
import { Canvas } from './models/Canvas';

export interface PainterType {
    startPainting: Function;
    stopPaintingAll: Function;
    setScreen: Function;
}

export function Painter(shapeFactory: IShapeFactory): PainterType {
    const rectangle: Rectangle = <Rectangle>shapeFactory.createShape(ShapeType.rectangle);
    const circle: Circle = <Circle>shapeFactory.createShape(ShapeType.circle);

    // Add a canvas event listener
    function startPainting(shapeType: ShapeType) {
        switch (shapeType) {
            case ShapeType.rectangle:
                rectangle.paintByMouse();
                break;
            case ShapeType.circle:
                circle.paintByMouse();
                break;
        }
    }

    // Remove all current canvas event listeners
    function stopPaintingAll() {
        rectangle.stopPaintByMouse();
        circle.stopPaintByMouse();
    }

    // Resize sreen
    function setScreen(width: number, height: number): void {
        Canvas.getInstance().canvasElement.width = width;
        Canvas.getInstance().canvasElement.height = height;
    }

    return { startPainting, stopPaintingAll, setScreen };
}
