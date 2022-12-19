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
        this._store.set(weeks);
    }
    async add(name: string){
        const url = this._apiUrl + "?name=" + name;
        const res = await fetch(url, {method: "POST"});
        const newWeek = await res.json();
        this._store.update(weeks => weeks = [...weeks, newWeek]);
    }
    async delete(id: number){
        const res = await fetch(this._apiUrl + id, {method:"DELETE"});
        this._store.update(weeks => weeks = weeks.filter(w => w.id !== id) );
    }
    // Konvertera till DTO?
    //async update(id: number, week: Week)
}