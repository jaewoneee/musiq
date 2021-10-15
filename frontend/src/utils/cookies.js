function saveAuthToCookie(value) {
  document.cookie = `m_auth=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `m_user=${value}`;
}
function saveUuidToCookie(value) {
  document.cookie = `m_uuid=${value}`;
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)m_auth\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)m_user\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
}
function getUuidFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)m_uuid\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  saveUuidToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  getUuidFromCookie,
  deleteCookie,
};
