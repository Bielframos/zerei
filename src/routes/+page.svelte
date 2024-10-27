<script lang="ts">
  export let data
  const user = data.user
</script>

<nav>
  <a href="/login">Login</a>

  <footer>
    <ul>
      <li>
        {#if user?.labels.includes("owner")}
          <a href="/admin">Zerei Admin</a>
        {/if}
      </li>
    </ul>
  </footer>
</nav>
