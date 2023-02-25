import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { Shape2DFactory } from '../ConcreteFactory/Shape2DFactory';
import { Shape3DFactory } from '../ConcreteFactory/Shape3DFactory';
import { ShapeFactoryType } from '../enums/ShapeFactoryType';

export class FactoryMaker {
    private static instance: FactoryMaker;
    private constructor() {}
    public static getInstance(): FactoryMaker {
        if (!FactoryMaker.instance) {
            FactoryMaker.instance = new FactoryMaker();
        }
        return FactoryMaker.instance;
    }

    createFactory(shapeVariant: ShapeFactoryType): IShapeFactory {
        switch (shapeVariant) {
            case ShapeFactoryType.Shape2D:
                return new Shape2DFactory();
            case ShapeFactoryType.shape3D:
                return new Shape3DFactory();
        }
    }
}
