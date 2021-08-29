<script>
  import './Button-Small.css'
  export let label = '';
</script>

<button
  type="button"
  class={'smol'}
  on:click>
  {label}
  <slot/>
</button>
