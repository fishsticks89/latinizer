<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "./Button.svelte";
</script>

<Meta
  title="Example/Button"
  component={Button}
  argTypes={{
    label: { control: "text" },
    round: { control: "boolean" },
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick} />
</Template>

<Story
  name="Round"
  args={{
    round: true,
    label: "a",
  }}
/>

<Story
  name="Sharp"
  args={{
    round: false,
    label: "a",
  }}
/>