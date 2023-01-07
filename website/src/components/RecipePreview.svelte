<script lang="ts">
    import type { Recipe } from "src/models/Recipe";
    import NotesIcon from "../icons/message.svelte";

    export let recipe: Recipe;
</script>

<article class="recipe-preview">
    
    <a href={`/recept/${recipe.id}`} class="card" class:loading={recipe.linkPreview == null}>
        <img src={recipe.linkPreview?.imageUrl} alt="" />
        <div class="text-container">
            <h4 class="title limit-text-lines">{recipe.linkPreview?.title}</h4>
            <p class="description limit-text-lines">{recipe.linkPreview?.description}</p>
        </div>
    </a>

    {#if recipe.notes}
        <div class="notes">
            <NotesIcon />
            <span>{recipe.notes}</span>
        </div>        
    {/if}

</article>

<style>
    .recipe-preview{
        width: 16rem;
    }
    .card{
        height: 8rem;
        background-color: hsl(0, 0%, 98%);
        box-shadow: 0 0 4px #7b7b7b;        

        display: flex;
        gap: 10px;
        text-decoration: none;
        color: black;

    }
        .card.loading{
            background-color: coral;
        }

    img{
        height: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }
    
    .text-container{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 6px;
    }
    .title{
        font-family: "Merienda";
        font-variation-settings: "wght" 700;
        font-size: 0.9rem;
        --text-lines: 2;
    }
    .description{
        font-family: "Merienda";
        font-variation-settings: "wght" 400;
        font-size: 0.75rem;
        color: #373737;
        --text-lines: 4;         
    }
    .title, .description{
        /* Bryter av text som är för lång */
        display: -webkit-box !important;
        -webkit-line-clamp: var(--text-lines);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .notes{        
        height: 2em;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.8rem;

        stroke: var(--black);
        stroke-width: 1.5;
    }
    .notes span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>