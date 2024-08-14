CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_prenom TEXT NOT NULL,
    telephone TEXT,
    email TEXT
);

CREATE TABLE adresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    adresse TEXT NOT NULL,
    ville TEXT NOT NULL,
    code_postal TEXT NOT NULL
);

CREATE TABLE clients_adresses (
    client_id INTEGER NOT NULL,
    adresse_id INTEGER NOT NULL,
    PRIMARY KEY (client_id, adresse_id),
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (adresse_id) REFERENCES adresses(id) ON DELETE CASCADE
);

CREATE TABLE produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    prix_unitaire REAL NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Produit', 'Service'))
);

CREATE TABLE devis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_devis TEXT NOT NULL,
    date_creation DATE NOT NULL,
    client_id INTEGER NOT NULL,
    montant_total REAL NOT NULL,
    statut TEXT NOT NULL CHECK(statut IN ('En attente', 'Accepté', 'Refusé')),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE factures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_facture TEXT NOT NULL,
    date_creation DATE NOT NULL,
    client_id INTEGER NOT NULL,
    devis_id INTEGER,
    montant_total REAL NOT NULL,
    statut TEXT NOT NULL CHECK(statut IN ('En attente', 'Payée', 'Annulée')),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (devis_id) REFERENCES devis(id)
);

CREATE TABLE lignes_devis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    devis_id INTEGER NOT NULL,
    produit_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    prix_unitaire REAL NOT NULL,
    montant_ligne REAL NOT NULL,
    FOREIGN KEY (devis_id) REFERENCES devis(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);

CREATE TABLE lignes_facture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    facture_id INTEGER NOT NULL,
    produit_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    prix_unitaire REAL NOT NULL,
    montant_ligne REAL NOT NULL,
    FOREIGN KEY (facture_id) REFERENCES factures(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);
