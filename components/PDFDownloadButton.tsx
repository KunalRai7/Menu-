'use client'

import { Button } from "@/components/ui/button"
import { FileDown } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { MenuPDF } from '@/components/MenuPDF'

interface PDFDownloadButtonProps {
  selectedItems: { [key: string]: string[] }
  customText: string
}

export default function PDFDownloadButton({ selectedItems, customText }: PDFDownloadButtonProps) {
  const handleDownload = async () => {
    const blob = await pdf(<MenuPDF selectedItems={selectedItems} customText={customText} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'menu-selection.pdf'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button 
      className="w-full sm:w-1/3 bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 flex items-center justify-center"
      onClick={handleDownload}
    >
      <FileDown className="mr-2 h-5 w-5" /> Save as PDF
    </Button>
  )
}