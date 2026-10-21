/*! ha-network-speed-monitor v1.2.1 | MIT License */
var Y="1.2.1",R="network-speed-monitor",ue="network-speed-monitor-editor",z=[5,10,15,20],F=[1,2,5,10,15,30,60],pe="#3b9dff",me="#22c55e",b={show:"both",layout:"auto",ranking_size:10,refresh_interval:5,unit:"Mbps",decimals:0,show_bars:!0,show_rank:!0,show_timestamps:!0,show_icons:!0,show_totals:!0,show_search:!1,show_status:!0,show_sparkline:!1,compact:!1,sort_direction:"desc",scope:"entity",aggregates:"separate",stale_after:300,hold_seconds:60,warn_threshold:75,critical_threshold:90};var X=globalThis,J=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),Te=new WeakMap,j=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Te.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Te.set(e,t))}return t}toString(){return this.cssText}},Ne=n=>new j(typeof n=="string"?n:n+"",void 0,he),B=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new j(e,n,he)},Oe=(n,t)=>{if(J)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=X.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},ge=J?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ne(e)})(n):n;var{is:xt,defineProperty:At,getOwnPropertyDescriptor:kt,getOwnPropertyNames:St,getOwnPropertySymbols:Rt,getPrototypeOf:Ct}=Object,Q=globalThis,Pe=Q.trustedTypes,Et=Pe?Pe.emptyScript:"",Mt=Q.reactiveElementPolyfillSupport,V=(n,t)=>n,fe={toAttribute(n,t){switch(t){case Boolean:n=n?Et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Le=(n,t)=>!xt(n,t),De={attribute:!0,type:String,converter:fe,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),Q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=De){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&At(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=kt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let a=i?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??De}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let e=this.properties,s=[...St(e),...Rt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ge(i))}else t!==void 0&&e.push(ge(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:fe).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:fe;this._$Em=i;let a=o.fromAttribute(e,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Le)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[V("elementProperties")]=new Map,y[V("finalized")]=new Map,Mt?.({ReactiveElement:y}),(Q.reactiveElementVersions??=[]).push("2.1.2");var be=globalThis,Ie=n=>n,ee=be.trustedTypes,He=ee?ee.createPolicy("lit-html",{createHTML:n=>n}):void 0,ve="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+x,Tt=`<${we}>`,M=document,G=()=>M.createComment(""),K=n=>n===null||typeof n!="object"&&typeof n!="function",$e=Array.isArray,Ve=n=>$e(n)||typeof n?.[Symbol.iterator]=="function",_e=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ue=/-->/g,ze=/>/g,C=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,je=/"/g,We=/^(?:script|style|textarea|title)$/i,ye=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=ye(1),us=ye(2),ps=ye(3),A=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Be=new WeakMap,E=M.createTreeWalker(M,129);function Ge(n,t){if(!$e(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return He!==void 0?He.createHTML(t):t}var Ke=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=W;for(let a=0;a<e;a++){let l=n[a],c,m,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,m=o.exec(l),m!==null);)u=o.lastIndex,o===W?m[1]==="!--"?o=Ue:m[1]!==void 0?o=ze:m[2]!==void 0?(We.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=C):m[3]!==void 0&&(o=C):o===C?m[0]===">"?(o=i??W,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,c=m[1],o=m[3]===void 0?C:m[3]==='"'?je:Fe):o===je||o===Fe?o=C:o===Ue||o===ze?o=W:(o=C,i=void 0);let p=o===C&&n[a+1].startsWith("/>")?" ":"";r+=o===W?l+Tt:d>=0?(s.push(c),l.slice(0,d)+ve+l.slice(d)+x+p):l+x+(d===-2?a:p)}return[Ge(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[c,m]=Ke(t,e);if(this.el=n.createElement(c,s),E.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=E.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(ve)){let u=m[o++],p=i.getAttribute(d).split(x),h=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:h[2],strings:p,ctor:h[1]==="."?se:h[1]==="?"?ie:h[1]==="@"?ne:N}),i.removeAttribute(d)}else d.startsWith(x)&&(l.push({type:6,index:r}),i.removeAttribute(d));if(We.test(i.tagName)){let d=i.textContent.split(x),u=d.length-1;if(u>0){i.textContent=ee?ee.emptyScript:"";for(let p=0;p<u;p++)i.append(d[p],G()),E.nextNode(),l.push({type:2,index:++r});i.append(d[u],G())}}}else if(i.nodeType===8)if(i.data===we)l.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(x,d+1))!==-1;)l.push({type:7,index:r}),d+=x.length-1}r++}}static createElement(t,e){let s=M.createElement("template");return s.innerHTML=t,s}};function T(n,t,e=n,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=K(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=T(n,i._$AS(n,t.values),i,s)),t}var te=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);E.currentNode=i;let r=E.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new P(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new re(r,this,t)),this._$AV.push(c),l=s[++a]}o!==l?.index&&(r=E.nextNode(),o++)}return E.currentNode=M,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},P=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),K(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ve(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&K(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Ge(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new te(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Be.get(t.strings);return e===void 0&&Be.set(t.strings,e=new q(t)),e}k(t){$e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(G()),this.O(G()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Ie(t).nextSibling;Ie(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=T(this,t,e,0),o=!K(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let a=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=T(this,a[s+l],e,l),c===A&&(c=this._$AH[l]),o||=!K(c)||c!==this._$AH[l],c===g?t=g:t!==g&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},se=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}},ie=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}},ne=class extends N{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??g)===A)return;let s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},re=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}},qe={M:ve,P:x,A:we,C:1,L:Ke,R:te,D:Ve,V:T,I:P,H:N,N:ie,U:ne,B:se,F:re},Nt=be.litHtmlPolyfillSupport;Nt?.(q,P),(be.litHtmlVersions??=[]).push("3.3.3");var Ze=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new P(t.insertBefore(G(),r),r,void 0,e??{})}return i._$AI(n),i};var xe=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,xe.litElementHydrateSupport?.({LitElement:$});var Ot=xe.litElementPolyfillSupport;Ot?.({LitElement:$});(xe.litElementVersions??=[]).push("4.2.2");var Ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xe=n=>(...t)=>({_$litDirective$:n,values:t}),oe=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Pt}=qe,Je=n=>n;var Qe=()=>document.createComment(""),D=(n,t,e)=>{let s=n._$AA.parentNode,i=t===void 0?n._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(Qe(),i),o=s.insertBefore(Qe(),i);e=new Pt(r,o,n,n.options)}else{let r=e._$AB.nextSibling,o=e._$AM,a=o!==n;if(a){let l;e._$AQ?.(n),e._$AM=n,e._$AP!==void 0&&(l=n._$AU)!==o._$AU&&e._$AP(l)}if(r!==i||a){let l=e._$AA;for(;l!==r;){let c=Je(l).nextSibling;Je(s).insertBefore(l,i),l=c}}}return e},k=(n,t,e=n)=>(n._$AI(t,e),n),Dt={},et=(n,t=Dt)=>n._$AH=t,tt=n=>n._$AH,ae=n=>{n._$AR(),n._$AA.remove()};var st=(n,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(n[i],i);return s},it=Xe(class extends oe{constructor(n){if(super(n),n.type!==Ye.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],r=[],o=0;for(let a of n)i[o]=s?s(a,o):o,r[o]=e(a,o),o++;return{values:r,keys:i}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,s]){let i=tt(n),{values:r,keys:o}=this.dt(t,e,s);if(!Array.isArray(i))return this.ut=o,r;let a=this.ut??=[],l=[],c,m,d=0,u=i.length-1,p=0,h=r.length-1;for(;d<=u&&p<=h;)if(i[d]===null)d++;else if(i[u]===null)u--;else if(a[d]===o[p])l[p]=k(i[d],r[p]),d++,p++;else if(a[u]===o[h])l[h]=k(i[u],r[h]),u--,h--;else if(a[d]===o[h])l[h]=k(i[d],r[h]),D(n,l[h+1],i[d]),d++,h--;else if(a[u]===o[p])l[p]=k(i[u],r[p]),D(n,i[d],i[u]),u--,p++;else if(c===void 0&&(c=st(o,p,h),m=st(a,d,u)),c.has(a[d]))if(c.has(a[u])){let _=m.get(o[p]),v=_!==void 0?i[_]:null;if(v===null){let w=D(n,i[d]);k(w,r[p]),l[p]=w}else l[p]=k(v,r[p]),D(n,i[d],v),i[_]=null;p++}else ae(i[u]),u--;else ae(i[d]),d++;for(;p<=h;){let _=D(n,l[h+1]);k(_,r[p]),l[p++]=_}for(;d<=u;){let _=i[d++];_!==null&&ae(_)}return this.ut=o,et(n,l),A}});var Z=class{constructor(t={}){this.previous=new Map;this.rates=new Map;this.staleMs=t.staleMs??3e5,this.maxMbps=t.maxMbps??1e6}update(t,e,s){if(!Number.isFinite(e)||!Number.isFinite(s)||e<0)return this.rates.get(t)??null;let i=this.previous.get(t);if(this.previous.set(t,{bytes:e,at:s}),!i)return null;let r=(s-i.at)/1e3;if(r<=0)return this.rates.get(t)??null;if(r*1e3>this.staleMs)return this.rates.delete(t),null;let o=e-i.bytes;o<0&&(o=e);let a=o*8/(r*1e6);if(!Number.isFinite(a)||a>this.maxMbps)return this.rates.get(t)??null;let l={mbps:a,at:s};return this.rates.set(t,l),l}get(t){return this.rates.get(t)}prune(t,e){for(let[s,i]of this.rates)e-i.at>t&&this.rates.delete(s);for(let[s,i]of this.previous)e-i.at>t&&this.previous.delete(s)}clear(){this.previous.clear(),this.rates.clear()}};var Lt={"":1,k:1e3,m:1e6,g:1e9,t:1e12,p:1e15},It={"":1,ki:1024,mi:1024**2,gi:1024**3,ti:1024**4,pi:1024**5},nt={kilo:"k",mega:"m",giga:"g",tera:"t",peta:"p",kibi:"ki",mebi:"mi",gibi:"gi",tebi:"ti",pebi:"pi",ki:"ki",mi:"mi",gi:"gi",ti:"ti",pi:"pi",k:"k",m:"m",g:"g",t:"t",p:"p","":""},Ht=/^(.*?)(?:\/sec(?:ond)?s?|\/s|persec|persecond|ps)$/i;function Ut(n){let t=/^(kilo|mega|giga|tera|peta|kibi|mebi|gibi|tebi|pebi|ki|mi|gi|ti|pi|k|m|g|t|p)?(bits?|bytes?)$/i.exec(n);if(t){let s=nt[(t[1]??"").toLowerCase()];return s===void 0?null:{prefix:s,bytes:t[2].toLowerCase().startsWith("byte")}}let e=/^([a-zA-Z]{0,2})(b|B|o)$/.exec(n);if(e){let s=nt[e[1].toLowerCase()];return s===void 0?null:{prefix:s,bytes:e[2]!=="b"}}return null}function rt(n){if(n==null)return null;let t=String(n).trim().replace(/\s+/g,"");if(!t)return null;let e=!1,s=Ht.exec(t);s&&s[1]&&(e=!0,t=s[1]);let i=Ut(t);if(!i)return null;let r=i.prefix.endsWith("i"),o=(r?It:Lt)[i.prefix];if(!o)return null;let a=i.bytes?o:o/8;return{kind:e?"rate":"counter",factor:e?a*8/1e6:a,binary:r,unit:String(n)}}function L(n,t,e=0){let s=t==="MBps"?n/8:n,i=s>=100?0:e;return new Intl.NumberFormat(void 0,{minimumFractionDigits:0,maximumFractionDigits:i}).format(Number.isFinite(s)?s:0)}var zt=/\b(download|downloads|down|dl|rx|recv|receive[ds]?|receiving|inbound|ingress|in|nedladdning|herunterladen|descarga)\b/i,Ft=/\b(upload|uploads|up|ul|tx|send|sent|transmit(ted|ting)?|outbound|egress|out|uppladdning|hochladen|subida)\b/i,jt=/speed|rate|bandwidth|download|upload|throughput|traffic|mbps|kbps|gbps/i,Bt=/\b(disk|storage|hdd|ssd|drive|memory|ram|swap|cpu|gpu|fan|temperature)\b/i,ot=/\b(wan|wan6|lan|wlan|guest|vpn|nordvpn|wireguard|openvpn|ipsec|tun\d*|wg\d*|pppoe|interface|iface|opt\d+|bridge|uplink|internet)\b/i,Vt=/\b(download|downloads|upload|uploads|down|up|dl|ul|rx|tx|in|out|receive[ds]?|sent|transmit(ted|ting)?|inbound|outbound|ingress|egress|speed|rate|throughput|bandwidth|traffic|total|bytes?|current|now|utilization|utilisation)\b/gi;function Wt(n){let t=n.replace(/[_.]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2"),e=zt.test(t),s=Ft.test(t);return e===s?null:e?"download":"upload"}function at(n){let t=n.replace(/\s+/g," ").trim();return t.replace(Vt," ").replace(/[\s|:_–-]{2,}/g," ").replace(/^[\s|:_–-]+|[\s|:_–-]+$/g,"").replace(/\s{2,}/g," ").trim()||t}function Gt(n){let t=at(n);return t.replace(/\b(in|out|rx|tx|sent|recv|received|bytes?|kbps|mbps|gbps|bps|per|second|sec)\b/gi," ").replace(/[\s|:_–-]{2,}/g," ").replace(/^[\s|:_–-]+|[\s|:_–-]+$/g,"").replace(/\s{2,}/g," ").trim()||t}var Kt=[[/\bnordvpn\b/i,"NordVPN"],[/\bwireguard\b|\bwg(\d+)\b/i,n=>n[1]?`WireGuard ${n[1]}`:"WireGuard"],[/\bopenvpn\b/i,"OpenVPN"],[/\bipsec\b/i,"IPsec"],[/\btailscale\b/i,"Tailscale"],[/\bvpn\b/i,"VPN"],[/\bwan6\b/i,"WAN6"],[/\bwan\b/i,"WAN"],[/\bwlan(\d*)\b/i,n=>`WLAN${n[1]??""}`],[/\blan(\d*)\b/i,n=>`LAN${n[1]??""}`],[/\bopt(\d+)\b/i,n=>`OPT${n[1]}`],[/\bpppoe\b/i,"PPPoE"],[/\bguest\b/i,"Guest"],[/\btun(\d+)\b/i,n=>`TUN${n[1]}`]];function qt(n,t,e){let i=`${(n.includes(".")?n.slice(n.indexOf(".")+1):n).replace(/_/g," ")} ${t}`;for(let[r,o]of Kt){let a=r.exec(i);if(a)return typeof o=="function"?o(a):o}return e}function Zt(n,t,e){let s=typeof t.friendly_name=="string"?t.friendly_name:"";return[n,s,e].filter(Boolean).join(" ")}function lt(n,t){let e=n.entities??{},s=n.states??{},i=new Set(t.include_entities??[]),r=new Set(t.exclude_entities??[]),o=t.include_integrations??[],a=t.exclude_integrations??[],l=t.name_overrides??{},c=new Map;for(let u of t.pairs??[])u.download&&c.set(u.download,{pair:u,direction:"download"}),u.upload&&c.set(u.upload,{pair:u,direction:"upload"});let m=[],d=new Set;for(let u of Object.keys(s)){if(d.has(u)||r.has(u))continue;let p=s[u],h=e[u];if(!p||h?.disabled_by||h?.hidden_by)continue;let _=c.get(u);if(i.size>0&&!i.has(u)&&!_)continue;let v=h?.platform??"unknown";if(o.length>0&&!o.includes(v)&&!_||a.includes(v)&&!_)continue;let w=p.attributes??{},yt=w.unit_of_measurement??h?.unit_of_measurement??void 0,U=rt(yt);if(!U)continue;let de=w.device_class??h?.original_device_class??h?.device_class??void 0,S=Zt(u,w,String(h?.translation_key??""));if(U.kind==="counter"){if(!(de==="data_size"||/total|traffic|bytes|counter|transferred|usage|volume/i.test(S)))continue}else if(de!=="data_rate"&&!jt.test(S)&&!ot.test(S))continue;if(de!=="data_rate"&&Bt.test(S))continue;let Re=_?.direction??Wt(S);if(!Re)continue;let Ce=h?.device_id?n.devices?.[h.device_id]:void 0,Ee=_?.pair.name??l[u]??w.friendly_name??h?.name??h?.original_name??Ce?.name_by_user??Ce?.name??u,Me=_?.pair.name??l[u]??at(String(Ee)),ce=ot.test(`${u.replace(/[._]/g," ")} ${S}`);m.push({entityId:u,deviceId:h?.device_id??void 0,platform:v,direction:Re,kind:U.kind,factor:U.factor,unit:U.unit,name:Me,icon:_?.pair.icon??w.icon??h?.icon??void 0,entityCategory:h?.entity_category??void 0,manual:!!_,aggregate:ce,label:ce?qt(u,S,Gt(String(Ee))):Me,confidence:ce?.6:_?1:.9}),d.add(u)}return m}function dt(n){let t=new Set;for(let e of Object.values(n.entities??{}))e.platform&&t.add(e.platform);return[...t].sort()}var O=new Map;function Yt(n,t=100,e=24){if(n.length===0)return"";let s=Math.min(...n),r=Math.max(...n)-s||1;return n.map((o,a)=>{let l=n.length===1?0:a/(n.length-1)*t,c=e-(o-s)/r*(e-2)-1;return`${l.toFixed(1)},${c.toFixed(1)}`}).join(" ")}async function ct(n,t,e={}){let{minutes:s=60,width:i=100,height:r=24,ttl:o=6e4}=e;if(t.length===0)return{};O.size>500&&O.clear();let a=Date.now(),l=t.filter(m=>{let d=O.get(m);return!d||a-d.at>o});if(l.length>0)try{let m=await n.callWS({type:"history/history_during_period",start_time:new Date(a-s*6e4).toISOString(),end_time:new Date(a).toISOString(),entity_ids:l,minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let d of l){let u=m?.[d];if(!Array.isArray(u)){O.delete(d);continue}let p=u.map(h=>Number(h.s??h.state)).filter(h=>Number.isFinite(h));O.set(d,{at:a,points:p})}}catch{for(let m of l)O.delete(m);return{}}let c={};for(let m of t){let d=O.get(m);!d||d.points.length<2||(c[m]=Yt(d.points,i,r))}return c}function Xt(n){if(n==null)return null;let t=String(n).trim();if(t===""||t==="unavailable"||t==="unknown")return null;let e=Number(t);return Number.isFinite(e)?e:null}function Jt(n){for(let t of[n.last_updated,n.last_changed]){if(!t)continue;let e=Date.parse(t);if(Number.isFinite(e))return e}return null}function ut(n,t,e){let{now:s,staleAfterMs:i,tracker:r}=e,o=[];for(let a of t){let l=n.states[a.entityId],c={entityId:a.entityId,deviceId:a.deviceId,name:a.name,icon:a.icon,direction:a.direction,entityIds:[a.entityId],isCounter:a.kind==="counter",unit:a.unit,aggregate:a.aggregate,label:a.label};if(!l){o.push({...c,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let m=Xt(l.state);if(m===null||m<0){o.push({...c,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let d=Jt(l);if(a.kind==="rate"){let _=m*a.factor;if(!Number.isFinite(_)){o.push({...c,mbps:null,sampledAt:d,ageMs:null,status:"unavailable"});continue}let v=d===null?null:Math.max(0,s-d);o.push({...c,mbps:_,sampledAt:d,ageMs:v,status:v!==null&&v>i?"stale":"ok"});continue}let u=m*a.factor,p=d===null?null:r.update(`${a.entityId}:${a.factor}`,u,d),h=p===null?null:Math.max(0,s-p.at);o.push({...c,mbps:p?.mbps??null,sampledAt:p?.at??null,ageMs:h,status:p===null?"warmup":h!==null&&h>i?"stale":"ok"})}return o}function pt(n,t,e){let{now:s,holdMs:i}=e;return n.map(r=>{if(r.mbps!==null)return r.mbps>0&&r.sampledAt!==null&&t.set(r.entityId,{mbps:r.mbps,at:r.sampledAt}),r;if(i<=0)return r;let o=t.get(r.entityId);if(!o)return r;let a=Math.max(0,s-o.at);return a>i?(t.delete(r.entityId),r):{...r,mbps:o.mbps,sampledAt:o.at,ageMs:a,status:"stale"}})}function mt(n){let t=new Map;for(let e of n){if(!e.aggregate)continue;let s=e.label||e.name,i=s.toLowerCase(),r=t.get(i)??{label:s};e.direction==="download"?(e.mbps??-1)>(r.download?.mbps??-1)&&(r.download=e):(e.mbps??-1)>(r.upload?.mbps??-1)&&(r.upload=e),r.icon||(r.icon=e.icon),t.set(i,r)}return[...t.values()].sort((e,s)=>(s.download?.mbps??s.upload?.mbps??0)-(e.download?.mbps??e.upload?.mbps??0))}function Qt(n){let t=new Map;for(let e of n){let s=e.deviceId?`d:${e.deviceId}:${e.direction}`:`e:${e.entityId}`,i=t.get(s);if(!i){t.set(s,{reading:{...e,entityIds:[...e.entityIds]},entityIds:[...e.entityIds]});continue}if(i.entityIds.push(...e.entityIds),(e.mbps??-1)>(i.reading.mbps??-1)){let r=i.entityIds;i.reading={...e,entityIds:r}}else i.reading.entityIds=i.entityIds}return[...t.values()]}function Ae(n,t,e){let s=n.filter(p=>p.mbps!==null&&Number.isFinite(p.mbps)),r=[...t==="device"?Qt(s).map(p=>p.reading):s].sort((p,h)=>{let _=(h.mbps??0)-(p.mbps??0);return e.sort==="asc"?-_:_}),o=r.slice(0,Math.max(0,e.limit)),a=e.maxSpeed&&e.maxSpeed>0?e.maxSpeed:0,l=r.reduce((p,h)=>Math.max(p,h.mbps??0),0),c=a>0?a:Math.max(l,1),m=e.warnThreshold??75,d=e.criticalThreshold??90;return{rows:o.map((p,h)=>{let _=Math.min(1,Math.max(0,(p.mbps??0)/c)),v=_*100,w=a>0&&v>=d?"critical":a>0&&v>=m?"warn":"normal";return{rank:h+1,reading:p,ratio:_,level:w}}),total:o.reduce((p,h)=>p+(h.mbps??0),0),scale:c,candidates:r.length}}var ht=B`
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

  @media (max-width: 880px) {
    .panels.columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .interfaces {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: 0.6rem;
  }

  .iface {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--nsm-border);
    border-radius: 0.75rem;
    background: var(--nsm-surface);
  }

  .iface-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .iface-head ha-icon {
    --mdc-icon-size: 1.05rem;
    color: var(--nsm-muted);
  }

  .iface-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--nsm-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .iface-age {
    margin-left: auto;
    font-size: 0.7rem;
    color: var(--nsm-muted);
    white-space: nowrap;
  }

  .iface-values {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .iface-value {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    font-size: 0.92rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .iface-value ha-icon {
    --mdc-icon-size: 0.9rem;
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

  @media (max-width: 640px) {
    .totals {
      grid-template-columns: minmax(0, 1fr);
    }

    .totals:not(.single) .total + .total {
      border-left: 0;
      border-top: 1px solid var(--nsm-border);
      padding-top: 0.55rem;
    }
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
`;function ke(n){if(n==null||!Number.isFinite(n)||n<0)return"\u2014";let t=Math.floor(n/1e3);if(t<1)return"now";if(t<60)return`${t}s ago`;let e=Math.floor(t/60);if(e<60)return`${e}m ago`;let s=Math.floor(e/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`}function gt(n){if(n==null||!Number.isFinite(n)||n<0)return"No reading available";let t=Math.floor(n/1e3);if(t<1)return"less than a second ago";let e=Math.floor(t/86400),s=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),r=t%60,o=[];return e&&o.push(`${e} d`),s&&o.push(`${s} h`),i&&o.push(`${i} min`),r&&!e&&o.push(`${r} s`),`${o.join(" ")} ago`}function le(n,t){let e=(n??"").trim(),s=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!s)return le(t,"3b9dff");let i=s[1];i.length===3&&(i=i.split("").map(o=>o+o).join(""));let r=parseInt(i,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`}function Se(n,t){let e=(n??"").trim();return/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)?e.startsWith("#")?e:`#${e}`:t}var es=[[/(nordvpn|\bvpn\b|wireguard|openvpn|ipsec|tunnel|\btun\d*\b|\bwg\d*\b)/i,"mdi:vpn"],[/(\bwan\b|internet|uplink|broadband)/i,"mdi:earth"],[/(wlan|wi-?fi|guest)/i,"mdi:wifi"],[/(\blan\b|bridge)/i,"mdi:lan"],[/(iphone|phone|mobile|pixel|galaxy|android)/i,"mdi:cellphone"],[/(ipad|tablet)/i,"mdi:tablet"],[/(television|apple ?tv|chromecast|roku|\btv\b)/i,"mdi:television"],[/(laptop|macbook|notebook|thinkpad|chromebook)/i,"mdi:laptop"],[/(desktop|workstation|\bpc\b|imac|computer)/i,"mdi:monitor"],[/(synology|qnap|\bnas\b|server|proxmox|unraid)/i,"mdi:server"],[/(camera|\bnvr\b|reolink|hikvision|frigate)/i,"mdi:cctv"],[/(printer)/i,"mdi:printer"],[/(playstation|xbox|console|nintendo|\bswitch\b)/i,"mdi:gamepad-variant"],[/(router|gateway|access ?point|\bswitch\b|\bap\b|hub)/i,"mdi:router-network"],[/(cloud|backup)/i,"mdi:cloud-outline"],[/(speaker|sonos|alexa|echo)/i,"mdi:speaker"],[/(watch)/i,"mdi:watch"],[/(raspberry|\bpi\b)/i,"mdi:raspberry-pi"]];function ft(n){for(let[t,e]of es)if(t.test(n))return e;return"mdi:devices"}function _t(n,t,e){let s=typeof n=="number"?n:Number(n);return Number.isFinite(s)?t.reduce((i,r)=>Math.abs(r-s)<Math.abs(i-s)?r:i,e):e}function bt(n){return Number.isFinite(n??NaN)?n:0}var I=class extends ${constructor(){super(...arguments);this._tracker=new Z({maxMbps:1e6});this._hold=new Map;this._sparkToken=0;this._lastEval=0;this._paused=!1;this._menu=!1;this._filter=""}static getStubConfig(){return{type:`custom:${R}`,title:"Network Speed Monitor",subtitle:"Top 10 devices by download and upload speed"}}static getConfigElement(){return document.createElement("network-speed-monitor-editor")}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration for network-speed-monitor");this._config={...b,...e},this._sources=void 0,this._hold.clear(),this._tracker=new Z({staleMs:Math.max(this._staleAfterMs,6e4),maxMbps:1e6}),this._unitOverride=void 0,this._compactOverride=void 0,this._limitOverride=void 0,this._refreshOverride=void 0,this._filter="",this._clearTimer(),this.isConnected&&(this._evaluate(),this._schedule())}get hass(){return this._hass}set hass(e){let s=this._hass;this._hass=e,!(!e||!this._config)&&(!s||!this._view?(this._evaluate(),this._schedule()):this._schedule())}getCardSize(){let e=this._view?Math.max(this._view.download.rows.length,this._view.upload.rows.length):this._limit;return 2+Math.ceil(e*.55)}connectedCallback(){super.connectedCallback(),this._hass&&this._config&&(this._evaluate(),this._schedule())}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer(),this._sparkTimer!==void 0&&(window.clearTimeout(this._sparkTimer),this._sparkTimer=void 0),this._sparkToken+=1,this._removeDocListener()}get _limit(){return _t(this._limitOverride??this._config?.ranking_size,z,b.ranking_size)}get _refreshSeconds(){return _t(this._refreshOverride??this._config?.refresh_interval,F,b.refresh_interval)}get _unit(){return this._unitOverride??this._config?.unit??b.unit}get _compact(){return this._compactOverride??this._config?.compact??b.compact}get _staleAfterMs(){let e=Number(this._config?.stale_after??b.stale_after);return(Number.isFinite(e)&&e>0?e:b.stale_after)*1e3}get _holdSeconds(){let e=Number(this._config?.hold_seconds??b.hold_seconds);return Number.isFinite(e)&&e>=0?e:b.hold_seconds}get _isDark(){return typeof this._hass?.themes?.darkMode=="boolean"?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get _configOrDefault(){return this._config??b}get _downloadColor(){return Se(this._config?.download_color,pe)}get _uploadColor(){return Se(this._config?.upload_color,me)}_evaluate(){let e=this._hass,s=this._config;if(!e||!s)return;(e.entities!==this._registryRef||!this._sources)&&(this._registryRef=e.entities,this._sources=lt(e,s));let i=Date.now(),r=ut(e,this._sources,{now:i,staleAfterMs:this._staleAfterMs,tracker:this._tracker}),o=pt(r,this._hold,{now:i,holdMs:this._holdSeconds*1e3}),a={limit:this._limit,sort:s.sort_direction??b.sort_direction,maxSpeed:Number(s.max_speed)>0?Number(s.max_speed):void 0,warnThreshold:s.warn_threshold??b.warn_threshold,criticalThreshold:s.critical_threshold??b.critical_threshold},l=s.scope??b.scope,c=s.aggregates??b.aggregates,m=c==="inline"?o:o.filter(d=>!d.aggregate);this._view={download:Ae(m.filter(d=>d.direction==="download"),l,a),upload:Ae(m.filter(d=>d.direction==="upload"),l,a),aggregates:c==="off"?[]:mt(o),generatedAt:i,sourceCount:o.length,activeCount:o.filter(d=>d.mbps!==null).length},this._lastEval=i,this._tracker.prune(Math.max(this._staleAfterMs*4,6e5),i),this._maybeLoadSparklines()}_clearTimer(){this._timer!==void 0&&(window.clearTimeout(this._timer),this._timer=void 0)}_schedule(){if(this._paused||!this.isConnected||this._timer!==void 0)return;let e=this._refreshSeconds*1e3,s=Date.now()-this._lastEval,i=s>=e?0:e-s;this._timer=window.setTimeout(()=>{this._timer=void 0,!(!this.isConnected||this._paused)&&(this._evaluate(),this._schedule())},i)}_maybeLoadSparklines(e=!1){let s=this._config,i=this._hass,r=this._view;!s?.show_sparkline||!i?.callWS||!r||!e&&this._sparkTimer!==void 0||(this._sparkTimer!==void 0&&window.clearTimeout(this._sparkTimer),this._sparkTimer=window.setTimeout(async()=>{this._sparkTimer=void 0;let o=this._view;if(!o||!this._hass)return;let a=[...o.download.rows,...o.upload.rows].filter(m=>!m.reading.isCounter).slice(0,12).map(m=>m.reading.entityId);if(a.length===0)return;let l=++this._sparkToken,c=await ct(this._hass,a,{minutes:60,ttl:6e4});l!==this._sparkToken||!this.isConnected||(this._spark=c)},e?0:6e4))}_togglePause(){this._paused=!this._paused,this._paused?this._clearTimer():(this._evaluate(),this._schedule())}_toggleMenu(){this._menu=!this._menu,this._menu?(this._docListener=e=>{e.composedPath().includes(this)||(this._menu=!1,this._removeDocListener())},document.addEventListener("pointerdown",this._docListener)):this._removeDocListener()}_removeDocListener(){this._docListener&&(document.removeEventListener("pointerdown",this._docListener),this._docListener=void 0)}_onRefreshChanged(e){let s=Number(e.target.value);Number.isFinite(s)&&(this._refreshOverride=s,this._clearTimer(),this._schedule())}_setLimit(e){this._limitOverride=e,this._menu=!1,this._removeDocListener(),this._evaluate()}_toggleUnit(){this._unitOverride=this._unit==="Mbps"?"MBps":"Mbps"}_toggleCompact(){this._compactOverride=!this._compact}_openEditor(){this._menu=!1,this._removeDocListener(),customElements.get("hui-dialog-edit-card")&&this.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"hui-dialog-edit-card",dialogImport:()=>Promise.resolve(),dialogParams:{card:this,cardConfig:this._config}}}))}_defaultSubtitle(){let e=this._configOrDefault.show??"both";return e==="download"?`Top ${this._limit} devices by download speed`:e==="upload"?`Top ${this._limit} devices by upload speed`:`Top ${this._limit} devices by download and upload speed`}_wrapClass(){return`wrap ${this._compact?"compact":""} ${this._isDark?"dark":"light"}`}_wrapStyle(){let e=le(this._downloadColor,pe),s=le(this._uploadColor,me);return`--nsm-dl:${e};--nsm-ul:${s};`}_iconFor(e){return e.icon??ft(e.name)}_columns(){let e=this._configOrDefault,s=[];return e.show_rank!==!1&&s.push("1.5rem"),e.show_icons!==!1&&s.push("1.5rem"),s.push("minmax(0, 1.25fr)"),e.show_bars!==!1&&s.push("minmax(2.5rem, 1.15fr)"),s.push("auto"),e.show_timestamps!==!1&&s.push("3.4rem"),s.join(" ")}_filtered(e){let s=this._filter.trim().toLowerCase();return(s?e.filter(r=>r.reading.name.toLowerCase().includes(s)):e).map((r,o)=>({...r,rank:o+1}))}_renderRow(e,s,i){let r=this._configOrDefault,o=e.reading,a=this._unit,l=L(o.mbps??0,a,r.decimals??0),c=r.show_sparkline?this._spark?.[o.entityId]:void 0,m=e.level==="critical"?"#ef4444":e.level==="warn"?"#f59e0b":void 0,d=`${o.name} \xB7 ${l} ${a} \xB7 sensor updated ${gt(o.ageMs)}`;return f`
      <li
        class="row ${o.status==="stale"?"stale":""}"
        data-key=${`${s}:${o.entityId}`}
        title=${d}
      >
        ${r.show_rank!==!1?f`<span class="rank">${e.rank}</span>`:g}
        ${r.show_icons!==!1?f`<ha-icon class="icon" .icon=${this._iconFor(o)}></ha-icon>`:g}
        <span class="name">
          ${r.show_status&&o.status!=="ok"?f`<span
                class="dot"
                style=${`color:${o.status==="stale"?"#f59e0b":"#94a3b8"}`}
              ></span>`:g}
          <span class="text">${o.name}</span>
        </span>
        ${r.show_bars!==!1?c?f`<span class="track history">
                <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <polyline points=${c} stroke=${i}></polyline>
                </svg>
              </span>`:f`<span class="track">
                <span
                  class="fill"
                  style=${`width:${(e.ratio*100).toFixed(1)}%;${m?`background:${m};`:""}`}
                ></span>
              </span>`:g}
        <span class="value">${l}<span class="u">${a}</span></span>
        ${r.show_timestamps!==!1?f`<span class="age">${ke(o.ageMs)}</span>`:g}
      </li>
    `}_renderAggregate(e){let s=this._configOrDefault,i=this._unit,r=s.decimals??0,o=[e.download?.ageMs,e.upload?.ageMs].filter(l=>l!=null),a=o.length?Math.min(...o):null;return f`
      <div class="iface">
        <div class="iface-head">
          <ha-icon .icon=${e.icon??ft(e.label)}></ha-icon>
          <span class="iface-name">${e.label}</span>
          ${s.show_timestamps!==!1?f`<span class="iface-age">${ke(a)}</span>`:g}
        </div>
        <div class="iface-values">
          ${e.download?.mbps!==null&&e.download?.mbps!==void 0?f`<span class="iface-value download">
                <ha-icon icon="mdi:arrow-down-bold"></ha-icon>
                ${L(e.download.mbps,i,r)}<span class="u">${i}</span>
              </span>`:g}
          ${e.upload?.mbps!==null&&e.upload?.mbps!==void 0?f`<span class="iface-value upload">
                <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                ${L(e.upload.mbps,i,r)}<span class="u">${i}</span>
              </span>`:g}
        </div>
      </div>
    `}_renderAggregates(){let e=this._configOrDefault;if(e.aggregates==="off"||e.aggregates==="inline")return g;let s=this._view?.aggregates??[];return s.length===0?g:f`<div class="interfaces">${s.map(i=>this._renderAggregate(i))}</div>`}_renderPanel(e,s){let i=this._filtered(s.rows),r=e==="download"?this._downloadColor:this._uploadColor,o=e==="download"?`Top ${this._limit} Download`:`Top ${this._limit} Upload`,a=e==="download"?"mdi:arrow-down-bold":"mdi:arrow-up-bold",l=this._unit;return f`
      <section class="panel ${e}">
        <header class="panel-head">
          <div class="panel-title">
            <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
            <h2>${o}</h2>
          </div>
          <span class="unit">${l}</span>
        </header>
        ${i.length>0?f`<ol class="rows" style=${`--nsm-cols:${this._columns()}`}>
              ${it(i,c=>`${e}:${c.reading.entityId}`,c=>this._renderRow(c,e,r))}
            </ol>`:this._renderEmpty(e)}
      </section>
    `}_renderEmpty(e){let s=this._view,i=this._configOrDefault,r=!!(i.include_entities&&i.include_entities.length||i.include_integrations&&i.include_integrations.length||i.pairs&&i.pairs.length),o="No compatible bandwidth sensors discovered yet.";return s&&s.sourceCount>0?o=this._filter.trim().length>0?"No devices match your search.":"Waiting for the first reading of the selected sensors.":r?o=`No ${e} sensors match the current filters. Open the card editor to adjust the selection.`:o="No compatible bandwidth sensors found. Open the card editor to select sensors manually or to restrict the integrations.",f`<p class="empty">${o}</p>`}_renderTotals(e,s,i,r){let o=this._configOrDefault,a=this._unit,l=o.show!=="upload",c=o.show!=="download";return f`
      <footer class="totals ${!(l&&c)?"single":""}">
        ${l?f`<div class="total download">
              <ha-icon class="glyph" icon="mdi:download"></ha-icon>
              <div>
                <div class="label">Total Download (Top ${i})</div>
                <div class="amount">${L(e,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:g}
        ${c?f`<div class="total upload">
              <ha-icon class="glyph" icon="mdi:upload"></ha-icon>
              <div>
                <div class="label">Total Upload (Top ${r})</div>
                <div class="amount">${L(s,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:g}
      </footer>
    `}_renderHeader(){let e=this._configOrDefault,s=e.title??"Network Speed Monitor",i=e.subtitle??this._defaultSubtitle();return f`
      <div class="head">
        <div class="brand">
          <div class="logo"><ha-icon icon="mdi:lan-connect"></ha-icon></div>
          <div>
            <h1>${s}</h1>
            <p>${i}</p>
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
              ${F.map(r=>f`<option value=${String(r)} ?selected=${r===this._refreshSeconds}>
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
            ${this._menu?this._renderMenu():g}
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
        ${z.map(e=>f`<button role="menuitem" @click=${()=>this._setLimit(e)}>
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
    `}render(){let e=this._config;if(!e)return g;let s=this._view,i=e.show!=="upload",r=e.show!=="download",a=i&&r&&(e.layout??"auto")!=="stacked",l=s?this._filtered(s.download.rows):[],c=s?this._filtered(s.upload.rows):[],m=l.reduce((u,p)=>u+bt(p.reading.mbps),0),d=c.reduce((u,p)=>u+bt(p.reading.mbps),0);return f`
      <ha-card>
        <div class=${this._wrapClass()} style=${this._wrapStyle()}>
          ${this._renderHeader()} ${e.show_search?this._renderSearch():g}
          <div class="panels ${a?"columns":""}">
            ${i?this._renderPanel("download",s?.download??vt()):g}
            ${r?this._renderPanel("upload",s?.upload??vt()):g}
          </div>
          ${this._renderAggregates()}
          ${e.show_totals!==!1?this._renderTotals(m,d,l.length,c.length):g}
        </div>
      </ha-card>
    `}updated(){let e=this.renderRoot.querySelectorAll(".row"),s=new Map;e.forEach(r=>{let o=r.dataset.key;o&&s.set(o,r.getBoundingClientRect().top)});let i=this._rowPositions;this._rowPositions=s,i&&(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||e.forEach(r=>{let o=r.dataset.key;if(!o)return;let a=i.get(o),l=s.get(o);a===void 0||l===void 0||a===l||typeof r.animate=="function"&&r.animate([{transform:`translateY(${a-l}px)`},{transform:"translateY(0)"}],{duration:320,easing:"cubic-bezier(0.22, 0.61, 0.36, 1)"})}))}};I.styles=ht,I.properties={_view:{state:!0},_paused:{state:!0},_menu:{state:!0},_filter:{state:!0},_spark:{state:!0},_unitOverride:{state:!0},_compactOverride:{state:!0},_limitOverride:{state:!0},_refreshOverride:{state:!0}};function vt(){return{rows:[],total:0,scale:1,candidates:0}}var wt={type:`custom:${R}`,name:"Network Speed Monitor",description:"Top 10 live download and upload rankings for your network devices.",preview:!0,documentationURL:"https://github.com/nikeng-forenade/ha-network-speed-monitor",version:Y};var ts={title:"Card title",subtitle:"Card subtitle",show:"Rankings to show",layout:"Layout",ranking_size:"Ranking size",refresh_interval:"Refresh interval",unit:"Display unit",decimals:"Decimals",sort_direction:"Sort direction",scope:"Aggregation scope",aggregates:"WAN / VPN sensors",show_bars:"Show speed bars",show_rank:"Show ranking numbers",show_timestamps:"Show reading age",show_icons:"Show device icons",show_totals:"Show Top totals",show_search:"Show device filter",show_status:"Show stale reading indicator",show_sparkline:"Show 1 h sparklines",compact:"Compact mode",max_speed:"Bar scale (max Mbps)",warn_threshold:"Warning threshold (%)",critical_threshold:"Critical threshold (%)",stale_after:"Reading considered stale after (s)",hold_seconds:"Keep last value when a sensor drops out (s)",download_color:"Download color",upload_color:"Upload color",include_integrations:"Only use these integrations",exclude_integrations:"Ignore these integrations",include_entities:"Only use these sensors",exclude_entities:"Exclude these sensors"},ss={ranking_size:"How many rows each ranking shows.",refresh_interval:"How often the card re-renders. Sensors update on their own schedule; this only affects the display.",scope:"Per device keeps one row per device (highest sensor wins) to avoid counting an interface and a device sensor twice.",aggregates:"Interface sensors (WAN, LAN, NordVPN, WireGuard, \u2026) belong to the whole network. Show them in their own strip, rank them with the devices, or ignore them.",max_speed:"Bars are scaled to this value. Leave at 0 to scale bars relative to the fastest device.",warn_threshold:"Percentage of the bar scale where a bar turns orange (needs a bar scale).",critical_threshold:"Percentage of the bar scale where a bar turns red (needs a bar scale).",stale_after:"Sensors that have not reported for this long are dimmed.",hold_seconds:"When a sensor turns unavailable (device off, Wi-Fi drop, integration reload) its last speed is kept, dimmed, for this long so the ranking does not jump. Set to 0 to remove rows immediately.",include_integrations:"Empty means all integrations are considered.",include_entities:"Empty means sensors are discovered automatically.",show_sparkline:"Requires the Home Assistant recorder for the selected sensors."},$t=["download_color","upload_color"];function is(n){if(Array.isArray(n)&&n.length===3){let[t,e,s]=n.map(i=>Number(i)||0);return`#${[t,e,s].map(i=>i.toString(16).padStart(2,"0")).join("")}`}if(typeof n=="string")return n}function ns(n){if(!n)return;let t=/^#?([0-9a-f]{6})$/i.exec(n.trim());if(!t)return;let e=parseInt(t[1],16);return[e>>16&255,e>>8&255,e&255]}var H=class extends ${constructor(){super(...arguments);this._computeLabel=e=>ts[e.name]??e.name;this._computeHelper=e=>ss[e.name]}setConfig(e){this._configState={...e}}get hass(){return this._hass}set hass(e){this._hass=e,this.requestUpdate()}get config(){return this._configState}_data(){let e=this._configState??{},s={...e};for(let i of $t)s[i]=ns(e[i]);return s.include_entities=e.include_entities??[],s.exclude_entities=e.exclude_entities??[],s.include_integrations=e.include_integrations??[],s.exclude_integrations=e.exclude_integrations??[],s}_schema(){let e=this._hass?dt(this._hass).map(s=>({value:s,label:s})):[];return[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"show",selector:{select:{mode:"dropdown",options:[{value:"both",label:"Download and upload"},{value:"download",label:"Download only"},{value:"upload",label:"Upload only"}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (stack on mobile)"},{value:"columns",label:"Two columns"},{value:"stacked",label:"Stacked"}]}}},{name:"ranking_size",selector:{select:{mode:"dropdown",options:z.map(s=>({value:s,label:`Top ${s}`}))}}},{name:"refresh_interval",selector:{select:{mode:"dropdown",options:F.map(s=>({value:s,label:`${s} second${s===1?"":"s"}`}))}}},{name:"unit",selector:{select:{mode:"dropdown",options:[{value:"Mbps",label:"Mbps (megabits per second)"},{value:"MBps",label:"MB/s (megabytes per second)"}]}}},{name:"decimals",selector:{number:{min:0,max:3,mode:"box",step:1}}},{name:"sort_direction",selector:{select:{mode:"dropdown",options:[{value:"desc",label:"Highest speed first"},{value:"asc",label:"Lowest speed first"}]}}},{name:"scope",selector:{select:{mode:"dropdown",options:[{value:"entity",label:"Per sensor"},{value:"device",label:"Per device (highest sensor)"}]}}},{name:"aggregates",selector:{select:{mode:"dropdown",options:[{value:"separate",label:"Separate WAN / VPN strip"},{value:"inline",label:"Rank with the devices"},{value:"off",label:"Ignore interface sensors"}]}}},{name:"show_bars",selector:{boolean:{}}},{name:"show_rank",selector:{boolean:{}}},{name:"show_timestamps",selector:{boolean:{}}},{name:"show_icons",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_sparkline",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"max_speed",selector:{number:{min:0,max:1e5,mode:"box",unit_of_measurement:"Mbps"}}},{name:"warn_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"critical_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"stale_after",selector:{number:{min:10,max:86400,mode:"box",unit_of_measurement:"s"}}},{name:"hold_seconds",selector:{number:{min:0,max:3600,mode:"box",unit_of_measurement:"s"}}},{name:"download_color",selector:{color_rgb:{}}},{name:"upload_color",selector:{color_rgb:{}}},{name:"include_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"exclude_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"include_entities",selector:{entity:{multiple:!0}}},{name:"exclude_entities",selector:{entity:{multiple:!0}}}]}_commit(e){this._configState={...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._configState},bubbles:!0,composed:!0}))}_valueChanged(e){e.stopPropagation();let s={...e.detail.value};for(let i of $t)i in s&&(s[i]=is(s[i]));for(let i of["include_entities","exclude_entities","include_integrations","exclude_integrations"]){let r=s[i];Array.isArray(r)&&r.length===0&&delete s[i]}(s.max_speed===""||s.max_speed===void 0)&&delete s.max_speed,this._commit({...this._configState??{},...s})}_patchPair(e,s){let i=this._configState??{},r=[...i.pairs??[]],a={...r[e]??{},...s};for(let l of Object.keys(a))a[l]||delete a[l];Object.keys(a).length===0?r.splice(e,1):r[e]=a,this._commit({...i,pairs:r})}_addPair(){let e=this._configState??{};this._commit({...e,pairs:[...e.pairs??[],{}]})}_removePair(e){let s=this._configState??{},i=[...s.pairs??[]];i.splice(e,1),this._commit({...s,pairs:i.length?i:void 0})}_patchOverride(e,s,i){let r=this._configState??{},o={...r.name_overrides??{}};i&&i!==e&&delete o[i],e&&s?o[e]=s:e&&!s&&delete o[e],this._commit({...r,name_overrides:Object.keys(o).length?o:void 0})}_removeOverride(e){let s=this._configState??{},i={...s.name_overrides??{}};delete i[e],this._commit({...s,name_overrides:Object.keys(i).length?i:void 0})}_renderPairs(){let e=this._configState?.pairs??[];return f`
      <div class="section">
        <div class="section-head">
          <h3>Manual download / upload pairing</h3>
          <button @click=${this._addPair}>Add pair</button>
        </div>
        <p class="hint">
          Optional. Use this for devices where the download and upload sensors cannot be matched
          automatically, or to force a friendly name and icon.
        </p>
        ${e.map((s,i)=>f`
            <div class="pair">
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${s.name??""}
                .label=${"Name"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(i,{name:r.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${s.download??""}
                .label=${"Download sensor"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(i,{download:r.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${s.upload??""}
                .label=${"Upload sensor"}
                @value-changed=${r=>{r.stopPropagation(),this._patchPair(i,{upload:r.detail.value})}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removePair(i)}>Remove</button>
            </div>
          `)}
      </div>
    `}_renderOverrides(){let e=this._configState?.name_overrides??{},s=Object.entries(e);return f`
      <div class="section">
        <div class="section-head">
          <h3>Device name overrides</h3>
          <button
            @click=${()=>{let i=this._configState??{},r=(i.include_entities??[])[0]??"";this._commit({...i,name_overrides:{...e,[r||"sensor.example"]:""}})}}
          >
            Add override
          </button>
        </div>
        <p class="hint">Rename a sensor in the rankings without renaming the entity itself.</p>
        ${s.map(([i,r])=>f`
            <div class="override">
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${i}
                .label=${"Sensor"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(o.detail.value,r,i)}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${r}
                .label=${"Display name"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(i,o.detail.value,i)}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removeOverride(i)}>Remove</button>
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
    `:g}};H.styles=B`
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
  `,H.properties={_configState:{state:!0}};customElements.get(R)||customElements.define(R,I);customElements.get(ue)||customElements.define(ue,H);window.customCards=window.customCards??[];window.customCards.some(n=>n.type===R)||window.customCards.push(wt);console.info(`%c NETWORK SPEED MONITOR %c ${Y} `,"color:#fff;background:#1a73e8;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#1a73e8;background:#e8f0fe;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");
//# sourceMappingURL=network-speed-monitor.js.map
