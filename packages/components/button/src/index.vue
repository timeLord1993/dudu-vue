<template>
  <button class="du-button" :class="styleClass">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DuButton",
});
</script>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  // 按钮类型
  type: {
    type: String,
    default: "default",
    validator: (value: string): boolean => {
      return [
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
        "text",
      ].includes(value);
    },
  },
  //   是否可点击
  disabled: {
    type: Boolean,
    default: false,
  },
  //   是否圆角按钮
  round: {
    type: Boolean,
    default: false,
  },
});
const styleClass = computed(() => {
  return {
    [`du-button__${props.type}`]: props.type,
    "du-button__disabled": props.disabled,
    "du-button__round": props.round,
  };
});
</script>
<style lang="scss" scoped>
@use "../../../styles/color.variables" as *;
@use "../../../styles/size.variables" as *;

.du-button {
  display: inline-block;
  padding: 8px 16px;
  box-shadow: 2px 2px 5px 1px $default-color;
  transition: transform 0.05s linear;
  font-weight: bold;
  border-radius: 0;
  color: $white-color;
  cursor: pointer;
  outline: none;
  &:active {
    transform: scale(1.1);
  }
  &__default {
    background: $default-color;
  }
  &__primary {
    background: $primary-color;
  }
  &__success {
    background: $success-color;
  }
  &__danger {
    background: $danger-color;
  }
  &__warning {
    background: $warning-color;
  }
  &__info {
    background: $info-color;
  }
  // disabled
  &__disabled {
  }
  // round
  &__round {
    border-radius: 20px;
  }
}
</style>
