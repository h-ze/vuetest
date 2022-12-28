/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-28 20:07:51
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-28 20:12:39
 * @FilePath: /vuetest/src/views/components/icons/svg-icons.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default svgIcons
