import './style.css';
import { Client } from './classes/Client';
import { Shape2dFactory } from './classes/Shape2dFactory';
import { Shape3dFactory } from './classes/Shape3dFactory';

const app = new Client(new Shape2dFactory());
const rectangle1 = app.rectangle(2, 4);
console.log(rectangle1.getArea());
// const app2 = new Client(new Shape3dFactory());
// console.log(app2.rectangle());
