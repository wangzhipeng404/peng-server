(function(e){function t(t){for(var r,a,s=t[0],l=t[1],u=t[2],c=0,m=[];c<s.length;c++)a=s[c],n[a]&&m.push(n[a][0]),n[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);p&&p(t);while(m.length)m.shift()();return o.push.apply(o,u||[]),i()}function i(){for(var e,t=0;t<o.length;t++){for(var i=o[t],r=!0,s=1;s<i.length;s++){var l=i[s];0!==n[l]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=i[0]))}return e}var r={},n={app:0},o=[];function a(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=r,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(i,r,function(t){return e[t]}.bind(null,r));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var p=l;o.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},2856:function(e,t,i){},"2f8c":function(e,t,i){},"467a":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"user-info"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.raw_info,expression:"raw_info"}],staticClass:"form-textarea",attrs:{placeholder:"收货信息",type:"textarea",rows:"4"},domProps:{value:e.raw_info},on:{input:function(t){t.target.composing||(e.raw_info=t.target.value)}}}),i("div",{directives:[{name:"show",rawName:"v-show",value:e.raw_info,expression:"raw_info"}],staticClass:"splited-info"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.user_name,expression:"splited_info.user_name"}],staticClass:"form-input",attrs:{placeholder:"姓名"},domProps:{value:e.splited_info.user_name},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"user_name",t.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.user_phone,expression:"splited_info.user_phone"}],staticClass:"form-input",attrs:{placeholder:"电话"},domProps:{value:e.splited_info.user_phone},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"user_phone",t.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.porvince,expression:"splited_info.porvince"}],staticClass:"form-input",attrs:{placeholder:"省"},domProps:{value:e.splited_info.porvince},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"porvince",t.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.city,expression:"splited_info.city"}],staticClass:"form-input",attrs:{placeholder:"市"},domProps:{value:e.splited_info.city},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"city",t.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.country,expression:"splited_info.country"}],staticClass:"form-input",attrs:{placeholder:"区"},domProps:{value:e.splited_info.country},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"country",t.target.value)}}}),i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.splited_info.street,expression:"splited_info.street"}],staticClass:"form-input",attrs:{placeholder:"街道"},domProps:{value:e.splited_info.street},on:{input:function(t){t.target.composing||e.$set(e.splited_info,"street",t.target.value)}}})])]),i("div",{staticClass:"mark-content"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.remark,expression:"remark"}],staticClass:"form-textarea",attrs:{placeholder:"备注",rows:"5"},domProps:{value:e.remark},on:{input:function(t){t.target.composing||(e.remark=t.target.value)}}})]),i("div",{staticClass:"item-list"},[e._l(e.items,function(t,r){return i("div",{key:r,staticClass:"item-box"},[i("div",{staticClass:"box-title"},[e._v("\n        产品"+e._s(r+1)+"\n        "),i("div",{staticClass:"remove-btn",on:{click:function(t){e.removeItem(r)}}},[e._v("移除")])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],staticClass:"form-input",attrs:{placeholder:"产品名"},domProps:{value:t.name},on:{input:function(i){i.target.composing||e.$set(t,"name",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"item.type"}],staticClass:"form-input",attrs:{placeholder:"分类"},domProps:{value:t.type},on:{input:function(i){i.target.composing||e.$set(t,"type",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.color,expression:"item.color"}],staticClass:"form-input",attrs:{placeholder:"颜色"},domProps:{value:t.color},on:{input:function(i){i.target.composing||e.$set(t,"color",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.size,expression:"item.size"}],staticClass:"form-input",attrs:{placeholder:"型号"},domProps:{value:t.size},on:{input:function(i){i.target.composing||e.$set(t,"size",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.num,expression:"item.num"}],staticClass:"form-input",attrs:{placeholder:"数量",type:"number"},domProps:{value:t.num},on:{input:function(i){i.target.composing||e.$set(t,"num",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"item.price"}],staticClass:"form-input",attrs:{placeholder:"售价",type:"number"},domProps:{value:t.price},on:{input:function(i){i.target.composing||e.$set(t,"price",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.cost,expression:"item.cost"}],staticClass:"form-input",attrs:{placeholder:"取货价",type:"number"},domProps:{value:t.cost},on:{input:function(i){i.target.composing||e.$set(t,"cost",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.sku_no,expression:"item.sku_no"}],staticClass:"form-input",attrs:{placeholder:"货号"},domProps:{value:t.sku_no},on:{input:function(i){i.target.composing||e.$set(t,"sku_no",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.supplier,expression:"item.supplier"}],staticClass:"form-input",attrs:{placeholder:"厂家"},domProps:{value:t.supplier},on:{input:function(i){i.target.composing||e.$set(t,"supplier",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"item.address"}],staticClass:"form-input",attrs:{placeholder:"取货地址"},domProps:{value:t.address},on:{input:function(i){i.target.composing||e.$set(t,"address",i.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"item.remark"}],staticClass:"form-input",attrs:{placeholder:"备注"},domProps:{value:t.remark},on:{input:function(i){i.target.composing||e.$set(t,"remark",i.target.value)}}})])}),i("div",{staticClass:"item-btn"},[i("button",{attrs:{type:"default",size:"large",plain:""},on:{click:e.addItem}},[e._v("添加产品")])])],2),i("button",{staticClass:"submit-btn",attrs:{type:"primary",size:"large",plain:""},on:{click:e.createOrder}},[e._v("创建订单")])])},n=[],o=i("c93e"),a=i("c665"),s=(i("cadf"),i("551c"),i("097d"),i("18a0")),l=function e(){Object(a["a"])(this,e),this.name="",this.type="",this.size="",this.num="",this.remark="",this.price="",this.sku_no="",this.cost="",this.color="",this.supplier="",this.address="",this.images=[]},u={name:"OrderForm",data:function(){return{raw_info:"",splited_info:{user_name:"",user_phone:"",porvince:"",city:"",country:"",street:""},remark:"",items:[]}},computed:{},mounted:function(){},methods:{addItem:function(){this.items.push(new l)},removeItem:function(e){confirm("确认移除该产品吗？")&&this.items.splice(e,1)},createOrder:function(){if(this.splited_info.user_name&&this.splited_info.user_phone){if(confirm("确定创建订单吗？")){var e=Object(o["a"])({},this.splited_info,{raw_info:this.raw_info,items:this.items.map(function(e){return Object(o["a"])({},e,{price:100*e.price,cost:100*e.cost})}),remark:this.remark}),t=new Headers;t.append("Content-Type","application/json"),fetch("/shooop/api/order/add",{method:"POST",body:JSON.stringify(e),headers:t}).then(function(e){return e.json()}).then(function(){s.miniProgram.getEnv(function(e){e.miniprogram&&s.miniProgram.navigateTo({url:"/pages/orderList/index"})})})}}else alert("请填写收货信息")}},watch:{raw_info:function(e){var t=null;t=/自治区|省/g.test(e)?/^(\D*)?(\d{11})?(.+?(?:省|自治区))?(.+?市)?(.+?[区|县])?(.*)?$/g.exec(e):/^(\D*)?(\d{11})?(.+?[北京|上海|重庆|天津])?(.+?市)?(.+?[区|县])?(.*)?$/g.exec(e),t&&(this.splited_info={user_name:t[1]&&t[1].trim(),user_phone:t[2]&&t[2].trim(),porvince:t[3]&&t[3].trim(),city:t[4]&&t[4].trim(),country:t[5]&&t[5].trim(),street:t[6]&&t[6].trim()})}}},p=u,c=(i("ae95"),i("2877")),m=Object(c["a"])(p,r,n,!1,null,null,null);m.options.__file="OrderForm.vue";t["default"]=m.exports},"56d7":function(e,t,i){"use strict";i.r(t);i("cadf"),i("551c"),i("097d");var r=i("2b0e"),n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{attrs:{id:"nav"}},[e._v("订单管理系统")]),i("router-view")],1)},o=[],a=(i("5c0b"),i("2877")),s={},l=Object(a["a"])(s,n,o,!1,null,null,null);l.options.__file="App.vue";var u=l.exports,p=i("8c4f"),c=i("467a");r["a"].use(p["a"]);var m=new p["a"]({mode:"history",base:"/",routes:[{path:"/",name:"订单编辑",component:c["default"]},{path:"/order-form",name:"订单编辑",component:function(){return Promise.resolve().then(i.bind(null,"467a"))}}]}),d=i("2f62");r["a"].use(d["a"]);var f=new d["a"].Store({state:{},mutations:{},actions:{}});i("aa35");r["a"].config.productionTip=!1,new r["a"]({router:m,store:f,render:function(e){return e(u)}}).$mount("#app")},"5c0b":function(e,t,i){"use strict";var r=i("2856"),n=i.n(r);n.a},ae95:function(e,t,i){"use strict";var r=i("2f8c"),n=i.n(r);n.a}});
//# sourceMappingURL=app.3753a4b9.js.map