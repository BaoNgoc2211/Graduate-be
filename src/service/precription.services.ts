
import Tesseract from "tesseract.js";

class PrescriptionService {
    async extractTextFromImage(imagePath: string): Promise<string> {
        try {
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'viet',
            {
            logger: (m) => console.log(m),
            }
        );
        return text;
        } catch (error) {
        console.error("Error extracting text from image:", error);
        throw new Error("Failed to extract text from image");
        }
    }
}
export default new PrescriptionService();