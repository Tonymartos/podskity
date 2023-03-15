/* eslint-disable no-undef */
export default (env) => {
  return require(`./webpack.config.${env}.js`);
}