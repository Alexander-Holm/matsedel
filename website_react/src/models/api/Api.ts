import { WeeksController } from "./controllers/WeeksController";
import { LinkPreviewController } from "./controllers/LinkPreviewController";
import { RecipesController } from "./controllers/RecipesController";

//const baseUrl = "https://matsedel-api.onrender.com/api/";
const baseUrl = "https://localhost:7227/api/";
const storageVariable = "ApiKey";

export const Api = {
    weeks: new WeeksController(baseUrl + "weeks/"),
    recipes: new RecipesController(baseUrl + "recipes/"),
    linkPreview: new LinkPreviewController(baseUrl + "linkpreview/"),
    key: {
        get: getApiKey,
        set: setApiKey,
        clear: clearApiKey
    },
    handleErrors: handleApiErrors,
}

function getApiKey(){
    let key = sessionStorage.getItem(storageVariable);
    key ??= localStorage.getItem(storageVariable);
    return key; // null om key inte finns
}
// Använder local- och sessionstorage för att det är enklast, men de är inte säkra mot XSS.
// Det är ok eftersom det inte är möjligt att utföra XSS utan ApiKey eftersom 
// den behövs för att lägga till eget innehåll på sidan.
// Byt ut mot JWT och cookie med HttpOnly ifall användare ska ha olika lösenord. 
function setApiKey(key: string, remember: boolean){
    if(remember)
        localStorage.setItem(storageVariable, key);
    else 
        sessionStorage.setItem(storageVariable, key);
}
function clearApiKey(){
    localStorage.removeItem(storageVariable);
    sessionStorage.removeItem(storageVariable);
}

function handleApiErrors(error: unknown, onRetry: () => void){
    if(error instanceof Error){
        // Fel ApiKey
        if(error.cause = 401){
            clearApiKey();
            const retry = window.confirm("Fel lösenord!\nFörsök igen?");
            if(retry) onRetry();
        }
        else{
            const message = `
                Något gick fel...
                HttpStatusCode: ${error.cause}
                httpStatusText: ${error.message}
            `;
            window.alert(message);
        }
    }
    else window.alert("Ett okänt fel har inträffat...");
}