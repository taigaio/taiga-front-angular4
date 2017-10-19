import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {Observable, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable"

@Component({
    template: require("./attributes-status.pug"),
})
export class AdminAttributesStatusPage {
    project: Observable<Immutable.Map<string, any>>;
    editing: Observable<Immutable.Map<string, any>>;
    currentAttribute: Immutable.Map<string, any> = null;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
        this.editing = this.store.select((state) => state.getIn(['admin', 'editing-state']))
    }
}
