'use client'

import { Button } from "@/components/ui/button"
import { FileDown } from 'lucide-react'
import { BlobProvider } from '@react-pdf/renderer'
import { MenuPDF } from '@/components/MenuPDF'

interface PDFDownloadButtonProps {
  selectedItems: { [key: string]: string[] }
  customText: string
}

export default function PDFDownloadButton({ selectedItems, customText }: PDFDownloadButtonProps) {
  return (
    <BlobProvider document={<MenuPDF selectedItems={selectedItems} customText={customText} />}>
      {({ blob, url, loading, error }) => (
        <Button 
          className="w-full sm:w-1/3 bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 flex items-center justify-center"
          disabled={loading}
          onClick={() => {
            if (url) {
              const link = document.createElement('a');
              link.href = url;
              link.download = 'menu-selection.pdf';
              link.click();
            }
          }}
        >
          <FileDown className="mr-2 h-5 w-5" /> {loading ? 'Loading...' : 'Save as PDF'}
        </Button>
      )}
    </BlobProvider>
  )
}