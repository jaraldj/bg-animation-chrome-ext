const btn = document.getElementById("toggleBtn");
const label = document.getElementById("toggleLabel");
const select = document.getElementById("animationSelect");

const updateLabel = enabled => {
  label.textContent = enabled ? "Disable (ON)" : "Enable (OFF)";
};

chrome.storage.sync.get({ enabled: false, animation: "particles" }).then(data => {
  updateLabel(data.enabled);
  select.value = data.animation;
});

select.addEventListener("change", async () => {
  const animation = select.value;
  await chrome.storage.sync.set({ animation });
  chrome.tabs.reload();
});

btn.addEventListener("click", async () => {
  const data = await chrome.storage.sync.get({ enabled: false });
  const newValue = !data.enabled;

  await chrome.storage.sync.set({
    enabled: newValue
  });

  updateLabel(newValue);
  chrome.tabs.reload();
});