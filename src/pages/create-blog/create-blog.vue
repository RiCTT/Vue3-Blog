<template>
  <div class="create-page">
    <div id="editor" class="editor-wrapper"></div>
  </div>
</template>

<script>  
import { onMounted, ref } from 'vue';
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content
import Editor from 'tui-editor'
// const Editor = require('tui-editor')

export default {
  setup() {
    let content = ref('富文本编辑器')
    onMounted(() => {
      this.editor = new Editor({
        el: document.getElementById('#editor'),
        // ...this.editorOptions
      })
    })
    return {
      content
    }
  }
}
</script>

<style>

</style>