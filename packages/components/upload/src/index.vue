<template>
  <div class="du-upload">
    <div class="du-upload-header">
      <template v-if="props.title">
        <p>{{ props.title }}</p>
      </template>
      <template v-else>
        <slot name="header"></slot>
      </template>
    </div>
    <div class="du-upload-content" @click="openFile">
      <input
        ref="fileRef"
        type="file"
        style="visibility: hidden"
        @change="onFileChange"
      />
    </div>
    <div class="du-upload-footer"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DuUpload",
});
</script>
<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const fileRef = ref();
function openFile() {
  fileRef.value.click();
}

const emits = defineEmits(["change"]);
function onFileChange(e) {
  const file = e.target.files[0];
  const SLICE_FILE_LEN: number = 1024 * 1024 * 2;
  const compiledFile = compileFileParams(file, SLICE_FILE_LEN);
  emits("change", compiledFile);
}

// compile 文件类型参数
function compileFileParams(file, SLICE_FILE_LEN) {
  const isMaxFile: boolean = file.size > SLICE_FILE_LEN;
  if (isMaxFile) {
    const chunkFiles = sliceFile(file, SLICE_FILE_LEN);
    return {
      type: "max-file",
      file: chunkFiles,
      name: file.name,
    };
  } else {
    return {
      type: "min-file",
      file: file,
      name: file.name,
    };
  }
}

// 文件切割
function sliceFile(file, chunkLen: number): Blob[] {
  let start = 0;
  let idx = 0;
  let chunks: any[] = [];
  function splitChunk() {
    if (file.size <= start) {
      return chunks;
    }
    const chunk = file.slice(start, start + chunkLen);
    chunks.push({ chunk, uuid: uuidv4(), index: idx });
    start = start + chunkLen;
    idx++;
    splitChunk(); // 递归调用切割文件
  }
  splitChunk();
  return chunks;
}
</script>

<style scoped lang="scss">
@use "../../../styles/color.variables.scss" as *;
.du-upload {
  display: inline-flex;
  flex-direction: column;
  padding: 6px;
  border: 4px solid $default-color;
  border-radius: 16px;
  &-header {
    p {
      font-size: 18px;
      font-weight: 800;
      margin: 0;
      padding: 10px 6px;
    }
  }

  &-content {
    width: 200px;
    height: 100px;
    border-radius: 16px;
    border: 4px dashed $default-color;
  }
}
</style>
