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