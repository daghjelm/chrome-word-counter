function countHighlighted() {
  let selectedStr = window.getSelection().toString()
  let words = selectedStr.replaceAll(/\s/g, ' ').split(' ')

  return {
    wordCount: words.length,
    charCount: selectedStr.length,
    charCountNoSpace: selectedStr.replaceAll(/\s/g, '').length,
  }
}
