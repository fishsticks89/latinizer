<script>
  import './Form.css'
  export let contents = '';
</script>

<div 
  class={'form'}
>
  <div
    class="editable"
    contenteditable="true"
    autofill="false"
    spellcheck="false"
    bind:textContent={contents}
  >
  </div>
</div>
