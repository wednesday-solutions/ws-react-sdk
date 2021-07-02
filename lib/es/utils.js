import"antd/lib/message/style";import e from"antd/lib/message";import"antd/lib/select/style";import t from"antd/lib/select";import n,{Suspense as r,lazy as a}from"react";import i from"styled-components";import o from"libphonenumber-js";import{FormattedMessage as u}from"react-intl";import{CognitoUserPool as c}from"amazon-cognito-identity-js";function s(e,t,n,r,a,i,o){try{var u=e[i](o),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){s(i,r,a,o,u,"next",e)}function u(e){s(i,r,a,o,u,"throw",e)}o(void 0)}))}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(){const e={"process.env.AWS_COGNITO_USER_POOL_ID":'"ap-southeast-1_URpT8rFMN"',"process.env.AWS_COGNITO_USER_POOL_APP_CLIENT":'"6uobj0e81bfc2hbo1rjked632r"',NODE_ENV:"production"};try{if(process)return process.env=Object.assign({},process.env),void Object.assign(process.env,e)}catch(e){}globalThis.process={env:e}}();var m,d="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e %3cg%3e %3cpath fill='%23af0974' d='M10 0A10 10 0 1 1 0 10 10 10 0 0 1 10 0z' transform='translate(-156 -79) translate(156 79)'/%3e %3cpath fill='white' d='M13 5.806L12.194 5 9 8.194 5.806 5 5 5.806 8.194 9 5 12.194l.806.806L9 9.806 12.194 13l.806-.806L9.806 9z' transform='translate(-156 -79) translate(157 80)'/%3e %3c/g%3e%3c/svg%3e",v="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e %3cg%3e %3cpath fill='%232fbb8a' d='M10 0A10 10 0 1 1 0 10 10 10 0 0 1 10 0z' transform='translate(-156 -79) translate(156 79)'/%3e %3cpath fill='white' d='M6.582 11.623L4.2 9.236l-.8.8 3.182 3.182L13.4 6.4l-.8-.8z' transform='translate(-156 -79) translate(158 80)'/%3e %3c/g%3e%3c/svg%3e",h="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='22' height='20' viewBox='0 0 22 20'%3e %3cg%3e %3cpath fill='%23ffbc41' d='M9.248 3.186a2 2 0 0 1 3.5 0l7.617 13.85A2 2 0 0 1 18.617 20H3.383a2 2 0 0 1-1.753-2.964z' transform='translate(-154 -78) translate(154 78)'/%3e %3cpath fill='white' d='M.846 1.541h1.417l.192-5.8H.642zm1.766 1.825a.983.983 0 0 0-1.021-.985.986.986 0 1 0 0 1.97.983.983 0 0 0 1.021-.985z' transform='translate(-154 -78) translate(163.648 90.371)'/%3e %3c/g%3e%3c/svg%3e",p=/^[a-z\s]+$/i,g=/^[a-zA-Z0-9\s,.'-]{3,}$/,O=/^[a-zA-Z0-9]*$/,E=/^[0-9]*$/,w=/^[0-9]{2}$/,_=/^(?=.*[\d])(?=.*[!$#])((?=.*[A-Z]))[a-zA-Z0-9!@#$%^&*]{8,}$/,b=/^[0-9]{6}$/,N=/^[0-9]{5,13}$/,I=/^\+?\d+$/,C=function(e,t,r){var a;return f(a={},e,t),f(a,"message",r.trim().length>0?n.createElement(u,{id:r}):"Invalid Input Value"),a},P=function(e){return C("required",!0,e)},A=function(e,t){return C("pattern",e,t)},R=function(e,t){return C("validator",e,t)},x=function(e,t){try{return o("+".concat(t+e.replace("-",""))).isValid()}catch(e){return!1}},y=function(e){var t="",n="";try{var r=o(e);t=r.countryCallingCode,n=r.nationalNumber}catch(e){}return{countryCode:t,strippedNumber:n}},S=function(e,t){try{return(null==t||!t.length||"0"!==t[0])&&o(e+t).isValid()}catch(e){return!1}},T=function(e,t,n,r){t&&!x(t,r)&&n(new Error("Invalid error")),n()},L=function(e,t,n){t&&!S(t)&&n(new Error("Invalid error")),n()},U=function(e,t){return[P(e),A(p,t)]},M=function(e,t){return[P(e),A(g,t)]},z=function(e,t){return[P(e),A(O,t)]},j=function(e,t){return[P(e),A(E,t)]},D=function(e,t){return[A(w,t)]},$=function(e,t){return[P(e),R((function(e,t,n){L(0,t,n)}),t)]},k=function(e,t){return C("type",e,t)},G=function(e,t){return[P(e),k("email",t)]},V=function(e,t){return[P(e),A(_,t)]},W=function(e){return[P(e)]},F=function(e,t){return[P(e),A(p,t)]},Z=function(e,t){return[P(e),A(b,t)]},B=function(e,t){return[P(e),A(N,t)]},H=function(e,t){return[P(e),A(I,t)]},X=function(e,t,n){return[P(t),R((function(t,n,r){n&&e("password")!==n||r(),r(new Error("Password does not match"))}),n)]},q=function(e){var t=e;return e&&"+"!==e[0]&&(t="+"+e),t},J=function(e,t){var n=t;return t&&"0"===t[0]&&(n=t.substr(1,t.length)),q(e)+n},K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{fallback:null},i=t.fallback,o=void 0===i?null:i,u=a(e);return function(e){return n.createElement(r,{fallback:o},n.createElement(u,e))}};function Q(){if(!m){var e={UserPoolId:process.env.AWS_COGNITO_USER_POOL_ID,ClientId:process.env.AWS_COGNITO_USER_POOL_APP_CLIENT};m=new c(e)}return m}function Y(){return process.env.AWS_COGNITO_USER_POOL_ID}function ee(){return process.env.AWS_COGNITO_USER_POOL_APP_CLIENT}var te,ne={USER_NOT_CONFIRMED_EXCEPTION:"UserNotConfirmedException",NOT_AUTHORIZED:"NotAuthorizedException",INVALID_PARAMETER_EXCEPTION:"InvalidParameterException",CODE_MISMATCH_EXCEPTION:"CodeMismatchException",USER_NOT_FOUND_EXCEPTION:"UserNotFoundException"},re=function(e){return new Promise((function(t,n){var r=new Image;r.addEventListener("load",(function(){return t(r)})),r.addEventListener("error",(function(e){return n(e)})),r.setAttribute("crossOrigin","anonymous"),r.src=e}))};function ae(e){return e*Math.PI/180}function ie(e,t){return oe.apply(this,arguments)}function oe(){return(oe=l(regeneratorRuntime.mark((function e(t,n){var r,a,i,o,u,c,s,l=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>2&&void 0!==l[2]?l[2]:0,e.next=3,re(t);case 3:return a=e.sent,i=document.createElement("canvas"),o=i.getContext("2d"),u=Math.max(a.width,a.height),c=u/2*Math.sqrt(2)*2,i.width=c,i.height=c,o.translate(c/2,c/2),o.rotate(ae(r)),o.translate(-c/2,-c/2),o.drawImage(a,c/2-.5*a.width,c/2-.5*a.height),s=o.getImageData(0,0,c,c),i.width=n.width,i.height=n.height,o.putImageData(s,Math.round(0-c/2+.5*a.width-n.x),Math.round(0-c/2+.5*a.height-n.y)),e.abrupt("return",new Promise((function(e){i.toBlob((function(t){e(URL.createObjectURL(t))}),"image/jpeg")})));case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ue,ce,se=t.Option,le={SUCCESS:1,ERROR:2,WARNING:3,INFO:4},fe=i.img(te||(ue=["\n  margin-right: 10px;\n"],ce||(ce=ue.slice(0)),te=Object.freeze(Object.defineProperties(ue,{raw:{value:Object.freeze(ce)}})))),me=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:le.INFO;if(t){var a,i;switch(r){case le.SUCCESS:a=e.success,i=v;break;case le.ERROR:a=e.error,i=d;break;case le.WARNING:a=e.warning,i=h;break;default:a=e.info,i=h}a({content:t,icon:n.createElement(fe,{src:i})})}},de=function(e){var t,n,r,a,i,o,u=[{name:"email",value:null==e||null===(t=e.location)||void 0===t||null===(n=t.state)||void 0===n||null===(r=n.vetData)||void 0===r?void 0:r.email}];return null==e||null===(a=e.location)||void 0===a||null===(i=a.state)||void 0===i||null===(o=i.userAttributes)||void 0===o||o.forEach((function(e){if("given_name"===e.Name)u.push({name:"fullName",value:e.Value}),u.push({name:"businessName",value:e.Value});else if("phone_number"===e.Name){var t=y(e.Value),n=t.countryCode,r=t.strippedNumber;u.push({name:"phone",value:r}),u.push({name:"countryCode",value:n})}})),u},ve=function(e){return new Promise((function(t,n){return e(t,n)}))};function he(e){return((null==e?void 0:e.edges)||[]).map((function(e){return null==e?void 0:e.node})).filter((function(e){return!!e}))}function pe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.map((function(e,t){return n.createElement(se,{key:t,value:e},e)}))}export{ne as COGNITO_ERROR_TYPES,le as NOTIFICATION_TYPE,he as convertGqlResponse,X as doPasswordsMatch,de as getCognitoFormFields,y as getCountryCodeAndStrippedNumber,ie as getCroppedImg,Q as getUserPool,ee as getUserPoolAppClient,Y as getUserPoolID,q as getValidCountryCode,J as getValidPhoneNumber,T as handlePhoneNumberValidation,L as handlePhoneNumberValidationWithCountry,M as isAddressValid,H as isCountryCodeValid,G as isEmailValid,F as isFullNameValid,U as isFullnameValid,z as isLicenseNumberValid,B as isMobileValid,$ as isMobileValidWithCountry,j as isNumberValid,Z as isOTPValid,V as isPasswordValid,W as isRequired,x as isValidNumber,S as isValidNumberWithCountry,D as isYearsOfExpValid,K as loadable,ve as promisify,pe as renderSelectOptions,me as showNotification,k as type};
//# sourceMappingURL=utils.js.map