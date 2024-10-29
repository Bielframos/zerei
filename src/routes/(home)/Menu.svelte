<script lang="ts">
  import { buttonStyle } from '$lib/components/ui/Button.svelte'
  import { authController } from '$lib/controllers/auth.controller'
  import cn from '$lib/utils/cn'
  import { createDropdownMenu, melt } from '@melt-ui/svelte'
  import type { Models } from 'appwrite'
  import { Ellipsis, Gamepad2, LogOut } from 'lucide-svelte'
  import { fly } from 'svelte/transition'

  const { account }: { account: Models.User<Models.Preferences> | null } =
    $props()

  const {
    elements: { trigger, menu, item, separator },
    states: { open },
  } = createDropdownMenu({
    forceVisible: true,
    loop: true,
    positioning: { placement: 'bottom-end' },
  })

  // 💡 Exemplo de como criar um item marcável
  // const {
  //   elements: { checkboxItem },
  // } = createCheckboxItem({
  //   checked: settingsSync,
  // })
</script>

<button
  type="button"
  class={cn(buttonStyle({ variant: 'secondary', size: 'icon' }))}
  use:melt={$trigger}
  aria-label="Menu"
>
  <Ellipsis size="20px" />
  <span class="sr-only">Abrir menu</span>
</button>

{#if $open}
  <div
    class="z-40 flex max-h-[300px] min-w-[220px] flex-col shadow-lg rounded-md bg-gradient-to-b from-slate-dark-3/50 to-slate-dark-4/50 backdrop-blur-lg px-1 py-2 lg:max-h-none text-sm font-[300]"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -10 }}
  >
    <button
      class="item"
      use:melt={$item}
      onclick={() => authController.logout()}
    >
      Sair do Zerei
      <LogOut
        class="absolute left-0 inline-flex w-6 items-center justify-center"
        size={14}
      />
    </button>

    {#if account && account.labels.includes('zerei')}
      <div class="separator" use:melt={$separator}></div>

      <button class="item" use:melt={$item}>
        Novo jogo
        <Gamepad2
          class="absolute left-0 inline-flex w-6 items-center justify-center"
          size={14}
        />
      </button>
    {/if}

    <!-- 💡 Exemplo de item marcável -->
    <!-- <div class="item" use:melt={$checkboxItem}>
      <div class="check">
        {#if $settingsSync}
          <Check class="size-4" />
        {/if}
      </div>
      Settings Sync is On
    </div> -->

    <!-- 💡Exemplo de item com atalho -->
    <!-- <div class="item" use:melt={$item} data-disabled>
      Show All Components
      <div class="rightSlot">⇧⌘N</div>
    </div> -->
  </div>
{/if}

<style lang="postcss">
  .item {
    @apply relative h-6 min-h-[24px] select-none rounded-sm pl-6 pr-3;
    @apply z-40 text-slate-dark-11 outline-none;
    @apply data-[highlighted]:bg-slate-dark-4 data-[highlighted]:text-slate-dark-12;
    @apply data-[disabled]:text-slate-dark-10;
    @apply flex items-center text-sm leading-none;
    @apply ring-0 !important;
  }

  .check {
    @apply absolute left-2 top-1/2 text-indigo-dark-9;
    translate: 0 calc(-50% + 1px);
  }

  .dot {
    @apply h-[4.75px] w-[4.75px] rounded-full bg-indigo-dark-9;
  }

  .separator {
    @apply m-[5px] h-[1px] bg-slate-dark-6;
  }

  .rightSlot {
    @apply ml-auto pl-5;
  }
</style>
