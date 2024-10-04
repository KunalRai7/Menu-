import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Register fonts
Font.register({
  family: 'Montserrat',
  src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf',
})

Font.register({
  family: 'Cormorant',
  src: 'https://fonts.gstatic.com/s/cormorant/v11/H4cgBXOCl9bbnla_nHIiRLmohYa2.ttf',
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF7ED',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Cormorant',
    color: '#92400E',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#B45309',
    marginTop: 5,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    color: '#92400E',
    marginTop: 15,
    marginBottom: 10,
    borderBottom: '1 solid #92400E',
    paddingBottom: 5,
  },
  item: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#78350F',
    marginBottom: 5,
  },
  customText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#78350F',
    marginBottom: 15,
    textAlign: 'center',
  },
})

interface MenuPDFProps {
  selectedItems: { [key: string]: string[] }
  customText: string
}

export const MenuPDF: React.FC<MenuPDFProps> = ({ selectedItems, customText }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Hotel Prakash & Sons</Text>
        <Text style={styles.subtitle}>Savor the Flavors of Tradition</Text>
      </View>
      {customText && <Text style={styles.customText}>{customText}</Text>}
      <View style={styles.content}>
        {Object.entries(selectedItems).map(([category, items], index) => (
          items.length > 0 && (
            <View key={category} style={styles.column}>
              <Text style={styles.category}>{category}</Text>
              {items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.item}>
                  • {item}
                </Text>
              ))}
            </View>
          )
        ))}
      </View>
    </Page>
  </Document>
)