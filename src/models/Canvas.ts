import { getRandomNumber } from '../utils/getRandomNumber';
import { Circle } from './AbstractProduct/Circle';
import { Point } from './AbstractProduct/Point';
import { Rectangle } from './AbstractProduct/Rectangle';
import { Shape } from './AbstractProduct/Shape';

export class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private shapeList: Shape[];
    private currentShape: Shape | null;
    private startPoint: Point | null;
    private isPainting: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.shapeList = [];
        this.startPoint = null;
        this.currentShape = null;
    }

    // Vẽ hình ngẫu nhiên
    public paintRandomShape(): void {
        if (this.currentShape) {
            const randomX = getRandomNumber(100, this.canvas.width - 100);
            const randomY = getRandomNumber(100, this.canvas.height - 100);
            const randomLocation = new Point(randomX, randomY);
            const randomWidth = getRandomNumber(50, this.canvas.width / 3);
            const randomHeight = getRandomNumber(50, this.canvas.height / 3);
            this.currentShape.setLocation(randomLocation);
            if (this.currentShape instanceof Rectangle) {
                this.currentShape.setWidth(randomWidth);
                this.currentShape.setHeight(randomHeight);
            } else if (this.currentShape instanceof Circle) {
                const radius = Math.sqrt(randomWidth ** 2 + randomHeight ** 2) / 2;
                this.currentShape.setRadius(radius);
            }
            this.currentShape.paint(this.context);
            this.currentShape = null; // sau khi vẽ xong thì xóa nó đi
        } else {
            throw new Error('Canvas currentShape is null');
        }
    }

    // Thiết lập kích thước màn hình
    public setScreen(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    // Always call setShape first
    // Chọn hình sẽ được vẽ, luôn luôn gọi setShape trước khi gọi bất cứ hàm vẽ nào
    public setShape(shape: Shape): void {
        this.currentShape = shape;
    }

    // Vẽ nhiều hình
    private paintShapeList(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapeList.forEach((shape) => shape.paint(this.context));
        if (this.currentShape) {
            this.currentShape.paint(this.context);
        }
    }

    // Đăng ký sự kiện vẽ bằng cách kéo thả chuột
    public subscribePaintByMouse(): void {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    // Hủy đăng ký sự kiên vẽ bằng chuột
    public unsubscribePaintByMouse(): void {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        if (this.currentShape) {
            this.currentShape = null; // thu hồi bộ nhớ
        }
    }

    // xử lý sự kiện mousedown
    private handleMouseDown(event: MouseEvent) {
        this.startPoint = new Point(event.offsetX, event.offsetY);
        this.isPainting = true;
    }

    // xử lý sự kiện mousemove
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
            this.shapeList.push(<Shape>this.currentShape);
        }
    }

    // xử lý sự kiện mouseup
    private handleMouseUp(event: MouseEvent) {
        if (this.isPainting) {
            this.paintShapeList();
            // clone lại shape để không tham chiếu đếu shape cũ nữa
            this.currentShape = this.currentShape!.clone(); // `!` khẳng định rằng currentShape đã được tạo.
            this.isPainting = false;
            this.startPoint = null;
        }
    }
}
