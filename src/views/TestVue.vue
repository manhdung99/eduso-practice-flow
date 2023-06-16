<template>
  Select User
  <div class="select-wrapper">
    <select class="selectquiz" name="" id="">
      <option value="">Select an option</option>
      <option value="value1">
        <img
          src="https://hnsofa.com/wp-content/uploads/2023/03/chiem-nguong-50-hinh-anh-phong-canh-buon-tam-trang-cuc-dep_1.jpg"
          alt=""
        />
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "UnitView",
  components: {},
  setup() {
    const value = ref(null);
    return { value };
  },
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dropdown-menu {
  max-height: 146px;
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 0px;
}
</style>
