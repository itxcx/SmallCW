function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取学历字符串
 * @param  {[String]} val [学历]
 * @return {[type]}     [description]
 */
function getDegree (val) {
  let str = '本科'
  switch (val) {
  case 'senior':
    str = '高中'
    break
  case 'college':
    str = '大专'
    break
  case 'bachelor':
    str = '本科'
    break
  case 'master':
    str = '硕士'
    break
  case 'mba':
    str = 'MBA'
    break
  case 'emba':
    str = 'EMBA'
    break
  case 'doctor':
    str = '博士'
    break
  default:
    str = '其他'
    break
  }
  return str
}

/** 获取语言水平
 * @param  {[String]} val [级别]
 * @return {[String]}     [级别的文字描述]
 */
function getLanguagesLevel (val) {
  let str = '母语或双语'
  switch (val) {
  case '1':
    str = '初级水平'
    break
  case '2':
    str = '可以对话'
    break
  case '3':
    str = '流利沟通'
    break
  default:
    break
  }
  return str
}

/** 根据workload获取每周工作时间
 * @param  {[String]} val [级别]
 * @return {[String]}     [每周工作时间]
 */
function getHour(val) {
  let str = '超过30小时每周'
  val = parseInt(val)
  switch (val) {
  case 1:
    str = '超过30小时每周'
    break
  case 2:
    str = '小于30小时每周'
    break
  case 3:
    str = '不确定'
    break
  default:
    break
  }
  return str
}

/** 根据level获取经验水平
 * @param  {[String]} val [经验]
 * @return {[String]}     [经验水平]
 */
function getLevel (val) {
  if (val) {
    let str = '专业级'
    if (val === 'middle') {
      str = '中间级'
    } else if (val === 'entry') {
      str = '入门级'
    }
    return str
  }
}

function getRange (val) {
  let result = '1000元以下'
  switch (val) {
  case 1:
    result = '1000元以下'
    break
  case 2:
    result = '1000-5000元'
    break
  case 3:
    result = '5000-2万元'
    break
  case 4:
    result = '2-5万元'
    break
  case 5:
    result = '5-10万元'
    break
  case 6:
    result = '10万元以上'
    break
  default:
    break
  }
  return result
}

module.exports = {
  formatTime: formatTime,
  getDegree: getDegree,
  getLanguagesLevel: getLanguagesLevel,
  getHour: getHour,
  getLevel: getLevel,
  getRange: getRange
}
