# VeloxPDF

VeloxPDF is a powerful PDF manipulation tool that provides various features like PDF conversion, merging, splitting, and more.

## Backend
The backend is built using:
- **Java 8**
- **Spring Boot 2.7.18**
- **Apache PDFBox** for PDF manipulation
- **Apache POI** for Word to PDF conversion
- **ImgScalr** for image compression
- **OpenHTMLtoPDF** for HTML to PDF conversion
- **Tess4J** for OCR capabilities

## Frontend
The frontend is a static web application containing HTML, CSS, and JavaScript files located in the `frontend` directory.

## Setup

### Prerequisites
- Java 8 (JDK 1.8)
- Maven

### Build
To build the backend:
```bash
mvn clean package
```

### Run
To run the application:
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```
