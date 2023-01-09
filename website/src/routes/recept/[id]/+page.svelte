<script lang="ts">
    import { page } from '$app/stores';
    import type { Recipe } from "src/models/Recipe";
    import { Api } from 'src/models/api/Api';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from "svelte/transition";
    // Icons
    import NoteIcon from 'src/icons/message.svelte';
    import Delete from 'src/icons/delete.svelte';
    import ExternalLink from 'src/icons/external-link.svelte';
    import Edit from 'src/icons/edit.svelte';
    import Header from 'src/components/Header.svelte';

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
<Header backUrl="/" >
    <a href={recipe.url} class="open-recipe icon-button button-primary">
        <span class="text">Öppna recept</span>
        <span class="icon"><ExternalLink /></span>
        <!-- position: absolute -->
        <span class="domain">{domain}</span>
    </a>
</Header>
<article in:fade>    
    <h2>{recipe.linkPreview?.title}</h2>
    {#if recipe.notes}
        <div class="notes">
            <span class="icon"><NoteIcon /></span>            
            <p>{recipe.notes}</p>
        </div>        
    {/if}
    <img src={recipe.linkPreview?.imageUrl} alt="" />
    <p class="description">{recipe.linkPreview?.description}</p>
    <div class="buttons">
        <!-- REDIGERA SIDAN EJ KLAR -->
        <a href="#" class="icon-button button-secondary">
            <span class="text">Redigera</span>
            <span class="icon"><Edit /></span>
        </a>
        <button on:click={clickDelete} class="icon-button button-secondary">
            <span class="text">Ta bort</span>
            <span class="icon"><Delete /></span>
        </button>
    </div>
</article>
{/if}

{#if error}
    <Header backUrl="/" />
    <p>Hittar inte receptet du försöker nå</p>
{/if}

<style>
    article{
        margin-top: 50px;
    }
    .open-recipe{
        position: relative;        
    }
    .icon-button{
        display: flex;
        align-items: center;
        gap: 10px;
        padding-right: 14px;
    }
    .icon{
        display: inline-block;
        height: 1.5rem;
        /* 
            Måste vara min-width.
            Med vanlig width kan storleken bli mindre när knappen trycks ihop
        */
        min-width: 1.5rem;
        stroke: currentColor;
        stroke-width: 2;
    }
    .domain{
        position: absolute;
        bottom: -1.3rem;
        left: 0; right: 0;
        color: gray;
        font-size: 0.7rem;
        text-align: center;
    }

    h2{
        text-align: center;
        font-weight: 500;
    }
    .notes{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 10px;
        color: var(--black);
    }
    img{
        width: 100%;
        max-height: 50vh;
        margin: 20px auto;
        object-fit: cover;
        border-radius: 10px;
    }
    .description{
        max-width: 40rem;
        margin: auto;
    }

    .buttons{
        display: flex;
        justify-content: space-evenly;
        gap: 10px;
        margin-block: 100px;
    }
    
</style>