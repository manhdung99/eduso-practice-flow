<template>
  <div class="home">Home Page</div>
  <div class="flex p-4 gap-4 flex-wrap">
    <router-link v-for="unit in units" :key="unit.id" :to="`unit/${unit.id}`">
      <CartUnit
        :imageURL="unit.url"
        :title="unit.title"
        :numberQuestion="unit.numberQuestion"
      />
    </router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import CartUnit from "@/components/CartUnit.vue";
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUnitStore } from "../store/unitStore";
export default defineComponent({
  name: "HomeView",
  setup() {
    const { units } = storeToRefs(useUnitStore());
    const { getUnits } = useUnitStore();
    onMounted(getUnits);
    return { units, getUnits };
  },
  components: { CartUnit },
});
</script>
