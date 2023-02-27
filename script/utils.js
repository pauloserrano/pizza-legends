function convertGridToPixels(num) {
  return num * 16
}

function capitalize(str){
  const arr = str.split(" ")
  let capitalizedStr = []

  arr.forEach(word => capitalizedStr.push(word[0].toUpperCase() + word.slice(1)))
  
  return capitalizedStr.join(" ")
}

export {
  convertGridToPixels,
  capitalize
}