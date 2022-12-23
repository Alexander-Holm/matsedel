<script lang="ts">
    import { page } from '$app/stores';

    import type { Recipe } from "src/models/Recipe";
    import { Api } from 'src/models/api/Api';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let error = false;
    let recipe: Recipe | null;

    onMount(async () => {
        const id = Number($page.params.id);
        recipe = await Api.recipes.getById(id);
        if(recipe == null) error = true;      
    })

    async function clickDelete(){
        if(recipe?.id == null) return;
        const confirmDelete = confirm("Vill du ta bort det här receptet?");
        if(confirmDelete){
            await Api.recipes.delete(recipe.id);
            goto("/");
        }
    }
</script>


{#if recipe}
<article>
    <div class="links">
        <a href="/">Tillbaka</a>
        <a href={recipe.url}>Öppna recept</a>
    </div>
    <h2>{recipe.linkPreview?.title}</h2>
    <img src={recipe.linkPreview?.imageUrl} alt="" />
    {#if recipe.notes}
        <div class="notes">
            [icon]
            <p>
                {recipe.notes}
            </p>
        </div>        
    {/if}
    <p class="description">{recipe.linkPreview?.description}</p>
    <button on:click={clickDelete}>Ta bort</button>
</article>
{/if}

{#if error}
    <p>Hittar inte receptet du försöker nå</p>
{/if}

<style>
    article{
        padding: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 1200px;
    }
    /* grid */
    h2, .notes, .description{
        grid-column: 1;
    }

    
    .links{
        display: flex;
        justify-content: space-between;
        grid-row: 1;
        grid-column: 1 / 3;
    }
    a{
        border: 1px solid darkgreen;
        background-color: greenyellow;
        color: white;
        text-decoration: none;
    }
    img{
        width: 100%;
        max-height: 50vh;
        margin: auto;
        object-fit: cover;
        border-radius: 20px;

        grid-column: 2;
        grid-row: 2 / 99;
    }
    
</style>