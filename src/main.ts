import { Painter, PainterType } from './Painter';
import { CanvasSingleton } from './models/CanvasSingleton';
import { ShapeFillFactory } from './models/ConcreteFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from './models/ConcreteFactory/ShapeStrokeFactory';
import { Rerender } from './models/Rerender';
import { ShapeType } from './models/enums/ShapeType';
import './style.css';

const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 900;

window.addEventListener('load', () => {
    const fillStrokeSwitch = document.querySelector('#fill-stroke-switch') as HTMLInputElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');
    const undoButton = document.querySelector('#undo-button') as HTMLButtonElement;
    const redoButton = document.querySelector('#redo-button') as HTMLButtonElement;

    let painter: PainterType;
    const rerender = new Rerender();

    // Tell canvas which shape is painting
    function shapeIsPainting() {
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
    }

    // default app state when you go to app the first time.
    function defaultState() {
        painter = Painter(new ShapeStrokeFactory());
        painter.setScreen((SCREEN_WIDTH * 2) / 3, (SCREEN_HEIGHT * 2) / 3);
        shapeIsPainting();
        addShapeButtonListEventListener();
    }
    defaultState();

    // Switch to Fill or Stroke shape and choose corresponding Shape Factory
    function handleClickFillStrokeSwitch() {
        if (fillStrokeSwitch.checked) {
            painter.stopPaint();
            painter = Painter(new ShapeFillFactory());
        } else {
            painter.stopPaint();
            painter = Painter(new ShapeStrokeFactory());
        }
        shapeIsPainting();
    }

    // handle Undo
    function handleUndo() {
        CanvasSingleton.getInstance().undoRedo.undo();
        rerender.rerender(CanvasSingleton.getInstance().undoRedo.undoList);
        console.log(CanvasSingleton.getInstance().undoRedo.undoList);
    }

    // handle Redo
    function handleRedo() {
        CanvasSingleton.getInstance().undoRedo.redo();
        rerender.rerender(CanvasSingleton.getInstance().undoRedo.undoList);
        console.log(CanvasSingleton.getInstance().undoRedo.undoList);
    }

    // add event listener to select shape buttons
    function addShapeButtonListEventListener() {
        shapeButtonList.forEach((shapeButton) => {
            shapeButton.addEventListener('change', shapeIsPainting);
        });
    }

    // add event listener to switch stroke or fill
    fillStrokeSwitch?.addEventListener('click', handleClickFillStrokeSwitch);

    // add event listener to undo
    undoButton?.addEventListener('click', handleUndo);
    redoButton?.addEventListener('click', handleRedo);
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
