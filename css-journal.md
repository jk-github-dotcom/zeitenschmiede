# 🎨 CSS Learning Journal

## 🗓️ Date: 2025-08-26

### 🔹 Step 1 Typography & Spacing

### 🔹  Why
👉 Typography is the foundation of design.

### 🔹 Goal
_What am I trying to improve or learn?
- Make your content easier to read._  
- Experiment with fonts, font-sizes and line-heights (line-height is a multiple of font-size) 

### 🔹 Experiments
- [X] Changed `line-height` from `1.8` → `1.6`
- [X] Experiment with post title `font-size`
- [X] Tried `text-transform: uppercase` on headings
- [X] Change the font of titles (h2, h3) to a non-serif and see how it feels compared to serif
- [X] Add `letter-spacing: 0.5px` to links and headings → does it feel clearer?

### 🔹 Observations
- Current `line-height: 1.8;` looks much more readable  
- The post title in PostPage should follow the general title hierachy measures and not overrule them
I change this in my stylesheet
- `text-transform: uppercase` titles look too “shouty” → I’ll revert
- I like `font-family: 'Roboto', sans-serif;` for the text and `font-family: 'Merriweather', serif;` for the headings
- `letter-spacing` I want to keep the post typography & spacing in line with the overal typography & spacing   

### 🔹 Result
✅ Kept changes: `line-height: 1.8;`, take out `font-size: 2rem` for `.post-header h2`
❌ Reverted: `text-transform: uppercase`, `letter-spacing: 0.5px`, `font-family: '', ...`

### 🔹 Next Step
_What I want to try in my next session_  
Move to Step 2: Cards (Flexbox)

## 🗓️ Date: 2025-08-27

### 🔹 Step 2: Cards (Flexbox)

### 🔹 Goal
_What am I trying to improve or learn?_
- Get comfortable with flexbox layouts 
- Find out how cards can be styled, learn about Flexbox Practice

### 🔹 Why 
 👉 Cards are your blog’s building blocks
 
### 🔹 Experiments
- [X] Make the card image always square (160px x 160px) regardless of original proportions
- [X] On hover, make the card grow slightly bigger (`transform: scale(1.02)`).
- [X] On hover, add a subtle shadow color (e.g. `box-shadow: 0 4px 12px rgba(198,40,40,0.3)`).
- [X] Try changing `align-items: flex-start` to center — see how text aligns.
- [ ] Change card gap/margins → how does it affect breathing space?

### 🔹 Observations

- `.card-horizontal img { height: 160px; }` Mars Rover image is higher than wide and will make card higher. So this is a good solution.
- `.card-horizontal:hover { transform: translateY(-2px); }` is more subtle than `transform: scale(1.02);`
- `.card-horizontal:hover { box-shadow: 0 4px 12px rgba(198,40,40,0.3); }` too much
- `.card-horizontal { align-items: center; }` align-items determines the vertical alignment of the flex items: arranges div container centered in respect to the image (feels artifical)
- `.card-horizontal { margin-bottom: 1.5rem; }` gives space for the cards themselves
- `.card-horizontal { column-gap: 1rem; }` provides space between the items, in this stylesheet solved by `.card-info { padding: 1rem; }`
- `.card-info { flex: 1; }` gives horizontal space to the card-info box
- `.card-horizontal img { margin-top: 0.3rem; }` gives some space for the image
}

### 🔹 Result
✅ Kept changes: card image `height: 160px;`, 
❌ Reverted: `transform: scale(1.02)`, `box-shadow: 0 4px 12px rgba(198,40,40,0.3);`, `align-items: center;`, `.card-horizontal { column-gap: 1rem; }`, `.card-horizontal { margin-bottom: 2rem; }`

### 🔹 Next Step
_What I want to try in my next session_  
Move to Step 3:  Sidebar & Navigation

## 🗓️ Date: 2025-08-28

### 🔹 Step 3:  Sidebar & Navigation

### 🔹 Goal
_What am I trying to improve or learn?_  
- Make navigation intuitive
- Find out how sidebar and navigation works

### 🔹 Why 
 👉 Sidebar guides the reader, practice interactivity + responsive control.
 
