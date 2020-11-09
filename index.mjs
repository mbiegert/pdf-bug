import { PDFDocument, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import * as fs from "fs/promises";


const fontBytes = await fs.readFile("./FuturaPTBook.otf");
// create a simple basePDF
const pdfDoc = await PDFDocument.create();
pdfDoc.registerFontkit(fontkit);

const fontSubset = await pdfDoc.embedFont(fontBytes, { subset: true });
//const fontSubset = await pdfDoc.embedFont(StandardFonts.TimesRoman, { subset: true });

const fontNormal = await pdfDoc.embedFont(fontBytes);

const page = pdfDoc.addPage();
page.drawText("someText", {
  font: fontSubset,
});

page.drawText("someText in a non subset embedded font", {
  x: 100,
  y: 100,
  font: fontNormal,
});


await fs.writeFile("./out.pdf", await pdfDoc.save());
