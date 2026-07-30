const ICONS = {
    yt: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
    music: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    microg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    detach: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l2-9 5 18 2-9h5"></path></svg>`,
    default: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`
};

function selectPath(path) {
    document.getElementById("landing-split").classList.add("hidden");
    
    if (path === "non-root") {
        document.getElementById("path-non-root").classList.remove("hidden");
    } else {
        document.getElementById("path-root").classList.remove("hidden");
    }
}

function goBack() {
    document.getElementById("path-non-root").classList.add("hidden");
    document.getElementById("path-root").classList.add("hidden");
    
    document.getElementById("landing-split").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", async () => {
    // Spotlight Effect Logic
    document.addEventListener("mousemove", (e) => {
        document.querySelectorAll(".spotlight-card").forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    const REPO = 'yadavnikhil03/rvx-next';
    const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch release data");
        const data = await response.json();

        const tagName = data.name || data.tag_name;
        document.getElementById("release-tag").textContent = tagName;

        const apkGrid = document.getElementById("apk-container");
        const moduleGrid = document.getElementById("module-container");
        const microgGrid = document.getElementById("microg-container");
        const detachModuleGrid = document.getElementById("detach-module-container");
        const detachAppGrid = document.getElementById("detach-app-container");

        const sortedAssets = data.assets.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            
            const isMainYtA = nameA.includes("youtube-revanced") && !nameA.includes("music");
            const isMainYtB = nameB.includes("youtube-revanced") && !nameB.includes("music");
            
            if (isMainYtA && !isMainYtB) return -1;
            if (!isMainYtA && isMainYtB) return 1;
            
            return nameA.localeCompare(nameB);
        });

        sortedAssets.forEach(asset => {
            const card = document.createElement("div");
            card.className = "dl-card spotlight-card";
            const sizeMB = (asset.size / (1024 * 1024)).toFixed(1);
            
            const nameLower = asset.name.toLowerCase();
            let icon = ICONS.default;
            if (nameLower.includes("yt") || nameLower.includes("youtube")) icon = ICONS.yt;
            if (nameLower.includes("music")) icon = ICONS.music;
            if (nameLower.includes("microg")) icon = ICONS.microg;
            if (nameLower.includes("detach")) icon = ICONS.detach;

            card.innerHTML = `
                <div class="dl-info">
                    <div class="dl-info-icon">${icon}</div>
                    <div class="dl-info-text">
                        <h5>${asset.name}</h5>
                        <p>${sizeMB} MB • ${asset.download_count} downloads</p>
                    </div>
                </div>
                <a href="${asset.browser_download_url}" class="dl-btn">Download</a>
            `;

            if (nameLower.endsWith(".apk")) {
                if (nameLower.includes("microg")) {
                    microgGrid.appendChild(card);
                } else if (nameLower.includes("detach")) {
                    detachAppGrid.appendChild(card);
                } else {
                    apkGrid.appendChild(card);
                }
            } else if (nameLower.endsWith(".zip")) {
                if (nameLower.includes("detach")) {
                    detachModuleGrid.appendChild(card);
                } else {
                    moduleGrid.appendChild(card);
                }
            }
        });

        document.getElementById("hero-actions").classList.add("hidden");
        document.getElementById("downloads").classList.remove("hidden");

    } catch (error) {
        document.getElementById("hero-actions").innerHTML = `
            <p style="color: #ef4444; font-size: 0.9rem;">Error connecting to GitHub.</p>
        `;
    }
});
