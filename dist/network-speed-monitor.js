/*! ha-network-speed-monitor v1.4.5 | MIT License */
var F="1.4.5",S="network-speed-monitor",he="network-speed-monitor-editor",j=[5,10,15,20],B=[1,2,5,10,15,30,60],ge="#3b9dff",fe="#22c55e",v={show:"both",layout:"auto",ranking_size:10,refresh_interval:5,unit:"Mbps",decimals:0,show_bars:!0,show_rank:!0,show_timestamps:!0,show_icons:!0,show_totals:!0,show_search:!1,show_status:!0,show_sparkline:!1,compact:!1,sort_direction:"desc",scope:"entity",aggregates:"separate",aggregates_max:6,stale_after:300,hold_seconds:60,hide_rx_tx:!0,warn_threshold:75,critical_threshold:90};var J=globalThis,Q=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),De=new WeakMap,V=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=De.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&De.set(e,t))}return t}toString(){return this.cssText}},Le=n=>new V(typeof n=="string"?n:n+"",void 0,_e),W=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new V(e,n,_e)},Ie=(n,t)=>{if(Q)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=J.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},be=Q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Le(e)})(n):n;var{is:Rt,defineProperty:Ct,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Mt,getOwnPropertySymbols:Tt,getPrototypeOf:Nt}=Object,ee=globalThis,He=ee.trustedTypes,Pt=He?He.emptyScript:"",Ot=ee.reactiveElementPolyfillSupport,G=(n,t)=>n,ve={toAttribute(n,t){switch(t){case Boolean:n=n?Pt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ze=(n,t)=>!Rt(n,t),Ue={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:ze};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ue){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ct(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Et(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ue}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;let t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){let e=this.properties,i=[...Mt(e),...Tt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(be(s))}else t!==void 0&&e.push(be(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ie(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:ve).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ve;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??ze)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[G("elementProperties")]=new Map,y[G("finalized")]=new Map,Ot?.({ReactiveElement:y}),(ee.reactiveElementVersions??=[]).push("2.1.2");var $e=globalThis,Fe=n=>n,te=$e.trustedTypes,je=te?te.createPolicy("lit-html",{createHTML:n=>n}):void 0,ye="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+x,Dt=`<${xe}>`,E=document,q=()=>E.createComment(""),X=n=>n===null||typeof n!="object"&&typeof n!="function",ke=Array.isArray,qe=n=>ke(n)||typeof n?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Ve=/>/g,R=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),We=/'/g,Ge=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Ae=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=Ae(1),gi=Ae(2),fi=Ae(3),k=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ke=new WeakMap,C=E.createTreeWalker(E,129);function Ze(n,t){if(!ke(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(t):t}var Ye=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=K;for(let a=0;a<e;a++){let l=n[a],u,m,d=-1,g=0;for(;g<l.length&&(o.lastIndex=g,m=o.exec(l),m!==null);)g=o.lastIndex,o===K?m[1]==="!--"?o=Be:m[1]!==void 0?o=Ve:m[2]!==void 0?(Xe.test(m[2])&&(s=RegExp("</"+m[2],"g")),o=R):m[3]!==void 0&&(o=R):o===R?m[0]===">"?(o=s??K,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?R:m[3]==='"'?Ge:We):o===Ge||o===We?o=R:o===Be||o===Ve?o=K:(o=R,s=void 0);let p=o===R&&n[a+1].startsWith("/>")?" ":"";r+=o===K?l+Dt:d>=0?(i.push(u),l.slice(0,d)+ye+l.slice(d)+x+p):l+x+(d===-2?a:p)}return[Ze(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Z=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[u,m]=Ye(t,e);if(this.el=n.createElement(u,i),C.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=C.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(ye)){let g=m[o++],p=s.getAttribute(d).split(x),c=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:c[2],strings:p,ctor:c[1]==="."?se:c[1]==="?"?ne:c[1]==="@"?re:T}),s.removeAttribute(d)}else d.startsWith(x)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(Xe.test(s.tagName)){let d=s.textContent.split(x),g=d.length-1;if(g>0){s.textContent=te?te.emptyScript:"";for(let p=0;p<g;p++)s.append(d[p],q()),C.nextNode(),l.push({type:2,index:++r});s.append(d[g],q())}}}else if(s.nodeType===8)if(s.data===xe)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(x,d+1))!==-1;)l.push({type:7,index:r}),d+=x.length-1}r++}}static createElement(t,e){let i=E.createElement("template");return i.innerHTML=t,i}};function M(n,t,e=n,i){if(t===k)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=X(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=M(n,s._$AS(n,t.values),s,i)),t}var ie=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??E).importNode(e,!0);C.currentNode=s;let r=C.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new P(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new oe(r,this,t)),this._$AV.push(u),l=i[++a]}o!==l?.index&&(r=C.nextNode(),o++)}return C.currentNode=E,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},P=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),X(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&X(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Z.createElement(Ze(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new ie(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Ke.get(t.strings);return e===void 0&&Ke.set(t.strings,e=new Z(t)),e}k(t){ke(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(q()),this.O(q()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Fe(t).nextSibling;Fe(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=M(this,t,e,0),o=!X(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let a=t,l,u;for(t=r[0],l=0;l<r.length-1;l++)u=M(this,a[i+l],e,l),u===k&&(u=this._$AH[l]),o||=!X(u)||u!==this._$AH[l],u===h?t=h:t!==h&&(t+=(u??"")+r[l+1]),this._$AH[l]=u}o&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},se=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},ne=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},re=class extends T{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??h)===k)return;let i=this._$AH,s=t===h&&i!==h||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},oe=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}},Je={M:ye,P:x,A:xe,C:1,L:Ye,R:ie,D:qe,V:M,I:P,H:T,N:ne,U:re,B:se,F:oe},Lt=$e.litHtmlPolyfillSupport;Lt?.(Z,P),($e.litHtmlVersions??=[]).push("3.3.3");var Qe=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new P(t.insertBefore(q(),r),r,void 0,e??{})}return s._$AI(n),s};var Se=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};$._$litElement$=!0,$.finalized=!0,Se.litElementHydrateSupport?.({LitElement:$});var It=Se.litElementPolyfillSupport;It?.({LitElement:$});(Se.litElementVersions??=[]).push("4.2.2");var et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},tt=n=>(...t)=>({_$litDirective$:n,values:t}),ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Ht}=Je,it=n=>n;var st=()=>document.createComment(""),O=(n,t,e)=>{let i=n._$AA.parentNode,s=t===void 0?n._$AB:t._$AA;if(e===void 0){let r=i.insertBefore(st(),s),o=i.insertBefore(st(),s);e=new Ht(r,o,n,n.options)}else{let r=e._$AB.nextSibling,o=e._$AM,a=o!==n;if(a){let l;e._$AQ?.(n),e._$AM=n,e._$AP!==void 0&&(l=n._$AU)!==o._$AU&&e._$AP(l)}if(r!==s||a){let l=e._$AA;for(;l!==r;){let u=it(l).nextSibling;it(i).insertBefore(l,s),l=u}}}return e},A=(n,t,e=n)=>(n._$AI(t,e),n),Ut={},nt=(n,t=Ut)=>n._$AH=t,rt=n=>n._$AH,le=n=>{n._$AR(),n._$AA.remove()};var ot=(n,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(n[s],s);return i},at=tt(class extends ae{constructor(n){if(super(n),n.type!==et.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],r=[],o=0;for(let a of n)s[o]=i?i(a,o):o,r[o]=e(a,o),o++;return{values:r,keys:s}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,i]){let s=rt(n),{values:r,keys:o}=this.dt(t,e,i);if(!Array.isArray(s))return this.ut=o,r;let a=this.ut??=[],l=[],u,m,d=0,g=s.length-1,p=0,c=r.length-1;for(;d<=g&&p<=c;)if(s[d]===null)d++;else if(s[g]===null)g--;else if(a[d]===o[p])l[p]=A(s[d],r[p]),d++,p++;else if(a[g]===o[c])l[c]=A(s[g],r[c]),g--,c--;else if(a[d]===o[c])l[c]=A(s[d],r[c]),O(n,l[c+1],s[d]),d++,c--;else if(a[g]===o[p])l[p]=A(s[g],r[p]),O(n,s[d],s[g]),g--,p++;else if(u===void 0&&(u=ot(o,p,c),m=ot(a,d,g)),u.has(a[d]))if(u.has(a[g])){let _=m.get(o[p]),w=_!==void 0?s[_]:null;if(w===null){let b=O(n,s[d]);A(b,r[p]),l[p]=b}else l[p]=A(w,r[p]),O(n,s[d],w),s[_]=null;p++}else le(s[g]),g--;else le(s[d]),d++;for(;p<=c;){let _=O(n,l[c+1]);A(_,r[p]),l[p++]=_}for(;d<=g;){let _=s[d++];_!==null&&le(_)}return this.ut=o,nt(n,l),k}});var Y=class{constructor(t={}){this.previous=new Map;this.rates=new Map;this.staleMs=t.staleMs??3e5,this.maxMbps=t.maxMbps??1e6}update(t,e,i){if(!Number.isFinite(e)||!Number.isFinite(i)||e<0)return this.rates.get(t)??null;let s=this.previous.get(t);if(this.previous.set(t,{bytes:e,at:i}),!s)return null;let r=(i-s.at)/1e3;if(r<=0)return this.rates.get(t)??null;if(r*1e3>this.staleMs)return this.rates.delete(t),null;let o=e-s.bytes;o<0&&(o=e);let a=o*8/(r*1e6);if(!Number.isFinite(a)||a>this.maxMbps)return this.rates.get(t)??null;let l={mbps:a,at:i};return this.rates.set(t,l),l}get(t){return this.rates.get(t)}prune(t,e){for(let[i,s]of this.rates)e-s.at>t&&this.rates.delete(i);for(let[i,s]of this.previous)e-s.at>t&&this.previous.delete(i)}clear(){this.previous.clear(),this.rates.clear()}};var zt={"":1,k:1e3,m:1e6,g:1e9,t:1e12,p:1e15},Ft={"":1,ki:1024,mi:1024**2,gi:1024**3,ti:1024**4,pi:1024**5},lt={kilo:"k",mega:"m",giga:"g",tera:"t",peta:"p",kibi:"ki",mebi:"mi",gibi:"gi",tebi:"ti",pebi:"pi",ki:"ki",mi:"mi",gi:"gi",ti:"ti",pi:"pi",k:"k",m:"m",g:"g",t:"t",p:"p","":""},jt=/^(.*?)(?:\/sec(?:ond)?s?|\/s|persec|persecond|ps)$/i;function Bt(n){let t=/^(kilo|mega|giga|tera|peta|kibi|mebi|gibi|tebi|pebi|ki|mi|gi|ti|pi|k|m|g|t|p)?(bits?|bytes?)$/i.exec(n);if(t){let i=lt[(t[1]??"").toLowerCase()];return i===void 0?null:{prefix:i,bytes:t[2].toLowerCase().startsWith("byte")}}let e=/^([a-zA-Z]{0,2})(b|B|o)$/.exec(n);if(e){let i=lt[e[1].toLowerCase()];return i===void 0?null:{prefix:i,bytes:e[2]!=="b"}}return null}function dt(n){if(n==null)return null;let t=String(n).trim().replace(/\s+/g,"");if(!t)return null;let e=!1,i=jt.exec(t);i&&i[1]&&(e=!0,t=i[1]);let s=Bt(t);if(!s)return null;let r=s.prefix.endsWith("i"),o=(r?Ft:zt)[s.prefix];if(!o)return null;let a=s.bytes?o:o/8;return{kind:e?"rate":"counter",factor:e?a*8/1e6:a,binary:r,unit:String(n)}}function D(n,t,e=0){let i=t==="MBps"?n/8:n,s=i>=100?0:e;return new Intl.NumberFormat(void 0,{minimumFractionDigits:0,maximumFractionDigits:s}).format(Number.isFinite(i)?i:0)}var Vt=/\b(download|downloads|down|dl|rx|recv|receive[ds]?|receiving|inbound|ingress|in|nedladdning|herunterladen|descarga)\b/i,Wt=/\b(upload|uploads|up|ul|tx|send|sent|transmit(ted|ting)?|outbound|egress|out|uppladdning|hochladen|subida)\b/i,Gt=/speed|rate|bandwidth|download|upload|throughput|traffic|mbps|kbps|gbps/i,Kt=/_(rx|tx)$/i,qt=/\b(disk|storage|hdd|ssd|drive|memory|ram|swap|cpu|gpu|fan|temperature)\b/i,ct=/\b(wan|wan6|lan|wlan|guest|vpn|nordvpn|wireguard|openvpn|ipsec|tun\d*|wg\d*|pppoe\d*|interface|iface|opt\d+|bridge|uplink|internet|eth\d+|igb\d+|em\d+|re\d+|vtnet\d+|lagg\d+|br\d+|bond\d+|port\s?\d+|if\s?\d+|sfp\d*|xe-?\d+|ae\d+|swp\d+|te\d+|ge\d+)\b/i,Xt=/\b(download|downloads|upload|uploads|down|up|dl|ul|rx|tx|in|out|receive[ds]?|sent|transmit(ted|ting)?|inbound|outbound|ingress|egress|speed|rate|throughput|bandwidth|traffic|total|bytes?|current|now|utilization|utilisation)\b/gi;function Zt(n){let t=n.replace(/[_.]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2"),e=Vt.test(t),i=Wt.test(t);return e===i?null:e?"download":"upload"}function ut(n){let t=n.replace(/\s+/g," ").trim();return t.replace(Xt," ").replace(/[\s|:_–-]{2,}/g," ").replace(/^[\s|:_–-]+|[\s|:_–-]+$/g,"").replace(/\s{2,}/g," ").trim()||t}function Yt(n){let t=ut(n);return t.replace(/\b(in|out|rx|tx|sent|recv|received|bytes?|kbps|mbps|gbps|bps|per|second|sec)\b/gi," ").replace(/[\s|:_–-]{2,}/g," ").replace(/^[\s|:_–-]+|[\s|:_–-]+$/g,"").replace(/\s{2,}/g," ").trim()||t}var Jt=[[/\bnordvpn\b/i,"NordVPN"],[/\bwireguard\b|\bwg(\d+)\b/i,n=>n[1]?`WireGuard ${n[1]}`:"WireGuard"],[/\bopenvpn\b/i,"OpenVPN"],[/\bipsec\b/i,"IPsec"],[/\btailscale\b/i,"Tailscale"],[/\bvpn\b/i,"VPN"],[/\bwan6\b/i,"WAN6"],[/\bwan\b/i,"WAN"],[/\bwlan(\d*)\b/i,n=>`WLAN${n[1]??""}`],[/\blan(\d*)\b/i,n=>`LAN${n[1]??""}`],[/\bopt(\d+)\b/i,n=>`OPT${n[1]}`],[/\bpppoe\b/i,"PPPoE"],[/\bguest\b/i,"Guest"],[/\btun(\d+)\b/i,n=>`TUN${n[1]}`],[/\b(eth|igb|em|re|vtnet|lagg|br|bond|pppoe|port|if|sfp|xe|ae|swp|te|ge)\s?(\d+)\b/i,n=>`${n[1].toUpperCase()}${n[2]}`]];function Qt(n,t,e){let s=`${(n.includes(".")?n.slice(n.indexOf(".")+1):n).replace(/_/g," ")} ${t}`;for(let[r,o]of Jt){let a=r.exec(s);if(a)return typeof o=="function"?o(a):o}return e}function ei(n,t,e){let i=typeof t.friendly_name=="string"?t.friendly_name:"";return[n,i,e].filter(Boolean).join(" ")}function pt(n,t){let e=n.entities??{},i=n.states??{},s=new Set(t.include_entities??[]),r=new Set(t.exclude_entities??[]),o=(t.exclude_patterns??[]).map(c=>{try{return new RegExp(c,"i")}catch{return null}}).filter(c=>c!==null),a=t.include_integrations??[],l=t.exclude_integrations??[],u=t.name_overrides??{},m=t.hide_rx_tx!==!1,d=new Map;for(let c of t.pairs??[])c.download&&d.set(c.download,{pair:c,direction:"download"}),c.upload&&d.set(c.upload,{pair:c,direction:"upload"});let g=[],p=new Set;for(let c of Object.keys(i)){if(p.has(c)||r.has(c))continue;let _=d.get(c);if(m&&!_&&Kt.test(c)||o.some(Oe=>Oe.test(c)))continue;let w=i[c],b=e[c];if(!w||b?.disabled_by||b?.hidden_by||s.size>0&&!s.has(c)&&!_)continue;let ce=b?.platform??"unknown";if(a.length>0&&!a.includes(ce)&&!_||l.includes(ce)&&!_)continue;let H=w.attributes??{},St=H.unit_of_measurement??b?.unit_of_measurement??void 0,U=dt(St);if(!U)continue;let ue=H.device_class??b?.original_device_class??b?.device_class??void 0,pe=ei(c,H,String(b?.translation_key??"")),z=pe.replace(/[._]/g," ");if(U.kind==="counter"){if(!(ue==="data_size"||/total|traffic|bytes|counter|transferred|usage|volume/i.test(pe)))continue}else if(ue!=="data_rate"&&!Gt.test(z)&&!ct.test(z))continue;if(ue!=="data_rate"&&qt.test(z))continue;let Me=_?.direction??Zt(pe);if(!Me)continue;let Te=b?.device_id?n.devices?.[b.device_id]:void 0,Ne=_?.pair.name??u[c]??H.friendly_name??b?.name??b?.original_name??Te?.name_by_user??Te?.name??c,Pe=_?.pair.name??u[c]??ut(String(Ne)),me=ct.test(`${c.replace(/[._]/g," ")} ${z}`);g.push({entityId:c,deviceId:b?.device_id??void 0,platform:ce,direction:Me,kind:U.kind,factor:U.factor,unit:U.unit,name:Pe,icon:_?.pair.icon??H.icon??b?.icon??void 0,entityCategory:b?.entity_category??void 0,manual:!!_,aggregate:me,label:me?Qt(c,z,Yt(String(Ne))):Pe,confidence:me?.6:_?1:.9}),p.add(c)}return g}function mt(n){let t=new Set;for(let e of Object.values(n.entities??{}))e.platform&&t.add(e.platform);return[...t].sort()}var N=new Map;function ti(n,t=100,e=24){if(n.length===0)return"";let i=Math.min(...n),r=Math.max(...n)-i||1;return n.map((o,a)=>{let l=n.length===1?0:a/(n.length-1)*t,u=e-(o-i)/r*(e-2)-1;return`${l.toFixed(1)},${u.toFixed(1)}`}).join(" ")}async function ht(n,t,e={}){let{minutes:i=60,width:s=100,height:r=24,ttl:o=6e4}=e;if(t.length===0)return{};N.size>500&&N.clear();let a=Date.now(),l=t.filter(m=>{let d=N.get(m);return!d||a-d.at>o});if(l.length>0)try{let m=await n.callWS({type:"history/history_during_period",start_time:new Date(a-i*6e4).toISOString(),end_time:new Date(a).toISOString(),entity_ids:l,minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let d of l){let g=m?.[d];if(!Array.isArray(g)){N.delete(d);continue}let p=g.map(c=>Number(c.s??c.state)).filter(c=>Number.isFinite(c));N.set(d,{at:a,points:p})}}catch{for(let m of l)N.delete(m);return{}}let u={};for(let m of t){let d=N.get(m);!d||d.points.length<2||(u[m]=ti(d.points,s,r))}return u}function ii(n){if(n==null)return null;let t=String(n).trim();if(t===""||t==="unavailable"||t==="unknown")return null;let e=Number(t);return Number.isFinite(e)?e:null}function si(n){for(let t of[n.last_updated,n.last_changed]){if(!t)continue;let e=Date.parse(t);if(Number.isFinite(e))return e}return null}function gt(n,t,e){let{now:i,staleAfterMs:s,tracker:r}=e,o=[];for(let a of t){let l=n.states[a.entityId],u={entityId:a.entityId,deviceId:a.deviceId,name:a.name,icon:a.icon,direction:a.direction,entityIds:[a.entityId],isCounter:a.kind==="counter",unit:a.unit,aggregate:a.aggregate,label:a.label};if(!l){o.push({...u,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let m=ii(l.state);if(m===null||m<0){o.push({...u,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let d=si(l);if(a.kind==="rate"){let _=m*a.factor;if(!Number.isFinite(_)){o.push({...u,mbps:null,sampledAt:d,ageMs:null,status:"unavailable"});continue}let w=d===null?null:Math.max(0,i-d);o.push({...u,mbps:_,sampledAt:d,ageMs:w,status:w!==null&&w>s?"stale":"ok"});continue}let g=m*a.factor,p=d===null?null:r.update(`${a.entityId}:${a.factor}`,g,d),c=p===null?null:Math.max(0,i-p.at);o.push({...u,mbps:p?.mbps??null,sampledAt:p?.at??null,ageMs:c,status:p===null?"warmup":c!==null&&c>s?"stale":"ok"})}return o}function ft(n,t,e){let{now:i,holdMs:s}=e;return n.map(r=>{if(r.mbps!==null)return r.mbps>0&&r.sampledAt!==null&&t.set(r.entityId,{mbps:r.mbps,at:r.sampledAt}),r;if(s<=0)return r;let o=t.get(r.entityId);if(!o)return r;let a=Math.max(0,i-o.at);return a>s?(t.delete(r.entityId),r):{...r,mbps:o.mbps,sampledAt:o.at,ageMs:a,status:"stale"}})}function _t(n){let t=new Map;for(let e of n){if(!e.aggregate)continue;let i=e.label||e.name,s=i.toLowerCase(),r=t.get(s)??{label:i};e.direction==="download"?(e.mbps??-1)>(r.download?.mbps??-1)&&(r.download=e):(e.mbps??-1)>(r.upload?.mbps??-1)&&(r.upload=e),r.icon||(r.icon=e.icon),t.set(s,r)}return[...t.values()].sort((e,i)=>(i.download?.mbps??i.upload?.mbps??0)-(e.download?.mbps??e.upload?.mbps??0))}function ni(n){let t=new Map;for(let e of n){let i=e.deviceId?`d:${e.deviceId}:${e.direction}`:`e:${e.entityId}`,s=t.get(i);if(!s){t.set(i,{reading:{...e,entityIds:[...e.entityIds]},entityIds:[...e.entityIds]});continue}if(s.entityIds.push(...e.entityIds),(e.mbps??-1)>(s.reading.mbps??-1)){let r=s.entityIds;s.reading={...e,entityIds:r}}else s.reading.entityIds=s.entityIds}return[...t.values()]}function Re(n,t,e){let i=n.filter(p=>p.mbps!==null&&Number.isFinite(p.mbps)),r=[...t==="device"?ni(i).map(p=>p.reading):i].sort((p,c)=>{let _=(c.mbps??0)-(p.mbps??0);return e.sort==="asc"?-_:_}),o=r.slice(0,Math.max(0,e.limit)),a=e.maxSpeed&&e.maxSpeed>0?e.maxSpeed:0,l=r.reduce((p,c)=>Math.max(p,c.mbps??0),0),u=a>0?a:Math.max(l,1),m=e.warnThreshold??75,d=e.criticalThreshold??90;return{rows:o.map((p,c)=>{let _=Math.min(1,Math.max(0,(p.mbps??0)/u)),w=_*100,b=a>0&&w>=d?"critical":a>0&&w>=m?"warn":"normal";return{rank:c+1,reading:p,ratio:_,level:b}}),total:o.reduce((p,c)=>p+(c.mbps??0),0),scale:u,candidates:r.length}}var bt=W`
  :host {
    --nsm-dl: 59, 157, 255;
    --nsm-ul: 34, 197, 94;
    --nsm-fg: var(--primary-text-color, #e6eaf2);
    --nsm-muted: var(--secondary-text-color, #93a0b4);
    --nsm-border: color-mix(in srgb, var(--nsm-fg) 13%, transparent);
    --nsm-surface: color-mix(in srgb, var(--nsm-fg) 4%, transparent);
    --nsm-surface-2: color-mix(in srgb, var(--nsm-fg) 7%, transparent);
    --nsm-track: color-mix(in srgb, var(--nsm-fg) 11%, transparent);
    display: block;
    container-type: inline-size;
  }

  /* Light HA themes get slightly deeper accents so bars and text keep contrast. */
  .wrap.light {
    --nsm-dl: 26, 115, 232;
    --nsm-ul: 22, 163, 74;
    --nsm-surface: color-mix(in srgb, var(--nsm-fg) 3.5%, transparent);
    --nsm-surface-2: color-mix(in srgb, var(--nsm-fg) 6%, transparent);
    --nsm-track: color-mix(in srgb, var(--nsm-fg) 9%, transparent);
  }

  .wrap.light .chip.live {
    color: #15803d;
  }

  .wrap.light .logo {
    background: linear-gradient(135deg, rgba(var(--nsm-dl), 0.16), rgba(var(--nsm-ul), 0.14));
  }

  .wrap.light .menu {
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
  }

  .wrap.light .panel.download {
    border-color: rgba(var(--nsm-dl), 0.25);
  }

  .wrap.light .panel.upload {
    border-color: rgba(var(--nsm-ul), 0.28);
  }

  ha-card {
    overflow: visible;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.3rem 1rem;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
    flex-wrap: wrap;
    margin-bottom: 0.1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-width: 0;
  }

  .logo {
    width: 2.95rem;
    height: 2.95rem;
    flex: 0 0 auto;
    border-radius: 0.85rem;
    display: grid;
    place-items: center;
    color: var(--nsm-fg);
    background: linear-gradient(
      135deg,
      rgba(var(--nsm-dl), 0.28),
      rgba(var(--nsm-ul), 0.2)
    );
    border: 1px solid var(--nsm-border);
  }

  .logo ha-icon {
    --mdc-icon-size: 1.85rem;
  }

  .brand h1 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--nsm-fg);
    line-height: 1.15;
  }

  .brand p {
    margin: 0.28rem 0 0;
    font-size: 0.86rem;
    color: var(--nsm-muted);
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    height: 2.45rem;
    padding: 0 0.8rem;
    border-radius: 0.75rem;
    border: 1px solid var(--nsm-border);
    background: var(--nsm-surface-2);
    color: var(--nsm-fg);
    font-size: 0.86rem;
    font-family: inherit;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .chip:hover {
    background: color-mix(in srgb, var(--nsm-fg) 11%, transparent);
  }

  .chip ha-icon {
    --mdc-icon-size: 1.15rem;
    color: var(--nsm-muted);
  }

  .chip select {
    all: unset;
    cursor: pointer;
    font: inherit;
    color: var(--nsm-fg);
    padding-right: 0.1rem;
  }

  .chip.live {
    border-color: rgba(var(--nsm-ul), 0.45);
    background: rgba(var(--nsm-ul), 0.12);
    color: rgb(var(--nsm-ul));
    font-weight: 600;
  }

  .chip.paused {
    border-color: rgba(245, 158, 11, 0.5);
    background: rgba(245, 158, 11, 0.14);
    color: #f59e0b;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 25%, transparent);
    flex: 0 0 auto;
  }

  .menu-wrap {
    position: relative;
  }

  .menu {
    position: absolute;
    right: 0;
    top: 2.5rem;
    z-index: 6;
    min-width: 13.5rem;
    padding: 0.3rem;
    border-radius: 0.7rem;
    border: 1px solid var(--nsm-border);
    background: var(--ha-card-background, var(--card-background-color, #171c25));
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .menu button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.6rem;
    border-radius: 0.45rem;
    font-size: 0.82rem;
    color: var(--nsm-fg);
    cursor: pointer;
  }

  .menu button:hover,
  .menu button:focus-visible {
    background: var(--nsm-surface-2);
  }

  .menu .value {
    color: var(--nsm-muted);
    font-size: 0.78rem;
  }

  .menu .hint {
    padding: 0.35rem 0.6rem 0.15rem;
    font-size: 0.7rem;
    color: var(--nsm-muted);
    line-height: 1.35;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.6rem;
    border-radius: 0.6rem;
    border: 1px solid var(--nsm-border);
    background: var(--nsm-surface-2);
  }

  .search ha-icon {
    --mdc-icon-size: 1rem;
    color: var(--nsm-muted);
  }

  .search input {
    all: unset;
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.85rem;
    font-family: inherit;
    color: var(--nsm-fg);
  }

  .panels {
    display: grid;
    gap: 1rem;
  }

  .panels.columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* Stack the rankings based on the card width, not the window width, so a
     narrow dashboard column gets the same treatment as a phone. */
  @container (max-width: 720px) {
    .panels.columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @container (max-width: 560px) {
    .row {
      grid-template-columns: 1.4rem 1.3rem minmax(0, 1fr) minmax(1.5rem, 1.1fr) auto !important;
      gap: 0.45rem;
    }

    .age {
      display: none;
    }

    .wrap {
      padding: 0.9rem 0.8rem 0.75rem;
    }
  }

  .interfaces {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 0.45rem;
  }

  .iface {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    padding: 0.4rem 0.55rem;
    border: 1px solid var(--nsm-border);
    border-radius: 0.6rem;
    background: var(--nsm-surface);
  }

  .iface-head {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    min-width: 0;
  }

  .iface-head ha-icon {
    --mdc-icon-size: 0.95rem;
    color: var(--nsm-muted);
  }

  .iface-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--nsm-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .iface-age {
    margin-left: auto;
    font-size: 0.66rem;
    color: var(--nsm-muted);
    white-space: nowrap;
  }

  .iface-values {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .iface-value {
    display: inline-flex;
    align-items: center;
    gap: 0.18rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .iface-value ha-icon {
    --mdc-icon-size: 0.8rem;
  }

  .iface-value.download {
    color: rgb(var(--nsm-dl));
  }

  .iface-value.upload {
    color: rgb(var(--nsm-ul));
  }

  .iface-value .u {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--nsm-muted);
    margin-left: 0.2rem;
  }

  .panel {
    border: 1px solid var(--nsm-border);
    border-radius: 1rem;
    padding: 0.95rem 1.05rem 0.65rem;
    background: var(--nsm-surface);
  }

  .panel.download {
    background:
      radial-gradient(130% 120% at 0% 0%, rgba(var(--nsm-dl), 0.12), transparent 62%),
      var(--nsm-surface);
    border-color: rgba(var(--nsm-dl), 0.22);
  }

  .panel.upload {
    background:
      radial-gradient(130% 120% at 0% 0%, rgba(var(--nsm-ul), 0.12), transparent 62%),
      var(--nsm-surface);
    border-color: rgba(var(--nsm-ul), 0.22);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.55rem;
  }

  .panel-title {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
  }

  .badge {
    width: 2.45rem;
    height: 2.45rem;
    flex: 0 0 auto;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
  }

  .download .badge {
    background: linear-gradient(140deg, rgba(var(--nsm-dl), 0.95), rgba(var(--nsm-dl), 0.55));
    box-shadow: 0 6px 16px rgba(var(--nsm-dl), 0.3);
  }

  .upload .badge {
    background: linear-gradient(140deg, rgba(var(--nsm-ul), 0.95), rgba(var(--nsm-ul), 0.5));
    box-shadow: 0 6px 16px rgba(var(--nsm-ul), 0.28);
  }

  .badge ha-icon {
    --mdc-icon-size: 1.6rem;
  }

  .panel h2 {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--nsm-fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel .unit {
    font-size: 0.8rem;
    color: var(--nsm-muted);
    flex: 0 0 auto;
  }

  .rows {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .row {
    display: grid;
    grid-template-columns: var(--nsm-cols, 1.5rem 1.5rem minmax(0, 1.25fr) minmax(2.5rem, 1.15fr) auto 3.4rem);
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0.2rem;
    border-radius: 0.5rem;
  }

  .rank {
    text-align: center;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--nsm-muted);
    font-variant-numeric: tabular-nums;
  }

  .icon {
    --mdc-icon-size: 1.25rem;
    color: var(--nsm-fg);
    opacity: 0.85;
    justify-self: center;
  }

  .name {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
    font-size: 0.98rem;
    color: var(--nsm-fg);
  }

  .name .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name .dot {
    width: 0.4rem;
    height: 0.4rem;
    box-shadow: none;
  }

  .track {
    height: 0.78rem;
    border-radius: 999px;
    background: var(--nsm-track);
    overflow: hidden;
    min-width: 2.5rem;
  }

  .track.history {
    background: transparent;
    height: 0.8rem;
    overflow: visible;
  }

  .track.history .spark {
    height: 100%;
  }

  .fill {
    display: block;
    height: 100%;
    min-width: 2px;
    border-radius: 999px;
    transition:
      width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1),
      background 0.3s ease;
  }

  .download .fill {
    background: linear-gradient(90deg, rgba(var(--nsm-dl), 0.65), rgb(var(--nsm-dl)));
  }

  .upload .fill {
    background: linear-gradient(90deg, rgba(var(--nsm-ul), 0.6), rgb(var(--nsm-ul)));
  }

  .value {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--nsm-fg);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    justify-self: end;
  }

  .value .u {
    margin-left: 0.2rem;
    font-size: 0.74rem;
    font-weight: 500;
    color: var(--nsm-muted);
  }

  .age {
    font-size: 0.74rem;
    color: var(--nsm-muted);
    white-space: nowrap;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .row.stale .value,
  .row.stale .name {
    opacity: 0.62;
  }

  .spark {
    width: 100%;
    height: 0.75rem;
    display: block;
    overflow: visible;
  }

  .spark polyline {
    fill: none;
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .empty {
    padding: 1.1rem 0.5rem 1rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--nsm-muted);
    line-height: 1.45;
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    align-items: center;
    border: 1px solid var(--nsm-border);
    border-radius: 1rem;
    background: var(--nsm-surface);
    padding: 0.85rem 0.75rem;
  }

  .totals.single {
    grid-template-columns: minmax(0, 1fr);
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.1rem 0.5rem;
  }

  .total + .total {
    border-left: 1px solid var(--nsm-border);
  }

  .total .glyph {
    --mdc-icon-size: 1.65rem;
    flex: 0 0 auto;
  }

  .total.download .glyph {
    color: rgb(var(--nsm-dl));
  }

  .total.upload .glyph {
    color: rgb(var(--nsm-ul));
  }

  .total .label {
    font-size: 0.78rem;
    color: var(--nsm-muted);
    line-height: 1.3;
  }

  .total .amount {
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--nsm-fg);
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }

  .total .amount .u {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--nsm-muted);
    margin-left: 0.22rem;
  }

  @container (max-width: 460px) {
    .totals {
      grid-template-columns: minmax(0, 1fr);
    }

    .totals:not(.single) .total + .total {
      border-left: 0;
      border-top: 1px solid var(--nsm-border);
      padding-top: 0.55rem;
    }

    .brand h1 {
      font-size: 1.3rem;
    }
  }

  .debug {
    font-size: 0.72rem;
    color: var(--nsm-muted);
    border: 1px dashed var(--nsm-border);
    border-radius: 0.6rem;
    padding: 0.4rem 0.6rem;
  }

  .debug summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--nsm-fg);
  }

  .debug ul {
    margin: 0.4rem 0 0;
    padding-left: 1rem;
    max-height: 12rem;
    overflow: auto;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    line-height: 1.5;
  }

  .debug strong {
    font-weight: 600;
    color: var(--nsm-fg);
  }

  .wrap.compact {
    padding: 0.9rem 0.95rem 0.8rem;
    gap: 0.75rem;
  }

  .wrap.compact .brand h1 {
    font-size: 1.25rem;
  }

  .wrap.compact .brand p {
    display: none;
  }

  .wrap.compact .logo {
    width: 2.45rem;
    height: 2.45rem;
  }

  .wrap.compact .panel {
    padding: 0.7rem 0.8rem 0.45rem;
  }

  .wrap.compact .row {
    padding: 0.28rem 0.1rem;
  }

  .wrap.compact .badge {
    width: 2rem;
    height: 2rem;
  }

  .wrap.compact .badge ha-icon {
    --mdc-icon-size: 1.3rem;
  }

  .wrap.compact .panel h2 {
    font-size: 1rem;
  }

  .wrap.compact .name,
  .wrap.compact .value {
    font-size: 0.9rem;
  }

  .wrap.compact .track {
    height: 0.6rem;
  }

  .wrap.compact .totals {
    padding: 0.65rem 0.5rem;
  }

  .wrap.compact .total .amount {
    font-size: 1.25rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .fill,
    .row {
      transition: none !important;
      animation: none !important;
    }
  }
`;function Ce(n){if(n==null||!Number.isFinite(n)||n<0)return"\u2014";let t=Math.floor(n/1e3);if(t<1)return"now";if(t<60)return`${t}s ago`;let e=Math.floor(t/60);if(e<60)return`${e}m ago`;let i=Math.floor(e/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}function vt(n){if(n==null||!Number.isFinite(n)||n<0)return"No reading available";let t=Math.floor(n/1e3);if(t<1)return"less than a second ago";let e=Math.floor(t/86400),i=Math.floor(t%86400/3600),s=Math.floor(t%3600/60),r=t%60,o=[];return e&&o.push(`${e} d`),i&&o.push(`${i} h`),s&&o.push(`${s} min`),r&&!e&&o.push(`${r} s`),`${o.join(" ")} ago`}function de(n,t){let e=(n??"").trim(),i=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!i)return de(t,"3b9dff");let s=i[1];s.length===3&&(s=s.split("").map(o=>o+o).join(""));let r=parseInt(s,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`}function Ee(n,t){let e=(n??"").trim();return/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)?e.startsWith("#")?e:`#${e}`:t}var ri=[[/(nordvpn|\bvpn\b|wireguard|openvpn|ipsec|tunnel|\btun\d*\b|\bwg\d*\b)/i,"mdi:vpn"],[/(\bwan\b|internet|uplink|broadband)/i,"mdi:earth"],[/(wlan|wi-?fi|guest)/i,"mdi:wifi"],[/(\blan\b|bridge)/i,"mdi:lan"],[/(iphone|phone|mobile|pixel|galaxy|android)/i,"mdi:cellphone"],[/(ipad|tablet)/i,"mdi:tablet"],[/(television|apple ?tv|chromecast|roku|\btv\b)/i,"mdi:television"],[/(laptop|macbook|notebook|thinkpad|chromebook)/i,"mdi:laptop"],[/(desktop|workstation|\bpc\b|imac|computer)/i,"mdi:monitor"],[/(synology|qnap|\bnas\b|server|proxmox|unraid)/i,"mdi:server"],[/(camera|\bnvr\b|reolink|hikvision|frigate)/i,"mdi:cctv"],[/(printer)/i,"mdi:printer"],[/(playstation|xbox|console|nintendo|\bswitch\b)/i,"mdi:gamepad-variant"],[/(router|gateway|access ?point|\bswitch\b|\bap\b|hub)/i,"mdi:router-network"],[/(cloud|backup)/i,"mdi:cloud-outline"],[/(speaker|sonos|alexa|echo)/i,"mdi:speaker"],[/(watch)/i,"mdi:watch"],[/(raspberry|\bpi\b)/i,"mdi:raspberry-pi"]];function wt(n){for(let[t,e]of ri)if(t.test(n))return e;return"mdi:devices"}function $t(n,t,e){let i=typeof n=="number"?n:Number(n);return Number.isFinite(i)?t.reduce((s,r)=>Math.abs(r-i)<Math.abs(s-i)?r:s,e):e}function yt(n){return Number.isFinite(n??NaN)?n:0}var L=class extends ${constructor(){super(...arguments);this._tracker=new Y({maxMbps:1e6});this._hold=new Map;this._sparkToken=0;this._lastEval=0;this._paused=!1;this._menu=!1;this._filter="";this._onVisibilityChange=()=>{document.visibilityState!=="visible"||this._paused||(this._clearTimer(),this._evaluate(),this._schedule())}}static getStubConfig(){return{type:`custom:${S}`,title:"Network Speed Monitor",subtitle:"Top 10 devices by download and upload speed"}}static getConfigElement(){return document.createElement("network-speed-monitor-editor")}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration for network-speed-monitor");let i=this._config;this._config={...v,...e},this._sources=void 0,this._hold.clear(),this._tracker=new Y({staleMs:Math.max(this._staleAfterMs,6e4),maxMbps:1e6}),i?.unit!==this._config.unit&&(this._unitOverride=void 0),i?.compact!==this._config.compact&&(this._compactOverride=void 0),i?.ranking_size!==this._config.ranking_size&&(this._limitOverride=void 0),i?.refresh_interval!==this._config.refresh_interval&&(this._refreshOverride=void 0),this._filter="",this._clearTimer(),this.isConnected&&(this._evaluate(),this._schedule())}get hass(){return this._hass}set hass(e){let i=this._hass;this._hass=e,!(!e||!this._config)&&(!i||!this._view?(this._evaluate(),this._schedule()):this._schedule())}getCardSize(){let e=this._view?Math.max(this._view.download.rows.length,this._view.upload.rows.length):this._limit;return 2+Math.ceil(e*.55)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this._onVisibilityChange),this._hass&&this._config&&(this._evaluate(),this._schedule())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this._onVisibilityChange),this._clearTimer(),this._sparkTimer!==void 0&&(window.clearTimeout(this._sparkTimer),this._sparkTimer=void 0),this._sparkToken+=1,this._removeDocListener()}get _limit(){return $t(this._limitOverride??this._config?.ranking_size,j,v.ranking_size)}get _refreshSeconds(){return $t(this._refreshOverride??this._config?.refresh_interval,B,v.refresh_interval)}get _unit(){return this._unitOverride??this._config?.unit??v.unit}get _compact(){return this._compactOverride??this._config?.compact??v.compact}get _staleAfterMs(){let e=Number(this._config?.stale_after??v.stale_after);return(Number.isFinite(e)&&e>0?e:v.stale_after)*1e3}get _holdSeconds(){let e=Number(this._config?.hold_seconds??v.hold_seconds);return Number.isFinite(e)&&e>=0?e:v.hold_seconds}get _isDark(){return typeof this._hass?.themes?.darkMode=="boolean"?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get _configOrDefault(){return this._config??v}get _downloadColor(){return Ee(this._config?.download_color,ge)}get _uploadColor(){return Ee(this._config?.upload_color,fe)}_evaluate(){let e=this._hass,i=this._config;if(!e||!i)return;(e.entities!==this._registryRef||!this._sources)&&(this._registryRef=e.entities,this._sources=pt(e,i));let s=Date.now(),r=gt(e,this._sources,{now:s,staleAfterMs:this._staleAfterMs,tracker:this._tracker}),o=ft(r,this._hold,{now:s,holdMs:this._holdSeconds*1e3}),a={limit:this._limit,sort:i.sort_direction??v.sort_direction,maxSpeed:Number(i.max_speed)>0?Number(i.max_speed):void 0,warnThreshold:i.warn_threshold??v.warn_threshold,criticalThreshold:i.critical_threshold??v.critical_threshold},l=i.scope??v.scope,u=i.aggregates??v.aggregates,m=u==="inline"?o:o.filter(d=>!d.aggregate);this._view={download:Re(m.filter(d=>d.direction==="download"),l,a),upload:Re(m.filter(d=>d.direction==="upload"),l,a),aggregates:u==="off"?[]:_t(o),generatedAt:s,sourceCount:o.length,activeCount:o.filter(d=>d.mbps!==null).length},this._lastEval=s,this._tracker.prune(Math.max(this._staleAfterMs*4,6e5),s),this._maybeLoadSparklines()}_clearTimer(){this._timer!==void 0&&(window.clearTimeout(this._timer),this._timer=void 0)}_schedule(e){if(this._paused||!this.isConnected||this._timer!==void 0)return;let i=this._refreshSeconds*1e3,s=Date.now()-this._lastEval,r=e??(s>=i?0:i-s);this._timer=window.setTimeout(()=>{this._timer=void 0,!(!this.isConnected||this._paused)&&(this._evaluate(),this._schedule(i))},r)}_maybeLoadSparklines(e=!1){let i=this._config,s=this._hass,r=this._view;!i?.show_sparkline||!s?.callWS||!r||!e&&this._sparkTimer!==void 0||(this._sparkTimer!==void 0&&window.clearTimeout(this._sparkTimer),this._sparkTimer=window.setTimeout(async()=>{this._sparkTimer=void 0;let o=this._view;if(!o||!this._hass)return;let a=[...o.download.rows,...o.upload.rows].filter(m=>!m.reading.isCounter).slice(0,12).map(m=>m.reading.entityId);if(a.length===0)return;let l=++this._sparkToken,u=await ht(this._hass,a,{minutes:60,ttl:6e4});l!==this._sparkToken||!this.isConnected||(this._spark=u)},e?0:6e4))}_togglePause(){this._paused=!this._paused,this._paused?this._clearTimer():(this._evaluate(),this._schedule())}_toggleMenu(){this._menu=!this._menu,this._menu?(this._docListener=e=>{e.composedPath().includes(this)||(this._menu=!1,this._removeDocListener())},document.addEventListener("pointerdown",this._docListener)):this._removeDocListener()}_removeDocListener(){this._docListener&&(document.removeEventListener("pointerdown",this._docListener),this._docListener=void 0)}_onRefreshChanged(e){let i=Number(e.target.value);Number.isFinite(i)&&(this._refreshOverride=i,this._clearTimer(),this._schedule())}_setLimit(e){this._limitOverride=e,this._menu=!1,this._removeDocListener(),this._evaluate()}_toggleUnit(){this._unitOverride=this._unit==="Mbps"?"MBps":"Mbps"}_toggleCompact(){this._compactOverride=!this._compact}_openEditor(){this._menu=!1,this._removeDocListener(),customElements.get("hui-dialog-edit-card")&&this.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"hui-dialog-edit-card",dialogImport:()=>Promise.resolve(),dialogParams:{card:this,cardConfig:this._config}}}))}_defaultSubtitle(){let e=this._configOrDefault.show??"both";return e==="download"?`Top ${this._limit} devices by download speed`:e==="upload"?`Top ${this._limit} devices by upload speed`:`Top ${this._limit} devices by download and upload speed`}_wrapClass(){return`wrap ${this._compact?"compact":""} ${this._isDark?"dark":"light"}`}_wrapStyle(){let e=de(this._downloadColor,ge),i=de(this._uploadColor,fe);return`--nsm-dl:${e};--nsm-ul:${i};`}_iconFor(e){return e.icon??wt(e.name)}_columns(){let e=this._configOrDefault,i=[];return e.show_rank!==!1&&i.push("1.5rem"),e.show_icons!==!1&&i.push("1.5rem"),i.push("minmax(4.5rem, 1.25fr)"),e.show_bars!==!1&&i.push("minmax(2rem, 1.15fr)"),i.push("auto"),e.show_timestamps!==!1&&i.push("3.4rem"),i.join(" ")}_filtered(e){let i=this._filter.trim().toLowerCase();return(i?e.filter(r=>r.reading.name.toLowerCase().includes(i)):e).map((r,o)=>({...r,rank:o+1}))}_renderRow(e,i,s){let r=this._configOrDefault,o=e.reading,a=this._unit,l=D(o.mbps??0,a,r.decimals??0),u=r.show_sparkline?this._spark?.[o.entityId]:void 0,m=e.level==="critical"?"#ef4444":e.level==="warn"?"#f59e0b":void 0,d=`${o.name} \xB7 ${l} ${a} \xB7 ${o.entityId} \xB7 sensor updated ${vt(o.ageMs)}`;return f`
      <li
        class="row ${o.status==="stale"?"stale":""}"
        data-key=${`${i}:${o.entityId}`}
        title=${d}
      >
        ${r.show_rank!==!1?f`<span class="rank">${e.rank}</span>`:h}
        ${r.show_icons!==!1?f`<ha-icon class="icon" .icon=${this._iconFor(o)}></ha-icon>`:h}
        <span class="name">
          ${r.show_status&&o.status!=="ok"?f`<span
                class="dot"
                style=${`color:${o.status==="stale"?"#f59e0b":"#94a3b8"}`}
              ></span>`:h}
          <span class="text">${o.name}</span>
        </span>
        ${r.show_bars!==!1?u?f`<span class="track history">
                <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <polyline points=${u} stroke=${s}></polyline>
                </svg>
              </span>`:f`<span class="track">
                <span
                  class="fill"
                  style=${`width:${(e.ratio*100).toFixed(1)}%;${m?`background:${m};`:""}`}
                ></span>
              </span>`:h}
        <span class="value">${l}<span class="u">${a}</span></span>
        ${r.show_timestamps!==!1?f`<span class="age">${Ce(o.ageMs)}</span>`:h}
      </li>
    `}_renderAggregate(e){let i=this._configOrDefault,s=this._unit,r=i.decimals??0,o=[e.download?.ageMs,e.upload?.ageMs].filter(l=>l!=null),a=o.length?Math.min(...o):null;return f`
      <div class="iface">
        <div class="iface-head">
          <ha-icon .icon=${e.icon??wt(e.label)}></ha-icon>
          <span class="iface-name">${e.label}</span>
          ${i.show_timestamps!==!1?f`<span class="iface-age">${Ce(a)}</span>`:h}
        </div>
        <div class="iface-values">
          ${e.download?.mbps!==null&&e.download?.mbps!==void 0?f`<span class="iface-value download">
                <ha-icon icon="mdi:arrow-down-bold"></ha-icon>
                ${D(e.download.mbps,s,r)}<span class="u">${s}</span>
              </span>`:h}
          ${e.upload?.mbps!==null&&e.upload?.mbps!==void 0?f`<span class="iface-value upload">
                <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                ${D(e.upload.mbps,s,r)}<span class="u">${s}</span>
              </span>`:h}
        </div>
      </div>
    `}_renderAggregates(){let e=this._configOrDefault;if(e.aggregates==="off"||e.aggregates==="inline")return h;let i=Math.max(0,Number(e.aggregates_max??v.aggregates_max)),s=(e.aggregates_include??[]).map(o=>o.toLowerCase()),r=(this._view?.aggregates??[]).filter(o=>s.length===0||s.includes(o.label.toLowerCase())).slice(0,i);return r.length===0?h:f`<div class="interfaces">${r.map(o=>this._renderAggregate(o))}</div>`}_renderDebug(){let e=this._sources??[],i=e.filter(s=>!s.aggregate);return f`
      <details class="debug">
        <summary>${e.length} sensors discovered · ${i.length} ranked</summary>
        <ul>
          ${e.map(s=>f`<li>
              <strong>${s.entityId}</strong> · ${s.direction} · ${s.kind} ·
              ${s.aggregate?`interface "${s.label}"`:"device"}${s.manual?" \xB7 manual":""}
            </li>`)}
        </ul>
      </details>
    `}_renderPanel(e,i){let s=this._filtered(i.rows),r=e==="download"?this._downloadColor:this._uploadColor,o=e==="download"?`Top ${this._limit} Download`:`Top ${this._limit} Upload`,a=e==="download"?"mdi:arrow-down-bold":"mdi:arrow-up-bold",l=this._unit;return f`
      <section class="panel ${e}">
        <header class="panel-head">
          <div class="panel-title">
            <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
            <h2 title="Per-device speed as reported by each device's own sensor. WAN and VPN totals are shown in the interface row.">
              ${o}
            </h2>
          </div>
          <span class="unit">${l}</span>
        </header>
        ${s.length>0?f`<ol class="rows" style=${`--nsm-cols:${this._columns()}`}>
              ${at(s,u=>`${e}:${u.reading.entityId}`,u=>this._renderRow(u,e,r))}
            </ol>`:this._renderEmpty(e)}
      </section>
    `}_renderEmpty(e){let i=this._view,s=this._configOrDefault,r=!!(s.include_entities&&s.include_entities.length||s.include_integrations&&s.include_integrations.length||s.pairs&&s.pairs.length),o="No compatible bandwidth sensors discovered yet.";return i&&i.sourceCount>0?o=this._filter.trim().length>0?"No devices match your search.":"Waiting for the first reading of the selected sensors.":r?o=`No ${e} sensors match the current filters. Open the card editor to adjust the selection.`:o="No compatible bandwidth sensors found. Open the card editor to select sensors manually or to restrict the integrations.",f`<p class="empty">${o}</p>`}_renderTotals(e,i,s,r){let o=this._configOrDefault,a=this._unit,l=o.show!=="upload",u=o.show!=="download";return f`
      <footer class="totals ${!(l&&u)?"single":""}">
          ${l?f`<div class="total download" title="Sum of the download values of the devices shown above. This is not the WAN total - the WAN and VPN interfaces are listed separately.">
              <ha-icon class="glyph" icon="mdi:download"></ha-icon>
              <div>
                <div class="label">Total Download (Top ${s})</div>
                <div class="amount">${D(e,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:h}
        ${u?f`<div class="total upload" title="Sum of the upload values of the devices shown above. This is not the WAN total - the WAN and VPN interfaces are listed separately.">
              <ha-icon class="glyph" icon="mdi:upload"></ha-icon>
              <div>
                <div class="label">Total Upload (Top ${r})</div>
                <div class="amount">${D(i,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:h}
      </footer>
    `}_renderHeader(){let e=this._configOrDefault,i=e.title??"Network Speed Monitor",s=e.subtitle??this._defaultSubtitle();return f`
      <div class="head">
        <div class="brand">
          <div class="logo"><ha-icon icon="mdi:lan-connect"></ha-icon></div>
          <div>
            <h1>${i}</h1>
            <p>${s}</p>
          </div>
        </div>
        <div class="tools">
          <button
            class="chip live ${this._paused?"paused":""}"
            @click=${this._togglePause}
            title=${this._paused?"Resume display updates":"Pause display updates"}
          >
            <span class="dot"></span>${this._paused?"Paused":"Live"}
          </button>
          <label class="chip refresh" title="Display refresh interval">
            <ha-icon icon="mdi:refresh"></ha-icon>
            <span>Refresh:</span>
            <select @change=${this._onRefreshChanged}>
              ${B.map(r=>f`<option value=${String(r)} ?selected=${r===this._refreshSeconds}>
                  ${r}s
                </option>`)}
            </select>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </label>
          <div class="menu-wrap">
            <button
              class="chip"
              @click=${this._toggleMenu}
              aria-label="Display settings"
              aria-expanded=${this._menu?"true":"false"}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
            ${this._menu?this._renderMenu():h}
          </div>
        </div>
      </div>
    `}_renderMenu(){return f`
      <div class="menu" role="menu">
        <button role="menuitem" @click=${this._togglePause}>
          <span>${this._paused?"Resume updates":"Pause updates"}</span>
          <span class="value">${this._paused?"Paused":"Live"}</span>
        </button>
        <button role="menuitem" @click=${this._toggleUnit}>
          <span>Display unit</span>
          <span class="value">${this._unit}</span>
        </button>
        <button role="menuitem" @click=${this._toggleCompact}>
          <span>Compact mode</span>
          <span class="value">${this._compact?"On":"Off"}</span>
        </button>
        ${j.map(e=>f`<button role="menuitem" @click=${()=>this._setLimit(e)}>
            <span>Top ${e}</span>
            <span class="value">${this._limit===e?"\u2713":""}</span>
          </button>`)}
        <button role="menuitem" @click=${this._openEditor}><span>Edit card…</span></button>
        <div class="hint">
          Display settings apply to this view. Ranking size, sensors and defaults live in the card
          editor.
        </div>
      </div>
    `}_renderSearch(){return f`
      <div class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder="Filter devices"
          .value=${this._filter}
          @input=${e=>{this._filter=e.target.value}}
        />
      </div>
    `}render(){let e=this._config;if(!e)return f`
        <ha-card>
          <div class="wrap">
            <p class="empty">
              Network Speed Monitor ${F}: waiting for card configuration…
            </p>
          </div>
        </ha-card>
      `;let i=this._view,s=e.show!=="upload",r=e.show!=="download",a=s&&r&&(e.layout??"auto")!=="stacked",l=i?this._filtered(i.download.rows):[],u=i?this._filtered(i.upload.rows):[],m=l.reduce((g,p)=>g+yt(p.reading.mbps),0),d=u.reduce((g,p)=>g+yt(p.reading.mbps),0);return f`
      <ha-card>
        <div class=${this._wrapClass()} style=${this._wrapStyle()}>
          ${this._renderHeader()} ${e.show_search?this._renderSearch():h}
          <div class="panels ${a?"columns":""}">
            ${s?this._renderPanel("download",i?.download??xt()):h}
            ${r?this._renderPanel("upload",i?.upload??xt()):h}
          </div>
          ${this._renderAggregates()}
          ${e.debug?this._renderDebug():h}
          ${e.show_totals!==!1?this._renderTotals(m,d,l.length,u.length):h}
        </div>
      </ha-card>
    `}updated(){let e=this.renderRoot.querySelectorAll(".row"),i=new Map;e.forEach(r=>{let o=r.dataset.key;o&&i.set(o,r.getBoundingClientRect().top)});let s=this._rowPositions;this._rowPositions=i,s&&(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||e.forEach(r=>{let o=r.dataset.key;if(!o)return;let a=s.get(o),l=i.get(o);a===void 0||l===void 0||a===l||typeof r.animate=="function"&&r.animate([{transform:`translateY(${a-l}px)`},{transform:"translateY(0)"}],{duration:320,easing:"cubic-bezier(0.22, 0.61, 0.36, 1)"})}))}};L.styles=bt,L.properties={_view:{state:!0},_paused:{state:!0},_menu:{state:!0},_filter:{state:!0},_spark:{state:!0},_unitOverride:{state:!0},_compactOverride:{state:!0},_limitOverride:{state:!0},_refreshOverride:{state:!0}};function xt(){return{rows:[],total:0,scale:1,candidates:0}}var kt={type:`custom:${S}`,name:"Network Speed Monitor",description:"Top 10 live download and upload rankings for your network devices.",preview:!1,documentationURL:"https://github.com/nikeng-forenade/ha-network-speed-monitor",version:F};var oi={title:"Card title",subtitle:"Card subtitle",show:"Rankings to show",layout:"Layout",ranking_size:"Ranking size",refresh_interval:"Refresh interval",unit:"Display unit",decimals:"Decimals",sort_direction:"Sort direction",scope:"Aggregation scope",aggregates:"WAN / VPN sensors",aggregates_max:"Max interfaces shown",hide_rx_tx:"Hide RX/TX sensors",show_bars:"Show speed bars",show_rank:"Show ranking numbers",show_timestamps:"Show reading age",show_icons:"Show device icons",show_totals:"Show Top totals",show_search:"Show device filter",show_status:"Show stale reading indicator",show_sparkline:"Show 1 h sparklines",compact:"Compact mode",max_speed:"Bar scale (max Mbps)",warn_threshold:"Warning threshold (%)",critical_threshold:"Critical threshold (%)",stale_after:"Reading considered stale after (s)",hold_seconds:"Keep last value when a sensor drops out (s)",download_color:"Download color",upload_color:"Upload color",include_integrations:"Only use these integrations",exclude_integrations:"Ignore these integrations",include_entities:"Only use these sensors",exclude_entities:"Exclude these sensors"},ai={ranking_size:"How many rows each ranking shows.",refresh_interval:"How often the card re-renders. Sensors update on their own schedule; this only affects the display.",scope:"Per device keeps one row per device (highest sensor wins) to avoid counting an interface and a device sensor twice.",aggregates:"Interface sensors (WAN, LAN, NordVPN, WireGuard, \u2026) belong to the whole network. Show them in their own strip, rank them with the devices, or ignore them.",aggregates_max:"How many interface cards to show, highest traffic first.",hide_rx_tx:"Sensors whose entity id ends in _rx or _tx are usually router/switch ports. They are ignored by default; disable this if your per-device sensors use those names.",max_speed:"Bars are scaled to this value. Leave at 0 to scale bars relative to the fastest device.",warn_threshold:"Percentage of the bar scale where a bar turns orange (needs a bar scale).",critical_threshold:"Percentage of the bar scale where a bar turns red (needs a bar scale).",stale_after:"Sensors that have not reported for this long are dimmed.",hold_seconds:"When a sensor turns unavailable (device off, Wi-Fi drop, integration reload) its last speed is kept, dimmed, for this long so the ranking does not jump. Set to 0 to remove rows immediately.",include_integrations:"Empty means all integrations are considered.",include_entities:"Empty means sensors are discovered automatically.",show_sparkline:"Requires the Home Assistant recorder for the selected sensors."},At=["download_color","upload_color"];function li(n){if(Array.isArray(n)&&n.length===3){let[t,e,i]=n.map(s=>Number(s)||0);return`#${[t,e,i].map(s=>s.toString(16).padStart(2,"0")).join("")}`}if(typeof n=="string")return n}function di(n){if(!n)return;let t=/^#?([0-9a-f]{6})$/i.exec(n.trim());if(!t)return;let e=parseInt(t[1],16);return[e>>16&255,e>>8&255,e&255]}var I=class extends ${constructor(){super(...arguments);this._computeLabel=e=>oi[e.name]??e.name;this._computeHelper=e=>ai[e.name]}setConfig(e){this._configState={...e}}get hass(){return this._hass}set hass(e){this._hass=e,this.requestUpdate()}get config(){return this._configState}_data(){let e=this._configState??{},i={...e};for(let s of At)i[s]=di(e[s]);return i.include_entities=e.include_entities??[],i.exclude_entities=e.exclude_entities??[],i.include_integrations=e.include_integrations??[],i.exclude_integrations=e.exclude_integrations??[],i}_schema(){let e=this._hass?mt(this._hass).map(i=>({value:i,label:i})):[];return[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"show",selector:{select:{mode:"dropdown",options:[{value:"both",label:"Download and upload"},{value:"download",label:"Download only"},{value:"upload",label:"Upload only"}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (stack on mobile)"},{value:"columns",label:"Two columns"},{value:"stacked",label:"Stacked"}]}}},{name:"ranking_size",selector:{select:{mode:"dropdown",options:j.map(i=>({value:i,label:`Top ${i}`}))}}},{name:"refresh_interval",selector:{select:{mode:"dropdown",options:B.map(i=>({value:i,label:`${i} second${i===1?"":"s"}`}))}}},{name:"unit",selector:{select:{mode:"dropdown",options:[{value:"Mbps",label:"Mbps (megabits per second)"},{value:"MBps",label:"MB/s (megabytes per second)"}]}}},{name:"decimals",selector:{number:{min:0,max:3,mode:"box",step:1}}},{name:"sort_direction",selector:{select:{mode:"dropdown",options:[{value:"desc",label:"Highest speed first"},{value:"asc",label:"Lowest speed first"}]}}},{name:"scope",selector:{select:{mode:"dropdown",options:[{value:"entity",label:"Per sensor"},{value:"device",label:"Per device (highest sensor)"}]}}},{name:"aggregates",selector:{select:{mode:"dropdown",options:[{value:"separate",label:"Separate WAN / VPN strip"},{value:"inline",label:"Rank with the devices"},{value:"off",label:"Ignore interface sensors"}]}}},{name:"show_bars",selector:{boolean:{}}},{name:"aggregates_max",selector:{number:{min:1,max:20,mode:"box",step:1}}},{name:"show_rank",selector:{boolean:{}}},{name:"show_timestamps",selector:{boolean:{}}},{name:"show_icons",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"hide_rx_tx",selector:{boolean:{}}},{name:"show_sparkline",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"max_speed",selector:{number:{min:0,max:1e5,mode:"box",unit_of_measurement:"Mbps"}}},{name:"warn_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"critical_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"stale_after",selector:{number:{min:10,max:86400,mode:"box",unit_of_measurement:"s"}}},{name:"hold_seconds",selector:{number:{min:0,max:3600,mode:"box",unit_of_measurement:"s"}}},{name:"download_color",selector:{color_rgb:{}}},{name:"upload_color",selector:{color_rgb:{}}},{name:"include_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"exclude_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"include_entities",selector:{entity:{multiple:!0}}},{name:"exclude_entities",selector:{entity:{multiple:!0}}}]}_commit(e){this._configState={...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._configState},bubbles:!0,composed:!0}))}_valueChanged(e){e.stopPropagation();let i={...e.detail.value};for(let s of At)s in i&&(i[s]=li(i[s]));for(let s of["include_entities","exclude_entities","include_integrations","exclude_integrations"]){let r=i[s];Array.isArray(r)&&r.length===0&&delete i[s]}(i.max_speed===""||i.max_speed===void 0)&&delete i.max_speed,this._commit({...this._configState??{},...i})}_patchPair(e,i){let s=this._configState??{},r=[...s.pairs??[]],a={...r[e]??{},...i};for(let l of Object.keys(a))a[l]||delete a[l];Object.keys(a).length===0?r.splice(e,1):r[e]=a,this._commit({...s,pairs:r})}_addPair(){let e=this._configState??{};this._commit({...e,pairs:[...e.pairs??[],{}]})}_removePair(e){let i=this._configState??{},s=[...i.pairs??[]];s.splice(e,1),this._commit({...i,pairs:s.length?s:void 0})}_patchOverride(e,i,s){let r=this._configState??{},o={...r.name_overrides??{}};s&&s!==e&&delete o[s],e&&i?o[e]=i:e&&!i&&delete o[e],this._commit({...r,name_overrides:Object.keys(o).length?o:void 0})}_removeOverride(e){let i=this._configState??{},s={...i.name_overrides??{}};delete s[e],this._commit({...i,name_overrides:Object.keys(s).length?s:void 0})}_renderPairs(){let e=this._configState?.pairs??[];return f`
      <div class="section">
        <div class="section-head">
          <h3>Manual download / upload pairing</h3>
          <button @click=${this._addPair}>Add pair</button>
        </div>
        <p class="hint">
          Optional. Use this for devices where the download and upload sensors cannot be matched
          automatically, or to force a friendly name and icon.
        </p>
        ${e.map((i,s)=>f`
            <div class="pair">
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${i.name??""}
                .label=${"Name"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(s,{name:r.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${i.download??""}
                .label=${"Download sensor"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(s,{download:r.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${i.upload??""}
                .label=${"Upload sensor"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(s,{upload:r.detail.value})}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removePair(s)}>Remove</button>
            </div>
          `)}
      </div>
    `}_renderOverrides(){let e=this._configState?.name_overrides??{},i=Object.entries(e);return f`
      <div class="section">
        <div class="section-head">
          <h3>Device name overrides</h3>
          <button
            @click=${()=>{let s=this._configState??{},r=(s.include_entities??[])[0]??"";this._commit({...s,name_overrides:{...e,[r||"sensor.example"]:""}})}}
          >
            Add override
          </button>
        </div>
        <p class="hint">Rename a sensor in the rankings without renaming the entity itself.</p>
        ${i.map(([s,r])=>f`
            <div class="override">
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${s}
                .label=${"Sensor"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(o.detail.value,r,s)}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${r}
                .label=${"Display name"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(s,o.detail.value,s)}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removeOverride(s)}>Remove</button>
            </div>
          `)}
      </div>
    `}render(){return this._hass?f`
      <div class="editor">
        <ha-form
          .hass=${this._hass}
          .data=${this._data()}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderPairs()} ${this._renderOverrides()}
      </div>
    `:h}};I.styles=W`
    .editor {
      display: block;
    }

    .section {
      margin-top: 1rem;
      padding-top: 0.8rem;
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.35rem;
    }

    .section h3 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .hint {
      margin: 0 0 0.6rem;
      font-size: 0.78rem;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }

    button {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.16));
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      color: var(--primary-text-color);
      border-radius: 0.5rem;
      padding: 0.3rem 0.65rem;
      font: inherit;
      font-size: 0.8rem;
      cursor: pointer;
    }

    button:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    button.remove {
      align-self: end;
      color: var(--error-color, #c62828);
    }

    .pair,
    .override {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr auto;
      gap: 0.5rem;
      align-items: end;
      margin-bottom: 0.6rem;
    }

    .override {
      grid-template-columns: 1fr 1fr auto;
    }

    @media (max-width: 700px) {
      .pair,
      .override {
        grid-template-columns: 1fr;
      }
    }
  `,I.properties={_configState:{state:!0}};customElements.get(S)||customElements.define(S,L);customElements.get(he)||customElements.define(he,I);window.customCards=window.customCards??[];window.customCards.some(n=>n.type===S)||window.customCards.push(kt);console.info(`%c NETWORK SPEED MONITOR %c ${F} `,"color:#fff;background:#1a73e8;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#1a73e8;background:#e8f0fe;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");
//# sourceMappingURL=network-speed-monitor.js.map
