<script lang="ts">
    import { Days, type Week } from "../models/Week";
    import * as Fakedata from "../fakedata"
    import RecipePreview from "../components/RecipePreview.svelte";
    import { onMount } from "svelte";
    import { Api } from "../models/api/Api";
    import DayHeading from "src/components/DayHeader.svelte";
    import WeekHeader from "src/components/WeekHeader.svelte";

    let isLoading = true;
    let weeks: Week[];    

    onMount(async () => {
        // weeks uppdateras varje gång store från Api ändras
        const unsubscribe = Api.subscribe(store => weeks = store);       
        if(weeks == null) await Api.weeks.getAll();
        isLoading = false;
        await loadPreviews();
        return unsubscribe;
    })

    // Hämtar linkPreviews för recepten en vecka i taget
    async function loadPreviews(i = 0){
        const week = weeks[i];
        if(week == null) return;

        // Hämtar endast preview om receptet inte redan har någon
        const recipesWithoutPreview: Promise<void>[] = [];
        week.days.forEach(day => day.recipes.forEach(recipe => {
            if(recipe.linkPreview == null){
                const promise = Api.linkPreview.get(recipe);
                recipesWithoutPreview.push(promise);
            }
        }));
        await Promise.all(recipesWithoutPreview);    

        const nextWeek = weeks[i + 1]
        if(nextWeek != null)
            loadPreviews(i + 1);
    }

    async function addWeek(){
        const weekName = prompt("Namn på vecka");
        if(weekName !== null)
            await Api.weeks.add(weekName);
    }    
</script>

<main>
    <h1>Matsedel</h1>
    {#if isLoading}
        <p>Laddar</p>
    {:else}

    <button on:click={addWeek} >+ Vecka</button>    
    {#each weeks as week}
    <div class="week">
        <WeekHeader week={week} />
        <div class="week-content">
            {#each week.days.sort((a, b) => a.key - b.key) as day}
                <div class="day">
                    <DayHeading title={Days[day.key]} />
                    <div class="day-recipes">
                        {#each day.recipes as recipe}
                            <RecipePreview recipe={recipe} />                        
                        {/each}
                    </div>                       
                </div>
            {/each}
            <a href={`recept/ny?vecka=${week.id}`}>+ Recept</a>
        </div>
    </div>
    {/each}

    {/if}
</main>

<style>
    .week-content{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
    }
    .day{
        display: contents;
    }
    .day-recipes{
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
    }
</style>