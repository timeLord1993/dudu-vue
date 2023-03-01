import { defineComponent as a, computed as d, openBlock as r, createElementBlock as l, normalizeClass as c, unref as _, renderSlot as p } from "vue";
const i = a({
  name: "DuButton"
}), f = /* @__PURE__ */ a({
  ...i,
  props: {
    // 按钮类型
    type: {
      type: String,
      default: "default",
      validator: (t) => [
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
        "text"
      ].includes(t)
    },
    //   是否可点击
    disabled: {
      type: Boolean,
      default: !1
    },
    //   是否圆角按钮
    round: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const e = t, n = d(() => ({
      [`du-button__${e.type}`]: e.type,
      "du-button__disabled": e.disabled,
      "du-button__round": e.round
    }));
    return (s, u) => (r(), l("button", {
      class: c(["du-button", _(n)])
    }, [
      p(s.$slots, "default", {}, void 0, !0)
    ], 2));
  }
});
const m = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, u] of e)
    n[s] = u;
  return n;
}, o = /* @__PURE__ */ m(f, [["__scopeId", "data-v-214d7e9b"]]);
o.install = (t) => (t.component(o.name, o), t);
const y = [o], b = (t) => {
  y.forEach(
    (e) => t.use(e)
  );
}, x = {
  install: b
};
export {
  o as DuButton,
  x as default
};
