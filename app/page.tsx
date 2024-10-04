'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Coffee, Soup, Pizza, Utensils, Sandwich, Salad, ChefHat, Carrot, Wheat, IceCream, Milk, Clipboard, Copy, FileDown, Image } from 'lucide-react'
import { toPng } from 'html-to-image'
import { PDFDownloadLink, PDFDownloadLinkProps } from '@react-pdf/renderer'
import { MenuPDF } from '@/components/MenuPDF'

const menuItems = {
  Beverages: [
    "Tea",
    "Coffee",
    "Hot Milk",
    "Lassi",
    "Butter Milk",
    "Cold Drinks / Fresh Juice",
    "Keri Pana",
    "Mineral Water"
  ],
  Soup: [
    "Tomato Soup",
    "Tomato Shorba",
    "Sweet Corn Soup",
    "Hot & Sour Soup",
    "Manchow Soup",
    "Mushroom Soup",
    "Veg Clear Soup"
  ],
  Chat: [
    "Pani Poori",
    "Tikki Chat",
    "Kerala Chat",
    "Fruit Chat",
    "Dahi Bada",
    "Bhalla Papadi",
    "Paneer Chila",
    "Pav Bhaji",
    "Mangore",
    "Onion Kachori",
    "Indori Patties",
    "Bhel Poori"
  ],
  Starter: [
    "Cheese Roll",
    "Spring Roll",
    "Cheese Ball",
    "Finger Chips",
    "Hara Bhara Kabab",
    "Paneer Tikka",
    "Paneer Lehsuni Tikka",
    "Veg Seekh Kabab",
    "Veg Lollipop",
    "Chilli Paneer Dry"
  ],
  "South Indian": [
    "Masala Dosa",
    "Plain Dosa",
    "Uttapam",
    "Vada Sambhar",
    "Idli Sambhar",
    "Fried Idli",
    "Onion Dosa",
    "Jain Dosa",
    "Plain Rawa Dosa"
  ],
  Chinese: [
    "Veg Chowmein",
    "Veg Hakka Noodles",
    "Veg Schezwan Noodles",
    "Veg Fried Rice",
    "Veg Schezwan Rice",
    "Veg Manchurian",
    "Veg Kothe",
    "Veg Choupsey",
    "Chilli Mushroom"
  ],
  Paneer: [
    "Kadai Paneer",
    "Paneer Butter Masala",
    "Palak Paneer",
    "Paneer Lababdar",
    "Paneer Do Pyaza",
    "Methi Mutter Malai",
    "Mutter Paneer",
    "Kaju Curry",
    "Paneer Jalfrezi",
    "Paneer Hara Bhara",
    "Paneer Khurchan"
  ],
  "Vegetable Dishes": [
    "Malai Kofta",
    "Veg Kofta",
    "Loki Kofta",
    "Hariyali Kofta",
    "Corn Palak",
    "Dum Aloo",
    "Mix Veg",
    "Aloo Gobi",
    "Aloo Capsicum",
    "Aloo Methi",
    "Aloo Palak",
    "Achari Aloo",
    "Green Peas Masala",
    "Bhindi Masala",
    "Bhindi Do Pyaza",
    "Baingan Ka Bharta",
    "Gobhi Mutter",
    "Jeera Aloo",
    "Methi Aloo",
    "Gobhi Fry",
    "Bhindi Kurkuri"
  ],
  Dal: [
    "Dal Fry",
    "Dal Tadka",
    "Mix Dal",
    "Dal Makhani",
    "Chana Masala",
    "Rajma Masala",
    "Kadi Pakoda"
  ],
  Rice: [
    "Steam Rice",
    "Jeera Rice",
    "Veg Pulao",
    "Mutter Pulao",
    "Dry Fruits Pulao",
    "Veg Biryani",
    "Masala Rice"
  ],
  Breads: [
    "Tawa Roti",
    "Tandoori Roti",
    "Plain Naan",
    "Butter Naan",
    "Lachha Paratha",
    "Missi Roti",
    "Makki Ki Roti",
    "Sada Poori",
    "Masala Poori",
    "Methi Poori",
    "Palak Poori"
  ],
  "Desserts & Ice Cream": [
    "Gulab Jamun",
    "Mava Bati",
    "Kala Jamun",
    "Moong Halwa",
    "Lauki Halwa (Seasonal)",
    "Gajar Halwa (Seasonal)",
    "Jalebi",
    "Rabdi Jalebi",
    "Imarti",
    "Fruit Custard",
    "Pineapple Custard",
    "Rasgulla",
    "Rajbhog",
    "Rasmalai",
    "Petha Gilori",
    "Lachedar Mango",
    "Indrani",
    "Vanilla Ice Cream",
    "Strawberry Ice Cream",
    "Pista Ice Cream",
    "Butterscotch Ice Cream",
    "Tutti Frutti Ice Cream"
  ],
  Raita: [
    "Bundi Raita",
    "Cucumber Raita",
    "Loki Raita",
    "Veg Raita",
    "Fruit Raita",
    "Pineapple Raita",
    "Mint Potato Raita",
    "Plain Curd"
  ],
  "Additional Services": [
    "Masala Papad",
    "Mix Pickle",
    "Sprouts Salad",
    "Peanut Salad",
    "Garden Fresh Green Salad",
    "Russian Salad",
    "Kachumar Salad",
    "Pan Counter",
    "RO Water / Mineral Water"
  ]
}

