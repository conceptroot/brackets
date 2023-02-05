module.exports = function check(str, bracketsConfig) {
  console.log(`1️⃣ str = ${str}. bracketsConfig =`, bracketsConfig)
  const config = bracketsConfig
  let buffer = []
  let error = false
  const charList = str.split('')
  charList.forEach(char => {
    let pair = getConfigPair(char, config)
    // console.log(`char = ${char}. pair = ${pair}`)
    if (!pair) return
    // Дальше двигаемся, если Это скобка из конфига
    // console.log(`char=${char}. And it is in config. It's pair is ${pair}`)
    // console.log(`📚 buffer = ${buffer}`)
    if (char === pair[0] && pair[0] === pair[1]){
      // Открывающая и закрывающая скобки у этой пары одинаковые
      // Если в буфере есть скобка, то удаляем ее. Иначе добавляем ее
      if (buffer.slice(-1)[0] === pair[0]){ buffer.pop()} 
      else {buffer.push(char)}
    } 
    else if (char === pair[0]){
      // Это открывающа скобка, добавляем в буфер
      buffer.push(char)
    } 
    else {
      // Это закрывающа скобка
      if (buffer.slice(-1)[0] === pair[0]){
        // В буфере Есть последняя открывающа скобка, можно закрывать
        buffer.pop()
      } else {
        // В буфере нет открывающей скобки, значит это ошибка
        error = true
      }
    }
    // console.log(`📚 buffer after iteration = ${buffer}. ⚠️ error = ${error}`)
  })
  if (buffer.length) error = true
  console.log(`📚 buffer after iteration = ${buffer}. ⚠️ error = ${error}`)
  return error ? false : true
}

const getConfigPair = (char, config) => {
  let resultPair
  config.forEach((pair, index) => {
    if (pair.indexOf(char) !== -1) {
      resultPair = pair
    }
  })
  return resultPair
}