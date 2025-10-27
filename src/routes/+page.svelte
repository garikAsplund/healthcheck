<script lang="ts">
  export let data: { pings: Array<{ id: number; created_at: string; url: string; status: number; ok: number; response_ms: number; error: string | null }>} ;
  const pings = data.pings;
</script>
<h1><3 Healthcheck @ GAR1K.C0DES work in progess :)</h1>

{#if pings.length === 0}
  <p>No data yet. Set HEALTHCHECK_URL in your .env and start the server.</p>
{:else}
  <p>Total records (last 2 weeks): {pings.length}</p>
  <table>
    <thead>
      <tr>
        <th>Time (UTC)</th>
        <th>Status</th>
        <th>OK</th>
        <th>Latency</th>
        <th>Error</th>
      </tr>
    </thead>
    <tbody>
      {#each pings.slice(0, 20) as r}
        <tr>
          <td>{r.created_at}</td>
          <td>{r.status}</td>
          <td>{r.ok ? '✓' : '✗'}</td>
          <td>{r.response_ms}ms</td>
          <td>{r.error}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