### 🔹 Experiments
- [X] `.blog-sidebar li a:hover {background: #fbe9e7; }` Add hover effect to sidebar links.
- [X] Add a hover effect to category links (color: #a61b1b; background: #fbe9e7;).
- [X] Make active category background different (light red)
- [X] On mobile, try hiding the sidebar (display: none;) and compare.
- [X] Bonus: Reorder sidebar on mobile (order: -1;) so it appears above posts.

### 🔹 Observations

- `.blog-sidebar li a:hover {background: #fbe9e7; }` too much
- This request is more difficult and would add more complexity to Sidebar.tsx and styles.CSS
At the moment hover is a sub-selector within selector .blog-sidebar and thus cannot differentiate between the two sections. 
We would need two classes sidebar-section-posts and sidebar-section-categories in Sidebar.tsx
and would have a hover sub-selector `... li a:hover {}` within both of the new associated selectors.
I also realized that (keeping the things as they are ) I would assign the sub-selectors h3, ul, ... to sidebar-section and not to its parent blog-sidebar.
- `.blog-sidebar li.active-category a { background-color: #FFCCCB; }` too much
- `@media (max-width: 768px) { .blog-sidebar { display: none; }}` test with DevTools clicking the Toggle Device Toolbar button 
- `@media (max-width: 768px) { .blog-sidebar { order: -1; }}`

### 🔹 Result
✅ Kept changes: 
❌ Reverted: `.blog-sidebar li a:hover {background: #fbe9e7; }`, keep `.blog-sidebar li a:hover {}` as it is, `.blog-sidebar li.active-category a { background-color: #FFCCCB; }`, `@media (max-width: 768px) { .blog-sidebar { display: none; }}`, `@media (max-width: 768px) { .blog-sidebar { order: -1; }}`

### 🔹 Next Step
_What I want to try in my next session_  
Move to Step 4: Layout (Grid)

## 🗓️ Date: 2025-08-29

### 🔹 Step 4: Layout (Grid)

### 🔹 Goal
_What am I trying to improve or learn?_  
- Goal: Control proportions and page structure.

### 🔹 Why 
👉 Why: You’ll see how layout tweaks affect balance on desktop.
 
### 🔹 Experiments
- [X] Change blog layout grid from 3fr 1fr → 2fr 1fr.
- [X] Add max-width: 1200px; margin: 0 auto; to center the site on wide screens.
- [X] Increase/decrease gap between main + sidebar (1rem → 3rem).

### 🔹 Observations
- `.blog-layout { display: grid; grid-template-columns: 2fr 1fr; } /* main (2/3) + sidebar (1/3) */` sidebar is not recognizable as navigation bar anymore
- `@media (max-width: 1200) {
	.blog-layout {
    margin: 2rem auto 0;	/* top margin 2rem, left and right are auto so container gets centered*/
  }
}` good idea
- `.blog-layout { display: grid;  gap: 23rem; }` sidebar "looses" conatct to main

### 🔹 Result
✅ Kept changes: `@media (max-width: 1200) {
	.blog-layout {
    margin: 2rem auto 0;	/* top margin 2rem, left and right are auto so container gets centered*/
  }
}`
❌ Reverted: `.blog-layout { display: grid; grid-template-columns: 2fr 1fr; }`, `.blog-layout { display: grid;  gap: 23rem; }`

### 🔹 Next Step
_What I want to try in my next session_  
Move to Step 5: Responsive Design

## 🗓️ Date: 2025-08-30

### 🔹 Step 5: Responsive Design

### 🔹 Goal
_What am I trying to improve or learn?_  
- Goal: Optimize for mobile

### 🔹 Why 
👉 Why: Mobile-first design = good UX
 
### 🔹 Experiments
- [X] On mobile, make cards stack (flex-direction: column)
- [X] On mobile, hide the sidebar completely (display: none;) and see how much cleaner it looks.
- [X] Make card images full width on mobile (width: 100%;).
- [X] On very large screens (min-width: 1400px), try bigger images (200px)

### 🔹 Observations
- `@media (max-width: 768px) {
  .card-horizontal {
    flex-direction: column;
  }
  .card-horizontal img {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0; 
  }
}` already in place.
Stacking works very well.
I do not see the effect on the images because I have 
`.card-horizontal img { /* this is a flex item */
  margin-top: 0.3rem;
  width: 160px;
  height: 160px; 
  object-fit: cover;
  border-right: 1px solid #e0e0e0;
}` 
If I change the height property to auto
`.card-horizontal img { /* this is a flex item */
  margin-top: 0.3rem;
  width: 160px;
  height: auto; 
  object-fit: cover;
  border-right: 1px solid #e0e0e0;
}`
I see the effect on mobile. I keep it. `height: 160px` is good when image length is smaller than its height.
But usually it is not and I will choose images carefully.
- Hiding sidebar already done in Step 3 Sidebar 
- I still do not understand how to do that for my grid layout on the home page. Now I know:
`@media (max-width: 756px) {
  .home-intro-img { grid-area: 1 / span 2; } /* display: none; */
  .home-intro-text { grid-area: 2 / span 2; }
  .home-posts-img { grid-area: 3 / span 2; }  /* display: none; */
  .home-posts-text { grid-area: 4 / span 2; } 
  .home-overons-img { grid-area: 5 / span 2; } /* display: none; */
  .home-overons-text { grid-area: 6 / span 2; }   
}`
- `@media (min-width: 1400px) {
  .card-horizontal img {
    width: 200px;
	height: auto;
    object-fit: cover;
    border-right: 1px solid #e0e0e0;
  }
}` I do not know how to test it but I keep it.
 

### 🔹 Result
✅ Kept changes: `.card-horizontal img { height: auto; }` in combination with 
`@media (max-width: 768px) {
  .card-horizontal {
    flex-direction: column;
  }
  .card-horizontal img {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0; 
  }
}`
`@media (min-width: 1400px) {
  .card-horizontal img {
    width: 200px;
	height: auto;
    object-fit: cover;
    border-right: 1px solid #e0e0e0;
  }
}`
❌ Reverted: 

### 🔹 Next Step
_What I want to try in my next session_  
Move to Step 6: Forms & Feedback

## 🗓️ Date: 2025-08-

### 🔹 Step 6: Forms & Feedback

### 🔹 Goal
_What am I trying to improve or learn?_  
- Style interactive elements.

### 🔹 Why 
👉 Why: Forms are where users interact — polish improves trust.
 
### 🔹 Experiments
- [X] Style the inputs with a light background (background: #fefefe;) and a subtle focus border (border-color: #C62828;).
- [X] Make the submit button full width on mobile but inline on desktop.
- [X] Add a success message style (color: green; font-weight: bold;).

### 🔹 Observations
- `.feedback input, .feedback textarea { background: #fefefe; }` is subtle and nice
- `.feedback input, .feedback textarea { border-color: #C62828; }` I do not like so much
- `@media (max-width: 768px) {
	.feedback button {
	  display:block;
      min-width:100%;
	  font-size: 1.2rem;
	  padding: 1rem;
	}
}` much easier to work with, also increased font-size and padding
- `.feedback-success {
	color: green;
/*  font-weight: bold; */
}` good solution, bold too much

### 🔹 Result
✅ Kept changes: `.feedback input, .feedback textarea { background: #fefefe; }`,
`@media (max-width: 768px) {
	.feedback button {
	  display:block;
      min-width:100%;
	  font-size: 1.2rem;
	  padding: 1rem;
	}
}`,
`.feedback-success {
	color: green;
/*  font-weight: bold; */
}`
❌ Reverted: `.feedback input, .feedback textarea { border-color: #C62828; }`,

### 🔹 Next Step
_What I want to try in my next session_  
CONGRATULATIONS. DONE.


# ✅ Progress Tracker

### Step 1: Typography & Spacing
- [X] Line-height experiment
- [X] Font-size hierarchy
- [X] Text-transform
- [X] Change the font of titles (h2, h3) to a serif and see how it feels compared to sans-serif
- [X] Add letter-spacing: 0.5px to links and headings → does it feel clearer?

### Step 2: Cards (Flexbox)
- [X] Fixed square images
- [X] Hover effect (scale + shadow)
- [X] Alignment experiment
- [X] Change card gap/margins (how does it affect breathing space?)

### Step 3: Sidebar & Navigation
- [X] Hover effect on links
- [X] Active category highlight
- [X] Mobile reorder

### Step 4: Layout (Grid)
- [X] Adjust grid proportions
- [X] On mobile, hide the sidebar completely
- [X] Add max-width + centering
- [X] Gap size experiments

### Step 5: Responsive Design
- [X] Cards stack on mobile
- [X] Full-width images on mobile
- [X] Large screen scaling

### Step 6: Forms & Feedback
- [X] Input focus style
- [X] Full-width button on mobile
- [X] Success/error message style

# WoW ... I learned a lot ... thank you!