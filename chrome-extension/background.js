chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "performClick") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: clickApplyButton,
        });
      }
    });
  }
});

function clickApplyButton() {
  function isModalVisible() {
    return !!document.getElementById("shopVouchersModal");
  }

  function isSavedVoucher() {
    const messageElement = document.querySelector(
      ".qskn3u .input-with-validator-wrapper .input-with-validator__info-message"
    );
    return (
      messageElement &&
      messageElement.textContent.includes("Bạn đã lưu voucher này")
    );
  }

  function clickOKButton() {
    const modal = document.getElementById("shopVouchersModal");
    if (!modal) return;
    const okButton = modal.querySelector(
      ".vkrOOk .s9eGIu .btn.btn-solid-primary.btn--s.btn--inline.CVTmmu"
    );
    if (okButton) okButton.click();
  }

  function clickConfirmButton() {
    const mainElement = document.getElementById("main");
    if (!mainElement) return;
    const confirmButton = mainElement.querySelector(
      ".stardust-button.stardust-button--primary.stardust-button--large.LtH6tW"
    );
    if (confirmButton) {
      const checkModalVisibleIntervalId = setInterval(() => {
        if (!isModalVisible()) {
          confirmButton.click();
          clearInterval(checkModalVisibleIntervalId);
          console.log("Confirm button clicked");
        }
      }, 50);
    }
  }

  const button = document.querySelector(".stardust-button.bRb6uQ.LxsvzT");
  if (!button) {
    alert("Không tìm thấy nút áp dụng Voucher");
    return;
  }
  button.click();

  const selectVoucherIntervalId = setInterval(() => {
    if (!isModalVisible()) {
      clearInterval(selectVoucherIntervalId);
      return;
    }
    if (isSavedVoucher()) {
      clickOKButton();
      clickConfirmButton();
      clearInterval(selectVoucherIntervalId);
    }
  }, 100);

  clickConfirmButton();
}
