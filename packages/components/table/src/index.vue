<template>
  <table
    class="du-table"
    :class="classStyleBorder"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <th class="du-table-th" :class="classStyleTh" v-for="thItem of thData">
        <template v-if="customHead">
          <slot name="thead" :rows="thItem"></slot>
        </template>
        <template v-else>
          <span>{{ thItem.name }}</span>
        </template>
      </th>
    </tr>
    <tr v-for="tdItem of tdData">
      <td class="du-table-td" :class="classStyleTd" v-for="thItem of thData">
        <template v-if="customBody">
          <slot name="tbody" :row="tdItem[thItem.key]" :col="thItem.key"></slot>
        </template>
        <template v-else>
          <span>{{ tdItem[thItem.key] }}</span>
        </template>
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { isDef, isArray } from "../../../utils/index";
export default defineComponent({
  name: "DuTable",
});
</script>
<script setup lang="ts">
type HeadType = {
  name: string;
  key: string;
};

const props = defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  head: {
    type: Array,
    default: () => [],
    validator: (value: HeadType[]) => {
      return value.every(({ key, name }) => {
        return isDef(key) && isDef(name);
      });
    },
  },
  headFixed: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [],
  },
  customElements: {
    type: Array,
    default: () => [],
    validator: (value: []) => {
      if (value.length) return false;
      return value.some((key) => {
        return ["head", "body"].includes(key);
      });
    },
  },
  borderType: {
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
      ].includes(value);
    },
  },
  align: {
    type: String,
    default: "center",
    validator: (value: string): boolean => {
      return ["center", "left", "right"].includes(value);
    },
  },
});

// 表头数据
const thData = computed(() => {
  return props.head;
});
// 表体数据
const tdData = computed(() => {
  return props.data;
});

// 自定义表头
const customHead = computed(() => {
  if (isDef(props.customElements) && isArray(props.customElements)) {
    return props.customElements.includes("head");
  }
});
// 自定义表体
const customBody = computed(() => {
  if (isDef(props.customElements) && isArray(props.customElements)) {
    return props.customElements.includes("body");
  }
});

// 样式类型
const classStyleBorder = computed(() => {
  return {
    [`du-table-border__${props.borderType}`]: props.borderType,
    "du-table-border": props.border,
  };
});
const classStyleTh = computed(() => {
  return {
    [`du-table-border-th__${props.borderType}`]: props.borderType,
    [`du-table-border-th__${props.align}`]: props.align,
    "du-table-border": props.border,
  };
});
const classStyleTd = computed(() => {
  return {
    [`du-table-border-td__${props.borderType}`]: props.borderType,
    [`du-table-border-td__${props.align}`]: props.align,
    "du-table-border": props.border,
  };
});
</script>
<style lang="scss" scoped>
@use "../../../styles/color.variables.scss" as *;

.du-table {
  &-border {
    border-width: 1px;
    border-style: solid;
  }
  &-th {
    padding: 8px 12px;
    font-size: 14px;
  }
  &-td {
    padding: 6px 12px;
  }
}

@each $align in center, left, right {
  .du-table-border-th__#{$align} {
    text-align: $align;
  }
  .du-table-border-td__#{$align} {
    text-align: $align;
  }
}

@each $type in default, primary, success, warning, info, danger {
  .du-table-border__#{$type} {
    border-color: get-color($type);
  }
  .du-table-border-th__#{$type} {
    border-color: get-color($type);
  }
  .du-table-border-td__#{$type} {
    border-color: get-color($type);
  }
}
</style>
