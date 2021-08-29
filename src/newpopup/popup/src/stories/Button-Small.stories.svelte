<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "./Button-Small.svelte";
</script>

<Meta
  title="Example/Button"
  component={Button}
  argTypes={{
    label: { control: "text" }
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick} />
</Template>

<Story
  name="Small"
  args={{
    label: "to Latin",
  }}
/>