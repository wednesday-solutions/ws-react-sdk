import"../_rollup-plugin-inject-process-env-1259e43d.js";import r from"react";import e from"prop-types";import{translate as o}from"../IntlGlobalProvider/index.js";import"react-intl";class t extends r.Component{constructor(r){super(r),this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,e){console.error(r,e)}render(){return this.state.hasError?r.createElement("h1",null,o("something_went_wrong")):this.props.children}}t.propTypes={children:e.oneOfType([e.arrayOf(e.node),e.node])};export default t;