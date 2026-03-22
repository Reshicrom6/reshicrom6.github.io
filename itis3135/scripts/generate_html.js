(function () {
  function initGenerateHtml() {
    const htmlButton = document.getElementById("generate-html");
    if (!htmlButton) {
      return;
    }

    htmlButton.addEventListener("click", function () {
      if (!window.IntroForm || !window.IntroForm.validateForm()) {
        return;
      }

      const data = window.IntroForm.collectData();
      const htmlText = window.IntroForm.buildIntroductionHtmlString(data);
      window.IntroForm.showCodeOutput(
        "Introduction HTML",
        htmlText,
        "language-html"
      );
    });
  }

  document.addEventListener("DOMContentLoaded", initGenerateHtml);
})();
