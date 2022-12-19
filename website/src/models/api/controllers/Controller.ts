import type { Week } from "../../Week";
import type { Writable } from "svelte/store";

export class Controller {
    _store: Writable<Week[]>;
    _apiUrl: string;
    constructor(store: Writable<Week[]>, apiUrl: string){
        this._store = store;
        this._apiUrl = apiUrl;
    }
}