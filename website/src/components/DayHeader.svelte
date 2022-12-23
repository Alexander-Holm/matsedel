<script lang="ts">
    export let title: string;
</script>
<div class="day-header">
    <span class="decoration">
        <span class="dot" />
    </span>
    <h3>{title}</h3>
</div>

<style>
    .day-header{
        grid-column: 1;
        display: flex;
    }
    .decoration{
        display: block;
        height: auto;
        width: 2px;
        /* rem istället för px för att följa mitten av h3 som har font-size i rem */
        margin-top: 0.5rem;
        background-color: var(--clr-accent);
        /* Rundar slutet av linjen */
        border-radius: 20px;
    }
    .decoration .dot{
        display: block;
        width: 10px; height: 10px;
        position: relative;
        left: -4px;
        border-radius: 50%;
        background: var(--clr-accent);
    }
    h3{
        font-family: "Fugaz One";
        font-weight: 400;
        margin: 0;
        padding-left: 12px;        
    }
</style>