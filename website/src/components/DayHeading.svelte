<script lang="ts">
    export let title: string;
</script>
<div class="day-heading">
    <span class="decoration">
        <span class="dot" />
    </span>
    <h3>{title}</h3>
</div>

<style>
    .day-heading{
        grid-column: 1;
        display: flex;
    }
    .decoration{
        --color: rgb(230, 71, 23);
        display: block;
        height: auto;
        width: 2px;
        /* rem istället för px för att följa mitten av h3 som har font-size i rem */
        margin-top: 0.5rem;
        background-color: var(--color);
        /* Rundar slutet av linjen */
        border-radius: 20px;
    }
    .decoration .dot{
        display: block;
        width: 10px; height: 10px;
        position: relative;
        left: -4px;
        border-radius: 50%;
        background: var(--color);
    }
    h3{
        font-family: "Fugaz One";
        font-weight: 400;
        margin: 0;
        padding-left: 12px;        
    }
</style>