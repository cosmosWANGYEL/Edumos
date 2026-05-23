document.addEventListener("DOMContentLoaded", () => {

    // ========================= //
    // MENU                      //
    // ========================= //

    const menuBtn  = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sideMenu = document.getElementById("sideMenu");
    const overlay  = document.getElementById("overlay");

    const themeBtn   = document.getElementById("themeBtn");
    const themePanel = document.getElementById("themePanel");
    const lightBtn   = document.getElementById("lightBtn");
    const darkBtn    = document.getElementById("darkBtn");

    const searchBtn     = document.getElementById("searchBtn");
    const searchBarWrap = document.getElementById("searchBarWrap");
    const searchClose   = document.getElementById("searchClose");
    const searchInput   = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (menuBtn && closeBtn && sideMenu && overlay) {

        function openMenu() {
            sideMenu.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";

            if (searchBarWrap) searchBarWrap.style.display = "none";
            if (themePanel)    themePanel.classList.remove("open");
        }

        function closeMenu() {
            sideMenu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        menuBtn.addEventListener("click",  openMenu);
        closeBtn.addEventListener("click", closeMenu);
        overlay.addEventListener("click",  closeMenu);
    }

    // ========================= //
    // BREADCRUMB                //
    // ========================= //

    const pageMap = {
        "index.html":          "Home",
        "intro.html":          "Welcome",
        "about.html":          "About",
        "faqs.html":           "FAQs",
        "contact.html":        "Contact",
        "student.html":        "Student",
        "teacher.html":        "Teacher",
        "signup.html":         "Sign Up",
        "login.html":          "Log In",
        "forgotpassword.html": "Forgot Password",
        "404.html":            "404",
        "location.html":       "Location",
        "grade.html":          "Grade",
        "subject.html":        "Subject"
    };

    const currentPageEl = document.getElementById("currentPage");
    if (currentPageEl) {
        const path = window.location.pathname.split("/").pop() || "index.html";
        const page = pageMap[path] || "Home";
        currentPageEl.innerHTML = `<span style="color:#4b5cff; font-weight:700;">Edumos</span> <span style="color:#aaa; margin:0 4px;">›</span> ${page}`;
    }

    // ========================= //
    // THEME SYSTEM              //
    // ========================= //

    const savedMode = localStorage.getItem("edumos-mode") || "light";
    const savedGrad = localStorage.getItem("edumos-grad") || "default";

    function applyMode(mode) {
        if (mode === "dark") {
            document.body.classList.add("dark-mode");
            if (darkBtn)  darkBtn.classList.add("active");
            if (lightBtn) lightBtn.classList.remove("active");
        } else {
            document.body.classList.remove("dark-mode");
            if (lightBtn) lightBtn.classList.add("active");
            if (darkBtn)  darkBtn.classList.remove("active");
        }
        localStorage.setItem("edumos-mode", mode);
    }

    function applyGrad(grad) {
        ["default","purple","ocean","forest","sunset"].forEach(g => {
            document.body.classList.remove(`grad-${g}`);
        });
        document.body.classList.add(`grad-${grad}`);
        localStorage.setItem("edumos-grad", grad);

        document.querySelectorAll(".theme-grad-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.grad === grad);
        });
    }

    applyMode(savedMode);
    applyGrad(savedGrad);

    if (themeBtn) {
        themeBtn.addEventListener("click", e => {
            e.stopPropagation();
            themePanel.classList.toggle("open");
        });
    }

    if (lightBtn) lightBtn.addEventListener("click", () => applyMode("light"));
    if (darkBtn)  darkBtn.addEventListener("click",  () => applyMode("dark"));

    document.querySelectorAll(".theme-grad-btn").forEach(btn => {
        btn.addEventListener("click", () => applyGrad(btn.dataset.grad));
    });

    // ========================= //
    // SEARCH                    //
    // ========================= //

    // Auto-detect base URL for GitHub Pages, local, or custom domain
    function makeUrl(path) {
        const hostname = window.location.hostname;
        const isGitHub = hostname.includes("github.io");
        const isLocal  = hostname === "localhost" ||
                         hostname === "127.0.0.1" ||
                         window.location.protocol === "file:";

        if (isGitHub) {
            // GitHub Pages: hosted at username.github.io/RepoName/
            const pathParts = window.location.pathname.split("/").filter(Boolean);
            const repoName  = pathParts.length > 0 ? "/" + pathParts[0] : "";
            return repoName + path;
        }

        // Local or custom domain — use path as-is
        return path;
    }

    const searchIndex = [
        { icon: "🏠", title: "Home",             desc: "Landing page",               path: "/index.html" },
        { icon: "🚀", title: "Get Started",       desc: "Choose your role",           path: "/intro.html" },
        { icon: "ℹ️",  title: "About Edumos",     desc: "Our story, team, mission",   path: "/pages/about.html" },
        { icon: "❓", title: "FAQs",              desc: "Frequently asked questions",  path: "/pages/faqs.html" },
        { icon: "📞", title: "Contact Us",        desc: "Get in touch with us",       path: "/pages/contact.html" },
        { icon: "📝", title: "Sign Up",           desc: "Create a new account",       path: "/signup.html" },
        { icon: "🔑", title: "Log In",            desc: "Login to your account",      path: "/login.html" },
        { icon: "🎓", title: "Student Dashboard", desc: "Student learning hub",       path: "/dashboards/student.html" },
        { icon: "🏫", title: "Teacher Dashboard", desc: "Teacher management hub",     path: "/dashboards/teacher.html" },
        { icon: "📐", title: "Mathematics",       desc: "Math lessons and quizzes",   path: "/dashboards/student.html" },
        { icon: "📖", title: "English",           desc: "English lessons",            path: "/dashboards/student.html" },
        { icon: "🇧🇹", title: "Dzongkha",         desc: "Dzongkha lessons",           path: "/dashboards/student.html" },
        { icon: "⚡", title: "Physics",           desc: "Physics lessons",            path: "/dashboards/student.html" },
        { icon: "🧪", title: "Chemistry",         desc: "Chemistry lessons",          path: "/dashboards/student.html" },
        { icon: "🌿", title: "Biology",           desc: "Biology lessons",            path: "/dashboards/student.html" },
        { icon: "💻", title: "ICT",               desc: "Information Technology",     path: "/dashboards/student.html" },
        { icon: "🌍", title: "Geography",         desc: "Geography lessons",          path: "/dashboards/student.html" },
        { icon: "📜", title: "History",           desc: "History lessons",            path: "/dashboards/student.html" },
        { icon: "📊", title: "Economics",         desc: "Economics lessons",          path: "/dashboards/student.html" },
        { icon: "🧮", title: "Business Math",     desc: "Business Mathematics",       path: "/dashboards/student.html" },
        { icon: "🧾", title: "Accountancy",       desc: "Accountancy lessons",        path: "/dashboards/student.html" },
        { icon: "💼", title: "Business Studies",  desc: "Business & Entrepreneurship",path: "/dashboards/student.html" },
        { icon: "🍃", title: "EVS",               desc: "Environmental Studies",      path: "/dashboards/student.html" },
        { icon: "🎨", title: "Art Education",     desc: "Art lessons",                path: "/dashboards/student.html" },
        { icon: "🏃", title: "HPE",               desc: "Health & Physical Education",path: "/dashboards/student.html" },
    ];

    function showSearchResults(query) {
        if (!searchResults) return;

        if (!query) {
            searchResults.style.display = "none";
            searchResults.innerHTML = "";
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.style.display = "block";
        searchResults.innerHTML = "";

        if (results.length === 0) {
            searchResults.innerHTML = `<p class="search-no-results">No results for "<strong>${query}</strong>"</p>`;
            return;
        }

        results.forEach(r => {
            const item = document.createElement("div");
            item.classList.add("search-result-item");
            item.innerHTML = `
                <span class="search-result-icon">${r.icon}</span>
                <div>
                    <p class="search-result-title">${r.title}</p>
                    <p class="search-result-desc">${r.desc}</p>
                </div>
            `;
            item.addEventListener("click", () => {
                window.location.href = makeUrl(r.path);
            });
            searchResults.appendChild(item);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", e => {
            e.stopPropagation();
            const isOpen = searchBarWrap.style.display === "flex";
            searchBarWrap.style.display = isOpen ? "none" : "flex";
            if (!isOpen && searchInput) searchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener("click", () => {
            searchBarWrap.style.display = "none";
            if (searchInput)  searchInput.value = "";
            if (searchResults) {
                searchResults.style.display = "none";
                searchResults.innerHTML = "";
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            showSearchResults(searchInput.value.trim());
        });
        searchInput.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                searchBarWrap.style.display = "none";
                searchInput.value = "";
                if (searchResults) searchResults.style.display = "none";
            }
        });
    }

    // Close panels when clicking outside
    document.addEventListener("click", e => {
        if (themePanel && !themePanel.contains(e.target) && e.target !== themeBtn) {
            themePanel.classList.remove("open");
        }
        if (searchBarWrap &&
            !searchBarWrap.contains(e.target) &&
            e.target !== searchBtn) {
            searchBarWrap.style.display = "none";
            if (searchResults) searchResults.style.display = "none";
        }
    });

    // ========================= //
    // SCROLL TO TOP             //
    // ========================= //

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) scrollTopBtn.classList.add("visible");
            else scrollTopBtn.classList.remove("visible");
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ========================= //
    // SCROLL ANIMATE            //
    // ========================= //

    const scrollItems = document.querySelectorAll(".scroll-animate");
    if (scrollItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, i * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        scrollItems.forEach(item => observer.observe(item));
    }

    // ========================= //
    // LOGO ANIMATION            //
    // ========================= //

    const container = document.getElementById("logo-text");
    if (container) {
        const text = [
            { char: "E", color: "purple"   },
            { char: "d", color: "green"    },
            { char: "u", color: "orangered"},
            { char: "m", color: "blue"     },
            { char: "o", color: "violet"   },
            { char: "s", color: "indigo"   }
        ];

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        async function animateLogo() {
            while (true) {
                container.innerHTML = "";

                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement("span");
                    span.textContent = text[i].char;
                    span.style.color = text[i].color;
                    container.appendChild(span);
                    await sleep(160);
                }

                await sleep(300);

                const letters = container.querySelectorAll("span");
                letters.forEach((letter, i) => {
                    setTimeout(() => {
                        letter.classList.remove("bounce");
                        void letter.offsetWidth;
                        letter.classList.add("bounce");
                    }, i * 100);
                });

                await sleep(1800);
                container.innerHTML = "";
                await sleep(300);
            }
        }

        animateLogo();
    }

    // ========================= //
    // COUNTER ANIMATION         //
    // ========================= //

    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target    = parseInt(entry.target.getAttribute("data-target"));
                    let current     = 0;
                    const increment = Math.ceil(target / 60);

                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                            entry.target.textContent = target + "+";
                        } else {
                            entry.target.textContent = current;
                        }
                    }, 20);

                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ========================= //
    // TESTIMONIAL CAROUSEL      //
    // ========================= //

    const track        = document.getElementById("testimonialTrack");
    const dotsContainer= document.getElementById("testimonialDots");
    const prevBtn      = document.getElementById("prevBtn");
    const nextBtn      = document.getElementById("nextBtn");

    if (track && dotsContainer && prevBtn && nextBtn) {
        const cards = track.querySelectorAll(".testimonial-card");
        let current = 0;

        cards.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("testimonial-dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            current = (index + cards.length) % cards.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dotsContainer.querySelectorAll(".testimonial-dot").forEach((d, i) => {
                d.classList.toggle("active", i === current);
            });
        }

        prevBtn.addEventListener("click", () => goTo(current - 1));
        nextBtn.addEventListener("click", () => goTo(current + 1));
        setInterval(() => goTo(current + 1), 4000);
    }

});