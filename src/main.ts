import { Painter } from './Painter';
import { IShapeFactory } from './models/IShapeFactory';
import { Point } from './models/Point';
import { ShapeFillFactory } from './models/ShapeFillFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from './models/ShapeStrokeFactory/ShapeStrokeFactory';
import './style.css';

// window.addEventListener('load', () => {
//     const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
//     const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//     canvas.width = 800;
//     canvas.height = 600;

//     let painting = false;
//     const startPoint = new Point(0, 0);
//     const maxPoint = new Point(canvas.width / 2, canvas.height / 2);
//     const minPoint = new Point(canvas.width / 2, canvas.height / 2);

//     function startPosition(e: MouseEvent) {
//         startPoint.setX(e.offsetX);
//         startPoint.setY(e.offsetY);
//         painting = true;
//         ctx.beginPath();
//     }

//     function endPosition(e: MouseEvent) {
//         // ctx.fillRect(
//         //     startPoint.getX(),
//         //     startPoint.getY(),
//         //     e.offsetX - startPoint.getX(),
//         //     e.offsetY - startPoint.getY()
//         // );
//         // ctx.strokeStyle = 'white';

//         // ctx.strokeRect(
//         //     startPoint.getX(),
//         //     startPoint.getY(),
//         //     e.offsetX - startPoint.getX(),
//         //     e.offsetY - startPoint.getY()
//         // );

//         ctx.arc(
//             startPoint.getX(),
//             startPoint.getY(),
//             Math.max(
//                 e.offsetX - startPoint.getX(),
//                 e.offsetY - startPoint.getY()
//             ),
//             0,
//             2 * Math.PI
//         );
//         ctx.stroke();
//         painting = false;
//     }

//     function draw(e: MouseEvent) {
//         if (painting) {
//             // maxPoint.setX(Math.max(maxPoint.getX(), e.offsetX));
//             // maxPoint.setY(Math.max(maxPoint.getY(), e.offsetY));
//             // minPoint.setX(Math.min(minPoint.getX(), e.offsetX));
//             // minPoint.setY(Math.min(minPoint.getY(), e.offsetY));
//             // console.log(minPoint, maxPoint);
//         }
//     }

//     canvas.addEventListener('mousedown', startPosition);
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mouseup', endPosition);
// });

window.addEventListener('load', () => {
    const rectangleButton = document.querySelector('#rectangle-button');
    const circleButton = document.querySelector('#circle-button');
    const fillButton = document.querySelector('#fill-button');
    const strokeButton = document.querySelector('#stroke-button');

    let painter = new Painter(new ShapeStrokeFactory());
    painter.setScreen(800, 600);

    fillButton?.addEventListener('click', () => {
        painter = new Painter(new ShapeFillFactory());
    });

    strokeButton?.addEventListener('click', () => {
        painter = new Painter(new ShapeStrokeFactory());
    });

    rectangleButton?.addEventListener('click', () => {
        painter.paint('rectangle');
    });
    circleButton?.addEventListener('click', () => {
        painter.paint('circle');
    });
    // const factory = new ShapeStrokeFactory();
    // Painter.paint('rectangle');
    // Painter.paint('circle');
    // Painter.paint('line');
    // pen.color = 'white'
    // pen.style = 'dot'
    // pen.weight = 20
    // Painter.setPen(pen)
});
