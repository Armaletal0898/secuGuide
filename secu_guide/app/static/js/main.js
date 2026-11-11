document.addEventListener("DOMContentLoaded", () => {
    // 1. Control del Menú Lateral (Sidebar)
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function toggleMenu() {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("active");
    }

    if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
    if (closeSidebar) closeSidebar.addEventListener("click", toggleMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", toggleMenu);

    document.querySelectorAll(".sidebar-menu a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("active");
        });
    });

    // 2. Validador de Contraseñas
    const userPassword = document.getElementById("userPassword");
    const pwdResult = document.getElementById("pwdResult");
    const pwdStrengthText = document.getElementById("pwdStrengthText").querySelector("span");
    const pwdDescText = document.getElementById("pwdDescText");
    const pwdSuggestions = document.getElementById("pwdSuggestions");

    if (userPassword) {
        userPassword.addEventListener("input", async () => {
            const password = userPassword.value;
            if (password.length === 0) {
                pwdResult.classList.add("hidden");
                return;
            }

            try {
                const response = await fetch("/api/validate-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password })
                });
                const data = await response.json();

                if (response.ok) {
                    pwdResult.classList.remove("hidden");
                    pwdStrengthText.textContent = data.strength;
                    pwdDescText.textContent = data.description;
                    pwdSuggestions.innerHTML = "";
                    data.suggestions.forEach(s => {
                        const li = document.createElement("li");
                        li.textContent = s;
                        pwdSuggestions.appendChild(li);
                    });
                }
            } catch (error) {
                console.error("Error validando contraseña:", error);
            }
        });
    }

    // 3. Generador de Contraseñas
    const btnGenerate = document.getElementById("btnGenerate");
    const generatedPassword = document.getElementById("generatedPassword");

    if (btnGenerate) {
        btnGenerate.addEventListener("click", async () => {
            try {
                const response = await fetch("/api/generate-password");
                const data = await response.json();
                if (response.ok) {
                    generatedPassword.value = data.password;
                    generatedPassword.select();
                    navigator.clipboard.writeText(data.password);
                    alert("¡Contraseña copiada al portapapeles!");
                }
            } catch (error) {
                console.error("Error generando contraseña:", error);
            }
        });
    }

    // 4. Drag & Drop y Hash de Archivos (Web Crypto Client-side)
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const hashResultBox = document.getElementById("hashResultBox");

    if (dropZone && fileInput) {
        dropZone.addEventListener("click", () => fileInput.click());
        dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.classList.add("dragover"); });
        dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
            if (e.dataTransfer.files.length > 0) processFileHash(e.dataTransfer.files[0]);
        });
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) processFileHash(e.target.files[0]);
        });
    }

    async function processFileHash(file) {
        hashResultBox.innerHTML = `<p style="color: var(--accent-color);">Procesando <strong>${file.name}</strong>...</p>`;
        try {
            const buffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
            const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
            hashResultBox.innerHTML = `<p><strong>Archivo:</strong> ${file.name}</p><p style="color: var(--success-color);"><strong>SHA-256:</strong> ${hashHex}</p>`;
        } catch (err) {
            hashResultBox.innerHTML = `<p style="color: var(--danger-color);">Error calculando hash.</p>`;
        }
    }

    // 5. Analizador de URLs (API Backend)
    const btnAnalyzeUrl = document.getElementById("btnAnalyzeUrl");
    const urlInput = document.getElementById("urlInput");
    const urlResultBox = document.getElementById("urlResultBox");

    if (btnAnalyzeUrl) {
        btnAnalyzeUrl.addEventListener("click", async () => {
            const url = urlInput.value.trim();
            if (!url) return alert("Pega un enlace para analizar.");

            try {
                const response = await fetch("/api/analyze-url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url })
                });
                const data = await response.json();
                if (response.ok) {
                    urlResultBox.classList.remove("hidden");
                    document.getElementById("urlRiskLevel").textContent = `Nivel de Riesgo: ${data.risk}`;
                    const flagsList = document.getElementById("urlFlags");
                    flagsList.innerHTML = "";
                    data.flags.forEach(f => {
                        const li = document.createElement("li");
                        li.textContent = f;
                        flagsList.appendChild(li);
                    });
                }
            } catch (err) {
                console.error("Error analizando URL:", err);
            }
        });
    }

    // 6. Buscador del Glosario
    const glossarySearch = document.getElementById("glossarySearch");
    const glossaryCards = document.querySelectorAll(".glossary-card");

    if (glossarySearch) {
        glossarySearch.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            glossaryCards.forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(term) ? "block" : "none";
            });
        });
    }
});

