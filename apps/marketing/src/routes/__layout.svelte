<script>
  import { writable } from 'svelte/store'
  import { Header } from '@beyonk/brand'
</script>

<Header config={{ app: 'marketing' }} page={writable({ url: 'foo' })} />
