let supported_urls = [
                new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/[0-9]+/[^/]+'),
                new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/download/[0-9]+/[^/]+/.+'),
                new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/premium-redirect/[0-9]+'),
                new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/[0-9]+/[^/]+/dynamic/?'),
                new RegExp('^https?://(aclabink[.]com|adf[.]ly|aporasal[.]net|atominik[.]com|ay[.]gy|brightvar[.]bid|clearload[.]bid|dapalan[.]com|ducolomal[.]com|fawright[.]com|flyserve[.]co|gdanstum[.]net|j[.]gs|kializer[.]com|microify[.]com|q[.]gs|raboninco[.]com|skamaker[.]com|skamason[.]com|tinyium[.]com|u[.]bb|yamechanic[.]com|yoineer[.]com|yoitect[.]com|zipansion[.]com)/.'),
                new RegExp('^https?://bit[.]ly/.'),
            ];

            let bypass = async function(url) {
                let resp = await fetch("https://bypass.bot.nu/bypass2?url=" + encodeURIComponent(url));
                let j = await resp.json()

                let time_ms = "";
                if (typeof j.time_ms !== "undefined") {
                    time_ms = "|" + j.time_ms + "ms";
                }

                console.log(j);

                let li = document.createElement("li");

                if (j.success) {
                    li.classList.add("success");
                    li.textContent = "[" + j.plugin + time_ms + "] " + url + " - ";
                    let a = document.createElement("a");
                    a.textContent = j.destination;
                    a.href = j.destination;
                    a.rel = "nofollow noreferrer noopener";
                    a.target = "_blank";
                    li.appendChild(a);
                } else {
                    li.classList.add("failure");
                    li.textContent =  "[" + j.plugin + time_ms + "] " + url + " - " + j.msg;
                }

                document.querySelector("ul").prepend(li);

                if (j.success && url !== j.destination && supported_urls.some(r => j.destination.match(r))) {
                    await bypass(j.destination);
                }
                alert(a);
            };

            let submit = async function(e) {
                e.preventDefault();

                let url = document.querySelector("input").value.trim();

                await bypass(url);
            };

            let onload = function() {
                document.querySelector("form").addEventListener("submit", submit)
            };

            window.addEventListener('DOMContentLoaded', onload);
