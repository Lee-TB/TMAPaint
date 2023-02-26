import { getRandomNumber } from '../utils/getRandomNumber';
import { Circle } from './AbstractProduct/Circle';
import { Point } from './AbstractProduct/Point';
import { Rectangle } from './AbstractProduct/Rectangle';
import { Shape } from './AbstractProduct/Shape';
import { IShapeFactory } from './AbstractFactory/IShapeFactory';
import { ShapeType } from './enums/ShapeType';

export class Painter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private shapeList: Shape[];
    private currentShape: Shape | null;
    private startPoint: Point | null;
    private isPainting: boolean = false;
    private shapeFactory: IShapeFactory;
    private shapeType: ShapeType | null;
    private undoStack: Shape[][];
    private redoStack: Shape[][];

    /**
     * Xây dựng đối tượng painter
     * @param canvas
     * @param shapeFactory
     */
    constructor(canvas: HTMLCanvasElement, shapeFactory: IShapeFactory) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.shapeList = [];
        this.undoStack = [];
        this.redoStack = [];
        this.shapeFactory = shapeFactory;
        this.shapeType = null;
        this.startPoint = null;
        this.currentShape = null;
    }

    /**
     * Vẽ hình ngẫu nhiên
     */
    public paintRandomShape(): void {
        // Tạo ngẫu nhiên một shape
        const randomShape = getRandomNumber(0, 1);
        let shape: Shape;
        if (randomShape) {
            shape = this.shapeFactory.createShape(ShapeType.rectangle);
        } else {
            shape = this.shapeFactory.createShape(ShapeType.circle);
        }
        this.setShape(shape);

        // Vẽ ngẫu nhiên vị trí và kích thước shape
        if (this.currentShape) {
            const randomX = getRandomNumber(100, this.canvas.width - 100);
            const randomY = getRandomNumber(100, this.canvas.height - 100);
            const randomLocation = new Point(randomX, randomY);
            const randomWidth = getRandomNumber(50, 150);
            const randomHeight = getRandomNumber(50, 150);
            this.currentShape.setLocation(randomLocation);

            if (this.currentShape instanceof Rectangle) {
                this.currentShape.setWidth(randomWidth);
                this.currentShape.setHeight(randomHeight);
            } else if (this.currentShape instanceof Circle) {
                const radius = Math.sqrt(randomWidth ** 2 + randomHeight ** 2) / 2;
                this.currentShape.setRadius(radius);
            }

            this.shapeList.push(<Shape>this.currentShape);
            this.paintShapeList();
            this.undoStack.push(this.shapeList.slice());
            this.redoStack = []; // vẽ thì clear redo stack
            this.currentShape = null; // sau khi vẽ xong thì xóa nó đi
        } else {
            throw new Error('Canvas currentShape is null');
        }
    }

    /**
     * Thiết lập kích thước màn hình
     * @param width
     * @param height
     */
    public setScreen(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Chọn hình sẽ được vẽ, luôn luôn gọi setShape trước khi gọi bất cứ hàm vẽ nào
     * @param shape đối tượng shape
     */
    public setShape(shape: Shape): void {
        this.currentShape = shape;
    }

    /**
     * Đăng ký sự kiện vẽ bằng cách kéo thả chuột
     * @param type loại shape circle | rectangle
     */
    public subscribePaintByMouse(type: ShapeType): void {
        this.shapeType = type;
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    /**
     * Hủy đăng ký sự kiên vẽ bằng chuột
     */
    public unsubscribePaintByMouse(): void {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        if (this.shapeType) {
            // thu hồi vùng nhớ nhớ
            this.shapeType = null;
        }
    }

    /**
     * xử lý sự kiện mousedown
     * @param event
     */
    private handleMouseDown(event: MouseEvent) {
        this.startPoint = new Point(event.offsetX, event.offsetY);
        this.isPainting = true;
        // Tạo shape mỗi lần nhấn chuột
        this.currentShape = this.shapeFactory!.createShape(<ShapeType>this.shapeType);
    }

    /**
     * xử lý sự kiện mousemove
     * @param event
     */
    private handleMouseMove(event: MouseEvent) {
        if (this.currentShape && this.isPainting) {
            const width = event.offsetX - this.startPoint!.getX();
            const height = event.offsetY - this.startPoint!.getY();
            this.currentShape.setLocation(<Point>this.startPoint);

            if (this.currentShape instanceof Rectangle) {
                this.currentShape.setWidth(width);
                this.currentShape.setHeight(height);
            } else if (this.currentShape instanceof Circle) {
                const radius = Math.sqrt(width ** 2 + height ** 2);
                this.currentShape.setRadius(radius);
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentShape.paint(this.context);
        }
    }

    // xử lý sự kiện mouseup
    private handleMouseUp(event: MouseEvent) {
        if (this.isPainting) {
            // lưu hình vào danh sách để vẽ và thu hồi curentShape
            this.shapeList.push(<Shape>this.currentShape);
            this.paintShapeList();
            this.redoStack = []; // vẽ thì clear redo stack
            this.undoStack.push([...this.shapeList]); // đựa vào ngăn xếp để có thể undo
            console.log(this.undoStack);
            this.currentShape = null; // thu hôi vùng nhớ
            this.isPainting = false;
            this.startPoint = null;
        }
    }

    /**
     * Vẽ tất cả các hình đã được lưu lại
     */
    private paintShapeList(): void {
        if (this.shapeList) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.shapeList.forEach((shape) => shape.paint(this.context));
        }
    }

    /**
     * clear(): làm sạch tất cả
     */
    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapeList = [];
        this.undoStack = [];
        this.redoStack = [];
    }

    /**
     * undo(): trở về trạng thái trước đó
     */
    public undo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.undoStack.pop()!);
            this.shapeList = this.undoStack[this.undoStack.length - 1]?.slice();
            if (!this.shapeList) {
                this.shapeList = [];
            }
            this.paintShapeList();
        }
    }

    public redo() {
        if (this.redoStack.length > 0) {
            this.shapeList = this.redoStack.pop()!;
            this.undoStack.push(this.shapeList.slice());
            this.paintShapeList();
        }
    }
}
