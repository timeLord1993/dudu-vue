<template>
  <teleport to="body">
    <transition name="dialog-bounce">
      <div class="du-dialog" v-if="props.modelValue">
        <template v-if="title">
          <p>{{ props.title }}</p>
        </template>
        <template v-else>
          <slot name="header"></slot>
        </template>

        <slot></slot>
        <slot name="footer"></slot>
        <strong @click="onClickOutside">x</strong>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DuDialog",
});
</script>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

function onClickOutside() {
  emits("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
@use "../../../styles/color.variables" as *;
.du-dialog {
  background: $white-color;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 0 8px 0px #c8c8c8;
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
.dialog-bounce-enter-active {
  animation: bounce-in 0.5s;
}
.dialog-bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(0) scale(0);
  }
  50% {
    transform: translateX(-25%) scale(1.25);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
</style>
