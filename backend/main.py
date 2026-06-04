import io
import chromadb
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

app = FastAPI()

# Configuración de CORS para permitir peticiones desde React (Vite)
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Inicializar el modelo de embeddings (es ligero y rápido en CPU)
model = SentenceTransformer('all-MiniLM-L6-v2')
# Inicializar ChromaDB en memoria para este MVP
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="manual_pages")

@app.get("/")
async def read_root():
    return {"status": "API de LeeManual ok"}

@app.post("/api/upload/")
async def upload_file(file: UploadFile = File(...)):
    # 1. Validación de extensión y tipo de archivo
    if not file.filename.endswith(".pdf") and file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF válido.")

    try:
        # 2. Leer el contenido del archivo subido en memoria
        content = await file.read()
        pdf_buffer = io.BytesIO(content)

        # 3. Inicializar el lector de PDF
        reader = PdfReader(pdf_buffer)

        # 4 y 5. Iterar sobre las páginas y extraer el texto
        pages_data = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            # Limpiar espacios extra y manejar páginas que puedan no tener texto
            clean_text = text.strip() if text else ""
            pages_data.append({
                "page_number": i + 1,
                "text": clean_text
            })

        # 6. Vectorización y almacenamiento en ChromaDB
        # Limpiar la colección anterior para no mezclar manuales
        existing = collection.get()
        if existing["ids"]:
            collection.delete(ids=existing["ids"])

        # Generar embeddings y guardar en ChromaDB
        texts = [p["text"] for p in pages_data]
        embeddings = [model.encode(text).tolist() for text in texts]
        ids = [f"page_{p['page_number']}" for p in pages_data]
        metadatas = [{"page_number": p["page_number"]} for p in pages_data]

        collection.add(
            embeddings=embeddings,
            documents=texts,
            metadatas=metadatas,
            ids=ids
        )

        # 7. Preparar el preview
        preview_text = (
            pages_data[0]["text"][:200]
            if pages_data and pages_data[0]["text"]
            else "La primera página parece ser una imagen o está vacía."
        )

        return JSONResponse(content={
            "message": "Archivo procesado y vectorizado correctamente",
            "filename": file.filename,
            "total_pages": len(pages_data),
            "preview": preview_text
        })

    except Exception as e:
        # Manejo de errores en caso de que el PDF esté dañado o no se pueda procesar
        raise HTTPException(status_code=500, detail=f"Error al procesar el documento: {str(e)}")