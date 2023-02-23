import { Painter, PainterType } from './Painter';
import { CanvasSingleton } from './models/CanvasSingleton';
import { ShapeFillFactory } from './models/ConcreteFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from './models/ConcreteFactory/ShapeStrokeFactory';
import { ShapeType } from './models/enums/ShapeType';
import './style.css';

window.addEventListener('load', () => {
    const fillStrokeSwitch = document.querySelector('#fill-stroke-switch') as HTMLInputElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');

    let painter: PainterType;

    // Tell canvas which shape is painting
    const shapeIsPainting = () => {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                painter.stopPaint();
                painter.paint(ShapeType.rectangle);
                CanvasSingleton.getInstance().canvas.style.cursor = 'crosshair';
            }

            if (shapeButton.value === 'circle' && shapeButton.checked) {
                painter.stopPaint();
                painter.paint(ShapeType.circle);
                CanvasSingleton.getInstance().canvas.style.cursor = 'crosshair';
            }
        });
    };

    // default app state when you go to app the first time.
    const defaultState = () => {
        painter = Painter(new ShapeStrokeFactory());
        painter.setScreen(800, 600);
        shapeIsPainting();
        addShapeButtonListEventListener();
    };
    defaultState();

    // add event listener to select shape buttons
    function addShapeButtonListEventListener() {
        shapeButtonList.forEach((shapeButton) => {
            shapeButton.addEventListener('change', shapeIsPainting);
        });
    }

    // Switch to Fill or Stroke shape and choose corresponding Shape Factory
    const handleClickFillStrokeSwitch = () => {
        if (fillStrokeSwitch.checked) {
            painter.stopPaint();
            painter = Painter(new ShapeFillFactory());
        } else {
            painter.stopPaint();
            painter = Painter(new ShapeStrokeFactory());
        }
        shapeIsPainting();
    };

    fillStrokeSwitch?.addEventListener('click', handleClickFillStrokeSwitch);
});

// pseudo client code
// const factory = new ShapeStrokeFactory();
// Painter.paint('rectangle');
// Painter.paint('circle');
// Painter.paint('line');
// pen.color = 'white'
// pen.style = 'dot'
// pen.weight = 20
// pen.shape
// Painter.setPen(pen)
