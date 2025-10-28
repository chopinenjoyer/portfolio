const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const statbioContainer = document.querySelector(".statbio-container");

if (statbioContainer) {
  const statbioTables = statbioContainer.querySelectorAll(".statbio[data-table]");
  const statbioToggles = statbioContainer.querySelectorAll(".statbio-toggle[data-role='toggle']");
  const statbioTrigger = document.querySelector(".statbio-trigger");
  const playerPhoto = document.querySelector(".photo-joueur img");
  const primaryPhotoSrc =
    playerPhoto?.dataset.primarySrc || playerPhoto?.getAttribute("src") || null;
  const secondaryPhotoSrc =
    playerPhoto?.dataset.secondarySrc || playerPhoto?.getAttribute("src") || null;
  
  const triggerPhotoAnimation = () => {
    if (!playerPhoto) {
      return;
    }

    playerPhoto.classList.remove("is-rotating");
    void playerPhoto.offsetWidth;
    playerPhoto.classList.add("is-rotating");
  };

  if (playerPhoto) {
    playerPhoto.addEventListener("animationend", () => {
      playerPhoto.classList.remove("is-rotating");
    });
  }

  const updatePlayerPhoto = (target) => {
    if (!playerPhoto || !primaryPhotoSrc || !secondaryPhotoSrc) {
      return;
    }

    const nextSrc = target === "secondary" ? secondaryPhotoSrc : primaryPhotoSrc;
    if (playerPhoto.getAttribute("src") !== nextSrc) {
      playerPhoto.setAttribute("src", nextSrc);
      triggerPhotoAnimation();
    }
  };

  const updateStatbioView = (target) => {
    statbioTables.forEach((table) => {
      const isTarget = table.dataset.table === target;
      table.classList.toggle("is-active", isTarget);
      table.setAttribute("aria-hidden", String(!isTarget));
    });

    statbioContainer.dataset.activeTable = target;

    const isSecondary = target === "secondary";
    statbioToggles.forEach((button) => {
      button.setAttribute("aria-pressed", String(isSecondary));
    });

    updatePlayerPhoto(target);
  };

  updateStatbioView(statbioContainer.dataset.activeTable || "primary");

  const toggleStatbioView = () => {
    const current = statbioContainer.dataset.activeTable || "primary";
    const target = current === "primary" ? "secondary" : "primary";
    updateStatbioView(target);
  };

  statbioToggles.forEach((button) => {
    button.addEventListener("click", toggleStatbioView);
  });

  if (statbioTrigger) {
    statbioTrigger.addEventListener("click", toggleStatbioView);
    statbioTrigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleStatbioView();
      }
    });
  }

}

const animatedElements = document.querySelectorAll("[data-animate]");

if (animatedElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.25,
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

// Contact form -> open email client with prefilled message
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastname = document.getElementById("lastname")?.value.trim() || "";
    const firstname = document.getElementById("firstname")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const subject = `Contact Portfolio - ${firstname} ${lastname}`.trim();
    const body = `Nom: ${lastname}\nPrénom: ${firstname}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailto = `mailto:fredericprassettepro@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}
