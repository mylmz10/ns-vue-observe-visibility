# ns-vue-observe-visibility

Detect when an element is becoming visible or hidden in the ScrollView element for NativeScript Vue project.

This project created for using <a href="https://github.com/Akryum/vue-observe-visibility/">vue-observe-visibility</a> plugin in NativeScript-Vue projects.

# Installation

```
npm install --save vue-observe-visibility
```

# Import

```javascript
import Vue from "vue";
import NSVueObserveVisibility from "ns-vue-observe-visibility";

Vue.use(NSVueObserveVisibility);
```

# Usage

```nativescript
<ScrollView col="0" row="1" backgroundColor="#EBEBEB" orientation="horizontal" @scroll="onScroll">
   <StackLayout orientation="horizontal">
      <Label
        width="75"
        height="50"
        v-for="item in items"
        :text="item"
        :id="item"
        :key="item"
        class="item"
        v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry)"></Label>
   </StackLayout>
</ScrollView>
```

# Example

```html
<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!" />
    <GridLayout columns="*" rows="*, 60">
      <label class="message" :text="msg" col="0" row="0" />
      <ScrollView
        col="0"
        row="1"
        backgroundColor="#EBEBEB"
        orientation="horizontal"
        @scroll="onScroll"
      >
        <StackLayout orientation="horizontal">
          <label
            width="75"
            height="50"
            v-for="item in items"
            :text="item"
            :id="item"
            :key="item"
            class="item"
            v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, item)"
          ></label>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
  export default {
    data() {
      return {
        msg: "Hello World!",
        items: ["1", "2", "3", "4", "5", "6", "7", "8"]
      };
    },
    methods: {
      visibilityChanged(isVisible, entry) {
        console.log("isVisible: " + isVisible);
        console.log("nativeView: " + entry.id);
      },
      onScroll() {
        console.log("onScroll");
      }
    }
  };
</script>

<style scoped>
  .item {
    background-color: red;
    margin: 5;
    font-size: 25;
    color: #fff;
    text-align: center;
  }

  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
