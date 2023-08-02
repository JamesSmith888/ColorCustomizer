document.addEventListener('DOMContentLoaded', function () {
    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function () {
        var backgroundColor = document.getElementById('background-color-selector').value;
        var fontColor = document.getElementById('font-color-selector').value;

        chrome.storage.sync.set({
            backgroundColor: backgroundColor,
            fontColor: fontColor
        }, function () {
            // saveButton value update to 已保存
            saveButton.innerText = '已保存';
            saveButton.style.color = fontColor;
            saveButton.style.backgroundColor = backgroundColor;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                var tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, {
                    type: 'setCss',
                    backgroundColor: backgroundColor,
                    fontColor: fontColor
                });
            });
        });
    });

    // 获取存储的颜色设置并设置面板的默认选项
    chrome.storage.sync.get(['backgroundColor', 'fontColor'], function (result) {
        var backgroundColor = result.backgroundColor;
        var fontColor = result.fontColor;
        if (backgroundColor && fontColor) {
            document.getElementById('background-color-selector').value = backgroundColor;
            document.getElementById('font-color-selector').value = fontColor;
        }
    });
});
