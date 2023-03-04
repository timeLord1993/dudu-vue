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
  <div :style="{ marginTop: '20px' }">
    <du-button round @click="onDialog">按钮</du-button>
    <du-button type="primary" round>按钮</du-button>
    <du-button type="success" round>按钮</du-button>
    <du-button type="warning" round>按钮</du-button>
    <du-button type="info" round>按钮</du-button>
    <du-button type="danger" round>按钮</du-button>
  </div>

  <div :style="{ marginTop: '20px' }">
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

  <div :style="{ marginTop: '20px' }">
    <du-input
      border-type="primary"
      fontColor="#333333"
      v-model="state.currentValue"
    ></du-input>
    <du-input
      border-type="success"
      borderWidth="6"
      vFocus
      @enter="onEnter"
    ></du-input>
    <du-input border-type="info" fontSize="20"></du-input>
    <du-input
      border-type="danger"
      fontSize="24"
      borderWidth="4"
      round
    ></du-input>
    <du-input border-type="warning">
      <template #prepend>
        <span>头</span>
      </template>
      <template #append>
        <span>尾</span>
      </template>
    </du-input>
  </div>
  <div :style="{ marginTop: '20px' }">
    <du-button type="info" @click="onDialog">显示对话框</du-button>

    <du-dialog title="对话框" v-model="showDialog">
      <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
    </du-dialog>
  </div>

  <div :style="{ marginTop: '20px' }">
    <du-upload title="大文件上传" @change="changeFile"></du-upload>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
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
  currentValue: "哈哈哈哈哈哈",
});
//  监听input值变化
watch(
  () => state.currentValue,
  (val) => {
    console.log("input 绑定的值", val);
  }
);

function onEnter(val: string) {
  console.log("val", val);
}

const showDialog = ref(false);
function onDialog() {
  showDialog.value = true;
}

function changeFile(fileObj: Record<string, any>) {
  console.info("file");
  console.table(fileObj);
  console.info("chunk file");
  console.table(fileObj.file);
  if (fileObj.type === "max-file") {
    fileObj.file.map((f: Record<string, any>) => {
      const FD = new FormData();
      FD.append("filename", fileObj.name);
      FD.append("chunk", f.chunk);
      FD.append("index", f.index);
      return { formData: FD };
    });

    // 1. 文件切片上传
    // 2. 要实现断点续传需要后端提供一个记忆上传节点的借口，在每次刷新后获取切片位置，从该位置继续上传
    // 3. 文件秒传原理， 使用文件生成一个hash值后，把这个hash发送给后端，后端通过hash去查询是否有同名的文件，若有直接给返回已存在了相同的文件，及不需要再上传了（障眼法而已）。
    // 4. 暂停上传原理，创建一个切片数组，用来保存上传文件，当一个文件上传成功即把它从数组中pop出去，当点击暂停上传时，即把数组中的请求关闭掉，xhr使用abort（xhr.abort）axios使用abort
  }
}
</script>
<style scoped></style>
