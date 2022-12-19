import type { Week } from "../Week";
import { writable } from "svelte/store";
import { WeeksController } from "./controllers/WeeksController";
import { LinkPreviewController } from "./controllers/LinkPreviewController";


function createStore(){
    const store = writable<Week[]>();
    const apiUrl = "https://matsedel-api.onrender.com/api/";

    return {
        subscribe: store.subscribe,
        weeks: new WeeksController(store, (apiUrl + "weeks/")),
        linkPreview: new LinkPreviewController(store, (apiUrl + "linkpreview/")),
    }
}

export const Api = createStore();