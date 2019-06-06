<template>
  <div id="app" class="page">
    <!-- <GlobalHeader :hideViewTabs="isHideViewTabs"/> -->
    <router-view name="globalHeader"/>
    <router-view/>
    <router-link to="/style-guide">Go to Style Guide</router-link>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

import { GlobalState } from "@/store/types";
import GlobalHeader from "@/components/organisms/GlobalHeader/GlobalHeader.vue";

const namespace: string = "global";

@Component({
  components: {
    GlobalHeader
  }
})
export default class App extends Vue {
  // @Getter("isHideViewTabs", { namespace }) isHideViewTabs: any;
}
</script>


<style lang="less">
@import url("styles/app.less");
</style>
