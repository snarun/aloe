import { OnInit, Type, Injector } from "@angular/core";
import { DialogService } from "./app.dialog.service";
export declare class DialogPlaceholderComponent implements OnInit {
    private dialogService;
    private injector;
    context: Type<{}>;
    viewContainerRef: any;
    private id;
    constructor(dialogService: DialogService, injector: Injector);
    ngOnInit(): void;
}
export declare class ModalContainer {
    destroy: Function;
    componentIndex: number;
    closeModal(): void;
}
export declare function Modal(): (target: any) => void;
