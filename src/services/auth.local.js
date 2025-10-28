// src/services/auth.local.js

// log brugeren ind (her er det bare localStorage-flag)
export function loginUser({ email, password }) {
  // i rigtig verden ville vi tjekke server-side.
  // lige nu siger vi bare "ok".
  localStorage.setItem("auth.loggedIn", "true");

  if (email) {
    // hvis der ikke allerede er et navn fra signup, lav fallback
    const existingName = localStorage.getItem("profile.name");
    if (!existingName) {
      const fallbackName = email.split("@")[0];
      localStorage.setItem("profile.name", fallbackName);
    }
    localStorage.setItem("profile.email", email);
  }

  // vi gemmer password KUN for demo (du sletter senere i rigtig app)
  if (password) {
    localStorage.setItem("profile.password", password);
  }
}

export function signupUser({ name, email, password }) {
  localStorage.setItem("profile.name", name);
  localStorage.setItem("profile.email", email);
  localStorage.setItem("profile.password", password || "");

  // midlertidig default-avatar indtil de vælger en i avatar-step
  const existingAvatar = localStorage.getItem("profile.avatarSrc");
  if (!existingAvatar) {
    localStorage.setItem(
      "profile.avatarSrc",
      "/assets/illustrations/ill-profil-avatar-man-garlic.svg"
    );
  }

  localStorage.setItem("auth.loggedIn", "true");
}

export function setAvatar(src) {
  localStorage.setItem("profile.avatarSrc", src);
}

export function logoutUser() {
  // vi logger bare ud – vi sletter IKKE profildata så hjem stadig kan vise navn
  localStorage.setItem("auth.loggedIn", "false");
}