const categoryIcons: { [key: string]: JSX.Element } = {
  Beverages: <Coffee className="w-6 h-6 text-amber-600" />,
  Soup: <Soup className="w-6 h-6 text-amber-600" />,
  Chat: <Pizza className="w-6 h-6 text-amber-600" />,
  Starter: <Utensils className="w-6 h-6 text-amber-600" />,
  "South Indian": <Sandwich className="w-6 h-6 text-amber-600" />,
  Chinese: <Salad className="w-6 h-6 text-amber-600" />,
  Paneer: <ChefHat className="w-6 h-6 text-amber-600" />,
  "Vegetable Dishes": <Carrot className="w-6 h-6 text-amber-600" />,
  Dal: <Soup className="w-6 h-6 text-amber-600" />,
  Rice: <Wheat className="w-6 h-6 text-amber-600" />,
  Breads: <Wheat className="w-6 h-6 text-amber-600" />,
  "Desserts & Ice Cream": <IceCream className="w-6 h-6 text-amber-600" />,
  Raita: <Milk className="w-6 h-6 text-amber-600" />,
  "Additional Services": <Clipboard className="w-6 h-6 text-amber-600" />,
}

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string[] }>({})
  const selectionRef = useRef<HTMLDivElement>(null)

  const toggleItem = (category: string, item: string) => {
    setSelectedItems(prev => {
      const categoryItems = prev[category] || []
      if (categoryItems.includes(item)) {
        return { ...prev, [category]: categoryItems.filter(i => i !== item) }
      } else {
        return { ...prev, [category]: [...categoryItems, item] }
      }
    })
  }

  const copySelection = () => {
    const text = Object.entries(selectedItems)
      .filter(([_, items]) => items.length > 0)
      .map(([category, items]) => `${category}:\n${items.map(item => `• ${item}`).join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
      .then(() => alert('Selection copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  const saveAsImage = () => {
    if (selectionRef.current) {
      toPng(selectionRef.current, { quality: 0.95 })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'menu-selection.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.error('Error saving image:', err)
        })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="min-h-screen font-montserrat">
        <div className="container mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center text-amber-800 font-cormorant">Hotel Prakash & Sons</h1>
          <p className="text-xl text-center mb-9 text-amber-600 tracking-wide font-dancing-script">Savor the Flavors of Tradition</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(menuItems).map(([category, items]) => (
              <Card key={category} className="bg-white shadow-md border-2 border-amber-200 overflow-hidden">
                <CardHeader className="bg-amber-100 border-b-2 border-amber-200">
                  <CardTitle className="text-2xl text-amber-800 flex items-center justify-between font-sans">
                    <span>{category}</span>
                    <span className="flex items-center justify-center w-8 h-8">
                      {categoryIcons[category]}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  <ul className="space-y-3">
                    {items.map((item, index) => (
                      <li 
                        key={index} 
                        className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                          selectedItems[category]?.includes(item)
                            ? 'bg-amber-100 text-amber-800 font-medium'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="text-md flex-grow">{item}</span>
                        <Checkbox
                          id={`${category}-${item}`}
                          checked={selectedItems[category]?.includes(item)}
                          onCheckedChange={() => toggleItem(category, item)}
                          className="h-5 w-5 flex-shrink-0 ml-2"
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-12 bg-white shadow-md border-2 border-amber-200 overflow-hidden">
            <CardHeader className="bg-amber-100 border-b-2 border-amber-200">
              <CardTitle className="text-3xl text-amber-800 flex items-center justify-between font-sans">
                Your Selection
                <ShoppingCart className="w-6 h-6 text-amber-600" />
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4" ref={selectionRef}>
              {Object.keys(selectedItems).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(selectedItems).map(([category, items]) => (
                    items.length > 0 && (
                      <div key={category}>
                        <h3 className="font-semibold text-2xl text-amber-700 flex items-center mb-2">
                          {categoryIcons[category]}
                          <span className="ml-2">{category}</span>
                        </h3>
                        <ul className="space-y-3">
                          {items.map((item, index) => (
                            <li 
                              key={index}
                              className="flex items-center justify-between p-2 rounded-md bg-amber-100 text-amber-800 font-medium"
                            >
                              <span className="text-md">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <p className="text-amber-700 text-lg">No items selected yet.</p>
              )}
            </CardContent>
            <CardFooter className="border-t-0 flex flex-col sm:flex-row gap-4">
              <Button 
                className="w-full sm:w-1/3 bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 flex items-center justify-center"
                onClick={copySelection}
              >
                <Copy className="mr-2 h-5 w-5" /> Copy
              </Button>
              <PDFDownloadLink
                document={<MenuPDF selectedItems={selectedItems} />}
                fileName="menu-selection.pdf"
                className="w-full sm:w-1/3"
              >
                {({ loading }: PDFDownloadLinkProps) => (
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 flex items-center justify-center"
                    disabled={loading}
                  >
                    <FileDown className="mr-2 h-5 w-5" /> {loading ? 'Loading...' : 'Save as PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
              <Button 
                className="w-full sm:w-1/3 bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 flex items-center justify-center"
                onClick={saveAsImage}
              >
                <Image className="mr-2 h-5 w-5" /> Save as Image
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}