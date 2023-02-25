<template>
<div class="text-h5 text-weight-bold">
  {{ title }}
</div>
</template>

<script>
  export default {
    name: 'PageHeader',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>
