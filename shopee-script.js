function isModalVisible() {
  const modal = document.getElementById("shopVouchersModal");
  return Boolean(modal);
}
function clickApplyButton() {
  const button = document.querySelector(".stardust-button.bRb6uQ.LxsvzT");
  if (!button) {
    alert("Không tìm thấy nút áp dụng Voucher");
    return false;
  }
  button.click();
  const selectVoucherIntervalId = setInterval(function () {
    if (!isModalVisible()) clearInterval(selectVoucherIntervalId);
    if (isSavedVoucher()) {
      clickOKButton();
      clickConfirmButton();
      clearInterval(selectVoucherIntervalId);
    }
  }, 100);
  clickConfirmButton();
  return true;
}

function isSavedVoucher() {
  const messageElement = document.querySelector(
    ".qskn3u .input-with-validator-wrapper .input-with-validator__info-message"
  );
  if (!messageElement) return false;
  return messageElement.textContent.includes("Bạn đã lưu voucher này");
}
function clickOKButton() {
  const modal = document.getElementById("shopVouchersModal");
  if (!modal) {
    console.log("Modal not found");
    return;
  }
  const okButton = modal.querySelector(
    ".vkrOOk .s9eGIu .btn.btn-solid-primary.btn--s.btn--inline.CVTmmu"
  );

  if (okButton) {
    okButton.click();
  }
}

function clickConfirmButton() {
  const mainElement = document.getElementById("main");
  const confirmButton = mainElement.querySelector(
    ".stardust-button.stardust-button--primary.stardust-button--large.LtH6tW"
  );
  const checkModalVisibleIntervalId = setInterval(function () {
    if (!isModalVisible()) {
      confirmButton.click();
      clearInterval(checkModalVisibleIntervalId);
      console.log("Confirm button clicked");
    }
  }, 50);
}

const targetHour = 14;
const targetMinute = 59;
const targetSecond = 59;
const targetMillisecond = 850;

function calculateTargetTimeInMillis(
  targetHour,
  targetMinute,
  targetSecond,
  targetMillisecond
) {
  const now = new Date();

  // Create a date object for the target time today
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    targetHour,
    targetMinute,
    targetSecond,
    targetMillisecond
  );

  // If the target time is in the past, schedule it for the next day
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  // Return the target time in milliseconds since epoch
  return targetTime.getTime();
}

// Get the target time in milliseconds
const targetTimeInMillis = calculateTargetTimeInMillis(
  targetHour,
  targetMinute,
  targetSecond,
  targetMillisecond
);
const currentTimeInMillis = Date.now();

const delayUntilTarget = targetTimeInMillis - currentTimeInMillis;

if (delayUntilTarget > 0) {
  setTimeout(function () {
    console.log("run............................");
    clickApplyButton();
  }, delayUntilTarget);

  console.log("Task scheduled to run at " + new Date(targetTimeInMillis));
} else {
  console.log("Invalid target time. Please check the input.");
}
