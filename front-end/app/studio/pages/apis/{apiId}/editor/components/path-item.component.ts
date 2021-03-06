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

import {Component, Input, ViewEncapsulation} from "@angular/core";


@Component({
    moduleId: module.id,
    selector: "[path-item]",
    templateUrl: "path-item.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PathItemComponent {

    @Input() path: string;

    public pathSegments(): string[] {
        let rval: string[] = this.path.split("/");
        if (rval[0] === "") {
            rval = rval.splice(1);
        }
        return rval;
    }

}
