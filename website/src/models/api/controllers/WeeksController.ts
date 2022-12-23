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
        this._store.set(weeks);
    }
    async add(name: string){
        const method = "POST";
        const url = this._apiUrl + "?name=" + name;
        const res = await fetch(url, {method});
        const data = await res.json() as WeekDto;
        const newWeek = new Week(data);
        // Lägg ny week på första plats i arrayen.
        this._store.update(weeks => weeks = [newWeek, ...weeks]);
    }
    async delete(id: number){
        const method = "DELETE";
        const res = await fetch(this._apiUrl + id, {method});
        this._store.update(weeks => weeks = weeks.filter(w => w.id !== id) );
    }    
    async rename(id: number, newName: string){
        const method = "PUT";
        const payload = { id, name: newName};
        const options = { 
            method, 
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" }
        };
        const res = await fetch(this._apiUrl + id, options);
        this._store.update(weeks => {
            const week = weeks.find(w => w.id == id);
            if(week != null) 
                week.name = newName;
            return weeks;
        })
    }
}