<template>
  <div class="create-page">
    <div contenteditable="true" @input="handleInput"></div>
    <div id="editor" class="editor-wrapper"></div>
  </div>
</template>


<script>  
import { onMounted, ref } from 'vue';

export default {
  setup() {
    let content = ref('富文本编辑器')
    onMounted(() => {
      document.getElementById('editor').innerHTML =
        marked('# Marked in the browser\n\nRendered by **marked**.');
    })
    const handleInput = (v) => {
      console.log(v)
        console.log(v.target.innerHTML)
      setTimeout(() => {
        let c = v.target.innerText.replace(/↵/g, '\n\n')
        console.log(c)
        document.getElementById('editor').innerHTML =
          marked(c);
      }, 1000)
    }
    return {
      content,
      handleInput
    }
  }
}
</script>

<style>

</style>