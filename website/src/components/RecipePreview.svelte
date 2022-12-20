<script lang="ts">
    import type { Recipe } from "src/models/Recipe";

    export let recipe: Recipe;
    // const { id, notes } = recipe;
    // const { title, description, imageUrl } = recipe.linkPreview || {};
</script>

<a href={`/recept/${recipe.id}`} class="recipe-preview" class:loading={recipe.linkPreview == null}>
    <img src={recipe.linkPreview?.imageUrl} alt="" />
    <div class="text-container">
        <h3 class="title">{recipe.linkPreview?.title}</h3>
        <p class="description">{recipe.linkPreview?.description}</p>
    </div>
</a>

<style>
    .recipe-preview{
        display: flex;
        height: 8rem;
    }
        .recipe-preview.loading{
            background-color: coral;
        }

    img{
        height: 100%;
        aspect-ratio: 1;
    }
    
    .text-container{
        width: 8rem;
        padding: 6px;
    }
    .title{
        margin: 0;
        margin-bottom: 6px;
    }
    .description{
        margin: 0;

        /* Bryter av text som är för lång */
        display: -webkit-box !important;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>