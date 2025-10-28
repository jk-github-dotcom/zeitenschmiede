import { LatestPosts } from "../components/LatestPosts";

function HomePage() {

  return (
    <div>
      <img className="bannerimage" src="/images/home/groningen.2000x824.jpg" width="auto" height="350"/>
	  <h2>Welcome to Zeitenschmiede</h2>
	  
	  <div className="home-grid-layout">
	  {/* 
	    <div className="home-intro">
	      <h2>Wat is Zeitenschmiede</h2>
	      <div className="container">
	        <img src="/images/mars-high.webp" />
		    <p>Zeitenschmiede is een Blog die gebaseerd is op het inzicht dat alles wat we leren, al onze zekerheden, waarschijnlijk fout zijn. 
			   Dat is op de een of andere manier ook geruststellend. 
			   Het geeft ons de vrijheid en de ruimte om opnieuw te beginnen. 
			   Je kunt de nieuwe blogs hieronder vinden, een overzicht van alle blogs hier.
            </p>
	      </div>
	    </div>
		
        <div className="home-latest-posts">
		  <h2>Latest Posts</h2>
		  <div className="container">
			<img src="/images/friends-standard-ag6irc.jpg" />
            <div className="container-transform">
	          <LatestPosts numberOfPosts={7} />
		    </div>
		  </div>	
        </div>
		
	    <div className="home-over-ons">
	      <h2>Over ons</h2>
	      <div className="container">
	        <img src="/images/himmelsscheibe-large-4-3-jpg-high.webp" />
		    <p>Bij Zeitenschmiede geloven we dat de toekomst in onze handen ligt. Wij zijn een collectief van denkers, schrijvers en innovators die ernaar streven om de tijden te smeden met kennis en creativiteit. Ons doel is om onze lezers te voorzien van waardevolle inzichten en inspiratie die hen helpt om voorop te blijven lopen in een snel veranderende wereld. Of het nu gaat om trends in technologie, maatschappelijke veranderingen of persoonlijke groei, wij bieden een platform waar ideeën tot leven komen en de toekomst wordt gecreëerd. Onze artikelen zijn diepgaand, goed onderzocht en gericht op het stimuleren van gedachten en discussies. We nodigen je uit om samen met ons de tijden te smeden en een betere toekomst op te bouwen.</p>
	      </div>	
	    </div>
	  */}
	  
        <div className="home-intro-img">
		  <img src="/images/home/mars_rover.600x732.jpg" />
		</div>
		
		<div className="home-intro-text">
		  <h2>Wat is Zeitenschmiede</h2>
		  <p>Zeitenschmiede is een Blog die gebaseerd is op het inzicht dat alles wat we leren, al onze zekerheden, waarschijnlijk fout zijn. 
			   Dat is op de een of andere manier ook geruststellend. 
			   Het geeft ons de vrijheid en de ruimte om opnieuw te beginnen. 
			   Je kunt de nieuwe blogs hieronder vinden, een overzicht van alle blogs <a href="/blog">hier</a>
          </p>
		</div>

        <div className="home-posts-img">
		  <img src="/images/home/friends.600x864.jpg" />
		</div>		

		<div className="home-posts-text">
            <LatestPosts numberOfPosts={4} />
		</div>

        <div className="home-overons-img">
		  <img src="/images/home/himmelsscheibe.600x810.jpg" />
		</div>
		
		<div className="home-overons-text">
		  <h2>Over ons</h2>
		    <p>
			  Bij Zeitenschmiede geloven we dat de toekomst in onze handen ligt. 
			  Wij zijn een collectief van denkers, schrijvers en innovators die ernaar streven om de tijden te smeden met kennis en creativiteit. 
			  Ons doel is om onze lezers te voorzien van waardevolle inzichten en inspiratie die hen helpt om voorop te blijven lopen in een snel veranderende wereld. 
			  Of het nu gaat om trends in technologie, maatschappelijke veranderingen of persoonlijke groei, wij bieden een platform waar ideeën tot leven komen en de toekomst wordt gecreëerd. 
			  Onze artikelen zijn diepgaand, goed onderzocht en gericht op het stimuleren van gedachten en discussies. 
			  We nodigen je uit om samen met ons de tijden te smeden en een betere toekomst op te bouwen.
			</p>
		</div>

	  	  
	  </div> 
  
    </div>
  );
}

export default HomePage;