// VISTAS
function showSection(sectionName) {
    document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(`sec-${sectionName}`);
    if (target) {
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// TABS
function switchTab(evt, tabName) {
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// REVELAR PHISHING EN EL SIMULADOR
function revealPhish(type) {
    const box = document.getElementById("phishFeedback");
    const title = document.getElementById("phishTitle");
    const desc = document.getElementById("phishDesc");

    box.classList.remove("hidden");
    if (type === 'from') {
        title.textContent = "🚩 Dominio del Remitente Falso";
        desc.textContent = "Observa la dirección: 'empresa-secutity-renew.com'. Tiene un error ortográfico ('secutity') y no corresponde al dominio oficial de tu empresa.";
    } else if (type === 'subject') {
        title.textContent = "🚩 Sentido de Urgencia Artificial";
        desc.textContent = "Los atacantes usan amenazas de tiempo (ej. 'suspendida en 2 horas') para provocar pánico y que actúes sin pensar.";
    } else if (type === 'link') {
        title.textContent = "🚩 Enlace a Sitio Web Tramposo";
        desc.textContent = "El botón redirige a una página externa que simula el inicio de sesión para robar tus credenciales corporativas.";
    }
}

// EVALUAR QUIZ DE POSTURA DE SEGURIDAD
function calculateQuiz() {
    const form = document.getElementById("quizForm");
    let score = 0;
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
    
    questions.forEach(q => {
        const selected = form.querySelector(`input[name="${q}"]:checked`);
        if (selected) score += int(selected.value);
    });

    const resultBox = document.getElementById("quizResult");
    const scoreText = document.getElementById("quizScoreText");
    const advice = document.getElementById("quizAdvice");

    resultBox.classList.remove("hidden");
    scoreText.textContent = `Puntaje Obtenido: ${score} / 50 puntos`;

    if (score >= 40) {
        advice.textContent = "🛡️ ¡Excelente cultura de seguridad! Eres una primera línea de defensa ejemplar para la empresa.";
    } else if (score >= 20) {
        advice.textContent = "⚠️ Nivel Medio. Tienes buenos hábitos pero algunas prácticas exponen la red a riesgos de intrusión.";
    } else {
        advice.textContent = "❌ Riesgo Alto. Te recomendamos revisar la sección de Políticas y el Glosario para reforzar tus hábitos de trabajo.";
    }
}

function int(val) { return parseInt(val, 10); }

// ENVIAR REPORTE DE INCIDENTE AL BACKEND
async function submitIncident(e) {
    e.preventDefault();
    const type = document.getElementById("incType").value;
    const details = document.getElementById("incDetails").value;
    const respBox = document.getElementById("incidentResponse");

    try {
        const response = await fetch("/api/report-incident", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ incident_type: type, details })
        });
        const data = await response.json();
        if (response.ok) {
            respBox.classList.remove("hidden");
            respBox.innerHTML = `<p style="color: var(--success-color);"><strong>✅ Reporte Registrado:</strong> ${data.message} (ID de Ticket: #${data.ticket_id})</p>`;
            document.getElementById("incidentForm").reset();
        }
    } catch (err) {
        console.error("Error reportando incidente:", err);
    }
}
