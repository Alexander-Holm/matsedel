<script lang="ts">
    import Svg from "src/icons/logo.svelte";

</script>
<span class="logo">
    <Svg />
    <h1>Matsedel</h1>
</span>

<style>
    .logo{
        grid-column: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 4rem;
    }
</style>