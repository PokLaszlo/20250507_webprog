# Fejlesztői dokumentáció

## A fejlesztéshez használt eszközök

Az alkalmazás egy Node.js projektként fejlesztett webes felűlet. 
Fejlesztői szervernek a BrowserSync-t használtuk, a VSCode kódszerkesztő mellett.

## Könyvtárszerkezet

A web könyvtáron belül az src tartalmazza a forráskódot, itt futtatható.
Az alkalmazáshoz egyetlen HTML és egy JavaScript fájl tartozik.
A style.css jelenleg nincs használatban.

## Stílus

A stílus meghatározásához Bootstrap 5.3.3 keretrendszert használunk.
Párbeszédablakként a Bootstrap beépített modális ablakát használjuk. Ugyanazt az ablakot használjuk hozzáadáshoz és szerkesztés funkciókhoz is.

## JavaScript

A weblap egyes részeit id segítségével kötjuk az app.js fájlban egy változóhoz.
Az url változó tartalmazza a Backend elérési útját. 
Az addMode változó egy logikai változó. Hozzáadás esetén értéke true, szerkesztés esetén false.
Két eseménykezelőt használunk. Az egyik a hozzáadásgombra kattintva indul el, a másik a modális ablak mentés gombjára kattintva

### A getEmployees függvény

Lekéri a dolgozókat a Backend-től és elindítja renderelést

### A renderTbody függvény

A renderTbody fgv. jeleníti meg a dolgozókat a webes felületen. A megjelenítéshez table elemet használunk.
Paraméterként fogadja a megjelenítendő listát:
```javascript
renderTbody(emplist)
```

### A clearField függvény

A clearFields fgv. törli a modális ablak bevitelimezőit.

### Az addEmployee függvény

Az addEmployee fgv. a Backend számára elköldi az új dolgozó adatait POST metódussal.
A dolgozó adatait paraméterként fogadja.
```javascript
addEmployee(emp)
```

### A deleteEmployee függvény

A deleteEmployee fgv. Delete metódussal elküldi a törlendő dolgozó azonosítóját. Az id az URL-ben kerül átküldésre, például:
```url
/api/employees/2
```
A fgv. paraméterként várja a törlendő dolgozó azonosítóját:
```javascript
deleteEmployee(id)
```

### Az editEmployee függvény

Az editEmployee fgv. beállítja a modális ablak tartalmát szerkesztéshez.


### Az updateEmployee függvény

Az updateEmployee fgv. elküldi a Backend szervernek a módosítást, PUT metódussal. A módosítandó dolgozó azonosítóját az URL-ben küldjük, pl: 
```url
/api/employees/45
```
Az updateEmployee fgv. paraméterként várja a dolgozó módosított adatait:
```javascript
updateEmployee(emp)
```