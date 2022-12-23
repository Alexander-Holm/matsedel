<script lang="ts">
    import { Api } from "src/models/api/Api";
    import type { Week } from "src/models/Week";

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
    <div class="title">
        <span class="decoration" />
        <h2>{week.name}</h2>
        <span class="decoration" />
    </div>
    <button on:click={editWeek}>Edit</button>
    <button on:click={deleteWeek}>Delete</button>
</div>

<style>
    .week-header{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .week-header h2{
        font-family: "Fugaz One";
        font-weight: 500;
        font-size: 1.7rem;
    }
    .title{
        display: flex;
        gap: 8px;
        margin-block: 30px;
    }
    .decoration{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
    }
        .decoration::before, .decoration::after{
            content: "";
            width: 1.6rem;
            /* height i rem ger olika storlek på linjerna när decimaltalen rundas av */
            height: 3px;
            background-color: var(--clr-accent);
        }

</style>