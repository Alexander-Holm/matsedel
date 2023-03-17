export class Controller {
    _apiUrl: string;
    constructor(apiUrl: string){
        this._apiUrl = apiUrl;
    }
    validateResponse(response: Response){
        if(response.ok === false){
            throw new Error(
                response.statusText,
                { cause: response.status }
            )
        }
    }
}