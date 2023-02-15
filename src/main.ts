import './style.css';
import { Client as ShapeClient } from './classes/Client';
import { Shape2dFactory } from './classes/Shape2dFactory';
// import { Shape3dFactory } from './classes/Shape3dFactory';

const shape = new ShapeClient(new Shape2dFactory());
const rectangle1 = shape.rectangle(2, 4);
console.log(rectangle1.getArea());
const circle1 = shape.circle(3.5);
console.log(circle1.getArea());

// const app2 = new Client(new Shape3dFactory());
// console.log(app2.rectangle());
