<script>
  import './Button.css'
  export let round = true;
  export let label = '';
  export let size = '16pt';
  let rounder = round ? 'round' : 'sharp';
</script>

<button
  type="button"
  style="font-size: {size};"
  class={['main-button', `main-button--${rounder}`].join(' ')}
  on:click>
  {label}
  <slot/>
</button>
