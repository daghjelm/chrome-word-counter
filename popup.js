function getHighlighted() {
  let selectedStr = window.getSelection().toString();
  chrome.runtime.sendMessage({selectedStr});
}

function countWordsAndChars(selectedStr) {
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

function fillCountTable(count) {
  for (let key in count) {
    document.getElementById(count[key].id).innerHTML = count[key].value;
  }
}

async function updateCounts() {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: getHighlighted,
  });

}

document.getElementById("count-words").addEventListener("click", updateCounts);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  count = countWordsAndChars(request.selectedStr);
  fillCountTable(count);
})