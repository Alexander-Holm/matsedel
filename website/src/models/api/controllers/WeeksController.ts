import { type WeekDto, Week } from "../../Week";
import { Controller } from "./Controller";

export class WeeksController extends Controller{
    async getAll(){
        const res = await fetch(this._apiUrl);
        const weeksFromAPi = await res.json() as WeekDto[];
        const weeks: Week[] = [];
        // Konverterar alla Week och Recipe till rätt format
        for (const dto of weeksFromAPi) {
            weeks.push(new Week(dto));
        };
        // Nyast week ska ligga först.
        weeks.reverse();
        return weeks;
    }
    async add(name: string, apiKey: string){
        const method = "POST";
        const url = this._apiUrl;
        const options = { 
            method, 
            body: JSON.stringify(name),
            headers: { 
                "content-type": "application/json",
                "api-key": apiKey
            }
        };
        const resposne = await fetch(url, options);
        this.validateResponse(resposne);
        const data = await resposne.json() as WeekDto;
        const newWeek = new Week(data);
        return newWeek;
    }
    async delete(id: number, apiKey: string){
        const method = "DELETE";
        const options = { 
            method,
            headers: { "api-key": apiKey }
        };
        const response = await fetch(this._apiUrl + id, options);
        this.validateResponse(response);
    }    
    async rename(id: number, newName: string, apiKey: string){
        const method = "PUT";
        const payload = { id, name: newName};
        const options = { 
            method, 
            body: JSON.stringify(payload),
            headers: { 
                "content-type": "application/json",
                "api-key": apiKey
            }
        };
        const response = await fetch(this._apiUrl + id, options);
        this.validateResponse(response);
    }
}