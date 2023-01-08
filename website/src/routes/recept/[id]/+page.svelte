<script lang="ts">
    import { page } from '$app/stores';
    import type { Recipe } from "src/models/Recipe";
    import { Api } from 'src/models/api/Api';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import NoteIcon from 'src/icons/message.svelte';
    import Delete from 'src/icons/delete.svelte';
    import Logo from 'src/components/Logo.svelte';
    import ExternalLink from 'src/icons/external-link.svelte';

    let error = false;
    let recipe: Recipe | null;
    let domain: string;

    onMount(async () => {
        const id = Number($page.params.id);
        recipe = await Api.recipes.getById(id);
        if(recipe == null) 
            error = true;
        else {
            const url = new URL(recipe.url);
            domain = url.hostname;
        }
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
    <header class="grid-header">
        <a href="/" class="button-big" >Tillbaka</a>
        <Logo />
        <a href={recipe.url} class="open-recipe button-big" >
            <span>
                Öppna recept
                <ExternalLink />
            </span>
            <span class="domain">{domain}</span>
        </a>
    </header>
    <h2>{recipe.linkPreview?.title}</h2>
    <img src={recipe.linkPreview?.imageUrl} alt="" />
    {#if recipe.notes}
        <div class="notes">
            <NoteIcon />
            <p>
                {recipe.notes}
            </p>
        </div>        
    {/if}
    <p class="description">{recipe.linkPreview?.description}</p>
    <button on:click={clickDelete}>Ta bort <Delete /></button>
</article>
{/if}

{#if error}
    <p>Hittar inte receptet du försöker nå</p>
{/if}

<style>
    .open-recipe{
        position: relative;
    }
    .domain{
        position: absolute;
        bottom: -1.3rem;
        left: 0; right: 0;
        color: gray;
        font-size: 0.7rem;
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