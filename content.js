function getHighlighted() {
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

getHighlighted();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === "getCount") {
    sendResponse(getHighlighted());
  }
});