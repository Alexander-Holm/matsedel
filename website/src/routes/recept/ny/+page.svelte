<script lang="ts">
    import { page } from "$app/stores";
    import { Days } from "src/models/Week";

    const weekId = $page.url.searchParams.get("vecka");
    const nameOfDays = Object.values(Days).filter(val => isNaN(Number(val))) as string[];
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

<form method="post" >
    <h1>Nytt recept</h1>
    <input type="hidden" name="week" value={weekId} />
    <label for="url">Länk</label>
    <input id="url" name="url" type="text" required />
    <label for="notes"></label>
    <textarea id="notes" name="notes" />
    <p>Dag</p>
    {#each days as [name, number]}
        <div class="day">
            <label for={name}>{name}</label>
            <input id={name} name="day" value={number} type="radio" required/>
        </div>
    {/each}
    <div class="links" >
        <a href="/" >Tillbaka</a>
        <button type="submit" >Spara</button>
    </div>
</form>

<style>
    
</style>