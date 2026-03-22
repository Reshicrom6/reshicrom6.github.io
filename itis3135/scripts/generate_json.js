(function () {
  function initGenerateJson() {
    const jsonButton = document.getElementById("generate-json");
    if (!jsonButton) {
      return;
    }

    jsonButton.addEventListener("click", function () {
      if (!window.IntroForm || !window.IntroForm.validateForm()) {
        return;
      }

      const data = window.IntroForm.collectData();
      const jsonObject = window.IntroForm.buildIntroductionJson(data);
      const jsonText = JSON.stringify(jsonObject, null, 2);
      window.IntroForm.showCodeOutput(
        "Introduction JSON",
        jsonText,
        "language-json"
      );
    });
  }

  document.addEventListener("DOMContentLoaded", initGenerateJson);
})();
