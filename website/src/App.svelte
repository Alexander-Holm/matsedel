<script lang="ts">
    import { Week, fetchWeeks } from "./models/Week";
    import { Day } from "./models/Day";
    import { Recipe } from "./models/Recipe";

    let isLoading = true;
    let weeks: Week[];
    init();

    async function init(){
        weeks = await fetchWeeks();
        isLoading = false;
        await loadPreviews();
    }

    // Hämtar linkPreviews för recepten en vecka i taget
    async function loadPreviews(weekIndex: number = 0){
        const promises = [];
        for (const recipe of weeks[weekIndex].recipes) {
            promises.push( recipe?.fetchLinkPreview() );
        }
        await Promise.all(promises);
        // Uppdatera Svelte
        weeks[weekIndex].recipes = weeks[weekIndex].recipes;

        if(weeks[weekIndex + 1] != null)
            loadPreviews(weekIndex + 1);
    }
    
</script>

<main>
    <h1>Matsedel</h1>
    {#if isLoading}
        <p>Laddar</p>

    {:else}
    {#each weeks as week}
        <div>
            <h2>{week.name}</h2>
            <div>
                {#each Day as [dayIndex, dayName]}
                    <div>
                        <p>{dayName}</p>
                        {#if week.recipes[dayIndex]?.linkPreview != null}
                            <h2>{week.recipes[dayIndex].linkPreview.title}</h2>
                        {:else if week.recipes[dayIndex] != null}
                            <p>loading</p>
                        {:else}
                            <p>+</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    {/if}
</main>

<style>
</style>