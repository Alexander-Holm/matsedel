<script lang="ts">
    import Logo from "src/icons/logo.svelte";
    import { fly } from "svelte/transition";

    export let backUrl: string | null = null;
</script>

<header>
    {#if backUrl}
    <a href={backUrl} class="button-secondary" in:fly={{x:-200}}>Tillbaka</a>        
    {/if}
    <span class="logo">
        <Logo />
        <h1>Matsedel</h1>
    </span>
    <span id="header-slot" in:fly={{x:200}}>
        <slot/>
    </span>
</header>


<style>
    header{
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        justify-items: center;
        gap: 20px;
        margin-bottom: 100px;
    }
    .logo{
        grid-column: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        /* height bestämmer storlek på ikonen */
        height: 4rem;
        /* Ser mer centrerat ut */
        padding-left: 20px;
    }
    h1{
        font-size: 2rem;
    }
</style>