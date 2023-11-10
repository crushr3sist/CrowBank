export const logOff = () => {
	window.sessionStorage.clear();
	if ("caches" in window) {
		caches.keys().then(function (keyList) {
			return Promise.all(
				keyList.map(function (key) {
					return caches.delete(key);
				}),
			);
		});
	}
	document.cookie = "";
	localStorage.clear();
	window.location.assign("/auth/login");
};
