import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { ShapeFillFactory } from '../ConcreteFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from '../ConcreteFactory/ShapeStrokeFactory';
import { ShapeVariant } from '../enums/ShapeVariant';

export class FactoryMaker {
    private static instance: FactoryMaker;
    private constructor() {}
    public static getInstance(): FactoryMaker {
        if (!FactoryMaker.instance) {
            FactoryMaker.instance = new FactoryMaker();
        }
        return FactoryMaker.instance;
    }

    createFactory(shapeVariant: ShapeVariant): IShapeFactory {
        switch (shapeVariant) {
            case ShapeVariant.stroke:
                return new ShapeStrokeFactory();
            case ShapeVariant.fill:
                return new ShapeFillFactory();
        }
    }
}
