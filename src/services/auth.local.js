// src/services/auth.local.js
const PROFILE_KEY = "profile";
const LOGGED_IN_KEY = "auth.loggedIn";
const DEFAULT_AVATAR = "/assets/illustrations/ill-profil-avatar-man-garlic.svg";

function emitAuthChange() {
  window.dispatchEvent(new Event("local-auth-changed"));
}

function readProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}

function writeProfile(profile) {
  const safe = profile && typeof profile === "object" ? profile : {};
  localStorage.setItem(PROFILE_KEY, JSON.stringify(safe));
}

function setLoggedIn(v) {
  localStorage.setItem(LOGGED_IN_KEY, v ? "true" : "false");
}

export function signupUser({ name, email, password }) {
  // i “dummy/local” auth ignorerer vi password-tjek
  const profile = {
    id: crypto?.randomUUID?.() ?? String(Date.now()),
    name: name?.trim() || "Bruger",
    email: email?.trim() || "ukendt@eksempel.dk",
    avatarSrc: DEFAULT_AVATAR,
    onboardingDone: false,
  };
  writeProfile(profile);
  setLoggedIn(true);
  emitAuthChange();
  return profile;
}

export function loginUser({ email, password }) {
  // meget simpel: hvis der ikke findes en profil, lav en hurtig en
  const existing = readProfile();
  const profile = existing ?? {
    id: crypto?.randomUUID?.() ?? String(Date.now()),
    name: "Bruger",
    email: email?.trim() || "ukendt@eksempel.dk",
    avatarSrc: DEFAULT_AVATAR,
    onboardingDone: false,
  };
  writeProfile(profile);
  setLoggedIn(true);
  emitAuthChange();
  return profile;
}

export function setAvatar(
  src,
  { activateSession = false, finishOnboarding = false } = {}
) {
  const current = readProfile() ?? {};
const next = {
...current,
avatarSrc: src || DEFAULT_AVATAR, onboardingDone: finishOnboarding ? true : (current.onboardingDone ?? false),
};
  writeProfile(next);
  if (activateSession) setLoggedIn(true);
  emitAuthChange();
  return next;
}

export function logoutUser() {
  setLoggedIn(false);
  // vi kan vælge at beholde profil-data (så man kan se avatar/navn på login side),
  // men du kan også rydde helt op ved at afkommentere næste linje:
  // localStorage.removeItem(PROFILE_KEY);
  emitAuthChange();
}
