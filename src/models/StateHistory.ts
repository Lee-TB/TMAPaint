import { Shape } from './AbstractProduct/Shape';

export class StateHistory {
    private static instance: StateHistory;
    private _undoList: Shape[] = [];
    private _redoList: Shape[] = [];

    private constructor() {}

    public static getInstance(): StateHistory {
        if (!StateHistory.instance) {
            StateHistory.instance = new StateHistory();
        }

        return StateHistory.instance;
    }

    public getUndoList(): Shape[] {
        return this._undoList;
    }

    public getRedoList(): Shape[] {
        return this._redoList;
    }

    public pushUndoList(o: Shape): number {
        return this._undoList.push(o);
    }

    public pushRedoList(o: Shape): number {
        return this._redoList.push(o);
    }

    public undo() {
        if (this._undoList.length > 0) {
            this._redoList.push(this._undoList.pop() as Shape);
        }
    }

    public redo() {
        if (this._redoList.length > 0) {
            this._undoList.push(this._redoList.pop() as Shape);
        }
    }

    public clearRedoList() {
        this._redoList.length = 0;
    }
}
