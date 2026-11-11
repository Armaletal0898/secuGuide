from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import random
import string
import re

app = FastAPI(title="SecuGuide Enterprise - Asistente de Seguridad y Soporte")

class PasswordCheck(BaseModel):
    password: str

class UrlCheck(BaseModel):
    url: str

class IncidentReport(BaseModel):
    incident_type: str
    details: str

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_index():
    index_path = os.path.join("static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="index.html not found")

@app.post("/api/validate-password")
def validate_password(data: PasswordCheck):
    pwd = data.password
    score = 0
    feedback = []

    if len(pwd) >= 8:
        score += 1
    else:
        feedback.append("Usa al menos 8 caracteres (recomendado 12+).")

    if len(pwd) >= 12:
        score += 1

    if any(c.isupper() for c in pwd) and any(c.islower() for c in pwd):
        score += 1
    else:
        feedback.append("Combina letras mayúsculas y minúsculas.")

    if any(c.isdigit() for c in pwd):
        score += 1
    else:
        feedback.append("Agrega al menos un número.")

    if any(c in string.punctuation for c in pwd):
        score += 1
    else:
        feedback.append("Incluye símbolos especiales (ej. @, #, $, !).")

    if score <= 2:
        strength = "Débil ❌"
        description = "Riesgo crítico de vulneración en credenciales corporativas."
    elif score <= 4:
        strength = "Moderada ⚠️"
        description = "Aceptable, pero puede fortalecerse con mayor longitud y símbolos."
    else:
        strength = "¡Excelente y Segura! 🛡️"
        description = "Cumple con altos estándares de robustez empresarial."

    return {
        "strength": strength,
        "description": description,
        "suggestions": feedback
    }

@app.get("/api/generate-password")
def generate_password():
    length = 16
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    while True:
        pwd = "".join(random.choice(chars) for _ in range(length))
        if (any(c.isupper() for c in pwd) and 
            any(c.islower() for c in pwd) and 
            any(c.isdigit() for c in pwd) and 
            any(c in "!@#$%^&*" for c in pwd)):
            return {"password": pwd}

@app.post("/api/analyze-url")
def analyze_url(data: UrlCheck):
    url = data.url.lower().strip()
    flags = []
    risk = "Bajo ✅"

    if url.startswith("http://"):
        flags.append("⚠️ Conexión no cifrada (HTTP sin certificado SSL).")
        risk = "Medio ⚠️"

    if any(shortener in url for shortener in ["bit.ly", "tinyurl.com", "t.co", "is.gd"]):
        flags.append("⚠️ Utiliza un acortador de URL que oculta el destino real.")
        risk = "Medio ⚠️"

    if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url):
        flags.append("❌ Utiliza una dirección IP directa en lugar de un nombre de dominio.")
        risk = "Alto 🚨"

    if any(word in url for word in ["verify", "login", "update", "bank", "secure", "renew"]):
        flags.append("⚠️ Contiene palabras clave típicamente usadas en suplantación de identidad.")
        if risk != "Alto 🚨":
            risk = "Medio ⚠️"

    if not flags:
        flags.append("No se detectaron patrones anómalos evidentes. Recuerda verificar el dominio exacto.")

    return {"risk": risk, "flags": flags}

@app.post("/api/report-incident")
def report_incident(data: IncidentReport):
    ticket_id = random.randint(10000, 99999)
    return {
        "status": "success",
        "ticket_id": ticket_id,
        "message": f"Reporte de {data.incident_type} recibido correctamente. El equipo de TI lo ha puesto en cola prioritaria."
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
