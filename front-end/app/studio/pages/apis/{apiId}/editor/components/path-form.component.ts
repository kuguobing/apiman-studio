/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, Input, ViewEncapsulation, Output, EventEmitter} from "@angular/core";
import {Oas20PathItem, Oas20Operation, Oas20PathItems, Oas20Paths} from "oai-ts-core";
import {ICommand} from "../commands.manager";
import {NewOperationCommand} from "../commands/new-operation.command";
import {ChangePropertyCommand} from "../commands/change-property.command";
import {DeleteNodeCommand, DeletePathCommand} from "../commands/delete.command";
import {SourceFormComponent} from "./source-form.base";
import {ReplacePathItemCommand} from "../commands/replace.command";


@Component({
    moduleId: module.id,
    selector: "path-form",
    templateUrl: "path-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PathFormComponent extends SourceFormComponent<Oas20PathItem> {

    protected _path: Oas20PathItem;
    @Input()
    set path(path: Oas20PathItem) {
        this._path = path;
        this.sourceNode = path;
    }
    get path(): Oas20PathItem {
        return this._path;
    }

    @Output() onOperationSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() onDeselect: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected createEmptyNodeForSource(): Oas20PathItem {
        return (<Oas20Paths>this.path.parent()).createPathItem(this.path.path());
    }

    protected createReplaceNodeCommand(node: Oas20PathItem) {
        return new ReplacePathItemCommand(this.path, node);
    }

    public hasGet(): boolean {
        return this.path.get !== undefined && this.path.get !== null;
    }
    public hasPut(): boolean {
        return this.path.put !== undefined && this.path.put !== null;
    }
    public hasPost(): boolean {
        return this.path.post !== undefined && this.path.post !== null;
    }
    public hasDelete(): boolean {
        return this.path.delete !== undefined && this.path.delete !== null;
    }
    public hasOptions(): boolean {
        return this.path.options !== undefined && this.path.options !== null;
    }
    public hasHead(): boolean {
        return this.path.head !== undefined && this.path.head !== null;
    }
    public hasPatch(): boolean {
        return this.path.patch !== undefined && this.path.patch !== null;
    }

    public getSummary(): string {
        return this.summary(this.path.get);
    }

    public putSummary(): string {
        return this.summary(this.path.put);
    }

    public postSummary(): string {
        return this.summary(this.path.post);
    }

    public deleteSummary(): string {
        return this.summary(this.path.delete);
    }

    public optionsSummary(): string {
        return this.summary(this.path.options);
    }

    public patchSummary(): string {
        return this.summary(this.path.patch);
    }

    public headSummary(): string {
        return this.summary(this.path.head);
    }

    private summary(operation: Oas20Operation): string {
        if (operation === null || operation === undefined) {
            return "Not Supported";
        } else {
            if (operation.summary) {
                return operation.summary;
            } else {
                return null;
            }
        }
    }


    public getDescription(): string {
        return this.description(this.path.get);
    }

    public putDescription(): string {
        return this.description(this.path.put);
    }

    public postDescription(): string {
        return this.description(this.path.post);
    }

    public deleteDescription(): string {
        return this.description(this.path.delete);
    }

    public optionsDescription(): string {
        return this.description(this.path.options);
    }

    public patchDescription(): string {
        return this.description(this.path.patch);
    }

    public headDescription(): string {
        return this.description(this.path.head);
    }

    private description(operation: Oas20Operation): string {
        if (operation === null || operation === undefined) {
            return "Not Supported";
        } else {
            if (operation.description) {
                return operation.description;
            } else {
                return null;
            }
        }
    }

    public selectOperation(operation: Oas20Operation): void {
        this.onOperationSelected.emit(operation.method());
    }

    public createOperation(operationType: string): void {
        let command: ICommand = new NewOperationCommand(this.path.path(), operationType);
        this.onCommand.emit(command);
    }

    public changeSummary(newSummary: string, operation: Oas20Operation): void {
        let command: ICommand = new ChangePropertyCommand<string>("summary", newSummary, operation);
        this.onCommand.emit(command);
    }

    public changeDescription(newDescription: string, operation: Oas20Operation): void {
        let command: ICommand = new ChangePropertyCommand<string>("description", newDescription, operation);
        this.onCommand.emit(command);
    }

    public delete(): void {
        let command: ICommand = new DeletePathCommand(this.path.path());
        this.onCommand.emit(command);
        this.onDeselect.emit(true);
    }

    public enableSourceMode(): void {
        this.sourceNode = this.path;
        super.enableSourceMode();
    }

}
