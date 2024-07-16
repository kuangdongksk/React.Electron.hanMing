export const 获取所有Combo = {
  isCombo: {
    contains: 'true'
  }
}

export const 获取所有非Combo = {
  isCombo: {
    contains: 'false'
  }
}

export const 根据内容获取 = (value) => ({
  content: {
    contains: value
  }
})
