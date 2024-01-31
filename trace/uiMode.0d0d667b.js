import{u as Mt,r as K,e as Bt,_ as Nt,f as Rt,g as Pt,a as h,j as _,R as f,h as Dt,c as Lt,s as vt,S as Ft,i as tt,T as B,t as It,m as Wt,k as Ot,l as ht,W as jt,M as At,n as zt,b as Vt,d as Kt}from"./assets/wsPort-ee2830d7.js";class ft{constructor(){this._stringCache=new Map}internString(t){let e=this._stringCache.get(t);return e||(this._stringCache.set(t,t),e=t),e}}class pt{constructor(t,e,s,i){this._tests=new Map,this._listOnly=!1,this._clearPreviousResultsWhenTestBegins=!1,this._stringPool=new ft,this._rootSuite=new j("","root"),this._pathSeparator=t,this._reporter=e,this._reuseTestCases=s,this._reportConfig=i}dispatch(t){const{method:e,params:s}=t;if(e==="onConfigure"){this._onConfigure(s.config);return}if(e==="onProject"){this._onProject(s.project);return}if(e==="onBegin"){this._onBegin();return}if(e==="onTestBegin"){this._onTestBegin(s.testId,s.result);return}if(e==="onTestEnd"){this._onTestEnd(s.test,s.result);return}if(e==="onStepBegin"){this._onStepBegin(s.testId,s.resultId,s.step);return}if(e==="onStepEnd"){this._onStepEnd(s.testId,s.resultId,s.step);return}if(e==="onError"){this._onError(s.error);return}if(e==="onStdIO"){this._onStdIO(s.type,s.testId,s.resultId,s.data,s.isBase64);return}if(e==="onEnd")return this._onEnd(s.result);if(e==="onExit")return this._onExit()}_setClearPreviousResultsWhenTestBegins(){this._clearPreviousResultsWhenTestBegins=!0}_onConfigure(t){var e,s;this._rootDir=t.rootDir,this._listOnly=t.listOnly,this._config=this._parseConfig(t),(s=(e=this._reporter).onConfigure)==null||s.call(e,this._config)}_onProject(t){let e=this._rootSuite.suites.find(i=>i.project().__projectId===t.id);e||(e=new j(t.name,"project"),this._rootSuite.suites.push(e),e.parent=this._rootSuite);const s=this._parseProject(t);if(e.project=()=>s,this._mergeSuitesInto(t.suites,e),this._listOnly){const i=new Set,r=c=>{c.tests.map(a=>a.testId).forEach(a=>i.add(a)),c.suites.forEach(r)};t.suites.forEach(r);const o=c=>{c.tests=c.tests.filter(a=>i.has(a.id)),c.suites.forEach(o)};o(e)}}_onBegin(){var t,e;(e=(t=this._reporter).onBegin)==null||e.call(t,this._rootSuite)}_onTestBegin(t,e){var r,o;const s=this._tests.get(t);this._clearPreviousResultsWhenTestBegins&&s._clearResults();const i=s._createTestResult(e.id);i.retry=e.retry,i.workerIndex=e.workerIndex,i.parallelIndex=e.parallelIndex,i.setStartTimeNumber(e.startTime),i.statusEx="running",(o=(r=this._reporter).onTestBegin)==null||o.call(r,s,i)}_onTestEnd(t,e){var r,o,c;const s=this._tests.get(t.testId);s.timeout=t.timeout,s.expectedStatus=t.expectedStatus,s.annotations=t.annotations;const i=s.resultsMap.get(e.id);i.duration=e.duration,i.status=e.status,i.statusEx=e.status,i.errors=e.errors,i.error=(r=i.errors)==null?void 0:r[0],i.attachments=this._parseAttachments(e.attachments),(c=(o=this._reporter).onTestEnd)==null||c.call(o,s,i),i.stepMap=new Map}_onStepBegin(t,e,s){var p,d;const i=this._tests.get(t),r=i.resultsMap.get(e),o=s.parentStepId?r.stepMap.get(s.parentStepId):void 0,c=this._absoluteLocation(s.location),a=new Ht(s,o,c);o?o.steps.push(a):r.steps.push(a),r.stepMap.set(s.id,a),(d=(p=this._reporter).onStepBegin)==null||d.call(p,i,r,a)}_onStepEnd(t,e,s){var c,a;const i=this._tests.get(t),r=i.resultsMap.get(e),o=r.stepMap.get(s.id);o.duration=s.duration,o.error=s.error,(a=(c=this._reporter).onStepEnd)==null||a.call(c,i,r,o)}_onError(t){var e,s;(s=(e=this._reporter).onError)==null||s.call(e,t)}_onStdIO(t,e,s,i,r){var p,d,b,g;const o=r?globalThis.Buffer?Buffer.from(i,"base64"):atob(i):i,c=e?this._tests.get(e):void 0,a=c&&s?c.resultsMap.get(s):void 0;t==="stdout"?(a==null||a.stdout.push(o),(d=(p=this._reporter).onStdOut)==null||d.call(p,o,c,a)):(a==null||a.stderr.push(o),(g=(b=this._reporter).onStdErr)==null||g.call(b,o,c,a))}async _onEnd(t){var e,s;await((s=(e=this._reporter).onEnd)==null?void 0:s.call(e,{status:t.status,startTime:new Date(t.startTime),duration:t.duration}))}_onExit(){var t,e;return this._stringPool=new ft,(e=(t=this._reporter).onExit)==null?void 0:e.call(t)}_parseConfig(t){const e={...bt,...t};return this._reportConfig&&(e.configFile=this._reportConfig.configFile,e.reportSlowTests=this._reportConfig.reportSlowTests,e.quiet=this._reportConfig.quiet,e.reporter=[...this._reportConfig.reporter]),e}_parseProject(t){return{__projectId:t.id,metadata:t.metadata,name:t.name,outputDir:this._absolutePath(t.outputDir),repeatEach:t.repeatEach,retries:t.retries,testDir:this._absolutePath(t.testDir),testIgnore:G(t.testIgnore),testMatch:G(t.testMatch),timeout:t.timeout,grep:G(t.grep),grepInvert:G(t.grepInvert),dependencies:t.dependencies,teardown:t.teardown,snapshotDir:this._absolutePath(t.snapshotDir),use:{}}}_parseAttachments(t){return t.map(e=>({...e,body:e.base64&&globalThis.Buffer?Buffer.from(e.base64,"base64"):void 0}))}_mergeSuitesInto(t,e){for(const s of t){let i=e.suites.find(r=>r.title===s.title);i||(i=new j(s.title,s.type),i.parent=e,e.suites.push(i)),i.location=this._absoluteLocation(s.location),i._fileId=s.fileId,i._parallelMode=s.parallelMode,this._mergeSuitesInto(s.suites,i),this._mergeTestsInto(s.tests,i)}}_mergeTestsInto(t,e){for(const s of t){let i=this._reuseTestCases?e.tests.find(r=>r.title===s.title):void 0;i||(i=new Ut(s.testId,s.title,this._absoluteLocation(s.location)),i.parent=e,e.tests.push(i),this._tests.set(i.id,i)),this._updateTest(s,i)}}_updateTest(t,e){return e.id=t.testId,e.location=this._absoluteLocation(t.location),e.retries=t.retries,e}_absoluteLocation(t){return t&&{...t,file:this._absolutePath(t.file)}}_absolutePath(t){return t&&this._stringPool.internString(this._rootDir+this._pathSeparator+t)}}class j{constructor(t,e){this._requireFile="",this.suites=[],this.tests=[],this._parallelMode="none",this.title=t,this._type=e}allTests(){const t=[],e=s=>{for(const i of[...s.suites,...s.tests])i instanceof j?e(i):t.push(i)};return e(this),t}titlePath(){const t=this.parent?this.parent.titlePath():[];return(this.title||this._type!=="describe")&&t.push(this.title),t}project(){}}class Ut{constructor(t,e,s){this.fn=()=>{},this.results=[],this.expectedStatus="passed",this.timeout=0,this.annotations=[],this.retries=0,this.repeatEachIndex=0,this.resultsMap=new Map,this.id=t,this.title=e,this.location=s}titlePath(){const t=this.parent?this.parent.titlePath():[];return t.push(this.title),t}outcome(){var s,i;const t=[...this.results];for(;((s=t[0])==null?void 0:s.status)==="skipped"||((i=t[0])==null?void 0:i.status)==="interrupted";)t.shift();if(!t.length)return"skipped";const e=t.filter(r=>r.status!=="skipped"&&r.status!=="interrupted"&&r.status!==this.expectedStatus);return e.length?e.length===t.length?"unexpected":"flaky":"expected"}ok(){const t=this.outcome();return t==="expected"||t==="flaky"||t==="skipped"}_clearResults(){this.results=[],this.resultsMap.clear()}_createTestResult(t){const e=new $t(this.results.length);return this.results.push(e),this.resultsMap.set(t,e),e}}class Ht{constructor(t,e,s){this.duration=-1,this.steps=[],this._startTime=0,this.title=t.title,this.category=t.category,this.location=s,this.parent=e,this._startTime=t.startTime}titlePath(){var e;return[...((e=this.parent)==null?void 0:e.titlePath())||[],this.title]}get startTime(){return new Date(this._startTime)}set startTime(t){this._startTime=+t}}class $t{constructor(t){this.parallelIndex=-1,this.workerIndex=-1,this.duration=-1,this.stdout=[],this.stderr=[],this.attachments=[],this.status="skipped",this.steps=[],this.errors=[],this.stepMap=new Map,this.statusEx="scheduled",this._startTime=0,this.retry=t}setStartTimeNumber(t){this._startTime=t}get startTime(){return new Date(this._startTime)}set startTime(t){this._startTime=+t}}const bt={forbidOnly:!1,fullyParallel:!1,globalSetup:null,globalTeardown:null,globalTimeout:0,grep:/.*/,grepInvert:null,maxFailures:0,metadata:{},preserveOutput:"always",projects:[],reporter:[[{}.CI?"dot":"list"]],reportSlowTests:{max:5,threshold:15e3},configFile:"",rootDir:"",quiet:!1,shard:null,updateSnapshots:"missing",version:"",workers:0,webServer:null};function G(n){return n.map(t=>t.s?t.s:new RegExp(t.r.source,t.r.flags))}const qt=({source:n})=>{const[t,e]=Mt(),[s,i]=K.useState(Bt()),[r]=K.useState(Nt(()=>import("./assets/xtermModule-443332e6.js"),["./assets/xtermModule-443332e6.js","./xtermModule.6428296b.css"],import.meta.url).then(c=>c.default)),o=K.useRef(null);return K.useEffect(()=>(Rt(i),()=>Pt(i)),[]),K.useEffect(()=>{const c=n.write,a=n.clear;return(async()=>{const{Terminal:p,FitAddon:d}=await r,b=e.current;if(!b)return;const g=s==="dark-mode"?Xt:Yt;if(o.current&&o.current.terminal.options.theme===g)return;o.current&&(b.textContent="");const l=new p({convertEol:!0,fontSize:13,scrollback:1e4,fontFamily:"var(--vscode-editor-font-family)",theme:g}),m=new d;l.loadAddon(m);for(const v of n.pending)l.write(v);n.write=v=>{n.pending.push(v),l.write(v)},n.clear=()=>{n.pending=[],l.clear()},l.open(b),m.fit(),o.current={terminal:l,fitAddon:m}})(),()=>{n.clear=a,n.write=c}},[r,o,e,n,s]),K.useEffect(()=>{setTimeout(()=>{o.current&&(o.current.fitAddon.fit(),n.resize(o.current.terminal.cols,o.current.terminal.rows))},250)},[t,n]),h("div",{"data-testid":"output",className:"xterm-wrapper",style:{flex:"auto"},ref:e})},Yt={foreground:"#383a42",background:"#fafafa",cursor:"#383a42",black:"#000000",red:"#e45649",green:"#50a14f",yellow:"#c18401",blue:"#4078f2",magenta:"#a626a4",cyan:"#0184bc",white:"#a0a0a0",brightBlack:"#000000",brightRed:"#e06c75",brightGreen:"#98c379",brightYellow:"#d19a66",brightBlue:"#4078f2",brightMagenta:"#a626a4",brightCyan:"#0184bc",brightWhite:"#383a42",selectionBackground:"#d7d7d7",selectionForeground:"#383a42"},Xt={foreground:"#f8f8f2",background:"#1e1e1e",cursor:"#f8f8f0",black:"#000000",red:"#ff5555",green:"#50fa7b",yellow:"#f1fa8c",blue:"#bd93f9",magenta:"#ff79c6",cyan:"#8be9fd",white:"#bfbfbf",brightBlack:"#4d4d4d",brightRed:"#ff6e6e",brightGreen:"#69ff94",brightYellow:"#ffffa5",brightBlue:"#d6acff",brightMagenta:"#ff92df",brightCyan:"#a4ffff",brightWhite:"#e6e6e6",selectionBackground:"#44475a",selectionForeground:"#f8f8f2"};const Jt=({title:n,children:t,setExpanded:e,expanded:s,expandOnTitleClick:i})=>_("div",{className:"expandable"+(s?" expanded":""),children:[_("div",{className:"expandable-title",onClick:()=>i&&e(!s),children:[h("div",{className:"codicon codicon-"+(s?"chevron-down":"chevron-right"),style:{cursor:"pointer",color:"var(--vscode-foreground)",marginLeft:"5px"},onClick:()=>!i&&e(!s)}),n]}),s&&h("div",{style:{marginLeft:25},children:t})]});function Qt(n){return`.playwright-artifacts-${n}`}let at=()=>{},_t=n=>{},St={cols:80,rows:24},O=async()=>{};const A={pending:[],clear:()=>{},write:n=>A.pending.push(n),resize:(n,t)=>{St={cols:n,rows:t},Y("resizeTerminal",{cols:n,rows:t})}},Zt=({})=>{var dt;const[n,t]=f.useState(""),[e,s]=f.useState(!1),[i,r]=f.useState(new Map([["passed",!1],["failed",!1],["skipped",!1]])),[o,c]=f.useState(new Map),[a,p]=f.useState({config:void 0,rootSuite:void 0,loadErrors:[]}),[d,b]=f.useState(),[g,l]=f.useState({}),[m,v]=f.useState(new Set),[E,N]=f.useState(!1),[S,D]=f.useState(),[R,J]=Dt("watch-all",!1),[st,z]=f.useState({value:new Set}),u=f.useRef(Promise.resolve()),k=f.useRef(new Set),[w,T]=f.useState(0),[C,y]=f.useState(!1),[Q,ut]=f.useState(!0),Et=f.useRef(null),it=f.useCallback(()=>{N(!0),z({value:new Set}),at(bt,new j("","root"),[],void 0),Tt(!0).then(async()=>{N(!1);const{hasBrowsers:x}=await O("checkBrowsers");ut(x)})},[]);f.useEffect(()=>{var x;(x=Et.current)==null||x.focus(),N(!0),Lt({onEvent:ie,onClose:()=>y(!0)}).then(M=>{O=async(L,F)=>{const P=window.__logForTest;P==null||P({method:L,params:F}),await M(L,F)},it()})},[it]),at=f.useCallback((x,M,L,F)=>{const P=x.configFile?vt.getObject(x.configFile+":projects",void 0):void 0;for(const I of o.keys())M.suites.find(Z=>Z.title===I)||o.delete(I);for(const I of M.suites)o.has(I.title)||o.set(I.title,!!(P!=null&&P.includes(I.title)));!P&&o.size&&![...o.values()].includes(!0)&&o.set(o.entries().next().value[0],!0),p({config:x,rootSuite:M,loadErrors:L}),c(new Map(o)),S&&F?b(F):F||b(void 0)},[o,S]);const nt=f.useCallback((x,M)=>{x==="bounce-if-busy"&&S||(k.current=new Set([...k.current,...M]),u.current=u.current.then(async()=>{var P,I,Z;const L=k.current;if(k.current=new Set,!L.size)return;{for(const W of((P=a.rootSuite)==null?void 0:P.allTests())||[])L.has(W.id)&&(W._clearResults(),W._createTestResult("pending"));p({...a})}const F="  ["+new Date().toLocaleTimeString()+"]";A.write("\x1B[2m—".repeat(Math.max(0,St.cols-F.length))+F+"\x1B[22m"),b({total:0,passed:0,failed:0,skipped:0}),D({testIds:L}),await O("run",{testIds:[...L],projects:[...o].filter(([W,yt])=>yt).map(([W])=>W)});for(const W of((I=a.rootSuite)==null?void 0:I.allTests())||[])((Z=W.results[0])==null?void 0:Z.duration)===-1&&W._clearResults();p({...a}),D(void 0)}))},[o,S,a]),V=!!S,ot=f.useRef(null),Ct=f.useCallback(x=>{var M;x.preventDefault(),x.stopPropagation(),(M=ot.current)==null||M.showModal()},[]),rt=f.useCallback(x=>{var M;x.preventDefault(),x.stopPropagation(),(M=ot.current)==null||M.close()},[]),xt=f.useCallback(x=>{rt(x),s(!0),O("installBrowsers").then(async()=>{s(!1);const{hasBrowsers:M}=await O("checkBrowsers");ut(M)})},[rt]);return _("div",{className:"vbox ui-mode",children:[!Q&&_("dialog",{ref:ot,children:[_("div",{className:"title",children:[h("span",{className:"codicon codicon-lightbulb"}),"Install browsers"]}),_("div",{className:"body",children:["Playwright did not find installed browsers.",h("br",{}),"Would you like to run `playwright install`?",h("br",{}),h("button",{className:"button",onClick:xt,children:"Install"}),h("button",{className:"button secondary",onClick:rt,children:"Dismiss"})]})]}),C&&_("div",{className:"disconnected",children:[h("div",{className:"title",children:"UI Mode disconnected"}),_("div",{children:[h("a",{href:"#",onClick:()=>window.location.href="/",children:"Reload the page"})," to reconnect"]})]}),_(Ft,{sidebarSize:250,minSidebarSize:150,orientation:"horizontal",sidebarIsFirst:!0,settingName:"testListSidebar",children:[_("div",{className:"vbox",children:[_("div",{className:"vbox"+(e?"":" hidden"),children:[_(tt,{children:[h("div",{className:"section-title",style:{flex:"none"},children:"Output"}),h(B,{icon:"circle-slash",title:"Clear output",onClick:()=>A.clear()}),h("div",{className:"spacer"}),h(B,{icon:"close",title:"Close",onClick:()=>s(!1)})]}),h(qt,{source:A})]}),h("div",{className:"vbox"+(e?" hidden":""),children:h(se,{item:g,rootDir:(dt=a.config)==null?void 0:dt.rootDir})})]}),_("div",{className:"vbox ui-mode-sidebar",children:[_(tt,{noShadow:!0,noMinHeight:!0,children:[h("img",{src:"playwright-logo.svg",alt:"Playwright logo"}),h("div",{className:"section-title",children:"Playwright"}),h(B,{icon:"color-mode",title:"Toggle color mode",onClick:()=>It()}),h(B,{icon:"refresh",title:"Reload",onClick:()=>it(),disabled:V||E}),h(B,{icon:"terminal",title:"Toggle output",toggled:e,onClick:()=>{s(!e)}}),!Q&&h(B,{icon:"lightbulb-autofix",style:{color:"var(--vscode-list-warningForeground)"},title:"Playwright browsers are missing",onClick:Ct})]}),h(Gt,{filterText:n,setFilterText:t,statusFilters:i,setStatusFilters:r,projectFilters:o,setProjectFilters:c,testModel:a,runTests:()=>nt("bounce-if-busy",m)}),_(tt,{noMinHeight:!0,children:[!V&&!d&&h("div",{className:"section-title",children:"Tests"}),!V&&d&&h("div",{"data-testid":"status-line",className:"status-line",children:_("div",{children:[d.passed,"/",d.total," passed (",d.passed/d.total*100|0,"%)"]})}),V&&d&&h("div",{"data-testid":"status-line",className:"status-line",children:_("div",{children:["Running ",d.passed,"/",S.testIds.size," passed (",d.passed/S.testIds.size*100|0,"%)"]})}),h(B,{icon:"play",title:"Run all",onClick:()=>nt("bounce-if-busy",m),disabled:V||E}),h(B,{icon:"debug-stop",title:"Stop",onClick:()=>Y("stop"),disabled:!V||E}),h(B,{icon:"eye",title:"Watch all",toggled:R,onClick:()=>{z({value:new Set}),J(!R)}}),h(B,{icon:"collapse-all",title:"Collapse all",onClick:()=>{T(w+1)}})]}),h(ee,{statusFilters:i,projectFilters:o,filterText:n,testModel:a,runningState:S,runTests:nt,onItemSelected:l,setVisibleTestIds:v,watchAll:R,watchedTreeIds:st,setWatchedTreeIds:z,isLoading:E,requestedCollapseAllCount:w})]})]})]})},Gt=({filterText:n,setFilterText:t,statusFilters:e,setStatusFilters:s,projectFilters:i,setProjectFilters:r,testModel:o,runTests:c})=>{const[a,p]=f.useState(!1),d=f.useRef(null);f.useEffect(()=>{var l;(l=d.current)==null||l.focus()},[]);const b=[...e.entries()].filter(([l,m])=>m).map(([l])=>l).join(" ")||"all",g=[...i.entries()].filter(([l,m])=>m).map(([l])=>l).join(" ")||"all";return _("div",{className:"filters",children:[h(Jt,{expanded:a,setExpanded:p,title:h("input",{ref:d,type:"search",placeholder:"Filter (e.g. text, @tag)",spellCheck:!1,value:n,onChange:l=>{t(l.target.value)},onKeyDown:l=>{l.key==="Enter"&&c()}})}),_("div",{className:"filter-summary",title:"Status: "+b+`
Projects: `+g,onClick:()=>p(!a),children:[h("span",{className:"filter-label",children:"Status:"})," ",b,h("span",{className:"filter-label",children:"Projects:"})," ",g]}),a&&_("div",{className:"hbox",style:{marginLeft:14,maxHeight:200,overflowY:"auto"},children:[h("div",{className:"filter-list",children:[...e.entries()].map(([l,m])=>h("div",{className:"filter-entry",children:_("label",{children:[h("input",{type:"checkbox",checked:m,onClick:()=>{const v=new Map(e);v.set(l,!v.get(l)),s(v)}}),h("div",{children:l})]})}))}),h("div",{className:"filter-list",children:[...i.entries()].map(([l,m])=>h("div",{className:"filter-entry",children:_("label",{children:[h("input",{type:"checkbox",checked:m,onClick:()=>{var N;const v=new Map(i);v.set(l,!v.get(l)),r(v);const E=(N=o==null?void 0:o.config)==null?void 0:N.configFile;E&&vt.setObject(E+":projects",[...v.entries()].filter(([S,D])=>D).map(([S])=>S))}}),h("div",{children:l||"untitled"})]})}))})]})]})},te=zt,ee=({statusFilters:n,projectFilters:t,filterText:e,testModel:s,runTests:i,runningState:r,watchAll:o,watchedTreeIds:c,setWatchedTreeIds:a,isLoading:p,onItemSelected:d,setVisibleTestIds:b,requestedCollapseAllCount:g})=>{const[l,m]=f.useState({expandedItems:new Map}),[v,E]=f.useState(),[N,S]=f.useState(g),{rootItem:D,treeItemMap:R,fileNames:J}=f.useMemo(()=>{let u=re(s.rootSuite,s.loadErrors,t);le(u,e,n,r==null?void 0:r.testIds),kt(u),u=ae(u),ce(u);const k=new Map,w=new Set,T=new Set,C=y=>{y.kind==="group"&&y.location.file&&T.add(y.location.file),y.kind==="case"&&y.tests.forEach(Q=>w.add(Q.id)),y.children.forEach(C),k.set(y.id,y)};return C(u),b(w),{rootItem:u,treeItemMap:k,fileNames:T}},[e,s,n,t,b,r]);f.useEffect(()=>{if(N!==g){l.expandedItems.clear();for(const w of R.keys())l.expandedItems.set(w,!1);S(g),E(void 0),m({...l});return}if(!r||r.itemSelectedByUser)return;let u;const k=w=>{var T;w.children.forEach(k),!u&&w.status==="failed"&&(w.kind==="test"&&r.testIds.has(w.test.id)||w.kind==="case"&&r.testIds.has((T=w.tests[0])==null?void 0:T.id))&&(u=w)};k(D),u&&E(u.id)},[r,E,D,N,S,g,l,m,R]);const{selectedTreeItem:st}=f.useMemo(()=>{const u=v?R.get(v):void 0;let k;u&&(k={file:u.location.file,line:u.location.line,source:{errors:s.loadErrors.filter(T=>{var C;return((C=T.location)==null?void 0:C.file)===u.location.file}).map(T=>({line:T.location.line,message:T.message})),content:void 0}});let w;return(u==null?void 0:u.kind)==="test"?w=u.test:(u==null?void 0:u.kind)==="case"&&u.tests.length===1&&(w=u.tests[0]),d({treeItem:u,testCase:w,testFile:k}),{selectedTreeItem:u}},[d,v,s,R]);f.useEffect(()=>{if(!p)if(o)Y("watch",{fileNames:[...J]});else{const u=new Set;for(const k of c.value){const w=R.get(k),T=w==null?void 0:w.location.file;T&&u.add(T)}Y("watch",{fileNames:[...u]})}},[p,D,J,o,c,R]);const z=u=>{E(u.id),i("bounce-if-busy",lt(u))};return _t=u=>{const k=[],w=new Set(u);if(o){const T=C=>{const y=C.location.file;y&&w.has(y)&&k.push(...lt(C)),C.kind==="group"&&C.subKind==="folder"&&C.children.forEach(T)};T(D)}else for(const T of c.value){const C=R.get(T),y=C==null?void 0:C.location.file;y&&w.has(y)&&k.push(...lt(C))}i("queue-if-busy",new Set(k))},h(te,{name:"tests",treeState:l,setTreeState:m,rootItem:D,dataTestId:"test-tree",render:u=>_("div",{className:"hbox ui-mode-list-item",children:[h("div",{className:"ui-mode-list-item-title",title:u.title,children:u.title}),!!u.duration&&u.status!=="skipped"&&h("div",{className:"ui-mode-list-item-time",children:Wt(u.duration)}),_(tt,{noMinHeight:!0,noShadow:!0,children:[h(B,{icon:"play",title:"Run",onClick:()=>z(u),disabled:!!r}),h(B,{icon:"go-to-file",title:"Open in VS Code",onClick:()=>Y("open",{location:oe(u)}),style:u.kind==="group"&&u.subKind==="folder"?{visibility:"hidden"}:{}}),!o&&h(B,{icon:"eye",title:"Watch",onClick:()=>{c.value.has(u.id)?c.value.delete(u.id):c.value.add(u.id),a({...c})},toggled:c.value.has(u.id)})]})]}),icon:u=>Ot(u.status),selectedItem:st,onAccepted:z,onSelected:u=>{r&&(r.itemSelectedByUser=!0),E(u.id)},isError:u=>u.kind==="group"?u.hasLoadErrors:!1,autoExpandDepth:e?5:1,noItemsMessage:p?"Loading…":"No tests"})},se=({item:n,rootDir:t})=>{var g;const[e,s]=f.useState(),[i,r]=f.useState(0),o=f.useRef(null),{outputDir:c}=f.useMemo(()=>({outputDir:n.testCase?ne(n.testCase):void 0}),[n]),[a,p]=f.useState(),d=f.useCallback(l=>p(ht(l)),[p]),b=a?e==null?void 0:e.model.actions.find(l=>ht(l)===a):void 0;return f.useEffect(()=>{var E,N;o.current&&clearTimeout(o.current);const l=(E=n.testCase)==null?void 0:E.results[0];if(!l){s(void 0);return}const m=l&&l.duration>=0&&l.attachments.find(S=>S.name==="trace");if(m&&m.path){wt(m.path).then(S=>s({model:S,isLive:!1}));return}if(!c){s(void 0);return}const v=`${c}/${Qt(l.workerIndex)}/traces/${(N=n.testCase)==null?void 0:N.id}.json`;return o.current=setTimeout(async()=>{try{const S=await wt(v);s({model:S,isLive:!0})}catch{s(void 0)}finally{r(i+1)}},500),()=>{o.current&&clearTimeout(o.current)}},[c,n,s,i,r]),h(jt,{model:e==null?void 0:e.model,hideStackFrames:!0,showSourcesFirst:!0,rootDir:t,initialSelection:b,onSelectionChanged:d,fallbackLocation:n.testFile,isLive:e==null?void 0:e.isLive,status:(g=n.treeItem)==null?void 0:g.status},"workbench")};let $,q,gt,et,H;const mt=()=>{clearTimeout(et),et=void 0,at(H.config,H.rootSuite,H.loadErrors,H.progress)},U=(n,t,e,s,i=!1)=>{H={config:n,rootSuite:t,loadErrors:e,progress:s},i?mt():et||(et=setTimeout(mt,250))},Tt=n=>{if(!n)return O("list",{});let t;const e=[],s={total:0,passed:0,failed:0,skipped:0};let i;return $=new pt(X,{version:()=>"v2",onConfigure:r=>{i=r,q=new pt(X,{onBegin:o=>{gt=o.allTests().length,q=void 0}},!1)},onBegin:r=>{t||(t=r),s.total=gt,s.passed=0,s.failed=0,s.skipped=0,U(i,t,e,s,!0)},onEnd:()=>{U(i,t,e,s,!0)},onTestBegin:()=>{U(i,t,e,s)},onTestEnd:r=>{r.outcome()==="skipped"?++s.skipped:r.outcome()==="unexpected"?++s.failed:++s.passed,U(i,t,e,s)},onError:r=>{A.write((r.stack||r.value||"")+`
`),e.push(r),U(i,t??new j("","root"),e,s)},printsToStdio:()=>!1,onStdOut:()=>{},onStdErr:()=>{},onExit:()=>{},onStepBegin:()=>{},onStepEnd:()=>{}},!0),$._setClearPreviousResultsWhenTestBegins(),O("list",{})},Y=(n,t)=>{if(window._overrideProtocolForTest){window._overrideProtocolForTest({method:n,params:t}).catch(()=>{});return}O(n,t).catch(e=>{console.error(e)})},ie=(n,t)=>{var e,s;if(n==="listChanged"){Tt(!1).catch(()=>{});return}if(n==="testFilesChanged"){_t(t.testFileNames);return}if(n==="stdio"){if(t.buffer){const i=atob(t.buffer);A.write(i)}else A.write(t.text);return}(e=q==null?void 0:q.dispatch({method:n,params:t}))==null||e.catch(()=>{}),(s=$==null?void 0:$.dispatch({method:n,params:t}))==null||s.catch(()=>{})},ne=n=>{var t;for(let e=n.parent;e;e=e.parent)if(e.project())return(t=e.project())==null?void 0:t.outputDir},oe=n=>{if(n)return n.location.file+":"+n.location.line},lt=n=>{const t=new Set;if(!n)return t;const e=s=>{var i;s.kind==="case"?s.tests.map(r=>r.id).forEach(r=>t.add(r)):s.kind==="test"?t.add(s.id):(i=s.children)==null||i.forEach(e)};return e(n),t};function ct(n,t,e,s){if(t.length===0)return n;const i=t.join(X),r=s.get(i);if(r)return r;const o=ct(n,t.slice(0,t.length-1),!1,s),c={kind:"group",subKind:e?"file":"folder",id:i,title:t[t.length-1],location:{file:i,line:0,column:0},duration:0,parent:o,children:[],status:"none",hasLoadErrors:!1};return o.children.push(c),s.set(i,c),c}function re(n,t,e){const s=[...e.values()].some(Boolean),i={kind:"group",subKind:"folder",id:"root",title:"",location:{file:"",line:0,column:0},duration:0,parent:void 0,children:[],status:"none",hasLoadErrors:!1},r=(c,a,p)=>{for(const d of a.suites){const b=d.title||"<anonymous>";let g=p.children.find(l=>l.kind==="group"&&l.title===b);g||(g={kind:"group",subKind:"describe",id:"suite:"+a.titlePath().join("")+""+b,title:b,location:d.location,duration:0,parent:p,children:[],status:"none",hasLoadErrors:!1},p.children.push(g)),r(c,d,g)}for(const d of a.tests){const b=d.title;let g=p.children.find(v=>v.kind!=="group"&&v.title===b);g||(g={kind:"case",id:"test:"+d.titlePath().join(""),title:b,parent:p,children:[],tests:[],location:d.location,duration:0,status:"none"},p.children.push(g));const l=d.results[0];let m="none";(l==null?void 0:l.statusEx)==="scheduled"?m="scheduled":(l==null?void 0:l.statusEx)==="running"?m="running":(l==null?void 0:l.status)==="skipped"?m="skipped":(l==null?void 0:l.status)==="interrupted"?m="none":l&&d.outcome()!=="expected"?m="failed":l&&d.outcome()==="expected"&&(m="passed"),g.tests.push(d),g.children.push({kind:"test",id:d.id,title:c,location:d.location,test:d,parent:g,children:[],status:m,duration:d.results.length?Math.max(0,d.results[0].duration):0,project:c}),g.duration=g.children.reduce((v,E)=>v+E.duration,0)}},o=new Map;for(const c of(n==null?void 0:n.suites)||[])if(!(s&&!e.get(c.title)))for(const a of c.suites){const p=ct(i,a.location.file.split(X),!0,o);r(c.title,a,p)}for(const c of t){if(!c.location)continue;const a=ct(i,c.location.file.split(X),!0,o);a.hasLoadErrors=!0}return i}function le(n,t,e,s){const i=t.trim().toLowerCase().split(" "),r=[...e.values()].some(Boolean),o=a=>{const p=a.tests[0].titlePath().join(" ").toLowerCase();return!i.every(d=>p.includes(d))&&!a.tests.some(d=>s==null?void 0:s.has(d.id))?!1:(a.children=a.children.filter(d=>!r||(s==null?void 0:s.has(d.test.id))||e.get(d.status)),a.tests=a.children.map(d=>d.test),!!a.children.length)},c=a=>{const p=[];for(const d of a.children)d.kind==="case"?o(d)&&p.push(d):(c(d),(d.children.length||d.hasLoadErrors)&&p.push(d));a.children=p};c(n)}function kt(n){for(const o of n.children)kt(o);n.kind==="group"&&n.children.sort((o,c)=>o.location.file.localeCompare(c.location.file)||o.location.line-c.location.line);let t=n.children.length>0,e=n.children.length>0,s=!1,i=!1,r=!1;for(const o of n.children)e=e&&o.status==="skipped",t=t&&(o.status==="passed"||o.status==="skipped"),s=s||o.status==="failed",i=i||o.status==="running",r=r||o.status==="scheduled";i?n.status="running":r?n.status="scheduled":s?n.status="failed":e?n.status="skipped":t&&(n.status="passed")}function ae(n){let t=n;for(;t.children.length===1&&t.children[0].kind==="group"&&t.children[0].subKind==="folder";)t=t.children[0];return t.location=n.location,t}function ce(n){const t=e=>{e.kind==="case"&&e.children.length===1?e.children=[]:e.children.forEach(t)};t(n)}async function wt(n){const t=new URLSearchParams;t.set("trace",n);const s=await(await fetch(`contexts?${t.toString()}`)).json();return new At(s)}const X=navigator.userAgent.toLowerCase().includes("windows")?"\\":"/";(async()=>{if(Vt(),window.location.protocol!=="file:"){if(window.location.href.includes("isUnderTest=true")&&await new Promise(n=>setTimeout(n,1e3)),!navigator.serviceWorker)throw new Error(`Service workers are not supported.
Make sure to serve the website (${window.location}) via HTTPS or localhost.`);navigator.serviceWorker.register("sw.bundle.js"),navigator.serviceWorker.controller||await new Promise(n=>{navigator.serviceWorker.oncontrollerchange=()=>n()}),setInterval(function(){fetch("ping")},1e4)}Kt.render(h(Zt,{}),document.querySelector("#root"))})();
