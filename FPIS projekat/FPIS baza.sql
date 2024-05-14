BEGIN TRAN

CREATE TABLE Gost
(
GostID INT IDENTITY(1,1) PRIMARY KEY,
Ime NVARCHAR(30),
Prezime NVARCHAR(30),
Email NVARCHAR(MAX)
)

CREATE TABLE Soba
(
SobaID INT IDENTITY(1,1) PRIMARY KEY,
CenaPoNoci MONEY,
Opis NVARCHAR(MAX),
Naziv NVARCHAR(Max),
Kapacitet INT
)

CREATE TABLE Rezervacija
(
RezervacijaID INT IDENTITY(1,1) PRIMARY KEY,
Token NVARCHAR(MAX),
StatusRezervacije BIT,
GostID INT,
FOREIGN KEY (GostID) REFERENCES Gost(GostID)
)

CREATE TABLE DetaljiRezervacije
(
DetaljiRezervacijeID INT,
RezervacijaID INT,
DatumOd DATE,
DatumDo DATE,
CenaRezervacije MONEY,
SobaID INT,
CONSTRAINT PK_DetaljiRezervacije PRIMARY KEY (RezervacijaID, DetaljiRezervacijeID),
FOREIGN KEY (SobaID) REFERENCES Soba(SobaID)
)

CREATE TABLE PromoKod
(
PromoKodID INT IDENTITY(1,1) PRIMARY KEY,
Promo_kod NVARCHAR(MAX),
StatusPromoKod BIT,
Popust DECIMAL,
DetaljiRezervacijeID INT,
RezervacijaID INT,
FOREIGN KEY (RezervacijaID, DetaljiRezervacijeID) REFERENCES DetaljiRezervacije (RezervacijaID ,DetaljiRezervacijeID)
)

ROLLBACK TRAN