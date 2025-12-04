let darkMode = localStorage.getItem("darkMode");

function updateTheme() {
  $("html").attr("data-theme", darkMode ? "dark" : "light");
}

if (darkMode === null) {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
} else {
  darkMode = darkMode == "true";
}

updateTheme();

$(() => {
  $("#theme-switch").on("click", () => {
    darkMode = !darkMode;
    updateTheme();
    localStorage.setItem("darkMode", darkMode);
  });
});
