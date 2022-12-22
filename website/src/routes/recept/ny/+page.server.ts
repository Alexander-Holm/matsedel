import { fail } from '@sveltejs/kit';
import { Api } from 'src/models/api/Api';
import type { RecipeDto } from 'src/models/Recipe';
import type { Days } from 'src/models/Week';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ( { request } ) => {
        const data = await request.formData();
        const url = data.get("url") as string;
        const notes = data.get("notes") as string | undefined;
        const day = data.get("day");
        const weekId = data.get("week");
        const recipe = {
            url,
            notes,
            day: Number(day),
            weekId: Number(weekId)
        } as RecipeDto;
        if(!url || !day || !weekId) 
            return fail(400)
        await Api.recipes.add(recipe);
    }
};