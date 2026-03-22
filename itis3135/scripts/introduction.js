(function () {
  const DEFAULT_COURSES = [
    {
      department: "ITSC",
      number: "3688",
      name: "Computers and Their Impact on Society",
      reason: "Required course."
    },
    {
      department: "ITCS",
      number: "3153",
      name: "Introduction to Artificial Intelligence",
      reason: "Very relevant elective course."
    },
    {
      department: "ITIS",
      number: "3200",
      name: "Introduction to Info Security and Privacy",
      reason: "Required course."
    },
    {
      department: "ITIS",
      number: "3135",
      name: "Front-End Web Application Development",
      reason: "Required course, useful information."
    },
    {
      department: "ITSC",
      number: "3155",
      name: "Software Engineering",
      reason:
        "I intend to work as a software engineer, so taking this made sense."
    }
  ];

  function getEl(id) {
    return document.getElementById(id);
  }

  function toDisplayDate(value) {
    if (!value) {
      return "";
    }

    const [year, month, day] = value.split("-");
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    return monthNum + "/" + dayNum + "/" + year;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildCourseItem(course, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "course-item";
    wrapper.innerHTML =
      '<label>Department *<input type="text" class="course-department" placeholder="ITIS" required value="' +
      escapeHtml(course.department || "") +
      '"></label>' +
      '<label>Number *<input type="text" class="course-number" placeholder="3135" required value="' +
      escapeHtml(course.number || "") +
      '"></label>' +
      '<label>Name *<input type="text" class="course-name" placeholder="Course name" required value="' +
      escapeHtml(course.name || "") +
      '"></label>' +
      '<label>Reason *<textarea class="course-reason" placeholder="Why this course" required>' +
      escapeHtml(course.reason || "") +
      "</textarea></label>" +
      '<button type="button" class="remove-course">Remove Course ' +
      (index + 1) +
      "</button>";
    return wrapper;
  }

  function setDefaultCourses() {
    const container = getEl("courses-container");
    container.innerHTML = "";

    DEFAULT_COURSES.forEach((course, index) => {
      container.appendChild(buildCourseItem(course, index));
    });
  }

  function addCourse(course) {
    const container = getEl("courses-container");
    const index = container.querySelectorAll(".course-item").length;
    container.appendChild(
      buildCourseItem(
        course || { department: "", number: "", name: "", reason: "" },
        index
      )
    );
  }

  function bindCourseButtons() {
    const container = getEl("courses-container");

    container.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("remove-course")) {
        const courseItem = target.closest(".course-item");
        if (courseItem) {
          courseItem.remove();
        }
      }
    });
  }

  function collectCourses() {
    return Array.from(
      document.querySelectorAll("#courses-container .course-item")
    )
      .map((courseItem) => {
        return {
          department: courseItem
            .querySelector(".course-department")
            .value.trim(),
          number: courseItem.querySelector(".course-number").value.trim(),
          name: courseItem.querySelector(".course-name").value.trim(),
          reason: courseItem.querySelector(".course-reason").value.trim()
        };
      })
      .filter((course) => {
        return (
          course.department || course.number || course.name || course.reason
        );
      });
  }

  function collectLinks(formData) {
    const links = [];
    for (let i = 1; i <= 5; i += 1) {
      links.push({
        name: (formData.get("linkName" + i) || "").trim(),
        href: (formData.get("linkUrl" + i) || "").trim()
      });
    }
    return links;
  }

  function buildNameLine(data) {
    const middle = data.middleName ? " " + data.middleName : "";
    const preferred = data.preferredName ? ' "' + data.preferredName + '"' : "";
    return (
      data.firstName +
      middle +
      preferred +
      " " +
      data.lastName +
      " " +
      data.divider +
      " " +
      data.mascotAdjective +
      " " +
      data.mascotAnimal
    ).trim();
  }

  function collectData() {
    const form = getEl("intro-form");
    const formData = new FormData(form);
    const pictureInput = getEl("picture");
    const hasUpload = pictureInput.files && pictureInput.files[0];

    return {
      firstName: (formData.get("firstName") || "").trim(),
      middleName: (formData.get("middleName") || "").trim(),
      preferredName: (formData.get("preferredName") || "").trim(),
      lastName: (formData.get("lastName") || "").trim(),
      divider: (formData.get("divider") || "").trim(),
      mascotAdjective: (formData.get("mascotAdjective") || "").trim(),
      mascotAnimal: (formData.get("mascotAnimal") || "").trim(),
      ackStatement: (formData.get("ackStatement") || "").trim(),
      ackDate: (formData.get("ackDate") || "").trim(),
      defaultImage: (formData.get("defaultImage") || "").trim(),
      pictureAlt: (formData.get("pictureAlt") || "").trim(),
      pictureCaption: (formData.get("pictureCaption") || "").trim(),
      personalStatement: (formData.get("personalStatement") || "").trim(),
      personalBackground: (formData.get("personalBackground") || "").trim(),
      professionalBackground: (
        formData.get("professionalBackground") || ""
      ).trim(),
      academicBackground: (formData.get("academicBackground") || "").trim(),
      subjectBackground: (formData.get("subjectBackground") || "").trim(),
      primaryComputer: (formData.get("primaryComputer") || "").trim(),
      backupComputer: (formData.get("backupComputer") || "").trim(),
      coursesSummary: (formData.get("coursesSummary") || "").trim(),
      funnyThing: (formData.get("funnyThing") || "").trim(),
      shareMore: (formData.get("shareMore") || "").trim(),
      quote: (formData.get("quote") || "").trim(),
      quoteAuthor: (formData.get("quoteAuthor") || "").trim(),
      courses: collectCourses(),
      links: collectLinks(formData),
      imageSrc: hasUpload
        ? URL.createObjectURL(pictureInput.files[0])
        : (formData.get("defaultImage") || "").trim(),
      uploadedFileName: hasUpload ? pictureInput.files[0].name : ""
    };
  }

  function hasValidCourses(courses) {
    if (!courses.length) {
      return false;
    }

    return courses.every(function (course) {
      return course.department && course.number && course.name && course.reason;
    });
  }

  function validateForm() {
    const form = getEl("intro-form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    const data = collectData();

    if (!hasValidCourses(data.courses)) {
      window.alert("Please include at least one complete course.");
      return false;
    }

    const hasAllLinks = data.links.every(function (link) {
      return link.name && link.href;
    });

    if (!hasAllLinks) {
      window.alert("Please fill in all 5 links (name and URL).");
      return false;
    }

    return true;
  }

function restoreForm() {
    const heading = getEl("page-heading");
    const output = getEl("generated-output");
    const formArea = getEl("form-area");
    const form = getEl("intro-form");

    heading.textContent = "Introduction Form";
    output.innerHTML = "";
    formArea.style.display = "block";
    form.reset();
    setDefaultCourses();
  }

  function renderIntroduction(data) {
    const heading = getEl("page-heading");
    const output = getEl("generated-output");
    const formArea = getEl("form-area");

    heading.textContent = "Introduction Form";

    const courseItems = data.courses
      .map(function (course) {
        return (
          "<li><b>" +
          escapeHtml(course.department + course.number + " - " + course.name) +
          ":</b> " +
          escapeHtml(course.reason) +
          "</li>"
        );
      })
      .join("\n");

    const funnyItem = data.funnyThing
      ? "<li><b>Funny/Interesting item to remember me by:</b> " +
        escapeHtml(data.funnyThing) +
        "</li>"
      : "";

    const shareItem = data.shareMore
      ? "<li><b>I'd also like to share:</b> " +
        escapeHtml(data.shareMore) +
        "</li>"
      : "";

    output.innerHTML =
      "<p>" +
      escapeHtml(data.ackStatement) +
      " - <i>JTD - " +
      escapeHtml(toDisplayDate(data.ackDate)) +
      "</i></p>" +
      "<figure>" +
      '<img class="result-image" src="' +
      escapeHtml(data.imageSrc) +
      '" alt="' +
      escapeHtml(data.pictureAlt) +
      '" width="200" />' +
      "<figcaption>" +
      escapeHtml(data.pictureCaption) +
      "</figcaption>" +
      "</figure>" +
      "<p>" +
      escapeHtml(data.personalStatement) +
      "</p>" +
      '<ul id="introduction-ul">' +
      "<li><b>Personal Background:</b> " +
      escapeHtml(data.personalBackground) +
      "</li>" +
      "<li><b>Professional Background:</b> " +
      escapeHtml(data.professionalBackground) +
      "</li>" +
      "<li><b>Academic Background:</b> " +
      escapeHtml(data.academicBackground) +
      "</li>" +
      "<li><b>Background in Subject:</b> " +
      escapeHtml(data.subjectBackground) +
      "</li>" +
      "<li><b>Primary Work Computer:</b> " +
      escapeHtml(data.primaryComputer) +
      "</li>" +
      "<li><b>Backup Work Computer and Location:</b> " +
      escapeHtml(data.backupComputer) +
      "</li>" +
      "<li><b>Current Courses:</b><ol>" +
      courseItems +
      "</ol></li>" +
      funnyItem +
      shareItem +
      "</ul>" +
      "<blockquote><p><q>" +
      escapeHtml(data.quote) +
      "</q><br />- <cite>" +
      escapeHtml(data.quoteAuthor) +
      "</cite></p></blockquote>" +
      '<p><a href="#" id="start-over-link">Reset and Start Over</a></p>';

    formArea.style.display = "none";

    const startOverLink = getEl("start-over-link");
    startOverLink.addEventListener("click", function (event) {
      event.preventDefault();
      restoreForm();
    });
  }

  function showCodeOutput(title, codeText, languageClass) {
    const heading = getEl("page-heading");
    const formArea = getEl("form-area");
    const output = getEl("generated-output");

    heading.textContent = title;
    formArea.style.display = "none";
    output.innerHTML =
      '<section><pre><code class="' +
      languageClass +
      '">' +
      escapeHtml(codeText) +
      "</code></pre></section>" +
      '<p><a href="#" id="start-over-link">Reset and Start Over</a></p>';

    if (window.hljs) {
      const codeBlock = output.querySelector("code");
      window.hljs.highlightElement(codeBlock);
    }

    const startOverLink = getEl("start-over-link");
    startOverLink.addEventListener("click", function (event) {
      event.preventDefault();
      restoreForm();
    });
  }



  function buildIntroductionHtmlString(data) {
    const courseHtml = data.courses
      .map(function (course) {
        return (
          "      <li><b>" +
          course.department +
          course.number +
          " - " +
          course.name +
          ":</b> " +
          course.reason +
          "</li>"
        );
      })
      .join("\n");

    const funnyLine = data.funnyThing
      ? "    <li><b>Funny/Interesting item to remember me by:</b> " +
        data.funnyThing +
        "</li>\n"
      : "";

    const shareLine = data.shareMore
      ? "    <li><b>I'd also like to share:</b> " + data.shareMore + "</li>\n"
      : "";

    return (
      "<h2>Introduction HTML</h2>\n" +
      "<h3>" +
      buildNameLine(data) +
      "</h3>\n" +
      "<p>" +
      data.ackStatement +
      " - <i>JTD - " +
      toDisplayDate(data.ackDate) +
      "</i></p>\n" +
      "<figure>\n" +
      '  <img src="' +
      (data.uploadedFileName
        ? "images/" + data.uploadedFileName
        : data.defaultImage) +
      '" alt="' +
      data.pictureAlt +
      '" width="200" />\n' +
      "  <figcaption>" +
      data.pictureCaption +
      "</figcaption>\n" +
      "</figure>\n" +
      "<p>" +
      data.personalStatement +
      "</p>\n" +
      "<ul>\n" +
      "    <li><b>Personal Background:</b> " +
      data.personalBackground +
      "</li>\n" +
      "    <li><b>Professional Background:</b> " +
      data.professionalBackground +
      "</li>\n" +
      "    <li><b>Academic Background:</b> " +
      data.academicBackground +
      "</li>\n" +
      "    <li><b>Background in Subject:</b> " +
      data.subjectBackground +
      "</li>\n" +
      "    <li><b>Primary Work Computer:</b> " +
      data.primaryComputer +
      "</li>\n" +
      "    <li><b>Backup Work Computer and Location:</b> " +
      data.backupComputer +
      "</li>\n" +
      "    <li><b>Current Courses:</b>\n" +
      "      <ol>\n" +
      courseHtml +
      "\n      </ol>\n" +
      "    </li>\n" +
      funnyLine +
      shareLine +
      "</ul>\n" +
      "<blockquote>\n" +
      "  <p><q>" +
      data.quote +
      "</q><br />- <cite>" +
      data.quoteAuthor +
      "</cite></p>\n" +
      "</blockquote>"
    );
  }

  function buildIntroductionJson(data) {
    return {
      first_name: data.firstName,
      preferred_name: data.preferredName,
      middle_initial: data.middleName,
      last_name: data.lastName,
      divider: data.divider,
      mascot_adjective: data.mascotAdjective,
      mascot_animal: data.mascotAnimal,
      image: data.uploadedFileName
        ? "images/" + data.uploadedFileName
        : data.defaultImage,
      image_caption: data.pictureCaption,
      personal_statement: data.personalStatement,
      personal_background: data.personalBackground,
      professional_background: data.professionalBackground,
      academic_background: data.academicBackground,
      subject_background: data.subjectBackground,
      primary_computer: data.primaryComputer,
      backup_computer: data.backupComputer,
      courses: data.courses,
      quote: data.quote,
      quote_author: data.quoteAuthor,
      funny_thing: data.funnyThing,
      share_more: data.shareMore,
      links: data.links
    };
  }

  function init() {
    const form = getEl("intro-form");
    const addCourseButton = getEl("add-course");
    const clearButton = getEl("clear-form");
    const resetButton = getEl("reset-defaults");

    setDefaultCourses();
    bindCourseButtons();

    addCourseButton.addEventListener("click", function () {
      addCourse();
    });

    clearButton.addEventListener("click", function () {
      form.querySelectorAll("input, textarea").forEach(function (input) {
        if (input.type === "file") {
          input.value = "";
        } else {
          input.value = "";
        }
      });
      getEl("courses-container").innerHTML = "";
      addCourse();
    });

    resetButton.addEventListener("click", function () {
      window.setTimeout(function () {
        setDefaultCourses();
      }, 0);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      const data = collectData();
      renderIntroduction(data);
    });

    window.IntroForm = {
      collectData: collectData,
      validateForm: validateForm,
      showCodeOutput: showCodeOutput,
      buildIntroductionHtmlString: buildIntroductionHtmlString,
      buildIntroductionJson: buildIntroductionJson,
      restoreForm: restoreForm
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
