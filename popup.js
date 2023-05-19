function countHighlighted() {
  let selectedStr = window.getSelection().toString();
  let words = selectedStr.replaceAll(/\s/g, ' ')
                         .split(' ')
                         .filter((word) => word !== '');

  return {
    words: {id: 'words', value: words.length || 0},
    chars: {id: 'chars', value: selectedStr.length || 0},
    charsNoSpace: {id: 'chars-no-space',
                   value: selectedStr.replaceAll(/\s/g, '').length || 0},
  };
}

function fillCountTable() {
  let count = countHighlighted();
  for (let key in count) {
    document.getElementById(count[key].id).innerHTML = count[key].value;
  }
}

fillCountTable();