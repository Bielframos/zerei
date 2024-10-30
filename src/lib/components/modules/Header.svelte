<script lang="ts">
  import Menu from './Menu.svelte'

  const { account }: { account: Account } = $props()
</script>

<header class="pt-10 pb-4 px-6 flex justify-between">
  <h1 class="text-3xl font-normal">Zerei</h1>
  <Menu {account} />
</header>
