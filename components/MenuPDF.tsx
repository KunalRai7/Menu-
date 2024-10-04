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
  category: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    color: '#92400E',
    marginTop: 15,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#78350F',
    marginBottom: 5,
  },
})

interface MenuPDFProps {
  selectedItems: { [key: string]: string[] }
}

export const MenuPDF: React.FC<MenuPDFProps> = ({ selectedItems }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Hotel Prakash & Sons</Text>
        <Text style={styles.subtitle}>Savor the Flavors of Tradition</Text>
      </View>
      {Object.entries(selectedItems).map(([category, items]) => (
        items.length > 0 && (
          <View key={category}>
            <Text style={styles.category}>{category}</Text>
            {items.map((item, index) => (
              <Text key={index} style={styles.item}>
                • {item}
              </Text>
            ))}
          </View>
        )
      ))}
    </Page>
  </Document>
)