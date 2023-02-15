import { Circle } from '../interfaces/Circle';

export class Circle2d implements Circle {
    constructor(private radius: number) {}
    public getArea(): number {
        return Math.PI * this.radius;
    }
    public getPerimeter(): number {
        return Math.PI * 2 * this.radius;
    }
}
