package com.veloxpdf.controller;

import com.veloxpdf.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    private final PdfService pdfService;

    @Autowired
    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping(value = "/merge", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> mergePdfs(@RequestParam("files") List<MultipartFile> files) {
        try {
            byte[] result = pdfService.mergePdfs(files);
            return createPdfResponse(result, "merged.pdf");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/split")
    public ResponseEntity<byte[]> splitPdf(@RequestParam("file") MultipartFile file,
            @RequestParam("range") String range) {
        try {
            byte[] result = pdfService.splitPdf(file, range);
            return createPdfResponse(result, "split.pdf");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(value = "/remove-pages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> removePages(@RequestParam("file") MultipartFile file,
            @RequestParam("pages") List<Integer> pages) {
        try {
            byte[] result = pdfService.removePages(file, pages);
            return createPdfResponse(result, "pages-removed.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/img-to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> imagesToPdf(@RequestParam("files") List<MultipartFile> files) {
        try {
            byte[] result = pdfService.imagesToPdf(files);
            return createPdfResponse(result, "images.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/pdf-to-jpg", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pdfToJpg(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pdfToJpg(file);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=images.zip")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(result);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/word-to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> wordToPdf(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.wordToPdf(file);
            return createPdfResponse(result, "converted.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/excel-to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> excelToPdf(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.excelToPdf(file);
            return createPdfResponse(result, "converted.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/ppt-to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pptToPdf(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pptToPdf(file);
            return createPdfResponse(result, "converted.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/html-to-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> htmlToPdf(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.htmlToPdf(file);
            return createPdfResponse(result, "converted.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/pdf-to-word", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pdfToWord(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pdfToWord(file);
            return createDocxResponse(result, "converted.docx");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/pdf-to-excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pdfToExcel(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pdfToExcel(file);
            return createXlsxResponse(result, "converted.xlsx");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/pdf-to-ppt", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pdfToPpt(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pdfToPpt(file);
            return createPptxResponse(result, "converted.pptx");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/pdf-to-pdfa", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> pdfToPdfA(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.pdfToPdfA(file);
            return createPdfResponse(result, "converted-pdfa.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/watermark")
    public ResponseEntity<byte[]> addWatermark(@RequestParam("file") MultipartFile file,
            @RequestParam("text") String text) {
        try {
            byte[] result = pdfService.addWatermark(file, text);
            return createPdfResponse(result, "watermarked.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/protect")
    public ResponseEntity<byte[]> protectPdf(@RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) {
        try {
            byte[] result = pdfService.protectPdf(file, password);
            return createPdfResponse(result, "protected.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/unlock")
    public ResponseEntity<byte[]> unlockPdf(@RequestParam("file") MultipartFile file,
            @RequestParam("password") String password) {
        try {
            byte[] result = pdfService.unlockPdf(file, password);
            return createPdfResponse(result, "unlocked.pdf");
        } catch (IOException e) {
            return ResponseEntity.status(403).build(); // Forbidden/Bad Pwd
        }
    }

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressPdf(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = pdfService.compressPdf(file);
            return createPdfResponse(result, "compressed.pdf");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/ocr")
    public ResponseEntity<String> ocrPdf(@RequestParam("file") MultipartFile file) {
        try {
            String text = pdfService.ocrPdf(file);
            return ResponseEntity.ok(text);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // Helper for PDF responses
    private ResponseEntity<byte[]> createPdfResponse(byte[] content, String filename) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.APPLICATION_PDF)
                .body(content);
    }

    private ResponseEntity<byte[]> createDocxResponse(byte[] content, String filename) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType
                        .parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                .body(content);
    }

    private ResponseEntity<byte[]> createXlsxResponse(byte[] content, String filename) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(content);
    }

    private ResponseEntity<byte[]> createPptxResponse(byte[] content, String filename) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType
                        .parseMediaType("application/vnd.openxmlformats-officedocument.presentationml.presentation"))
                .body(content);
    }
}
