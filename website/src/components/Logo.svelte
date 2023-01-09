<script lang="ts">
    import Svg from "src/icons/logo.svelte";

</script>
<span class="logo">
    <Svg />
    <h1>Matsedel</h1>
</span>

<style>
    .logo{
        /* <header> har oftast tre kolumner */
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