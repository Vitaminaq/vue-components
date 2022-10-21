import { defineComponent as a, openBlock as c, createElementBlock as s, toDisplayString as _ } from "vue";
import { ref as l } from "vue-demi";
const e = /* @__PURE__ */ a({
  __name: "Button",
  setup(t) {
    const n = l(0), o = () => {
      n.value++;
    };
    return (r, u) => (c(), s("button", {
      class: "add",
      onClick: o
    }, _(n.value), 1));
  }
});
const m = {
  install(t) {
    t.component(e.name, e);
  }
};
export {
  e as Button,
  m as default
};
