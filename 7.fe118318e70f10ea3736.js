(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{NU5W:function(n,l,a){"use strict";a.r(l);var e=a("CcnG");function t(n){return["http://localhost:4400/api/auth/","http://other.url/with/no/token/injected/"].some(function(l){return n.url.includes(l)})}var u=function(){},r=a("ZYCi"),c=function(){},i=e.Oa({encapsulation:2,styles:[],data:{}});function o(n){return e.kb(0,[(n()(),e.Qa(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),e.Pa(1,212992,null,0,r.q,[r.b,e.O,e.j,[8,null],e.h],null,null)],function(n,l){n(l,1,0)},null)}var s=e.Ma("nb-playground-auth",c,function(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,1,"nb-playground-auth",[],null,null,null,o,i)),e.Pa(1,49152,null,0,c,[],null,null)],null,null)},{},{},[]),b=a("7lHa"),d=a("BgYQ"),p=a("K+tO"),h=a("cZ1G"),g=a("xZ8S"),f=a("WpxC"),m=a("KM9H"),w=a("vuB0"),v=a("4vXS"),y=a("7uv5"),Y=a("MGne"),x=a("NfCQ"),A=a("kztb"),k=a("V+dw"),P=a("8bEz"),R=a("k6ER"),C=a("4Ssn"),O=a("S+eJ"),Q=a("Ip0R"),S=a("jvbL"),j=function(){},V=new e.o("Nebular Security Options"),E=function(n){return Object.assign({},n)},N=function(n){return Object.assign([],n)},z=function(n){var l=n.parent;return delete n.parent,l},I=function(){function n(n){void 0===n&&(n={}),this.settings=n,this.state={},n.accessControl&&this.setAccessControl(n.accessControl)}return n.prototype.setAccessControl=function(n){for(var l=0,a=Object.entries(n);l<a.length;l++){var e=a[l],t=e[0],u=E(e[1]),r=z(u);this.register(t,r,u)}},n.prototype.register=function(n,l,a){void 0===l&&(l=null),void 0===a&&(a={}),this.validateRole(n),this.state[n]={parent:l};for(var e=0,t=Object.entries(a);e<t.length;e++){var u=t[e],r=u[1];this.allow(n,u[0],N("string"==typeof r?[r]:r))}},n.prototype.allow=function(n,l,a){this.validateRole(n),this.getRole(n)||this.register(n,null,{}),a="string"==typeof a?[a]:a;var e=N(this.getRoleResources(n,l));e=e.concat(a),this.state[n][l]=e.filter(function(n,l){return e.indexOf(n)===l})},n.prototype.can=function(n,l,a){return this.validateResource(a),this.getRoleParent(n)&&this.can(this.getRoleParent(n),l,a)||this.exactCan(n,l,a)},n.prototype.getRole=function(n){return this.state[n]},n.prototype.validateRole=function(n){if(!n)throw new Error("NbAclService: role name cannot be empty")},n.prototype.validateResource=function(l){if(!l||[n.ANY_RESOURCE].includes(l))throw new Error("NbAclService: cannot use empty or bulk '*' resource placeholder with 'can' method")},n.prototype.exactCan=function(l,a,e){var t=this.getRoleResources(l,a);return t.includes(e)||t.includes(n.ANY_RESOURCE)},n.prototype.getRoleResources=function(n,l){return this.getRoleAbilities(n)[l]||[]},n.prototype.getRoleAbilities=function(n){var l=E(this.state[n]||{});return z(E(this.state[n]||{})),l},n.prototype.getRoleParent=function(n){return this.state[n]?this.state[n].parent:null},n.ANY_RESOURCE="*",n}(),q=a("67Y/"),G=function(){function n(n,l){this.roleProvider=n,this.acl=l}return n.prototype.isGranted=function(n,l){var a=this;return this.roleProvider.getRole().pipe(Object(q.a)(function(n){return Array.isArray(n)?n:[n]}),Object(q.a)(function(e){return e.some(function(e){return a.acl.can(e,n,l)})}))},n}(),M=function(){function n(n,l,a){this.templateRef=n,this.viewContainer=l,this.accessChecker=a,this.alive=!0,this.hasView=!1}return Object.defineProperty(n.prototype,"nbIsGranted",{set:function(n){var l=this;this.accessChecker.isGranted(n[0],n[1]).pipe(Object(S.a)(function(){return l.alive})).subscribe(function(n){n&&!l.hasView?(l.viewContainer.createEmbeddedView(l.templateRef),l.hasView=!0):!n&&l.hasView&&(l.viewContainer.clear(),l.hasView=!1)})},enumerable:!0,configurable:!0}),n.prototype.ngOnDestroy=function(){this.alive=!1},n}(),D=function(){function n(){}return n.forRoot=function(l){return{ngModule:n,providers:[{provide:V,useValue:l},I,G],exports:[M]}},n}(),F=function(n){this.accessChecker=n},T=e.Oa({encapsulation:2,styles:[],data:{}});function X(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,1,"button",[],null,null,null,null,null)),(n()(),e.ib(-1,null,["Post Comment"]))],null,null)}function K(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,1,"button",[],null,null,null,null,null)),(n()(),e.ib(-1,null,["Post Comment"]))],null,null)}function B(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,23,"nb-layout",[],[[2,"window-mode",null],[2,"with-scroll",null],[2,"with-subheader",null]],[["window","scroll"],["window","resize"]],function(n,l,a){var t=!0;return"window:scroll"===l&&(t=!1!==e.ab(n,1).onScroll(a)&&t),"window:resize"===l&&(t=!1!==e.ab(n,1).onResize(a)&&t),t},m.f,m.b)),e.Pa(1,4374528,null,0,w.b,[v.a,y.a,e.k,e.C,Y.f,Y.b,e.z,x.c,A.a,k.a,P.a,R.a],null,null),(n()(),e.Qa(2,0,null,3,21,"nb-layout-column",[],[[2,"left",null],[2,"start",null]],null,null,m.e,m.a)),e.Pa(3,49152,null,0,w.a,[],null,null),(n()(),e.Qa(4,0,null,0,9,"nb-card",[],[[2,"xxsmall-card",null],[2,"xsmall-card",null],[2,"small-card",null],[2,"medium-card",null],[2,"large-card",null],[2,"xlarge-card",null],[2,"xxlarge-card",null],[2,"active-card",null],[2,"disabled-card",null],[2,"primary-card",null],[2,"info-card",null],[2,"success-card",null],[2,"warning-card",null],[2,"danger-card",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"accent-active",null],[2,"accent-disabled",null]],null,null,C.f,C.b)),e.Pa(5,49152,null,0,O.b,[],null,null),(n()(),e.Qa(6,0,null,0,2,"nb-card-header",[],null,null,null,C.h,C.d)),e.Pa(7,49152,null,0,O.d,[],null,null),(n()(),e.ib(-1,0,["Service usage"])),(n()(),e.Qa(9,0,null,1,4,"nb-card-body",[],null,null,null,C.e,C.a)),e.Pa(10,49152,null,0,O.a,[],null,null),(n()(),e.Ha(16777216,null,0,2,null,X)),e.Pa(12,16384,null,0,Q.n,[e.O,e.K],{ngIf:[0,"ngIf"]},null),e.cb(131072,Q.b,[e.h]),(n()(),e.Qa(14,0,null,0,9,"nb-card",[],[[2,"xxsmall-card",null],[2,"xsmall-card",null],[2,"small-card",null],[2,"medium-card",null],[2,"large-card",null],[2,"xlarge-card",null],[2,"xxlarge-card",null],[2,"active-card",null],[2,"disabled-card",null],[2,"primary-card",null],[2,"info-card",null],[2,"success-card",null],[2,"warning-card",null],[2,"danger-card",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"accent-active",null],[2,"accent-disabled",null]],null,null,C.f,C.b)),e.Pa(15,49152,null,0,O.b,[],null,null),(n()(),e.Qa(16,0,null,0,2,"nb-card-header",[],null,null,null,C.h,C.d)),e.Pa(17,49152,null,0,O.d,[],null,null),(n()(),e.ib(-1,0,["Directive usage"])),(n()(),e.Qa(19,0,null,1,4,"nb-card-body",[],null,null,null,C.e,C.a)),e.Pa(20,49152,null,0,O.a,[],null,null),(n()(),e.Ha(16777216,null,0,2,null,K)),e.Pa(22,147456,null,0,M,[e.K,e.O,G],{nbIsGranted:[0,"nbIsGranted"]},null),e.bb(23,2)],function(n,l){var a=l.component;n(l,12,0,e.jb(l,12,0,e.ab(l,13).transform(a.accessChecker.isGranted("create","comments")))),n(l,22,0,n(l,23,0,"create","comments"))},function(n,l){n(l,0,0,e.ab(l,1).windowModeValue,e.ab(l,1).withScrollValue,e.ab(l,1).withSubheader),n(l,2,0,e.ab(l,3).leftValue,e.ab(l,3).startValue),n(l,4,1,[e.ab(l,5).xxsmall,e.ab(l,5).xsmall,e.ab(l,5).small,e.ab(l,5).medium,e.ab(l,5).large,e.ab(l,5).xlarge,e.ab(l,5).xxlarge,e.ab(l,5).active,e.ab(l,5).disabled,e.ab(l,5).primary,e.ab(l,5).info,e.ab(l,5).success,e.ab(l,5).warning,e.ab(l,5).danger,e.ab(l,5).hasAccent,e.ab(l,5).primaryAccent,e.ab(l,5).infoAccent,e.ab(l,5).successAccent,e.ab(l,5).warningAccent,e.ab(l,5).dangerAccent,e.ab(l,5).activeAccent,e.ab(l,5).disabledAccent]),n(l,14,1,[e.ab(l,15).xxsmall,e.ab(l,15).xsmall,e.ab(l,15).small,e.ab(l,15).medium,e.ab(l,15).large,e.ab(l,15).xlarge,e.ab(l,15).xxlarge,e.ab(l,15).active,e.ab(l,15).disabled,e.ab(l,15).primary,e.ab(l,15).info,e.ab(l,15).success,e.ab(l,15).warning,e.ab(l,15).danger,e.ab(l,15).hasAccent,e.ab(l,15).primaryAccent,e.ab(l,15).infoAccent,e.ab(l,15).successAccent,e.ab(l,15).warningAccent,e.ab(l,15).dangerAccent,e.ab(l,15).activeAccent,e.ab(l,15).disabledAccent])})}var H=e.Ma("nb-actions-test",F,function(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,1,"nb-actions-test",[],null,null,null,B,T)),e.Pa(1,49152,null,0,F,[G],null,null)],null,null)},{},{},[]),J=a("aJCS"),_=a("jXul"),Z=a("t/Na"),$=a("F/XL"),W=a("vubp"),L=a("9Z1F"),U=a("QEfX"),nn=a("iVvT"),ln=function(){function n(n,l,a,e){void 0===e&&(e={});var t=this;this.authService=n,this.http=l,this.router=a,this.options=e,this.redirectDelay=0,this.strategy="",this.redirectDelay=this.getConfigValue("forms.logout.redirectDelay"),this.strategy=this.getConfigValue("forms.logout.strategy"),this.authService.onTokenChange().subscribe(function(n){t.token=null,n&&n.isValid()&&(t.token=n)})}return n.prototype.logout=function(){var n=this;this.authService.logout(this.strategy).pipe(Object(W.a)(this.redirectDelay)).subscribe(function(l){return n.router.navigate(["/auth/login"])})},n.prototype.loadWines=function(){var n=this;this.wines$=this.http.get("http://localhost:4400/api/wines").pipe(Object(L.a)(function(l){return l instanceof Z.f&&401===l.status&&n.router.navigate(["/auth/login"]),Object($.a)([])}))},n.prototype.getConfigValue=function(n){return Object(nn.b)(this.options,n,null)},n}(),an=a("BDhN"),en=a("0ICW"),tn=e.Oa({encapsulation:2,styles:[],data:{}});function un(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,2,"nb-list-item",[],[[1,"role",0]],null,null,J.d,J.b)),e.Pa(1,49152,null,0,_.b,[],null,null),(n()(),e.ib(2,0,[" ",", "," (",") "]))],null,function(n,l){n(l,0,0,e.ab(l,1).role),n(l,2,0,l.context.$implicit.region,l.context.$implicit.name,l.context.$implicit.year)})}function rn(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,9,"nb-card",[],[[2,"xxsmall-card",null],[2,"xsmall-card",null],[2,"small-card",null],[2,"medium-card",null],[2,"large-card",null],[2,"xlarge-card",null],[2,"xxlarge-card",null],[2,"active-card",null],[2,"disabled-card",null],[2,"primary-card",null],[2,"info-card",null],[2,"success-card",null],[2,"warning-card",null],[2,"danger-card",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"accent-active",null],[2,"accent-disabled",null]],null,null,C.f,C.b)),e.Pa(1,49152,null,0,O.b,[],null,null),(n()(),e.Qa(2,0,null,0,2,"nb-card-header",[],null,null,null,C.h,C.d)),e.Pa(3,49152,null,0,O.d,[],null,null),(n()(),e.ib(-1,0,[" Alain'wines "])),(n()(),e.Qa(5,0,null,2,4,"nb-list",[],[[1,"role",0]],null,null,J.c,J.a)),e.Pa(6,49152,null,0,_.a,[],null,null),(n()(),e.Ha(16777216,null,0,2,null,un)),e.Pa(8,802816,null,0,Q.m,[e.O,e.K,e.q],{ngForOf:[0,"ngForOf"]},null),e.cb(131072,Q.b,[e.h])],function(n,l){var a=l.component;n(l,8,0,e.jb(l,8,0,e.ab(l,9).transform(a.wines$)))},function(n,l){n(l,0,1,[e.ab(l,1).xxsmall,e.ab(l,1).xsmall,e.ab(l,1).small,e.ab(l,1).medium,e.ab(l,1).large,e.ab(l,1).xlarge,e.ab(l,1).xxlarge,e.ab(l,1).active,e.ab(l,1).disabled,e.ab(l,1).primary,e.ab(l,1).info,e.ab(l,1).success,e.ab(l,1).warning,e.ab(l,1).danger,e.ab(l,1).hasAccent,e.ab(l,1).primaryAccent,e.ab(l,1).infoAccent,e.ab(l,1).successAccent,e.ab(l,1).warningAccent,e.ab(l,1).dangerAccent,e.ab(l,1).activeAccent,e.ab(l,1).disabledAccent]),n(l,5,0,e.ab(l,6).role)})}function cn(n){return e.kb(0,[(n()(),e.Qa(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),e.Pa(1,212992,null,0,r.q,[r.b,e.O,e.j,[8,null],e.h],null,null),(n()(),e.Qa(2,0,null,null,18,"nb-layout",[],[[2,"window-mode",null],[2,"with-scroll",null],[2,"with-subheader",null]],[["window","scroll"],["window","resize"]],function(n,l,a){var t=!0;return"window:scroll"===l&&(t=!1!==e.ab(n,3).onScroll(a)&&t),"window:resize"===l&&(t=!1!==e.ab(n,3).onResize(a)&&t),t},m.f,m.b)),e.Pa(3,4374528,null,0,w.b,[v.a,y.a,e.k,e.C,Y.f,Y.b,e.z,x.c,A.a,k.a,P.a,R.a],null,null),(n()(),e.Qa(4,0,null,3,16,"nb-layout-column",[],[[2,"left",null],[2,"start",null]],null,null,m.e,m.a)),e.Pa(5,49152,null,0,w.a,[],null,null),(n()(),e.Qa(6,0,null,0,11,"nb-card",[],[[2,"xxsmall-card",null],[2,"xsmall-card",null],[2,"small-card",null],[2,"medium-card",null],[2,"large-card",null],[2,"xlarge-card",null],[2,"xxlarge-card",null],[2,"active-card",null],[2,"disabled-card",null],[2,"primary-card",null],[2,"info-card",null],[2,"success-card",null],[2,"warning-card",null],[2,"danger-card",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"accent-active",null],[2,"accent-disabled",null]],null,null,C.f,C.b)),e.Pa(7,49152,null,0,O.b,[],null,null),(n()(),e.Qa(8,0,null,1,9,"nb-card-body",[],null,null,null,C.e,C.a)),e.Pa(9,49152,null,0,O.a,[],null,null),(n()(),e.Qa(10,0,null,0,1,"h2",[],null,null,null,null,null)),(n()(),e.ib(-1,null,["You are authenticated"])),(n()(),e.Qa(12,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),e.ib(-1,null,["You can call the secured API"])),(n()(),e.Qa(14,0,null,0,1,"button",[["nbButton",""],["status","primary"]],null,[[null,"click"]],function(n,l,a){var e=!0;return"click"===l&&(e=!1!==n.component.loadWines()&&e),e},null,null)),(n()(),e.ib(-1,null,["Call API"])),(n()(),e.Qa(16,0,null,0,1,"button",[["nbButton",""],["status","primary"]],null,[[null,"click"]],function(n,l,a){var e=!0;return"click"===l&&(e=!1!==n.component.logout()&&e),e},null,null)),(n()(),e.ib(-1,null,["Sign out"])),(n()(),e.Ha(16777216,null,0,2,null,rn)),e.Pa(19,16384,null,0,Q.n,[e.O,e.K],{ngIf:[0,"ngIf"]},null),e.cb(131072,Q.b,[e.h])],function(n,l){var a,t=l.component;n(l,1,0),n(l,19,0,null==(a=e.jb(l,19,0,e.ab(l,20).transform(t.wines$)))?null:a.length)},function(n,l){n(l,2,0,e.ab(l,3).windowModeValue,e.ab(l,3).withScrollValue,e.ab(l,3).withSubheader),n(l,4,0,e.ab(l,5).leftValue,e.ab(l,5).startValue),n(l,6,1,[e.ab(l,7).xxsmall,e.ab(l,7).xsmall,e.ab(l,7).small,e.ab(l,7).medium,e.ab(l,7).large,e.ab(l,7).xlarge,e.ab(l,7).xxlarge,e.ab(l,7).active,e.ab(l,7).disabled,e.ab(l,7).primary,e.ab(l,7).info,e.ab(l,7).success,e.ab(l,7).warning,e.ab(l,7).danger,e.ab(l,7).hasAccent,e.ab(l,7).primaryAccent,e.ab(l,7).infoAccent,e.ab(l,7).successAccent,e.ab(l,7).warningAccent,e.ab(l,7).dangerAccent,e.ab(l,7).activeAccent,e.ab(l,7).disabledAccent])})}var on=e.Ma("nb-playground-api-calls",ln,function(n){return e.kb(0,[(n()(),e.Qa(0,0,null,null,1,"nb-playground-api-calls",[],null,null,null,cn,tn)),e.Pa(1,49152,null,0,ln,[an.a,Z.c,r.l,en.b],null,null)],null,null)},{},{},[]),sn=a("gIcY"),bn=a("VP2u"),dn=a("Abgx"),pn=a("znn7"),hn=a("Y4k2"),gn=a("Bc6B"),fn=a("6y2k"),mn=a("++eV"),wn=a("X/Iy"),vn=a("NGJs"),yn=function(){function n(n){this.authService=n}return n.prototype.getRole=function(){return this.authService.onTokenChange().pipe(Object(q.a)(function(n){return n instanceof vn.b&&n.isValid()?n.getPayload().role:"guest"}))},n}(),Yn=a("xMyE"),xn=function(){function n(n,l){this.authService=n,this.router=l}return n.prototype.canActivate=function(){var n=this;return this.authService.isAuthenticated().pipe(Object(Yn.a)(function(l){l||n.router.navigate(["auth/login"])}))},n}(),An=function(){},kn=a("i6JN"),Pn=a("0AKQ"),Rn=a("F4EV"),Cn=a("n81q"),On=a("DJEY"),Qn=a("+q8+"),Sn=a("+Zd3"),jn=a("4aFR"),Vn=a("2Az5"),En=a("DYSn"),Nn=a("9S34"),zn=a("9XlZ"),In=a("Lu/0"),qn=a("8qs0"),Gn=a("4pP6");a.d(l,"NbAuthPlaygroundModuleNgFactory",function(){return Mn});var Mn=e.Na(u,[],function(n){return e.Xa([e.Ya(512,e.j,e.Ba,[[8,[s,b.a,d.a,p.a,h.a,g.a,f.a,H,on]],[3,e.j],e.v]),e.Ya(4608,Q.p,Q.o,[e.s,[2,Q.C]]),e.Ya(4608,sn.A,sn.A,[]),e.Ya(4608,Z.k,Z.q,[Q.d,e.z,Z.o]),e.Ya(4608,Z.r,Z.r,[Z.k,Z.p]),e.Ya(5120,Z.a,function(n,l,a){return[n,new bn.a(l,a)]},[Z.r,e.p,en.e]),e.Ya(4608,Z.n,Z.n,[]),e.Ya(6144,Z.l,null,[Z.n]),e.Ya(4608,Z.j,Z.j,[Z.l]),e.Ya(6144,Z.b,null,[Z.j]),e.Ya(4608,Z.g,Z.m,[Z.b,e.p]),e.Ya(4608,Z.c,Z.c,[Z.g]),e.Ya(4608,P.a,P.a,[r.l]),e.Ya(5120,en.b,dn.c,[en.f]),e.Ya(5120,en.c,dn.d,[en.b,e.p]),e.Ya(5120,en.d,dn.e,[en.c]),e.Ya(4608,pn.b,pn.b,[pn.a,en.d]),e.Ya(4608,hn.b,hn.a,[pn.b]),e.Ya(4608,gn.a,gn.a,[hn.b]),e.Ya(4608,an.a,an.a,[gn.a,en.c]),e.Ya(4608,fn.a,fn.a,[]),e.Ya(4608,mn.a,mn.a,[Z.c,r.a]),e.Ya(4608,wn.a,wn.a,[Z.c,r.a,Y.f]),e.Ya(4608,I,I,[[2,V]]),e.Ya(4608,j,yn,[an.a]),e.Ya(4608,G,G,[j,I]),e.Ya(4608,xn,xn,[an.a,r.l]),e.Ya(1073742336,Q.c,Q.c,[]),e.Ya(1073742336,sn.y,sn.y,[]),e.Ya(1073742336,sn.i,sn.i,[]),e.Ya(1073742336,Z.e,Z.e,[]),e.Ya(1073742336,Z.d,Z.d,[]),e.Ya(1073742336,r.p,r.p,[[2,r.u],[2,r.l]]),e.Ya(1073742336,An,An,[]),e.Ya(1073742336,kn.a,kn.a,[]),e.Ya(1073742336,Pn.a,Pn.a,[]),e.Ya(1073742336,Rn.a,Rn.a,[]),e.Ya(1073742336,Cn.a,Cn.a,[]),e.Ya(1073742336,On.a,On.a,[]),e.Ya(1073742336,Qn.a,Qn.a,[]),e.Ya(1073742336,Sn.a,Sn.a,[]),e.Ya(1073742336,jn.a,jn.a,[]),e.Ya(1073742336,dn.a,dn.a,[]),e.Ya(1073742336,D,D,[]),e.Ya(1073742336,u,u,[]),e.Ya(256,Z.o,"XSRF-TOKEN",[]),e.Ya(256,Z.p,"X-XSRF-TOKEN",[]),e.Ya(256,en.e,t,[]),e.Ya(1024,r.j,function(){return[[{path:"",component:c,children:[{path:"auth",component:Vn.a,children:[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:En.a},{path:"register",component:Nn.a},{path:"logout",component:zn.a},{path:"request-password",component:In.a},{path:"reset-password",component:qn.a}]}]},{path:"auth/acl/acl-test.component",component:F},{path:"auth/auth-guard.service",canActivate:[xn],component:c},{path:"auth/api-calls.component",canActivate:[xn],component:ln}],[{path:"auth",component:Vn.a,children:[{path:"",component:En.a},{path:"login",component:En.a},{path:"register",component:Nn.a},{path:"logout",component:zn.a},{path:"request-password",component:In.a},{path:"reset-password",component:qn.a}]}]]},[]),e.Ya(256,en.f,{forms:{login:{strategy:"password",redirectDelay:1e3,socialLinks:[{url:"https://github.com/akveo",target:"_blank",title:"GitHub"},{url:"https://www.facebook.com/akveo",target:"_blank",icon:"nb-home"},{url:"https://www.facebook.com/akveo",target:"_blank",title:"Twitter"}]}},strategies:[[fn.a,{name:"dummy",alwaysFail:!0,delay:1e3}],[mn.a,{name:"email",token:{class:Gn.b},login:{requireValidToken:!1},baseEndpoint:"http://localhost:4400/api/auth/",logout:{redirect:{success:"/auth/login",failure:"/auth/login"}},requestPass:{redirect:{success:"/auth/reset-password"}},resetPass:{redirect:{success:"/auth/login"}},errors:{key:"data.errors"}}],[wn.a,{name:"password",clientId:"test",clientSecret:"secret",baseEndpoint:"http://localhost:4400/api/auth/",token:{endpoint:"token",grantType:"password",class:Gn.d},refresh:{endpoint:"refresh-token",grantType:"refresh_token"}}]]},[]),e.Ya(256,pn.a,U.g,[]),e.Ya(256,en.a,"Authorization",[]),e.Ya(256,V,{accessControl:{guest:{view:["news","comments"]},user:{parent:"guest",create:"comments"},moderator:{parent:"user",create:"news",remove:"*"}}},[])])})}}]);