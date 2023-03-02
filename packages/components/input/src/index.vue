<template>
  <div
    class="du-input"
    :class="classStyle"
    :style="{
      borderWidth: normalizeBorderWidth,
      borderStyle: borderStyle,
    }"
  >
    <slot name="prepend"></slot>
    <input
      :type="props.type"
      :class="classStyleFont"
      :style="{
        color: props.fontColor,
        fontSize: normalizeFontSize,
      }"
      v-model="value"
    />
    <slot name="append"></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { isString, isNumber } from "../../../utils";

export default defineComponent({
  name: "DuInput",
});
</script>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  fontColor: {
    type: String,
    default: "",
  },
  fontSize: {
    type: [String, Number],
    default: "",
  },
  borderType: {
    type: String,
    default: "default",
    validator: (value: string) => {
      return [
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
      ].includes(value);
    },
  },
  borderWidth: {
    type: [Number, String],
    default: 2,
  },
  borderStyle: {
    type: String,
    default: "solid",
    validator: (value: string) => {
      return ["solid", "dashed", "dotted"].includes(value);
    },
  },
  round: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// v-model
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// 正常化单位
const normalizeBorderWidth = computed(() => {
  if (isString(props.borderWidth)) {
    return String(props.borderWidth).indexOf("px") !== -1
      ? props.borderWidth
      : props.borderWidth + "px";
  } else if (isNumber(props.borderWidth)) {
    return props.borderWidth + "px";
  }
});

const normalizeFontSize = computed(() => {
  if (isString(props.fontSize)) {
    return String(props.fontSize).indexOf("px") !== -1
      ? props.fontSize
      : props.fontSize + "px";
  } else if (isNumber(props.fontSize)) {
    return props.fontSize + "px";
  }
});

// 基础样式
const classStyle = computed(() => {
  return {
    [`du-input-border__${props.borderType}`]: props.borderType,
    [`du-input__round`]: props.round,
  };
});

const classStyleFont = computed(() => {
  return {
    [`du-input-font__${props.borderType}`]: props.borderType,
  };
});
</script>
<style lang="scss" scoped>
@use "../../../styles/color.variables.scss" as *;
.du-input {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  input {
    flex: 1;
    padding: 6px 12px;
    border: none;
    outline: none;
    font-size: 16px;
  }
  &__round {
    border-radius: 20px;
  }
}

@each $t, $c in $theme-color {
  .du-input-border__#{$t} {
    border-color: $c;
  }
  .du-input-font__#{$t} {
    color: $c;
  }
}
</style>
