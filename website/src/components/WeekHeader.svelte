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
                "Alla recept som hör till den här veckan kommer också att tas bort."
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
        background-color: var(--clr-accent);
        padding: 10px 20px;
        border-radius: 4px;
    }
    h2{
        font-family: "Fugaz One";
        font-weight: 500;
        font-size: 1.7rem;
        color: white;
    }
    button{
        height: 2.2rem;
        width: 2.2rem;
        padding: 6px;
        /* flex för att centrera ikonen */
        display: flex;
        background-color: transparent;
        fill: white;        
        border: 0;
    }
    .delete{
        padding-left: 8px;
        margin-left: auto;
    }
</style>