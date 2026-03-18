

# Noor — Plan de mise à jour avec les 3 ajouts

Le projet n'a pas encore été implémenté (seul le scaffold par défaut existe). Le plan initial reste valide, avec ces 3 ajouts intégrés :

---

## Ajout 1 : Composant d'upload image avec preview + base64/localStorage

**Fichier** : `src/components/admin/ImageUpload.tsx`

- Composant réutilisable acceptant jusqu'à 4 images
- Input file avec drag-and-drop, preview des images sélectionnées
- Conversion en base64 via `FileReader.readAsDataURL()`
- Stockage dans localStorage comme partie des données produit (champ `images: string[]` contenant les data URLs)
- Bouton supprimer par image, drag-to-reorder via état local
- Interface prop : `value: string[], onChange: (images: string[]) => void`
- Prêt pour migration Supabase : il suffira de remplacer la logique interne par un upload vers Supabase Storage et stocker l'URL publique au lieu du base64

Utilisé dans le formulaire d'ajout/édition produit (`/admin/produits`).

---

## Ajout 2 : Fonction `formatWhatsApp(phone)`

**Fichier** : `src/lib/utils.ts`

```ts
export function formatWhatsApp(phone: string): string {
  // Retire espaces, tirets, parenthèses, points
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Si commence par +221, retirer le +
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  // Si commence par 00221, retirer les 00
  if (cleaned.startsWith('00221')) cleaned = cleaned.slice(2);
  // Si le numéro ne commence pas par 221, l'ajouter
  if (!cleaned.startsWith('221')) cleaned = '221' + cleaned;
  return `https://wa.me/${cleaned}`;
}
```

Utilisée partout dans l'admin pour les liens WhatsApp (tableau commandes, détail commande, etc.).

---

## Ajout 3 : Messages WhatsApp pré-remplis par statut

**Fichier** : `src/lib/whatsapp-messages.ts`

Fonction `getWhatsAppMessage(action, order)` qui retourne un message français adapté :

| Action admin | Message pré-rempli |
|---|---|
| Confirmer paiement | "Bonjour [Prénom], votre commande [REF] a bien été reçue et votre paiement confirmé. Votre abaya est en cours de préparation. Merci de votre confiance ! - Boutique Noor" |
| Marquer expédiée | "Bonjour [Prénom], votre commande [REF] est en route ! Vous serez contacté(e) pour la livraison. Merci ! - Boutique Noor" |
| Annuler | "Bonjour [Prénom], votre commande [REF] a été annulée. N'hésitez pas à nous contacter pour toute question. - Boutique Noor" |

Le lien final combine `formatWhatsApp(phone)` + `?text=` + `encodeURIComponent(message)`.

Chaque bouton d'action dans le tableau des commandes et le drawer de détail commande aura un bouton WhatsApp associé qui ouvre le lien correspondant.

---

## Résumé de l'intégration dans le plan global

Ces 3 éléments s'intègrent naturellement :
1. **ImageUpload** → utilisé dans Phase 3 "Gestion des Produits"
2. **formatWhatsApp** → utilisé dans Phase 3 "Gestion des Commandes" (liens téléphone + boutons WhatsApp)
3. **Messages pré-remplis** → utilisé dans Phase 3 "Gestion des Commandes" (actions dropdown + drawer détail)

Le reste du plan initial (Phases 1–4) reste inchangé.

