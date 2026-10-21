/*! ha-network-speed-monitor v1.0.0 | MIT License */
var K="1.0.0",S="network-speed-monitor",ce="network-speed-monitor-editor",U=[5,10,15,20],H=[1,2,5,10,15,30,60],de="#3b9dff",ue="#22c55e",b={show:"both",layout:"auto",ranking_size:10,refresh_interval:5,unit:"Mbps",decimals:0,show_bars:!0,show_rank:!0,show_timestamps:!0,show_icons:!0,show_totals:!0,show_search:!1,show_status:!0,show_sparkline:!1,compact:!1,sort_direction:"desc",scope:"entity",stale_after:300,warn_threshold:75,critical_threshold:90};var Z=globalThis,Y=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pe=Symbol(),Ce=new WeakMap,z=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Y&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ce.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ce.set(e,t))}return t}toString(){return this.cssText}},Re=r=>new z(typeof r=="string"?r:r+"",void 0,pe),F=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new z(e,r,pe)},Ee=(r,t)=>{if(Y)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},he=Y?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Re(e)})(r):r;var{is:_t,defineProperty:vt,getOwnPropertyDescriptor:bt,getOwnPropertyNames:wt,getOwnPropertySymbols:$t,getPrototypeOf:yt}=Object,X=globalThis,Me=X.trustedTypes,xt=Me?Me.emptyScript:"",kt=X.reactiveElementPolyfillSupport,B=(r,t)=>r,me={toAttribute(r,t){switch(t){case Boolean:r=r?xt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Oe=(r,t)=>!_t(r,t),Te={attribute:!0,type:String,converter:me,reflect:!1,useDefault:!1,hasChanged:Oe};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Te){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&vt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=bt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);n?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Te}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;let t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){let e=this.properties,i=[...wt(e),...$t(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(he(s))}else t!==void 0&&e.push(he(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ee(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:me).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:me;this._$Em=s;let a=o.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let o=this.constructor;if(s===!1&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??Oe)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:o}=n,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[B("elementProperties")]=new Map,y[B("finalized")]=new Map,kt?.({ReactiveElement:y}),(X.reactiveElementVersions??=[]).push("2.1.2");var ge=globalThis,Pe=r=>r,J=ge.trustedTypes,Ne=J?J.createPolicy("lit-html",{createHTML:r=>r}):void 0,_e="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+x,At=`<${ve}>`,E=document,V=()=>E.createComment(""),W=r=>r===null||typeof r!="object"&&typeof r!="function",be=Array.isArray,ze=r=>be(r)||typeof r?.[Symbol.iterator]=="function",fe=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,Le=/>/g,C=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Ue=/"/g,Fe=/^(?:script|style|textarea|title)$/i,we=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),_=we(1),si=we(2),ri=we(3),k=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),He=new WeakMap,R=E.createTreeWalker(E,129);function Be(r,t){if(!be(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ne!==void 0?Ne.createHTML(t):t}var je=(r,t)=>{let e=r.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",o=j;for(let a=0;a<e;a++){let l=r[a],d,m,c=-1,p=0;for(;p<l.length&&(o.lastIndex=p,m=o.exec(l),m!==null);)p=o.lastIndex,o===j?m[1]==="!--"?o=De:m[1]!==void 0?o=Le:m[2]!==void 0?(Fe.test(m[2])&&(s=RegExp("</"+m[2],"g")),o=C):m[3]!==void 0&&(o=C):o===C?m[0]===">"?(o=s??j,c=-1):m[1]===void 0?c=-2:(c=o.lastIndex-m[2].length,d=m[1],o=m[3]===void 0?C:m[3]==='"'?Ue:Ie):o===Ue||o===Ie?o=C:o===De||o===Le?o=j:(o=C,s=void 0);let u=o===C&&r[a+1].startsWith("/>")?" ":"";n+=o===j?l+At:c>=0?(i.push(d),l.slice(0,c)+_e+l.slice(c)+x+u):l+x+(c===-2?a:u)}return[Be(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},G=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0,a=t.length-1,l=this.parts,[d,m]=je(t,e);if(this.el=r.createElement(d,i),R.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=R.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(_e)){let p=m[o++],u=s.getAttribute(c).split(x),h=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:h[2],strings:u,ctor:h[1]==="."?ee:h[1]==="?"?te:h[1]==="@"?ie:T}),s.removeAttribute(c)}else c.startsWith(x)&&(l.push({type:6,index:n}),s.removeAttribute(c));if(Fe.test(s.tagName)){let c=s.textContent.split(x),p=c.length-1;if(p>0){s.textContent=J?J.emptyScript:"";for(let u=0;u<p;u++)s.append(c[u],V()),R.nextNode(),l.push({type:2,index:++n});s.append(c[p],V())}}}else if(s.nodeType===8)if(s.data===ve)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(x,c+1))!==-1;)l.push({type:7,index:n}),c+=x.length-1}n++}}static createElement(t,e){let i=E.createElement("template");return i.innerHTML=t,i}};function M(r,t,e=r,i){if(t===k)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=W(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=M(r,s._$AS(r,t.values),s,i)),t}var Q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??E).importNode(e,!0);R.currentNode=s;let n=R.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new P(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new se(n,this,t)),this._$AV.push(d),l=i[++a]}o!==l?.index&&(n=R.nextNode(),o++)}return R.currentNode=E,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},P=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),W(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ze(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&W(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=G.createElement(Be(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new Q(s,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=He.get(t.strings);return e===void 0&&He.set(t.strings,e=new G(t)),e}k(t){be(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new r(this.O(V()),this.O(V()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Pe(t).nextSibling;Pe(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=f}_$AI(t,e=this,i,s){let n=this.strings,o=!1;if(n===void 0)t=M(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=M(this,a[i+l],e,l),d===k&&(d=this._$AH[l]),o||=!W(d)||d!==this._$AH[l],d===f?t=f:t!==f&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}o&&!s&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ee=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},te=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},ie=class extends T{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??f)===k)return;let i=this._$AH,s=t===f&&i!==f||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==f&&(i===f||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},se=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}},Ve={M:_e,P:x,A:ve,C:1,L:je,R:Q,D:ze,V:M,I:P,H:T,N:te,U:ie,B:ee,F:se},St=ge.litHtmlPolyfillSupport;St?.(G,P),(ge.litHtmlVersions??=[]).push("3.3.3");var We=(r,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new P(t.insertBefore(V(),n),n,void 0,e??{})}return s._$AI(r),s};var $e=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=We(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};$._$litElement$=!0,$.finalized=!0,$e.litElementHydrateSupport?.({LitElement:$});var Ct=$e.litElementPolyfillSupport;Ct?.({LitElement:$});($e.litElementVersions??=[]).push("4.2.2");var Ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qe=r=>(...t)=>({_$litDirective$:r,values:t}),re=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Rt}=Ve,Ke=r=>r;var Ze=()=>document.createComment(""),N=(r,t,e)=>{let i=r._$AA.parentNode,s=t===void 0?r._$AB:t._$AA;if(e===void 0){let n=i.insertBefore(Ze(),s),o=i.insertBefore(Ze(),s);e=new Rt(n,o,r,r.options)}else{let n=e._$AB.nextSibling,o=e._$AM,a=o!==r;if(a){let l;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(l=r._$AU)!==o._$AU&&e._$AP(l)}if(n!==s||a){let l=e._$AA;for(;l!==n;){let d=Ke(l).nextSibling;Ke(i).insertBefore(l,s),l=d}}}return e},A=(r,t,e=r)=>(r._$AI(t,e),r),Et={},Ye=(r,t=Et)=>r._$AH=t,Xe=r=>r._$AH,ne=r=>{r._$AR(),r._$AA.remove()};var Je=(r,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(r[s],s);return i},Qe=qe(class extends re{constructor(r){if(super(r),r.type!==Ge.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],n=[],o=0;for(let a of r)s[o]=i?i(a,o):o,n[o]=e(a,o),o++;return{values:n,keys:s}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,i]){let s=Xe(r),{values:n,keys:o}=this.dt(t,e,i);if(!Array.isArray(s))return this.ut=o,n;let a=this.ut??=[],l=[],d,m,c=0,p=s.length-1,u=0,h=n.length-1;for(;c<=p&&u<=h;)if(s[c]===null)c++;else if(s[p]===null)p--;else if(a[c]===o[u])l[u]=A(s[c],n[u]),c++,u++;else if(a[p]===o[h])l[h]=A(s[p],n[h]),p--,h--;else if(a[c]===o[h])l[h]=A(s[c],n[h]),N(r,l[h+1],s[c]),c++,h--;else if(a[p]===o[u])l[u]=A(s[p],n[u]),N(r,s[c],s[p]),p--,u++;else if(d===void 0&&(d=Je(o,u,h),m=Je(a,c,p)),d.has(a[c]))if(d.has(a[p])){let g=m.get(o[u]),v=g!==void 0?s[g]:null;if(v===null){let w=N(r,s[c]);A(w,n[u]),l[u]=w}else l[u]=A(v,n[u]),N(r,s[c],v),s[g]=null;u++}else ne(s[p]),p--;else ne(s[c]),c++;for(;u<=h;){let g=N(r,l[h+1]);A(g,n[u]),l[u++]=g}for(;c<=p;){let g=s[c++];g!==null&&ne(g)}return this.ut=o,Ye(r,l),k}});var q=class{constructor(t={}){this.previous=new Map;this.rates=new Map;this.staleMs=t.staleMs??3e5,this.maxMbps=t.maxMbps??1e6}update(t,e,i){if(!Number.isFinite(e)||!Number.isFinite(i)||e<0)return this.rates.get(t)??null;let s=this.previous.get(t);if(this.previous.set(t,{bytes:e,at:i}),!s)return null;let n=(i-s.at)/1e3;if(n<=0)return this.rates.get(t)??null;if(n*1e3>this.staleMs)return this.rates.delete(t),null;let o=e-s.bytes;o<0&&(o=e);let a=o*8/(n*1e6);if(!Number.isFinite(a)||a>this.maxMbps)return this.rates.get(t)??null;let l={mbps:a,at:i};return this.rates.set(t,l),l}get(t){return this.rates.get(t)}prune(t,e){for(let[i,s]of this.rates)e-s.at>t&&this.rates.delete(i);for(let[i,s]of this.previous)e-s.at>t&&this.previous.delete(i)}clear(){this.previous.clear(),this.rates.clear()}};var Mt={"":1,k:1e3,m:1e6,g:1e9,t:1e12,p:1e15},Tt={"":1,ki:1024,mi:1024**2,gi:1024**3,ti:1024**4,pi:1024**5},et={kilo:"k",mega:"m",giga:"g",tera:"t",peta:"p",kibi:"ki",mebi:"mi",gibi:"gi",tebi:"ti",pebi:"pi",ki:"ki",mi:"mi",gi:"gi",ti:"ti",pi:"pi",k:"k",m:"m",g:"g",t:"t",p:"p","":""},Ot=/^(.*?)(?:\/sec(?:ond)?s?|\/s|persec|persecond|ps)$/i;function Pt(r){let t=/^(kilo|mega|giga|tera|peta|kibi|mebi|gibi|tebi|pebi|ki|mi|gi|ti|pi|k|m|g|t|p)?(bits?|bytes?)$/i.exec(r);if(t){let i=et[(t[1]??"").toLowerCase()];return i===void 0?null:{prefix:i,bytes:t[2].toLowerCase().startsWith("byte")}}let e=/^([a-zA-Z]{0,2})(b|B|o)$/.exec(r);if(e){let i=et[e[1].toLowerCase()];return i===void 0?null:{prefix:i,bytes:e[2]!=="b"}}return null}function tt(r){if(r==null)return null;let t=String(r).trim().replace(/\s+/g,"");if(!t)return null;let e=!1,i=Ot.exec(t);i&&i[1]&&(e=!0,t=i[1]);let s=Pt(t);if(!s)return null;let n=s.prefix.endsWith("i"),o=(n?Tt:Mt)[s.prefix];if(!o)return null;let a=s.bytes?o:o/8;return{kind:e?"rate":"counter",factor:e?a*8/1e6:a,binary:n,unit:String(r)}}function oe(r,t,e=0){let i=t==="MBps"?r/8:r,s=i>=100?0:e;return new Intl.NumberFormat(void 0,{minimumFractionDigits:0,maximumFractionDigits:s}).format(Number.isFinite(i)?i:0)}var Nt=/\b(download|downloads|down|dl|rx|receive[ds]?|receiving|inbound|ingress|nedladdning|herunterladen|descarga)\b/i,Dt=/\b(upload|uploads|up|ul|tx|transmit(ted|ting)?|outbound|egress|uppladdning|hochladen|subida)\b/i,Lt=/speed|rate|bandwidth|download|upload|throughput|traffic|mbps|kbps|gbps/i,It=/\b(download|downloads|upload|uploads|down|up|dl|ul|rx|tx|receive[ds]?|transmit(ted|ting)?|inbound|outbound|ingress|egress|speed|rate|throughput|bandwidth|traffic|total|current|now|utilization|utilisation)\b/gi;function Ut(r){let t=r.replace(/[_.]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2"),e=Nt.test(t),i=Dt.test(t);return e===i?null:e?"download":"upload"}function Ht(r){let t=r.replace(/\s+/g," ").trim();return t.replace(It," ").replace(/[\s|:_–-]{2,}/g," ").replace(/^[\s|:_–-]+|[\s|:_–-]+$/g,"").replace(/\s{2,}/g," ").trim()||t}function zt(r,t,e){let i=typeof t.friendly_name=="string"?t.friendly_name:"";return[r,i,e].filter(Boolean).join(" ")}function it(r,t){let e=r.entities??{},i=r.states??{},s=new Set(t.include_entities??[]),n=new Set(t.exclude_entities??[]),o=t.include_integrations??[],a=t.exclude_integrations??[],l=t.name_overrides??{},d=new Map;for(let p of t.pairs??[])p.download&&d.set(p.download,{pair:p,direction:"download"}),p.upload&&d.set(p.upload,{pair:p,direction:"upload"});let m=[],c=new Set;for(let p of Object.keys(i)){if(c.has(p)||n.has(p))continue;let u=i[p],h=e[p];if(!u||h?.disabled_by||h?.hidden_by)continue;let g=d.get(p);if(s.size>0&&!s.has(p)&&!g)continue;let v=h?.platform??"unknown";if(o.length>0&&!o.includes(v)&&!g||a.includes(v)&&!g)continue;let w=u.attributes??{},mt=w.unit_of_measurement??h?.unit_of_measurement??void 0,I=tt(mt);if(!I)continue;let ke=w.device_class??h?.original_device_class??h?.device_class??void 0,le=zt(p,w,String(h?.translation_key??""));if(I.kind==="counter"){if(!(ke==="data_size"||/total|traffic|bytes|counter|transferred|usage|volume/i.test(le)))continue}else if(ke!=="data_rate"&&!Lt.test(le))continue;let Ae=g?.direction??Ut(le);if(!Ae)continue;let Se=h?.device_id?r.devices?.[h.device_id]:void 0,ft=g?.pair.name??l[p]??w.friendly_name??h?.name??h?.original_name??Se?.name_by_user??Se?.name??p,gt=g?.pair.name??l[p]??Ht(String(ft));m.push({entityId:p,deviceId:h?.device_id??void 0,platform:v,direction:Ae,kind:I.kind,factor:I.factor,unit:I.unit,name:gt,icon:g?.pair.icon??w.icon??h?.icon??void 0,entityCategory:h?.entity_category??void 0,manual:!!g}),c.add(p)}return m}function st(r){let t=new Set;for(let e of Object.values(r.entities??{}))e.platform&&t.add(e.platform);return[...t].sort()}var O=new Map;function Ft(r,t=100,e=24){if(r.length===0)return"";let i=Math.min(...r),n=Math.max(...r)-i||1;return r.map((o,a)=>{let l=r.length===1?0:a/(r.length-1)*t,d=e-(o-i)/n*(e-2)-1;return`${l.toFixed(1)},${d.toFixed(1)}`}).join(" ")}async function rt(r,t,e={}){let{minutes:i=60,width:s=100,height:n=24,ttl:o=6e4}=e;if(t.length===0)return{};O.size>500&&O.clear();let a=Date.now(),l=t.filter(m=>{let c=O.get(m);return!c||a-c.at>o});if(l.length>0)try{let m=await r.callWS({type:"history/history_during_period",start_time:new Date(a-i*6e4).toISOString(),end_time:new Date(a).toISOString(),entity_ids:l,minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let c of l){let p=m?.[c];if(!Array.isArray(p)){O.delete(c);continue}let u=p.map(h=>Number(h.s??h.state)).filter(h=>Number.isFinite(h));O.set(c,{at:a,points:u})}}catch{for(let m of l)O.delete(m);return{}}let d={};for(let m of t){let c=O.get(m);!c||c.points.length<2||(d[m]=Ft(c.points,s,n))}return d}function Bt(r){if(r==null)return null;let t=String(r).trim();if(t===""||t==="unavailable"||t==="unknown")return null;let e=Number(t);return Number.isFinite(e)?e:null}function jt(r){for(let t of[r.last_updated,r.last_changed]){if(!t)continue;let e=Date.parse(t);if(Number.isFinite(e))return e}return null}function nt(r,t,e){let{now:i,staleAfterMs:s,tracker:n}=e,o=[];for(let a of t){let l=r.states[a.entityId],d={entityId:a.entityId,deviceId:a.deviceId,name:a.name,icon:a.icon,direction:a.direction,entityIds:[a.entityId],isCounter:a.kind==="counter",unit:a.unit};if(!l){o.push({...d,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let m=Bt(l.state);if(m===null||m<0){o.push({...d,mbps:null,sampledAt:null,ageMs:null,status:"unavailable"});continue}let c=jt(l);if(a.kind==="rate"){let g=m*a.factor;if(!Number.isFinite(g)){o.push({...d,mbps:null,sampledAt:c,ageMs:null,status:"unavailable"});continue}let v=c===null?null:Math.max(0,i-c);o.push({...d,mbps:g,sampledAt:c,ageMs:v,status:v!==null&&v>s?"stale":"ok"});continue}let p=m*a.factor,u=c===null?null:n.update(`${a.entityId}:${a.factor}`,p,c),h=u===null?null:Math.max(0,i-u.at);o.push({...d,mbps:u?.mbps??null,sampledAt:u?.at??null,ageMs:h,status:u===null?"warmup":h!==null&&h>s?"stale":"ok"})}return o}function Vt(r){let t=new Map;for(let e of r){let i=e.deviceId?`d:${e.deviceId}:${e.direction}`:`e:${e.entityId}`,s=t.get(i);if(!s){t.set(i,{reading:{...e,entityIds:[...e.entityIds]},entityIds:[...e.entityIds]});continue}if(s.entityIds.push(...e.entityIds),(e.mbps??-1)>(s.reading.mbps??-1)){let n=s.entityIds;s.reading={...e,entityIds:n}}else s.reading.entityIds=s.entityIds}return[...t.values()]}function ye(r,t,e){let i=r.filter(u=>u.mbps!==null&&Number.isFinite(u.mbps)),n=[...t==="device"?Vt(i).map(u=>u.reading):i].sort((u,h)=>{let g=(h.mbps??0)-(u.mbps??0);return e.sort==="asc"?-g:g}),o=n.slice(0,Math.max(0,e.limit)),a=e.maxSpeed&&e.maxSpeed>0?e.maxSpeed:0,l=n.reduce((u,h)=>Math.max(u,h.mbps??0),0),d=a>0?a:Math.max(l,1),m=e.warnThreshold??75,c=e.criticalThreshold??90;return{rows:o.map((u,h)=>{let g=Math.min(1,Math.max(0,(u.mbps??0)/d)),v=g*100,w=a>0&&v>=c?"critical":a>0&&v>=m?"warn":"normal";return{rank:h+1,reading:u,ratio:g,level:w}}),total:o.reduce((u,h)=>u+(h.mbps??0),0),scale:d,candidates:n.length}}var ot=F`
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
    gap: 0.85rem;
    padding: 1.05rem 1.15rem 0.9rem;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  .logo {
    width: 2.55rem;
    height: 2.55rem;
    flex: 0 0 auto;
    border-radius: 0.8rem;
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
    --mdc-icon-size: 1.6rem;
  }

  .brand h1 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--nsm-fg);
    line-height: 1.2;
  }

  .brand p {
    margin: 0.18rem 0 0;
    font-size: 0.8rem;
    color: var(--nsm-muted);
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    height: 2.15rem;
    padding: 0 0.65rem;
    border-radius: 0.65rem;
    border: 1px solid var(--nsm-border);
    background: var(--nsm-surface-2);
    color: var(--nsm-fg);
    font-size: 0.8rem;
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
    --mdc-icon-size: 1.05rem;
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
    gap: 0.85rem;
  }

  .panels.columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 880px) {
    .panels.columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .panel {
    border: 1px solid var(--nsm-border);
    border-radius: 0.9rem;
    padding: 0.8rem 0.9rem 0.5rem;
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
    margin-bottom: 0.35rem;
  }

  .panel-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }

  .badge {
    width: 2.1rem;
    height: 2.1rem;
    flex: 0 0 auto;
    border-radius: 0.65rem;
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
    --mdc-icon-size: 1.4rem;
  }

  .panel h2 {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 650;
    color: var(--nsm-fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel .unit {
    font-size: 0.75rem;
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
    grid-template-columns: var(--nsm-cols, 1.3rem 1.25rem minmax(0, 1fr) minmax(2rem, 1.5fr) auto 3.4rem);
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.15rem;
    border-radius: 0.45rem;
  }

  .rank {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--nsm-muted);
    font-variant-numeric: tabular-nums;
  }

  .icon {
    --mdc-icon-size: 1.05rem;
    color: var(--nsm-fg);
    opacity: 0.82;
    justify-self: center;
  }

  .name {
    display: flex;
    align-items: center;
    gap: 0.38rem;
    min-width: 0;
    font-size: 0.88rem;
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
    height: 0.62rem;
    border-radius: 999px;
    background: var(--nsm-track);
    overflow: hidden;
    min-width: 2rem;
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
    font-size: 0.87rem;
    font-weight: 600;
    color: var(--nsm-fg);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .value .u {
    margin-left: 0.16rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--nsm-muted);
  }

  .age {
    font-size: 0.7rem;
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
    border-top: 1px solid var(--nsm-border);
    padding-top: 0.7rem;
  }

  .totals.single {
    grid-template-columns: minmax(0, 1fr);
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    min-width: 0;
    padding: 0.15rem 0.4rem;
  }

  .total + .total {
    border-left: 1px solid var(--nsm-border);
  }

  .total .glyph {
    --mdc-icon-size: 1.45rem;
    flex: 0 0 auto;
  }

  .total.download .glyph {
    color: rgb(var(--nsm-dl));
  }

  .total.upload .glyph {
    color: rgb(var(--nsm-ul));
  }

  .total .label {
    font-size: 0.72rem;
    color: var(--nsm-muted);
    line-height: 1.25;
  }

  .total .amount {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--nsm-fg);
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }

  .total .amount .u {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--nsm-muted);
    margin-left: 0.2rem;
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
    padding: 0.75rem 0.8rem 0.7rem;
    gap: 0.65rem;
  }

  .wrap.compact .brand h1 {
    font-size: 1.1rem;
  }

  .wrap.compact .brand p {
    display: none;
  }

  .wrap.compact .logo {
    width: 2.1rem;
    height: 2.1rem;
  }

  .wrap.compact .panel {
    padding: 0.55rem 0.65rem 0.35rem;
  }

  .wrap.compact .row {
    padding: 0.18rem 0.1rem;
  }

  .wrap.compact .badge {
    width: 1.7rem;
    height: 1.7rem;
  }

  .wrap.compact .panel h2 {
    font-size: 0.92rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .fill,
    .row {
      transition: none !important;
      animation: none !important;
    }
  }
