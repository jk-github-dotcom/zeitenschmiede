export type Post = {
  id: string; // globally unique over all categories
  title: string;
  description: string; // short text for previews
  date: string; // ISO date string
  image: string; // filename or URL
  content: string; // markdown content
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string; // filename or URL
  posts: Post[];
};

export const categories: Category[] = [
  {
    id: "smartphones_and_socialmedia",
    name: "Smartphones & Social Media",
    image: "/images/blog/categories/smartphones_and_socialmedia.160x160.jpg",
	description: "The impact of smartphones and social media on our mental health",
    posts: [
      {
        id: "smartphones-01",
        title: "Generatie Angststoornis",
        description: "De opkomst van sociale media en hun invloed op de gezondheid van generatie Z.",
        date: "2025-07-15",
        image: "/images/blog/posts/smartphones_and_socialmedia/theanxiousgeneration.jpg",
        content: `
"Generatie Angststoornis" is de titel van een boek van Jonathan Haidt waarin hij onderzoekt hoe de opkomst van sociale media in combinatie met smartphones rond 2010 leidde tot een epidemie van psychische aandoeningen bij kinderen en jongeren, zoals depressie, angst, slaapstoornissen, automutilatie en gefragmenteerde opmerkzaamheid.

Jonathan David Haidt is een Amerikaans sociaal psycholoog en auteur. Hij is hoogleraar aan de New York University Stern School of Business. Zijn belangrijkste onderzoeksgebieden zijn de psychologie van moraliteit en morele emoties.

Wat ik waardeer aan het boek is dat het uitgaat van de ontwikkelingsstadia en behoeften van kinderen en adolescenten en laat zien hoe sociale media dit proces kapen om kinderen en adolescenten op hun platformen te houden en verslaafd te maken.

Dus terwijl aan de ene kant de neiging bestaat om kinderen en jongeren in de echte wereld te veel te beschermen, worden ze in de digitale wereld overgelaten aan oncontroleerbare invloeden.

Kinderen en jongeren bevinden zich in een situatie waarin ze onder de invloedsfeer van de digitale wereld met hun filters en geënsceneerde influencers niet in staat zijn om bij te benen in de echte wereld. Dit leidt bijna onvermijdelijk tot de hierboven beschreven psychische aandoeningen.

Het is een gigantisch experiment op een hele generatie.

Het boek ziet zichzelf als het startpunt voor een initiatief om deze ontwikkeling een halt toe te roepen en om te keren. De centrale aanbevelingen zijn

- Geen smartphones voor 14 jaar

- Geen sociale media accounts tot 16

- Telefoonvrije scholen

- Veel meer onafhankelijkheid, vrij spel en verantwoordelijkheid in de echte wereld

Bij het boek hoort de website [anxiousgeneration.com](https://www.anxiousgeneration.com/), waarop het boek door Jonathan Haidt en zijn team voortdurend wordt bijgewerkt en geactualiseerd en initiatieven worden gebundeld die van de beschreven aanbevelingen een maatschappelijk initiatief maken.

Jonathan Haidt onderhoudt ook het substack [After Babel](https://www.afterbabel.com/), waarop ook studies en artikelen over dit onderwerp worden gepubliceerd.


        `,
      },
      {
        id: "smartphones-02",
        title: "We verliezen onze kinderen",
        description: "Pleidooi voor een jeugd zonder de bedreigingen van sociale media",
        date: "2025-08-01",
        image: "/images/blog/posts/smartphones_and_socialmedia/wir_verlieren_unsere_kinder.160x160.jpg",
        content: `
### De invloed van smartphones en sociale media op onze geestelijke gezondheid
In het debatboek ["Wir verlieren unsere Kinder"](https://silkemueller.com/bucher/) legt de Duitse schooldirectrice, digitaal ambassadeur en keynote spreker voor digitale ethiek [Silke Müller](https://silkemueller.com/) uit aan welke digitale bedreigingen kinderen worden blootgesteld wanneer ze toegang hebben tot smartphones. Ze roept ouders, leerkrachten en politici op om niet langer de andere kant op te kijken en eindelijk de basis te leggen voor een eigentijdse, waardengerichte mediaopvoeding.

Niet alleen de duur van het gebruik van digitale media is het probleem, maar de inhoud die kinderen consumeren. Zelfs kinderen op de basisschool worden blootgesteld aan beelden van geweld, pornografie en racisme.

“Weet u wat uw kind op zijn smartphone ziet?” Silke Müller stelt deze vraag aan nietsvermoedende ouders tijdens informatiebijeenkomsten op haar school. De foto's, stickers en video's die ze vervolgens laat zien, zijn zo verontrustend dat bijna niemand ernaar kan kijken.

De meeste ouders gaan ervan uit dat mediaopvoeding betekent dat de schermtijd wordt beperkt - en hebben geen idee dat kinderen nu al beelden te zien krijgen van beestachtige wreedheden tegen dieren, oorlogsmisdaden en seksueel geweld. Verzonden in de klassenchat. Met dramatische gevolgen voor hun psyche.

De aanzet tot een debat dat al lang gevoerd had moeten worden. Met waardevolle informatie en praktische tips over de technische en educatieve hulpmiddelen die we kunnen gebruiken om onze kinderen te beschermen.

Dit interview in de lezingenreeks [“Wiener Stadtgespräch”](https://www.youtube.com/watch?v=ncKvz_cTKy0), dat ze in Wenen gaf op uitnodiging van de Oostenrijkse Kamer van Arbeid, geeft een goed inzicht in haar werk en haar boeken.

Meer gedetailleerde informatie over Silke Müller vind je op haar website [Silke Müller](https://silkemueller.com/).
        `,
      },
    ],
  },
  {
    id: "personal_growth",
    name: "Personal Growth",
    image: "/images/blog/categories/personal_growth.160x160.jpg",
	description: "What is personal growth and why it matters",
    posts: [
      {
        id: "growth-01",
        title: "Morning Routines",
        description: "How a morning routine can change your productivity.",
        date: "2025-06-20",
        image: "/images/blog/posts/personal_growth/dandelion.160x160.jpg",
        content: `
### Best Practice

A consistent morning routine boosts **productivity** and improves mental focus.

Try:

- Waking up early ☀️
- Meditation 🧘
- Journaling ✍️
        `,
      },
      {
        id: "growth-02",
        title: "Lifelong Learning",
        description: "Why learning should never stop.",
        date: "2025-06-10",
        image: "/images/blog/posts/personal_growth/JoinLifeNotSocialMedia.160x160.jpg",
        content: `
### Keep on running

Learning never stops. Read books, take courses, and keep your **curiosity alive**.

        `,
      },
    ],
  },
];
