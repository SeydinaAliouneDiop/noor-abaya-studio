import { Product } from './types';

const weekAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

const img = (label: string, bg = '2C2C2C', fg = 'F5F0E8') =>
  `https://placehold.co/400x500/${bg}/${fg}?text=${encodeURIComponent(label)}`;

export const MOCK_PRODUCTS: Product[] = [
  // ── JILBAB AVEC CAPUCHE (Nida) ───────────────────────────────────────────────
  {
    id: 'p1',
    name: 'Jilbab Capuche Classique',
    description:
      'Jilbab à capuche intégrée en Nida premium. Coupe ample et fluide, couverture totale pour un port confortable au quotidien. Tissu non transparent, doux et léger malgré la chaleur sénégalaise.',
    price: 22000,
    category: 'Abaya classique',
    fabric: 'Nida',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Beige', hex: '#C4A882' },
      { name: 'Kaki', hex: '#4A5240' },
      { name: 'Bleu marine', hex: '#1B2A4A' },
      { name: 'Gris ardoise', hex: '#6B7280' },
      { name: 'Bleu ciel', hex: '#7CB9E8' },
      { name: 'Noir', hex: '#1A1A1A' },
      { name: 'Marron', hex: '#5C3A21' },
    ],
    variants: [
      { size: 'S',   color: 'Beige',        stock: 4,  alertThreshold: 2 },
      { size: 'M',   color: 'Beige',        stock: 6,  alertThreshold: 2 },
      { size: 'L',   color: 'Beige',        stock: 5,  alertThreshold: 2 },
      { size: 'XL',  color: 'Beige',        stock: 3,  alertThreshold: 2 },
      { size: 'M',   color: 'Kaki',         stock: 4,  alertThreshold: 2 },
      { size: 'L',   color: 'Kaki',         stock: 5,  alertThreshold: 2 },
      { size: 'XL',  color: 'Kaki',         stock: 2,  alertThreshold: 2 },
      { size: 'S',   color: 'Bleu marine',  stock: 5,  alertThreshold: 2 },
      { size: 'M',   color: 'Bleu marine',  stock: 8,  alertThreshold: 2 },
      { size: 'L',   color: 'Bleu marine',  stock: 6,  alertThreshold: 2 },
      { size: 'XL',  color: 'Bleu marine',  stock: 3,  alertThreshold: 2 },
      { size: 'M',   color: 'Gris ardoise', stock: 4,  alertThreshold: 2 },
      { size: 'L',   color: 'Gris ardoise', stock: 3,  alertThreshold: 2 },
      { size: 'M',   color: 'Bleu ciel',    stock: 5,  alertThreshold: 2 },
      { size: 'L',   color: 'Bleu ciel',    stock: 3,  alertThreshold: 2 },
      { size: 'S',   color: 'Noir',         stock: 7,  alertThreshold: 3 },
      { size: 'M',   color: 'Noir',         stock: 10, alertThreshold: 3 },
      { size: 'L',   color: 'Noir',         stock: 8,  alertThreshold: 3 },
      { size: 'XL',  color: 'Noir',         stock: 5,  alertThreshold: 3 },
      { size: 'XXL', color: 'Noir',         stock: 3,  alertThreshold: 2 },
      { size: 'M',   color: 'Marron',       stock: 4,  alertThreshold: 2 },
      { size: 'L',   color: 'Marron',       stock: 3,  alertThreshold: 2 },
    ],
    images: [
      img('Jilbab Capuche', '2C2C2C'),
      img('Jilbab Kaki', '4A5240'),
      img('Jilbab Marine', '1B2A4A'),
    ],
    isNew: false,
    isActive: true,
    createdAt: monthAgo,
  },

  // ── ENSEMBLE COORDONNÉ (Jersey) ──────────────────────────────────────────────
  {
    id: 'p2',
    name: 'Ensemble Coordonné Froncé',
    description:
      'Ensemble haut + pantalon assorti en Jersey doux. Le haut à col froncé et manches ballon s\'associe avec un pantalon droit confortable. Parfait pour un look modest chic au bureau ou en ville.',
    price: 28000,
    category: 'Abaya classique',
    fabric: 'Jersey',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Violet prune', hex: '#4A1942' },
      { name: 'Rose poudré',  hex: '#E8A0A8' },
      { name: 'Bleu ciel',    hex: '#7CB9E8' },
      { name: 'Terracotta',   hex: '#C4622D' },
      { name: 'Moutarde',     hex: '#C49A22' },
    ],
    variants: [
      { size: 'XS', color: 'Violet prune', stock: 3, alertThreshold: 2 },
      { size: 'S',  color: 'Violet prune', stock: 5, alertThreshold: 2 },
      { size: 'M',  color: 'Violet prune', stock: 7, alertThreshold: 2 },
      { size: 'L',  color: 'Violet prune', stock: 4, alertThreshold: 2 },
      { size: 'XL', color: 'Violet prune', stock: 2, alertThreshold: 2 },
      { size: 'S',  color: 'Rose poudré',  stock: 6, alertThreshold: 2 },
      { size: 'M',  color: 'Rose poudré',  stock: 8, alertThreshold: 2 },
      { size: 'L',  color: 'Rose poudré',  stock: 4, alertThreshold: 2 },
      { size: 'M',  color: 'Bleu ciel',    stock: 5, alertThreshold: 2 },
      { size: 'L',  color: 'Bleu ciel',    stock: 3, alertThreshold: 2 },
      { size: 'S',  color: 'Terracotta',   stock: 4, alertThreshold: 2 },
      { size: 'M',  color: 'Terracotta',   stock: 6, alertThreshold: 2 },
      { size: 'L',  color: 'Terracotta',   stock: 3, alertThreshold: 2 },
      { size: 'M',  color: 'Moutarde',     stock: 4, alertThreshold: 2 },
      { size: 'L',  color: 'Moutarde',     stock: 0, alertThreshold: 2 },
    ],
    images: [
      img('Ensemble Fronce', '4A1942'),
      img('Ensemble Rose', 'E8A0A8', '4A1942'),
      img('Ensemble Terracotta', 'C4622D'),
    ],
    isNew: true,
    isActive: true,
    createdAt: weekAgo,
  },

  // ── KIMONO / VESTE À NOUER (Lin) ─────────────────────────────────────────────
  {
    id: 'p3',
    name: 'Kimono Noué Manches Évasées',
    description:
      'Veste kimono à double nœud frontal en lin léger. Manches évasées façon flare. Se porte ouvert sur un ensemble ou fermé comme une veste légère. Disponible en 4 coloris doux et tendance.',
    price: 18500,
    category: 'Abaya sport',
    fabric: 'Autre',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc ivoire', hex: '#F5F0E8' },
      { name: 'Vert sauge',   hex: '#8FAF8A' },
      { name: 'Jaune pâle',   hex: '#F0E68C' },
      { name: 'Vert menthe',  hex: '#98D4B2' },
    ],
    variants: [
      { size: 'S',  color: 'Blanc ivoire', stock: 5, alertThreshold: 2 },
      { size: 'M',  color: 'Blanc ivoire', stock: 7, alertThreshold: 2 },
      { size: 'L',  color: 'Blanc ivoire', stock: 4, alertThreshold: 2 },
      { size: 'XL', color: 'Blanc ivoire', stock: 2, alertThreshold: 2 },
      { size: 'S',  color: 'Vert sauge',   stock: 6, alertThreshold: 2 },
      { size: 'M',  color: 'Vert sauge',   stock: 8, alertThreshold: 2 },
      { size: 'L',  color: 'Vert sauge',   stock: 5, alertThreshold: 2 },
      { size: 'S',  color: 'Jaune pâle',   stock: 4, alertThreshold: 2 },
      { size: 'M',  color: 'Jaune pâle',   stock: 5, alertThreshold: 2 },
      { size: 'L',  color: 'Jaune pâle',   stock: 3, alertThreshold: 2 },
      { size: 'M',  color: 'Vert menthe',  stock: 4, alertThreshold: 2 },
      { size: 'L',  color: 'Vert menthe',  stock: 3, alertThreshold: 2 },
    ],
    images: [
      img('Kimono Blanc', 'E8E0D0', '3D1A47'),
      img('Kimono Sauge', '8FAF8A', '2C4A2C'),
      img('Kimono Jaune', 'F0E68C', '4A3C00'),
    ],
    isNew: true,
    isActive: true,
    createdAt: weekAgo,
  },

  // ── ABAYA BOUTONNÉE LONGUE (Crepe) ───────────────────────────────────────────
  {
    id: 'p4',
    name: 'Abaya Boutonnée Élégance',
    description:
      'Abaya longue à boutonnage frontal en Crepe structuré. Coupe ajustée en haut, évasée vers le bas. Manches évasées en trompette. Un must-have pour les occasions spéciales comme le quotidien élégant.',
    price: 35000,
    category: 'Abaya de cérémonie',
    fabric: 'Crepe',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Marron chocolat', hex: '#3D2010' },
      { name: 'Beige crème',     hex: '#C4A882' },
    ],
    variants: [
      { size: 'S',  color: 'Marron chocolat', stock: 3, alertThreshold: 2 },
      { size: 'M',  color: 'Marron chocolat', stock: 5, alertThreshold: 2 },
      { size: 'L',  color: 'Marron chocolat', stock: 4, alertThreshold: 2 },
      { size: 'XL', color: 'Marron chocolat', stock: 2, alertThreshold: 2 },
      { size: 'S',  color: 'Beige crème',     stock: 4, alertThreshold: 2 },
      { size: 'M',  color: 'Beige crème',     stock: 6, alertThreshold: 2 },
      { size: 'L',  color: 'Beige crème',     stock: 3, alertThreshold: 2 },
      { size: 'XL', color: 'Beige crème',     stock: 1, alertThreshold: 2 },
    ],
    images: [
      img('Abaya Boutonnee', '3D2010'),
      img('Abaya Creme', 'C4A882', '3D2010'),
    ],
    isNew: true,
    isActive: true,
    createdAt: weekAgo,
  },

  // ── JILBAB CÉRÉMONIE SOIE DE MÉDINE ──────────────────────────────────────────
  {
    id: 'p5',
    name: 'Jilbab Cérémonie Soie de Médine',
    description:
      'Jilbab de cérémonie en Soie de Médine premium, tissu fluide et légèrement brillant. Capuche intégrée structurée. Idéal pour les mariages, fêtes et occasions religieuses. Tombé impeccable.',
    price: 38000,
    category: 'Abaya de cérémonie',
    fabric: 'Soie de Medine',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir',         hex: '#1A1A1A' },
      { name: 'Bleu marine',  hex: '#1B2A4A' },
      { name: 'Bleu ciel',    hex: '#7CB9E8' },
      { name: 'Gris ardoise', hex: '#6B7280' },
      { name: 'Marron',       hex: '#5C3A21' },
    ],
    variants: [
      { size: 'S',   color: 'Noir',         stock: 4, alertThreshold: 2 },
      { size: 'M',   color: 'Noir',         stock: 6, alertThreshold: 2 },
      { size: 'L',   color: 'Noir',         stock: 4, alertThreshold: 2 },
      { size: 'XL',  color: 'Noir',         stock: 2, alertThreshold: 1 },
      { size: 'XXL', color: 'Noir',         stock: 1, alertThreshold: 1 },
      { size: 'M',   color: 'Bleu marine',  stock: 4, alertThreshold: 2 },
      { size: 'L',   color: 'Bleu marine',  stock: 3, alertThreshold: 2 },
      { size: 'M',   color: 'Bleu ciel',    stock: 3, alertThreshold: 2 },
      { size: 'L',   color: 'Bleu ciel',    stock: 2, alertThreshold: 2 },
      { size: 'M',   color: 'Gris ardoise', stock: 3, alertThreshold: 2 },
      { size: 'M',   color: 'Marron',       stock: 2, alertThreshold: 2 },
      { size: 'L',   color: 'Marron',       stock: 0, alertThreshold: 2 },
    ],
    images: [
      img('Jilbab Ceremonie', '1A1A1A'),
      img('Jilbab Marine', '1B2A4A'),
    ],
    isNew: false,
    isActive: true,
    createdAt: monthAgo,
  },

  // ── KHIMAR NIDA ───────────────────────────────────────────────────────────────
  {
    id: 'p6',
    name: 'Khimar Nida Premium',
    description:
      'Khimar long en Nida premium, coupe généreuse et couvrante. Élastique discret à l\'intérieur pour maintien optimal. Tissu opaque et respirant, parfait pour la chaleur de Dakar. Un essentiel.',
    price: 14000,
    category: 'Khimar',
    fabric: 'Nida',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Noir',       hex: '#1A1A1A' },
      { name: 'Blanc cassé',hex: '#F0EDE5' },
      { name: 'Beige',      hex: '#C4A882' },
      { name: 'Gris',       hex: '#6B7280' },
    ],
    variants: [
      { size: 'S', color: 'Noir',        stock: 10, alertThreshold: 3 },
      { size: 'M', color: 'Noir',        stock: 14, alertThreshold: 3 },
      { size: 'L', color: 'Noir',        stock: 9,  alertThreshold: 3 },
      { size: 'S', color: 'Blanc cassé', stock: 6,  alertThreshold: 3 },
      { size: 'M', color: 'Blanc cassé', stock: 8,  alertThreshold: 3 },
      { size: 'L', color: 'Blanc cassé', stock: 0,  alertThreshold: 3 },
      { size: 'M', color: 'Beige',       stock: 5,  alertThreshold: 2 },
      { size: 'L', color: 'Beige',       stock: 3,  alertThreshold: 2 },
      { size: 'M', color: 'Gris',        stock: 4,  alertThreshold: 2 },
    ],
    images: [
      img('Khimar Nida', '1A1A1A'),
      img('Khimar Blanc', 'F0EDE5', '3D1A47'),
    ],
    isNew: false,
    isActive: true,
    createdAt: monthAgo,
  },

  // ── ABAYA OUVERTE SOIE DE MÉDINE ─────────────────────────────────────────────
  {
    id: 'p7',
    name: 'Abaya Ouverte Soie de Médine',
    description:
      'Abaya ouverte en Soie de Médine à porter en chasuble sur une tenue. Manches larges, tombé soyeux. Bouton unique ou libre selon les coloris. Élégance sans effort pour toutes les occasions.',
    price: 32000,
    category: 'Abaya classique',
    fabric: 'Soie de Medine',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir',         hex: '#1A1A1A' },
      { name: 'Bleu marine',  hex: '#1B2A4A' },
      { name: 'Gris ardoise', hex: '#6B7280' },
      { name: 'Marron',       hex: '#5C3A21' },
    ],
    variants: [
      { size: 'S',  color: 'Noir',         stock: 5,  alertThreshold: 2 },
      { size: 'M',  color: 'Noir',         stock: 8,  alertThreshold: 2 },
      { size: 'L',  color: 'Noir',         stock: 6,  alertThreshold: 2 },
      { size: 'XL', color: 'Noir',         stock: 3,  alertThreshold: 2 },
      { size: 'M',  color: 'Bleu marine',  stock: 5,  alertThreshold: 2 },
      { size: 'L',  color: 'Bleu marine',  stock: 4,  alertThreshold: 2 },
      { size: 'M',  color: 'Gris ardoise', stock: 3,  alertThreshold: 2 },
      { size: 'L',  color: 'Gris ardoise', stock: 2,  alertThreshold: 2 },
      { size: 'M',  color: 'Marron',       stock: 4,  alertThreshold: 2 },
      { size: 'L',  color: 'Marron',       stock: 2,  alertThreshold: 2 },
    ],
    images: [
      img('Abaya Ouverte', '1A1A1A'),
      img('Abaya Marine', '1B2A4A'),
    ],
    isNew: true,
    isActive: true,
    createdAt: weekAgo,
  },

  // ── ENSEMBLE SPORT JERSEY ─────────────────────────────────────────────────────
  {
    id: 'p8',
    name: 'Ensemble Décontracté Sport',
    description:
      'Ensemble sport haut ample + pantalon large en Jersey premium stretch. Idéal pour le quotidien actif. Matière confortable et respirante, coupe modeste et moderne.',
    price: 24000,
    category: 'Abaya sport',
    fabric: 'Jersey',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir', hex: '#1A1A1A' },
      { name: 'Gris', hex: '#6B7280' },
      { name: 'Kaki', hex: '#4A5240' },
    ],
    variants: [
      { size: 'XS', color: 'Noir', stock: 4,  alertThreshold: 2 },
      { size: 'S',  color: 'Noir', stock: 7,  alertThreshold: 2 },
      { size: 'M',  color: 'Noir', stock: 10, alertThreshold: 3 },
      { size: 'L',  color: 'Noir', stock: 8,  alertThreshold: 3 },
      { size: 'XL', color: 'Noir', stock: 5,  alertThreshold: 2 },
      { size: 'XXL',color: 'Noir', stock: 2,  alertThreshold: 2 },
      { size: 'S',  color: 'Gris', stock: 5,  alertThreshold: 2 },
      { size: 'M',  color: 'Gris', stock: 7,  alertThreshold: 2 },
      { size: 'L',  color: 'Gris', stock: 4,  alertThreshold: 2 },
      { size: 'M',  color: 'Kaki', stock: 4,  alertThreshold: 2 },
      { size: 'L',  color: 'Kaki', stock: 3,  alertThreshold: 2 },
    ],
    images: [
      img('Ensemble Sport', '2C2C2C'),
      img('Ensemble Gris', '6B7280'),
    ],
    isNew: false,
    isActive: true,
    createdAt: monthAgo,
  },
];