<script lang="ts">
    import { onMount } from "svelte";

    import { Days, type Week } from "../models/Week";
    import { Api } from "../models/api/Api";

    import Header from "src/components/Header.svelte";
    import LoadingScreen from "src/components/LoadingScreen.svelte";
    import WeekHeader from "src/components/WeekHeader.svelte";
    import DayHeader from "src/components/DayHeader.svelte";
    import RecipePreview from "../components/RecipePreview.svelte";

    import { scale } from "svelte/transition";
    import { flip } from "svelte/animate";

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


{#if isLoading}
<Header />
<LoadingScreen />

{:else}
<Header >
    <button class="add-week button-primary" on:click={addWeek} >Ny vecka</button>
</Header>

<main>
    <!-- (week.id) är key och behövs för att animate:flip ska fungera -->
    {#each weeks as week, index (week.id)}
    <article class="week" 
        in:scale={{delay: index * 200}}
        out:scale
        animate:flip={{duration: 800}} 
    >
        <WeekHeader week={week} />
        <div class="week-content">
            {#each week.days.sort((a, b) => a.key - b.key) as day}
            <div class="day">
                <DayHeader title={Days[day.key]} />
                <div class="day-recipes">
                    {#each day.recipes as recipe}
                        <RecipePreview recipe={recipe} />                        
                    {/each}
                </div>                       
            </div>
            {/each}
            <a class="add-recipe button-primary" href={`recept/ny?vecka=${week.id}`}>Lägg till recept</a>
        </div>
    </article>
    {/each}
</main>
{/if}

<style>
    main{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        /* För att flex items inte ska sträckas till samma height som bredvidliggande items */
        align-items: start;
        row-gap: 100px;
        column-gap: 60px;
        margin-top: -50px;
    }
    .add-week{
        margin-left: 30px;
        white-space: nowrap;
    }
    .week{
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: 0 0 20px #a2a2a2;
        overflow: hidden;
    }
    .week-content{
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 20px;
        row-gap: 30px;
        padding: 30px;
        padding-right: 40px;
    }
    .day{
        display: contents;
    }
    .day-recipes{
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        padding-block: 10px;
    }
    .add-recipe{
        grid-column: 1/3;
        margin: 30px auto;
    }
</style>