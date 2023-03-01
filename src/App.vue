<script lang="ts">
export default {
  name: "App",
};
</script>

<template>
  <div>
    <du-button>按钮</du-button>
    <du-button type="primary">按钮</du-button>
    <du-button type="success">按钮</du-button>
    <du-button type="warning">按钮</du-button>
    <du-button type="info">按钮</du-button>
    <du-button type="danger">按钮</du-button>
  </div>
  <div :style="{ marginTop: '10px' }">
    <du-button round>按钮</du-button>
    <du-button type="primary" round>按钮</du-button>
    <du-button type="success" round>按钮</du-button>
    <du-button type="warning" round>按钮</du-button>
    <du-button type="info" round>按钮</du-button>
    <du-button type="danger" round>按钮</du-button>
  </div>

  <div>
    <du-table
      :head="state.theadData"
      :data="state.tableData"
      :customElements="['head', 'body']"
      align="left"
    >
      <template #thead="thProp">
        <template v-if="thProp.rows.key === 'title2'">
          <input type="text" placeholder="阿哈哈哈" />
        </template>
        <template v-else>
          {{ thProp.rows.name }}
        </template>
      </template>
      <template #tbody="tdProp">
        {{ tdProp.row }}
      </template>
    </du-table>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
const state = reactive({
  theadData: [
    {
      name: "标题1",
      key: "title1",
    },
    {
      name: "标题2",
      key: "title2",
    },
    {
      name: "标题3",
      key: "title3",
    },
  ],
  tableData: [
    {
      title1: "haha",
      title2: "hehe",
      title3: "xixi",
    },
    {
      title1: "haha1",
      title2: "hehe1",
      title3: "xixi1",
    },
    {
      title1: "haha2",
      title2: "hehe2",
      title3: "xixi2",
    },
  ],
});
</script>
<style scoped></style>
