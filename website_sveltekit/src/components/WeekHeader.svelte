<script lang="ts">
    import { Api } from "src/models/api/Api";
    import type { Week } from "src/models/Week";
    import Edit from "../icons/edit.svelte";
    import Delete from "../icons/delete.svelte";

    export let week: Week;

    async function editWeek(){
        const newName = prompt("Nytt namn", week.name);
        if(newName != null){
            await Api.weeks.rename(week.id, newName);
        }
    }
    async function deleteWeek(){
        let shouldDelete = true;
        // Måste bekräfta för att ta bort om veckan har recept
        if(week.days.length > 0){
            const message = 
                "Vill du ta bort den här veckan?\n"+
                "Alla recept som hör till den här veckan kommer också tas bort!"
            shouldDelete = confirm(message);
        }
        if(shouldDelete) 
            await Api.weeks.delete(week.id);
    }
</script>

<div class="week-header">
    <h2>Vecka {week.name}</h2>
    <button class="edit" on:click={editWeek}><Edit/> </button>
    <button class="delete" on:click={deleteWeek}><Delete/></button>
</div>

<style>
    .week-header{
        display: flex;
        align-items: center;
        gap: 40px;
        background-color: var(--black);
        color: white;
        padding: 10px 20px;
    }
    .edit, .delete{
        background-color: transparent;
        color: inherit;       
        stroke: currentColor; 
        border: 0;
        /* flex för att centrera ikonen */
        display: flex;
    }
    .edit{
        width: 2rem;
        stroke-width: 1.5;
    }
    .delete{
        width: 2.2rem;
        padding-left: 8px;
        margin-left: auto;
        stroke-width: 2;
    }
</style>