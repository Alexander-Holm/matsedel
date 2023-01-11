<script lang="ts">
    import { page } from "$app/stores";
    import Header from "src/components/Header.svelte";
    import { Days } from "src/models/Week";
    import { fade } from "svelte/transition";

    const weekId = $page.url.searchParams.get("vecka");
    /*
        Typescript enums har formatet:
        0: Array [ "0", "Måndag" ]​
        1: Array [ "1", "Tisdag" ]​
        2: Array [ "Måndag", 0 ]​
        3: Array [ "Tisdag", 1 ]
    */
    const stupidTypescriptEnum = Object.entries(Days);
    /*
        Ta bort första halvan för att få endast 
        2: Array [ "Måndag", 0 ]​
        3: Array [ "Tisdag", 1 ]
    */
    const days = stupidTypescriptEnum.slice(stupidTypescriptEnum.length /2);
</script>

<Header backUrl="/" />
<form method="post" in:fade >
    <h2>Lägg till recept</h2>
    <input type="hidden" name="week" value={weekId} />

    <label for="url">Länk</label>
    <input id="url" name="url" type="text" required />

    <label for="notes">Anteckningar</label>
    <textarea id="notes" name="notes" />

    <fieldset class="days">
        <legend>Dag</legend>
        {#each days as [name, number]}
            <input id={name} name="day" value={number} type="radio" required/>
            <label for={name} class="day-button">{name}</label>
        {/each}

    </fieldset>

    <button type="submit" class="button-primary" >Spara</button>
</form>

<style>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    label{
        margin-top: 40px;
    }
    #url, #notes, .days{
        border: 1px solid lightgray;
        border-radius: var(--border-radius);
        box-sizing: border-box;
    }

    #url, #notes{
        font-family: inherit;
        color: var(--black);
        width: 40rem;
        max-width: 100%;
        margin: auto;
        padding: 8px;        
    }


    .days{
        width: 100%;
        margin-top: 40px;
        margin-bottom: 80px;
        padding: 20px;
    }
    legend{
        margin: auto;
    }
    
    .day-button{
        display: inline-block;
        background-color: transparent;
        color: var(--black);
        border: 2px solid;
        outline: 2px solid;
        outline-offset: -2px;
        border-radius: var(--border-radius);
        font-size: 1rem;
        padding: 12px;
        margin: 20px;

        transition: outline-offset 100ms ease-out;
    }
    input[type="radio"]{
        display: none;
    }
    input[type="radio"]:checked + .day-button{
        outline-offset: -8px;
    }

</style>