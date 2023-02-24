import './style.css';
import { Painter, PainterType } from './Painter';
import { ShapeFillFactory } from './models/ConcreteFactory/ShapeFillFactory';
import { ShapeStrokeFactory } from './models/ConcreteFactory/ShapeStrokeFactory';
import { ShapeType } from './models/enums/ShapeType';
import { Canvas } from './models/Canvas';
import { CanvasRenderer } from './models/CanvasRenderer';
import { StateHistory } from './models/StateHistory';

const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 900;

window.addEventListener('load', () => {
    // Query DOM
    const fillStrokeSwitch = document.querySelector('#fill-stroke-switch') as HTMLInputElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');
    const undoButton = document.querySelector('#undo-button') as HTMLButtonElement;
    const redoButton = document.querySelector('#redo-button') as HTMLButtonElement;

    // Initialize painter
    let painter: PainterType;
    painter = Painter(new ShapeStrokeFactory());
    painter.setScreen((SCREEN_WIDTH * 2) / 3, (SCREEN_HEIGHT * 2) / 3);
    shapeIsPainting();
    addShapeButtonListEventListener();

    // Tell canvas which shape is painting
    function shapeIsPainting() {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                painter.stopPaintingAll();
                painter.startPainting(ShapeType.rectangle);
                Canvas.getInstance().canvasElement.style.cursor = 'crosshair';
            }

            if (shapeButton.value === 'circle' && shapeButton.checked) {
                painter.stopPaintingAll();
                painter.startPainting(ShapeType.circle);
                Canvas.getInstance().canvasElement.style.cursor = 'crosshair';
            }
        });
    }

    // Switch to Fill or Stroke shape and choose corresponding Shape Factory
    function handleClickFillStrokeSwitch() {
        painter.stopPaintingAll();
        if (fillStrokeSwitch.checked) {
            painter = Painter(new ShapeFillFactory());
        } else {
            painter = Painter(new ShapeStrokeFactory());
        }
        shapeIsPainting();
    }

    // handle Undo
    function handleUndo() {
        StateHistory.getInstance().undo();
        CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
        console.log(StateHistory.getInstance().getUndoList());
    }

    // handle Redo
    function handleRedo() {
        StateHistory.getInstance().redo();
        CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
        console.log(StateHistory.getInstance().getUndoList());
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
