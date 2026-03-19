<script lang="ts">
  import { onMount } from "svelte";
  import { Sonner } from "$lib/components/ui/sonner/index.js";

  // Import components for testing
  import AggsLeft from "$lib/components/aggs_left/index.svelte";
  import HeaderNav from "$lib/components/header_nav/index.svelte";
  import AggsMenu from "$lib/components/aggs_menu/index.svelte";
  import TableView from "$lib/components/table_view/index.svelte";

  let currentPath = $state(window.location.hash);

  const routes = {
    "#/aggs_left": AggsLeft,
    "#/header_nav": HeaderNav,
    "#/aggs_menu": AggsMenu,
    "#/table_view": TableView,
  };

  onMount(() => {
    const handleHashChange = () => {
      currentPath = window.location.hash;
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  const CurrentComponent = $derived(routes[currentPath as keyof typeof routes]);
</script>

<Sonner />

<div
  class="app-container flex flex-col min-h-screen w-full overflow-hidden bg-slate-50"
>
  <main class="flex-1 p-4 overflow-auto">
    {#if CurrentComponent}
      <div class="flex h-full w-full items-start justify-start">
        <CurrentComponent />
      </div>
    {:else}
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-slate-900">Component Test Router</h1>
        <ul class="flex flex-col gap-2">
          {#each Object.keys(routes) as route}
            <li>
              <a
                href={route}
                class="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
              >
                {route.replace("#/", "")}
              </a>
            </li>
          {/each}
        </ul>
        {#if currentPath && !CurrentComponent}
          <p class="text-red-500">Component not found for: {currentPath}</p>
        {/if}
      </div>
    {/if}
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
  }
  .app-container {
    height: 100vh;
    width: 100vw;
  }
</style>