`;function at(r){if(r==null||!Number.isFinite(r)||r<0)return"\u2014";let t=Math.floor(r/1e3);if(t<1)return"now";if(t<60)return`${t}s ago`;let e=Math.floor(t/60);if(e<60)return`${e}m ago`;let i=Math.floor(e/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}function lt(r){if(r==null||!Number.isFinite(r)||r<0)return"No reading available";let t=Math.floor(r/1e3);if(t<1)return"less than a second ago";let e=Math.floor(t/86400),i=Math.floor(t%86400/3600),s=Math.floor(t%3600/60),n=t%60,o=[];return e&&o.push(`${e} d`),i&&o.push(`${i} h`),s&&o.push(`${s} min`),n&&!e&&o.push(`${n} s`),`${o.join(" ")} ago`}function ae(r,t){let e=(r??"").trim(),i=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!i)return ae(t,"3b9dff");let s=i[1];s.length===3&&(s=s.split("").map(o=>o+o).join(""));let n=parseInt(s,16);return`${n>>16&255}, ${n>>8&255}, ${n&255}`}function xe(r,t){let e=(r??"").trim();return/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)?e.startsWith("#")?e:`#${e}`:t}var Wt=[[/(iphone|phone|mobile|pixel|galaxy|android)/i,"mdi:cellphone"],[/(ipad|tablet)/i,"mdi:tablet"],[/(television|apple ?tv|chromecast|roku|\btv\b)/i,"mdi:television"],[/(laptop|macbook|notebook|thinkpad|chromebook)/i,"mdi:laptop"],[/(desktop|workstation|\bpc\b|imac|computer)/i,"mdi:monitor"],[/(synology|qnap|\bnas\b|server|proxmox|unraid)/i,"mdi:server"],[/(camera|\bnvr\b|reolink|hikvision|frigate)/i,"mdi:cctv"],[/(printer)/i,"mdi:printer"],[/(playstation|xbox|console|nintendo|\bswitch\b)/i,"mdi:gamepad-variant"],[/(router|gateway|access ?point|\bswitch\b|\bap\b|hub)/i,"mdi:router-network"],[/(cloud|backup)/i,"mdi:cloud-outline"],[/(speaker|sonos|alexa|echo)/i,"mdi:speaker"],[/(watch)/i,"mdi:watch"],[/(raspberry|\bpi\b)/i,"mdi:raspberry-pi"]];function Gt(r){for(let[t,e]of Wt)if(t.test(r))return e;return"mdi:devices"}function ct(r,t,e){let i=typeof r=="number"?r:Number(r);return Number.isFinite(i)?t.reduce((s,n)=>Math.abs(n-i)<Math.abs(s-i)?n:s,e):e}function dt(r){return Number.isFinite(r??NaN)?r:0}var D=class extends ${constructor(){super(...arguments);this._tracker=new q({maxMbps:1e6});this._sparkToken=0;this._lastEval=0;this._paused=!1;this._menu=!1;this._filter=""}static getStubConfig(){return{type:`custom:${S}`,title:"Network Speed Monitor",subtitle:"Top 10 devices by download and upload speed"}}static getConfigElement(){return document.createElement("network-speed-monitor-editor")}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration for network-speed-monitor");this._config={...b,...e},this._sources=void 0,this._tracker=new q({staleMs:Math.max(this._staleAfterMs,6e4),maxMbps:1e6}),this._unitOverride=void 0,this._compactOverride=void 0,this._limitOverride=void 0,this._refreshOverride=void 0,this._filter="",this.isConnected&&(this._evaluate(),this._schedule())}get hass(){return this._hass}set hass(e){let i=this._hass;this._hass=e,!(!e||!this._config)&&(!i||!this._view?(this._evaluate(),this._schedule()):this._schedule())}getCardSize(){let e=this._view?Math.max(this._view.download.rows.length,this._view.upload.rows.length):this._limit;return 2+Math.ceil(e*.55)}connectedCallback(){super.connectedCallback(),this._hass&&this._config&&(this._evaluate(),this._schedule())}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer(),this._sparkTimer!==void 0&&(window.clearTimeout(this._sparkTimer),this._sparkTimer=void 0),this._sparkToken+=1,this._removeDocListener()}get _limit(){return ct(this._limitOverride??this._config?.ranking_size,U,b.ranking_size)}get _refreshSeconds(){return ct(this._refreshOverride??this._config?.refresh_interval,H,b.refresh_interval)}get _unit(){return this._unitOverride??this._config?.unit??b.unit}get _compact(){return this._compactOverride??this._config?.compact??b.compact}get _staleAfterMs(){let e=Number(this._config?.stale_after??b.stale_after);return(Number.isFinite(e)&&e>0?e:b.stale_after)*1e3}get _isDark(){return typeof this._hass?.themes?.darkMode=="boolean"?this._hass.themes.darkMode:window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1}get _configOrDefault(){return this._config??b}get _downloadColor(){return xe(this._config?.download_color,de)}get _uploadColor(){return xe(this._config?.upload_color,ue)}_evaluate(){let e=this._hass,i=this._config;if(!e||!i)return;(e.entities!==this._registryRef||!this._sources)&&(this._registryRef=e.entities,this._sources=it(e,i));let s=Date.now(),n=nt(e,this._sources,{now:s,staleAfterMs:this._staleAfterMs,tracker:this._tracker}),o={limit:this._limit,sort:i.sort_direction??b.sort_direction,maxSpeed:Number(i.max_speed)>0?Number(i.max_speed):void 0,warnThreshold:i.warn_threshold??b.warn_threshold,criticalThreshold:i.critical_threshold??b.critical_threshold},a=i.scope??b.scope;this._view={download:ye(n.filter(l=>l.direction==="download"),a,o),upload:ye(n.filter(l=>l.direction==="upload"),a,o),generatedAt:s,sourceCount:n.length,activeCount:n.filter(l=>l.mbps!==null).length},this._lastEval=s,this._tracker.prune(Math.max(this._staleAfterMs*4,6e5),s),this._maybeLoadSparklines()}_clearTimer(){this._timer!==void 0&&(window.clearTimeout(this._timer),this._timer=void 0)}_schedule(){if(this._paused||!this.isConnected||this._timer!==void 0)return;let e=this._refreshSeconds*1e3,i=Date.now()-this._lastEval,s=i>=e?0:e-i;this._timer=window.setTimeout(()=>{this._timer=void 0,!(!this.isConnected||this._paused)&&(this._evaluate(),this._schedule())},s)}_maybeLoadSparklines(e=!1){let i=this._config,s=this._hass,n=this._view;!i?.show_sparkline||!s?.callWS||!n||!e&&this._sparkTimer!==void 0||(this._sparkTimer!==void 0&&window.clearTimeout(this._sparkTimer),this._sparkTimer=window.setTimeout(async()=>{this._sparkTimer=void 0;let o=this._view;if(!o||!this._hass)return;let a=[...o.download.rows,...o.upload.rows].filter(m=>!m.reading.isCounter).slice(0,12).map(m=>m.reading.entityId);if(a.length===0)return;let l=++this._sparkToken,d=await rt(this._hass,a,{minutes:60,ttl:6e4});l!==this._sparkToken||!this.isConnected||(this._spark=d)},e?0:6e4))}_togglePause(){this._paused=!this._paused,this._paused?this._clearTimer():(this._evaluate(),this._schedule())}_toggleMenu(){this._menu=!this._menu,this._menu?(this._docListener=e=>{e.composedPath().includes(this)||(this._menu=!1,this._removeDocListener())},document.addEventListener("pointerdown",this._docListener)):this._removeDocListener()}_removeDocListener(){this._docListener&&(document.removeEventListener("pointerdown",this._docListener),this._docListener=void 0)}_onRefreshChanged(e){let i=Number(e.target.value);Number.isFinite(i)&&(this._refreshOverride=i,this._clearTimer(),this._schedule())}_setLimit(e){this._limitOverride=e,this._menu=!1,this._removeDocListener(),this._evaluate()}_toggleUnit(){this._unitOverride=this._unit==="Mbps"?"MBps":"Mbps"}_toggleCompact(){this._compactOverride=!this._compact}_openEditor(){this._menu=!1,this._removeDocListener(),customElements.get("hui-dialog-edit-card")&&this.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"hui-dialog-edit-card",dialogImport:()=>Promise.resolve(),dialogParams:{card:this,cardConfig:this._config}}}))}_wrapClass(){return`wrap ${this._compact?"compact":""} ${this._isDark?"dark":"light"}`}_wrapStyle(){let e=ae(this._downloadColor,de),i=ae(this._uploadColor,ue);return`--nsm-dl:${e};--nsm-ul:${i};`}_iconFor(e){return e.icon??Gt(e.name)}_columns(){let e=this._configOrDefault,i=[];return e.show_rank!==!1&&i.push("1.3rem"),e.show_icons!==!1&&i.push("1.25rem"),i.push("minmax(0, 1fr)"),e.show_bars!==!1&&i.push("minmax(2rem, 1.5fr)"),i.push("auto"),e.show_timestamps!==!1&&i.push("3.4rem"),i.join(" ")}_filtered(e){let i=this._filter.trim().toLowerCase();return(i?e.filter(n=>n.reading.name.toLowerCase().includes(i)):e).map((n,o)=>({...n,rank:o+1}))}_renderRow(e,i,s){let n=this._configOrDefault,o=e.reading,a=this._unit,l=oe(o.mbps??0,a,n.decimals??0),d=n.show_sparkline?this._spark?.[o.entityId]:void 0,m=e.level==="critical"?"#ef4444":e.level==="warn"?"#f59e0b":void 0,c=`${o.name} \xB7 ${l} ${a} \xB7 sensor updated ${lt(o.ageMs)}`;return _`
      <li
        class="row ${o.status==="stale"?"stale":""}"
        data-key=${`${i}:${o.entityId}`}
        title=${c}
      >
        ${n.show_rank!==!1?_`<span class="rank">${e.rank}</span>`:f}
        ${n.show_icons!==!1?_`<ha-icon class="icon" .icon=${this._iconFor(o)}></ha-icon>`:f}
        <span class="name">
          ${n.show_status&&o.status!=="ok"?_`<span
                class="dot"
                style=${`color:${o.status==="stale"?"#f59e0b":"#94a3b8"}`}
              ></span>`:f}
          <span class="text">${o.name}</span>
        </span>
        ${n.show_bars!==!1?d?_`<span class="track history">
                <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <polyline points=${d} stroke=${s}></polyline>
                </svg>
              </span>`:_`<span class="track">
                <span
                  class="fill"
                  style=${`width:${(e.ratio*100).toFixed(1)}%;${m?`background:${m};`:""}`}
                ></span>
              </span>`:f}
        <span class="value">${l}<span class="u">${a}</span></span>
        ${n.show_timestamps!==!1?_`<span class="age">${at(o.ageMs)}</span>`:f}
      </li>
    `}_renderPanel(e,i){let s=this._filtered(i.rows),n=e==="download"?this._downloadColor:this._uploadColor,o=e==="download"?`Top ${this._limit} Download`:`Top ${this._limit} Upload`,a=e==="download"?"mdi:arrow-down-bold":"mdi:arrow-up-bold",l=this._unit;return _`
      <section class="panel ${e}">
        <header class="panel-head">
          <div class="panel-title">
            <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
            <h2>${o}</h2>
          </div>
          <span class="unit">${l}</span>
        </header>
        ${s.length>0?_`<ol class="rows" style=${`--nsm-cols:${this._columns()}`}>
              ${Qe(s,d=>`${e}:${d.reading.entityId}`,d=>this._renderRow(d,e,n))}
            </ol>`:this._renderEmpty(e)}
      </section>
    `}_renderEmpty(e){let i=this._view,s=this._configOrDefault,n=!!(s.include_entities&&s.include_entities.length||s.include_integrations&&s.include_integrations.length||s.pairs&&s.pairs.length),o="No compatible bandwidth sensors discovered yet.";return i&&i.sourceCount>0?o=this._filter.trim().length>0?"No devices match your search.":"Waiting for the first reading of the selected sensors.":n?o=`No ${e} sensors match the current filters. Open the card editor to adjust the selection.`:o="No compatible bandwidth sensors found. Open the card editor to select sensors manually or to restrict the integrations.",_`<p class="empty">${o}</p>`}_renderTotals(e,i,s,n){let o=this._configOrDefault,a=this._unit,l=o.show!=="upload",d=o.show!=="download";return _`
      <footer class="totals ${!(l&&d)?"single":""}">
        ${l?_`<div class="total download">
              <ha-icon class="glyph" icon="mdi:download"></ha-icon>
              <div>
                <div class="label">Total Download (Top ${s})</div>
                <div class="amount">${oe(e,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:f}
        ${d?_`<div class="total upload">
              <ha-icon class="glyph" icon="mdi:upload"></ha-icon>
              <div>
                <div class="label">Total Upload (Top ${n})</div>
                <div class="amount">${oe(i,a,0)}<span class="u">${a}</span></div>
              </div>
            </div>`:f}
      </footer>
    `}_renderHeader(){let e=this._configOrDefault,i=e.title??"Network Speed Monitor",s=e.subtitle??`Top ${this._limit} devices by download and upload speed`;return _`
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
              ${H.map(n=>_`<option value=${String(n)} ?selected=${n===this._refreshSeconds}>
                  ${n}s
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
            ${this._menu?this._renderMenu():f}
          </div>
        </div>
      </div>
    `}_renderMenu(){return _`
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
        ${U.map(e=>_`<button role="menuitem" @click=${()=>this._setLimit(e)}>
            <span>Top ${e}</span>
            <span class="value">${this._limit===e?"\u2713":""}</span>
          </button>`)}
        <button role="menuitem" @click=${this._openEditor}><span>Edit card…</span></button>
        <div class="hint">
          Display settings apply to this view. Ranking size, sensors and defaults live in the card
          editor.
        </div>
      </div>
    `}_renderSearch(){return _`
      <div class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder="Filter devices"
          .value=${this._filter}
          @input=${e=>{this._filter=e.target.value}}
        />
      </div>
    `}render(){let e=this._config;if(!e)return f;let i=this._view,s=e.show!=="upload",n=e.show!=="download",a=s&&n&&(e.layout??"auto")!=="stacked",l=i?this._filtered(i.download.rows):[],d=i?this._filtered(i.upload.rows):[],m=l.reduce((p,u)=>p+dt(u.reading.mbps),0),c=d.reduce((p,u)=>p+dt(u.reading.mbps),0);return _`
      <ha-card>
        <div class=${this._wrapClass()} style=${this._wrapStyle()}>
          ${this._renderHeader()} ${e.show_search?this._renderSearch():f}
          <div class="panels ${a?"columns":""}">
            ${s?this._renderPanel("download",i?.download??ut()):f}
            ${n?this._renderPanel("upload",i?.upload??ut()):f}
          </div>
          ${e.show_totals!==!1?this._renderTotals(m,c,l.length,d.length):f}
        </div>
      </ha-card>
    `}updated(){let e=this.renderRoot.querySelectorAll(".row"),i=new Map;e.forEach(n=>{let o=n.dataset.key;o&&i.set(o,n.getBoundingClientRect().top)});let s=this._rowPositions;this._rowPositions=i,s&&(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||e.forEach(n=>{let o=n.dataset.key;if(!o)return;let a=s.get(o),l=i.get(o);a===void 0||l===void 0||a===l||typeof n.animate=="function"&&n.animate([{transform:`translateY(${a-l}px)`},{transform:"translateY(0)"}],{duration:320,easing:"cubic-bezier(0.22, 0.61, 0.36, 1)"})}))}};D.styles=ot,D.properties={_view:{state:!0},_paused:{state:!0},_menu:{state:!0},_filter:{state:!0},_spark:{state:!0},_unitOverride:{state:!0},_compactOverride:{state:!0},_limitOverride:{state:!0},_refreshOverride:{state:!0}};function ut(){return{rows:[],total:0,scale:1,candidates:0}}var pt={type:`custom:${S}`,name:"Network Speed Monitor",description:"Top 10 live download and upload rankings for your network devices.",preview:!0,documentationURL:"https://github.com/nikeng-forenade/ha-network-speed-monitor",version:K};var qt={title:"Card title",subtitle:"Card subtitle",show:"Rankings to show",layout:"Layout",ranking_size:"Ranking size",refresh_interval:"Refresh interval",unit:"Display unit",decimals:"Decimals",sort_direction:"Sort direction",scope:"Aggregation scope",show_bars:"Show speed bars",show_rank:"Show ranking numbers",show_timestamps:"Show reading age",show_icons:"Show device icons",show_totals:"Show Top totals",show_search:"Show device filter",show_status:"Show stale reading indicator",show_sparkline:"Show 1 h sparklines",compact:"Compact mode",max_speed:"Bar scale (max Mbps)",warn_threshold:"Warning threshold (%)",critical_threshold:"Critical threshold (%)",stale_after:"Reading considered stale after (s)",download_color:"Download color",upload_color:"Upload color",include_integrations:"Only use these integrations",exclude_integrations:"Ignore these integrations",include_entities:"Only use these sensors",exclude_entities:"Exclude these sensors"},Kt={ranking_size:"How many rows each ranking shows.",refresh_interval:"How often the card re-renders. Sensors update on their own schedule; this only affects the display.",scope:"Per device keeps one row per device (highest sensor wins) to avoid counting an interface and a device sensor twice.",max_speed:"Bars are scaled to this value. Leave at 0 to scale bars relative to the fastest device.",warn_threshold:"Percentage of the bar scale where a bar turns orange (needs a bar scale).",critical_threshold:"Percentage of the bar scale where a bar turns red (needs a bar scale).",stale_after:"Sensors that have not reported for this long are dimmed.",include_integrations:"Empty means all integrations are considered.",include_entities:"Empty means sensors are discovered automatically.",show_sparkline:"Requires the Home Assistant recorder for the selected sensors."},ht=["download_color","upload_color"];function Zt(r){if(Array.isArray(r)&&r.length===3){let[t,e,i]=r.map(s=>Number(s)||0);return`#${[t,e,i].map(s=>s.toString(16).padStart(2,"0")).join("")}`}if(typeof r=="string")return r}function Yt(r){if(!r)return;let t=/^#?([0-9a-f]{6})$/i.exec(r.trim());if(!t)return;let e=parseInt(t[1],16);return[e>>16&255,e>>8&255,e&255]}var L=class extends ${constructor(){super(...arguments);this._computeLabel=e=>qt[e.name]??e.name;this._computeHelper=e=>Kt[e.name]}setConfig(e){this._configState={...e}}get hass(){return this._hass}set hass(e){this._hass=e,this.requestUpdate()}get config(){return this._configState}_data(){let e=this._configState??{},i={...e};for(let s of ht)i[s]=Yt(e[s]);return i.include_entities=e.include_entities??[],i.exclude_entities=e.exclude_entities??[],i.include_integrations=e.include_integrations??[],i.exclude_integrations=e.exclude_integrations??[],i}_schema(){let e=this._hass?st(this._hass).map(i=>({value:i,label:i})):[];return[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"show",selector:{select:{mode:"dropdown",options:[{value:"both",label:"Download and upload"},{value:"download",label:"Download only"},{value:"upload",label:"Upload only"}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (stack on mobile)"},{value:"columns",label:"Two columns"},{value:"stacked",label:"Stacked"}]}}},{name:"ranking_size",selector:{select:{mode:"dropdown",options:U.map(i=>({value:i,label:`Top ${i}`}))}}},{name:"refresh_interval",selector:{select:{mode:"dropdown",options:H.map(i=>({value:i,label:`${i} second${i===1?"":"s"}`}))}}},{name:"unit",selector:{select:{mode:"dropdown",options:[{value:"Mbps",label:"Mbps (megabits per second)"},{value:"MBps",label:"MB/s (megabytes per second)"}]}}},{name:"decimals",selector:{number:{min:0,max:3,mode:"box",step:1}}},{name:"sort_direction",selector:{select:{mode:"dropdown",options:[{value:"desc",label:"Highest speed first"},{value:"asc",label:"Lowest speed first"}]}}},{name:"scope",selector:{select:{mode:"dropdown",options:[{value:"entity",label:"Per sensor"},{value:"device",label:"Per device (highest sensor)"}]}}},{name:"show_bars",selector:{boolean:{}}},{name:"show_rank",selector:{boolean:{}}},{name:"show_timestamps",selector:{boolean:{}}},{name:"show_icons",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_sparkline",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"max_speed",selector:{number:{min:0,max:1e5,mode:"box",unit_of_measurement:"Mbps"}}},{name:"warn_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"critical_threshold",selector:{number:{min:0,max:100,mode:"box",unit_of_measurement:"%"}}},{name:"stale_after",selector:{number:{min:10,max:86400,mode:"box",unit_of_measurement:"s"}}},{name:"download_color",selector:{color_rgb:{}}},{name:"upload_color",selector:{color_rgb:{}}},{name:"include_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"exclude_integrations",selector:{select:{multiple:!0,mode:"dropdown",options:e}}},{name:"include_entities",selector:{entity:{multiple:!0}}},{name:"exclude_entities",selector:{entity:{multiple:!0}}}]}_commit(e){this._configState={...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._configState},bubbles:!0,composed:!0}))}_valueChanged(e){e.stopPropagation();let i={...e.detail.value};for(let s of ht)s in i&&(i[s]=Zt(i[s]));for(let s of["include_entities","exclude_entities","include_integrations","exclude_integrations"]){let n=i[s];Array.isArray(n)&&n.length===0&&delete i[s]}(i.max_speed===""||i.max_speed===void 0)&&delete i.max_speed,this._commit({...this._configState??{},...i})}_patchPair(e,i){let s=this._configState??{},n=[...s.pairs??[]],a={...n[e]??{},...i};for(let l of Object.keys(a))a[l]||delete a[l];Object.keys(a).length===0?n.splice(e,1):n[e]=a,this._commit({...s,pairs:n})}_addPair(){let e=this._configState??{};this._commit({...e,pairs:[...e.pairs??[],{}]})}_removePair(e){let i=this._configState??{},s=[...i.pairs??[]];s.splice(e,1),this._commit({...i,pairs:s.length?s:void 0})}_patchOverride(e,i,s){let n=this._configState??{},o={...n.name_overrides??{}};s&&s!==e&&delete o[s],e&&i?o[e]=i:e&&!i&&delete o[e],this._commit({...n,name_overrides:Object.keys(o).length?o:void 0})}_removeOverride(e){let i=this._configState??{},s={...i.name_overrides??{}};delete s[e],this._commit({...i,name_overrides:Object.keys(s).length?s:void 0})}_renderPairs(){let e=this._configState?.pairs??[];return _`
      <div class="section">
        <div class="section-head">
          <h3>Manual download / upload pairing</h3>
          <button @click=${this._addPair}>Add pair</button>
        </div>
        <p class="hint">
          Optional. Use this for devices where the download and upload sensors cannot be matched
          automatically, or to force a friendly name and icon.
        </p>
        ${e.map((i,s)=>_`
            <div class="pair">
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${i.name??""}
                .label=${"Name"}
                @value-changed=${n=>{n.stopPropagation(),this._patchPair(s,{name:n.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${i.download??""}
                .label=${"Download sensor"}
                @value-changed=${n=>{n.stopPropagation(),this._patchPair(s,{download:n.detail.value})}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${i.upload??""}
                .label=${"Upload sensor"}
                @value-changed=${n=>{n.stopPropagation(),this._patchPair(s,{upload:n.detail.value})}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removePair(s)}>Remove</button>
            </div>
          `)}
      </div>
    `}_renderOverrides(){let e=this._configState?.name_overrides??{},i=Object.entries(e);return _`
      <div class="section">
        <div class="section-head">
          <h3>Device name overrides</h3>
          <button
            @click=${()=>{let s=this._configState??{},n=(s.include_entities??[])[0]??"";this._commit({...s,name_overrides:{...e,[n||"sensor.example"]:""}})}}
          >
            Add override
          </button>
        </div>
        <p class="hint">Rename a sensor in the rankings without renaming the entity itself.</p>
        ${i.map(([s,n])=>_`
            <div class="override">
              <ha-selector
                .hass=${this._hass}
                .selector=${{entity:{}}}
                .value=${s}
                .label=${"Sensor"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(o.detail.value,n,s)}}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{text:{}}}
                .value=${n}
                .label=${"Display name"}
                @value-changed=${o=>{o.stopPropagation(),this._patchOverride(s,o.detail.value,s)}}
              ></ha-selector>
              <button class="remove" @click=${()=>this._removeOverride(s)}>Remove</button>
            </div>
          `)}
      </div>
    `}render(){return this._hass?_`
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
    `:f}};L.styles=F`
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
  `,L.properties={};customElements.get(S)||customElements.define(S,D);customElements.get(ce)||customElements.define(ce,L);window.customCards=window.customCards??[];window.customCards.some(r=>r.type===S)||window.customCards.push(pt);console.info(`%c NETWORK SPEED MONITOR %c ${K} `,"color:#fff;background:#1a73e8;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#1a73e8;background:#e8f0fe;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");
//# sourceMappingURL=network-speed-monitor.js.map
