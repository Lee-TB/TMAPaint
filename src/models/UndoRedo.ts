import { Shape } from './AbstractProduct/Shape';

export class UndoRedo {
    public undoList: Shape[] = [];
    public redoList: Shape[] = [];

    public undo() {
        if (this.undoList.length > 0) {
            this.redoList.push(this.undoList.pop() as Shape);
        }
    }

    public redo() {
        if (this.redoList.length > 0) {
            this.undoList.push(this.redoList.pop() as Shape);
        }
    }

    public clearRedoList() {
        this.redoList.length = 0;
    }
}
