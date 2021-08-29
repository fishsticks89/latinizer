<script>
  import './Nav.css'
  export let label = 'sdfg'
</script>

<div
  class={'nav'}
>
  <slot/>
  <p>
    {label}
  </p>
</div>
