<script>
  import './Nav.css'
  export let label = ''
</script>

<div
  class={'nav'}
>
  <slot/>
  {#if label != ''}
    <p>
      {label}
    </p>
  {/if}
</div>
