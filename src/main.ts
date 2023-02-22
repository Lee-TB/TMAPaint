import { Painter } from './Painter';
import { CanvasSingleton } from './models/CanvasSingleton';
import { ShapeFillFactory } from './models/ShapeFillFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from './models/ShapeStrokeFactory/ShapeStrokeFactory';
import './style.css';

window.addEventListener('load', () => {
    const fillStrokeSwitch = document.querySelector('#fill-stroke-switch') as HTMLInputElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');

    let painter: Painter;

    // add event listener to select shape buttons
    function addShapeButtonListEventListener() {
        shapeButtonList.forEach((shapeButton) => {
            shapeButton.addEventListener('change', shapeIsPainting);
        });
    }

    // Tell canvas which shape is painting
    const shapeIsPainting = () => {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                painter.paint('rectangle');
                CanvasSingleton.getInstance().canvas.style.cursor = 'crosshair';
            }

            if (shapeButton.value === 'circle' && shapeButton.checked) {
                painter.paint('circle');
                CanvasSingleton.getInstance().canvas.style.cursor = 'crosshair';
            }
        });
    };

    // Switch to Fill or Stroke shape and choose corresponding Shape Factory
    const handleClickFillStrokeSwitch = () => {
        if (fillStrokeSwitch.checked) {
            painter.stopPaint();
            painter = new Painter(new ShapeFillFactory());
        } else {
            painter.stopPaint();
            painter = new Painter(new ShapeStrokeFactory());
        }
        shapeIsPainting();
    };

    fillStrokeSwitch?.addEventListener('click', handleClickFillStrokeSwitch);

    // default app state when you go to app the first time.
    const defaultState = () => {
        painter = new Painter(new ShapeStrokeFactory());
        painter.setScreen(800, 600);
        shapeIsPainting();
        addShapeButtonListEventListener();
    };
    defaultState();
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
