import './App.css';
import arrowIcon from './images/icon-arrow.svg';
import bgImage from './images/pattern-bg.png';

//  https://geo.ipify.org/api/v2/country?apiKey=
//  &ipAddress=8.8.8.8 

function App() {
  return (
    <>
      <section>
        <div className="absolute -z-10">
          <img src={bgImage} alt="bgImage" className="w-full h-80" />
        </div>

        <artdivicle className="p-8">
          <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">IP Address Tracker</h1>

          <form 
            autoComplete="off"
            className="flex justify-center max-w-xl mx-auto">

            <input type="text" name="ipAddress" id="ipAddress" placeholder="Search for any IP Address or domain" required 
              className="w-full py-2 px-4 rounded-l-lg" />
            <button type="submit" className="bg-black py-2 px-4 rounded-r-lg hover:opacity-60">
              <img src={arrowIcon} alt="arrow" />
            </button>

          </form>
        </artdivicle>

        <div className="p-8">
          <div className="bg-white rounded-xl p-8 shadow max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left -mb-10 relative lg:-mb-32 z-10">
            <div className="lg:border-r lg:border-slate-400 p-6">
              <h2 className="text-sm uppercase text-slate-600 mb-2">Ip Address</h2>
              <p className="font-bold text-slate-900 text-2xl">192.212.174.101</p>
            </div>

            <div className="lg:border-r lg:border-slate-400 p-6">
              <h2 className="text-sm uppercase text-slate-600 mb-2">Location</h2>
              <p className="font-bold text-slate-900 text-2xl">Szczecin, Poland</p>
            </div>

            <div className="lg:border-r lg:border-slate-400 p-6">
              <h2 className="text-sm uppercase text-slate-600 mb-2">Timezone</h2>
              <p className="font-bold text-slate-900 text-2xl">UTC +01:00</p>
            </div>
            
            <div className="p-6">
              <h2 className="text-sm uppercase text-slate-600 mb-2">ISP</h2>
              <p className="font-bold text-slate-900 text-2xl">SpaceX Starlink</p>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default App;
