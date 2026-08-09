export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = Math.round(
    el.getBoundingClientRect().top + window.scrollY,
  );

  window.scrollTo({ top, behavior });
}
