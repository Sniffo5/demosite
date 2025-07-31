# Slutprojekt

---
## Länk till hemsida : https://d6e03acb-a693-42a7-9edb-785038e3f380-00-1hm1ualdzl9qt.picard.replit.dev/

---


### Html- länk: https://replit.com/@Shrimpmatser/Slutprojekt#index.html

---

# HTMX

I mitt projektanvände jag mig av htmx för att kunna bygga upp hemsidan i "komponenter". Detta är för att enklare kunna bearbeta varje individuell del samt möjligheten att återanvända vissa delar. i stälelt för att bygga hela hemsidan på en gång kunde jag fokusera på en individuell komponent i taget. Detta tankesätt förstärkte jag även med hjälp av css-partials men mer om det senare.

### htmx komponenter länk: https://replit.com/@Shrimpmatser/Slutprojekt#components

### index.html länk: https://replit.com/@Shrimpmatser/Slutprojekt#index.html

I index.html så finner vi alla htmx referenser. vi startar dokumentet precis som en vanlig html fil men snabbt ser vi skillnaderna.

---
```html
<div id="header" 
  hx-get="components/header.html"
  hx-trigger = "load"
  hx-target = "#header"
  hx-swap = "outerHTML"
></div>
```
Här ovan ser du en typisk htmx referens jag använder. I denna referencen bestämmer jag exakt hur jag ska använda htmx. Vi skapar en div och ger den några specifika htmx attribut. hx-get bestämmer vilken vil vi ska hämta och varifrån, i detta fallet så ska vi gå in i mappen components och hämta html filen header.html. Hx-trigger bestämemr sedan när vi ska göra något med den filen vi har hämtat, i detta fallet har hx-trigger värdet load vilket inebär att all htmx kommer köras så fort denna div laddas in på hemsidan. hx-target berättar vilken eller vilka element som vi ska påverka med htmx. hx-swap berättar sedan var vi ska stoppa in html filen vi hämtade. i detta fall har den värdet outerHTML vilket inebär att den kommer skriva över elementet med id:t header och istället skriva då html:t från header.html på dess plats. det kommer altås inte finnas något tecken kvar av htmx referensen efter att den har laddats in i hemsidan's kod. Alla dessa olika atribut och många andra bestänmmer hur, var och när jag ska använda htmx. Det finns över 100 olika attribut man kan använda med htmx vilket ger oändligt med möjligheter för vad man kan använda fackverket till. Den fördelen från htmx jag använder mig mest av här ar då komponentstänket , hur jag delar upp hemsidan i mindre delar vilket görs väldigt enkelt med htmx.

---

Kompnenttänket förstärks av att vi använder css-partials i projektet. Detta gör så att vi kan dela upp css filen i fler filer. Istället för en stor css fil kan vi då har flera mindre. Detta gör vi med att importera de mindre filerna till den "stora" med @import och värdet av positionen av css filen vi vi importera.
```css
@import "cssPartials/header.css";
```

---

## JS

```js
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot");
let active = 0;
let timer;

function slideshow() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  if (active >= slides.length) {
    active = 0;
  }

  slides[active].style.display = "block";
  dots[active].classList.add("active");

  active++;

  timer = setTimeout(slideshow, 5000);
}

function showSlide(activeSpecific) {
  clearTimeout(timer);
  active = activeSpecific;
  slideshow();
}

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function() {
    showSlide(i);
  });
}

slideshow();
```

jag använder mig av ett script för att mitt bildspel ska byta bild var femte sekund. Scriptet är ubbygt så att det spelar ingen roll hur många bilder du lägger till, den kommer fungera oavsett.

  
```js
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot");
let active = 0;
let timer;
```

Jag börjar med att deffinera lite olika variabler. Slides kommer att här bli en array fylld av de olika bilderna i bildspelet. Jag gör det till en array med hjälp av `getElementsByClassName()` skillnaden mellan den och `querySelectorAll()` är att getElements är dynamisk medands querySelector är statisk. Det har ingen påverkan på denna hemsidan men hade spelat stor roll i en hemsida med mycket dynamiskt innehåll. Jag gör samam typ av array för prickarna under bildspelet och sätter active till 0. Detta är för att den ska visa den första bilden i bildspelet alltså på position 0 i arrayen.

```js
function slideshow() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  if (active >= slides.length) {
    active = 0;
  }

  slides[active].style.display = "block";
  dots[active].classList.add("active");

  active++;

  timer = setTimeout(slideshow, 5000);
}
```
Vi skapar funktionen `slideshow()`. vi börjar med en for loop där vi gå igenom alla bilder ibildspelet och döljer dem, vi gör liknande för prickarna då vi tar bort klassen active så de inte lyser upp i rosa som den aktiva bildens prick ska göra. Därefter har vi en if-sats där vi säger att ifall den aktiva bilden blir större än antal bilder vi har, alltså att värdet överstiger arrayns sista bild's position i fältet. Då Skickar vi tillbaka den aktiva till den första i fältet. Därefter "aktiverar" vi den bild som ska visas och dess respektive prick, vi skiftar display från värdet none till block för att den ska visas och lägger till klassen active på den aktiva pricken så den får rosa färg. Därefter ökar vi värdet på active så att nästa bild kommer visas när funktionen körs igen. därefter sätter vi en timer på 5000 ms så att funktionen körs igen när den timern tar slut.

```js
function showSlide(activeSpecific) {
  clearTimeout(timer);
  active = activeSpecific;
  slideshow();
}

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function() {
    showSlide(i);
  });
}

slideshow();
```
Skriptet för galleriet har två till funktioner. Den första är för att visa en specifik bild , den är till för att ifall man skickar in en siffra i funktionen så kommer bilden och punkten med den siffran i fältet at visas upp. Vi börjar först med att "tömma" timern och därefter ger vi active värdet av den siffra som skickades in i funktionen. därefter kallar vi på funktionen slideshow så att skriptet kan fortsätta igen och visa bilden vi bestämde.
Därefter har vi en for loop som lägger till en eventlistner på varje individuell punkt i dots fältet. Vid en clickning på en punkt som kommer den då köra en funktion som kör `showSlide()` med i inskickat som siffran. i representerar den position på fältet som punkten befinner sig i så att den punkten får rosa färg och bilden byts till den som har samma siffervärde som punkten.

```css
@keyframes fade {
  0% {
    transform: scale(1.5);
    filter: blur(2px);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
}

.dot{
  transition: background-color 0.6s ease;
}
```

Jag använder två olika sorters animeringar för övergångerna mellan bilderna respektiva punkterna. för bilderna anvädner vi oss av keyframes  för att kunna redigera animationen nogrannare och har mer möjligheter. Vi bestämmer att i början av animationen så ska bilden bli 50% större och det ska appliceras ett suddigt filter på bilden samt att den har ingen opacitet. Detta är för att vid slutet av animationen vi ska kunna återstälal dessa värden till dess orginal värden och får en animation där bilden zommas ut och bli snyggt öveergång mellan bilderna. Medans punkterna har enbart en transition där vid ändrign av bakgrunds färgern så görs det över 0.6 sekunder.