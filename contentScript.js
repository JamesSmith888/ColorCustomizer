chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'setCss') {
        var backgroundColor = message.backgroundColor;
        var fontColor = message.fontColor;

        var styleElement = document.createElement('style');
        styleElement.innerHTML = `
      ::selection {
        color: ${fontColor} !important;
        background-color: ${backgroundColor} !important;
      }
    `;
        document.head.appendChild(styleElement);
    }
});


chrome.storage.sync.get().then((items) => {
    var backgroundColor = items.backgroundColor;
    var fontColor = items.fontColor;

    var styleElement = document.createElement('style');
    styleElement.innerHTML = `
      ::selection {
        color: ${fontColor} !important;
        background-color: ${backgroundColor} !important;
      }
    `;
    document.head.appendChild(styleElement);
});

