import { PDFDocument, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import * as fs from "fs/promises";


const fontBytes = await fs.readFile("./FuturaPTBook.otf");
// create a simple basePDF
const pdfDoc = await PDFDocument.create();
pdfDoc.registerFontkit(fontkit);

const testFont = await pdfDoc.embedFont(fontBytes, { subset: true });
//const testFont = await pdfDoc.embedFont(StandardFonts.TimesRoman, { subset: true });

const page = pdfDoc.addPage();
page.drawText("someText", {
  font: testFont,
});


await fs.writeFile("./out.pdf", await pdfDoc.save());
